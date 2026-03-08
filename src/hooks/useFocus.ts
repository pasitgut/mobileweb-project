import { useState, useCallback, useEffect, useRef } from 'react';
import { saveFocusSession, getTodayFocusTotal } from '../services/focusService';
import { useAuth } from '../auth/AuthContext';

export function useFocusTimer(defaultTime = 3600) {
    const { user } = useAuth();
    const [timeLeft, setTimeLeft] = useState(defaultTime);
    const [isActive, setIsActive] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const elapsedRef = useRef(0);

    const saveSession = useCallback(async (seconds: number) => {
        if (!user || seconds <= 0) return;
        try {
            await saveFocusSession(user.uid, seconds);
            setSuccessMsg(`Session saved! ${Math.floor(seconds / 60)} min ${seconds % 60} sec`);
        } catch (err: any) {
            setError(err.message);
        }
    }, [user]);

    useEffect(() => {
        let interval: any = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((time) => time - 1);
                elapsedRef.current += 1;
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
            saveSession(elapsedRef.current);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, saveSession]);

    const toggleTimer = () => {
        if (timeLeft > 0) {
            if (isActive) {
                setIsActive(false);
                if (elapsedRef.current > 0) {
                    saveSession(elapsedRef.current);
                    elapsedRef.current = 0;
                }
            } else {
                setIsActive(true);
            }
        }
    };

    const resetTimer = () => {
        if (isActive && elapsedRef.current > 0) {
            saveSession(elapsedRef.current);
        }
        setIsActive(false);
        setTimeLeft(defaultTime);
        elapsedRef.current = 0;
    };

    const adjustTime = (seconds: number) => {
        if (!isActive) {
            setTimeLeft((prev) => {
                const newTime = prev + seconds;
                return newTime > 0 ? newTime : 0;
            });
        }
    };

    const onLeave = useCallback(() => {
        if (isActive && elapsedRef.current > 0) {
            saveSession(elapsedRef.current);
        }
        setIsActive(false);
    }, [isActive, saveSession]);

    return {
        timeLeft,
        isActive,
        toggleTimer,
        resetTimer,
        adjustTime,
        onLeave,
        error,
        successMsg,
        clearMessages: () => { setError(null); setSuccessMsg(null); }
    };
}

export function useTodayFocusTotal() {
    const { user } = useAuth();
    const [focusMinutes, setFocusMinutes] = useState(0);

    const loadFocus = useCallback(async () => {
        if (!user) return;
        try {
            const totalSeconds = await getTodayFocusTotal(user.uid);
            setFocusMinutes(Math.round(totalSeconds / 60));
        } catch {
            // Ignore errors for silent fetching
        }
    }, [user]);

    useEffect(() => {
        loadFocus();
    }, [loadFocus]);

    return { focusMinutes, reloadFocus: loadFocus };
}
