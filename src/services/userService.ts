import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import type { UserProfile } from "../types/todo";

const COLLECTION = "users";

/**
 * Get a user profile from Firestore.
 */
export async function getUserProfile(
    userId: string,
): Promise<UserProfile | null> {
    const ref = doc(firestore, COLLECTION, userId);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return snap.data() as UserProfile;
}

/**
 * Update user profile fields (partial update).
 */
export async function updateUserProfile(
    userId: string,
    data: Partial<Omit<UserProfile, "uid" | "createdAt">>,
): Promise<void> {
    const ref = doc(firestore, COLLECTION, userId);
    await updateDoc(ref, data);
}
