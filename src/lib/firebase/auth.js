import { auth } from './client'
import { writable } from "svelte/store";
import { signInWithEmailAndPassword } from "firebase/auth";

export const user = writable(null);

export async function signOut() {
    return auth.signOut();
}


export async function signIn(username, password) {
    await signInWithEmailAndPassword(auth, username, password)
}