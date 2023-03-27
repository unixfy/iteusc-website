import { auth } from './client'
import { writable } from "svelte/store";
import { signInWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";

export const user = writable(null);

export async function signOut() {
    await firebaseSignOut(auth);
}


export async function signIn(username, password) {
    await signInWithEmailAndPassword(auth, username, password)
}