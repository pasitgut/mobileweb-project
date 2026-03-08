import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    orderBy,
} from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import type { FocusSession } from "../types/todo";

const COLLECTION = "focusSessions";

/**
 * Save a completed focus session.
 */
export async function saveFocusSession(
    userId: string,
    durationSeconds: number,
): Promise<string> {
    const docRef = await addDoc(collection(firestore, COLLECTION), {
        userId,
        durationSeconds,
        completedAt: new Date().toISOString(),
    });
    return docRef.id;
}

/**
 * Get all focus sessions for a user, most recent first.
 */
export async function getFocusSessions(
    userId: string,
): Promise<FocusSession[]> {
    const q = query(
        collection(firestore, COLLECTION),
        where("userId", "==", userId),
        orderBy("completedAt", "desc"),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
    })) as FocusSession[];
}

/**
 * Get total focus seconds for a user on a specific date.
 */
export async function getTodayFocusTotal(userId: string): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const q = query(
        collection(firestore, COLLECTION),
        where("userId", "==", userId),
        where("completedAt", ">=", today.toISOString()),
        where("completedAt", "<", tomorrow.toISOString()),
    );
    const snapshot = await getDocs(q);
    let total = 0;
    snapshot.docs.forEach((d) => {
        total += d.data().durationSeconds || 0;
    });
    return total;
}
