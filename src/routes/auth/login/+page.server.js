import {fail, redirect} from "@sveltejs/kit";
import {signInWithEmailAndPassword} from "firebase/auth";

export async function load() {
    return {
        // Do not allow search engines to index this page
        noIndex: true
    }
}