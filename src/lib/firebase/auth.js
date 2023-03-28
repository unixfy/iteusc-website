import { auth } from './client'
import { writable } from "svelte/store";
import { signInWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";

export const user = writable(null);

export async function signOut() {
    await firebaseSignOut(auth);

    // Force the user to (hard) navigate to login page after sign out is completed
    window.location.href = '/auth/login';
}


export async function signIn(username, password) {
    await signInWithEmailAndPassword(auth, username, password)
}