import {PUBLIC_FIREBASE_STORAGE_BUCKET} from "$env/static/public";

export function getStorageDirectUrl(path) {
//     generates the public (firebasestorage.googleapis.com) url for a file in the firebase storage bucket, given its path in the bucket
    return `https://firebasestorage.googleapis.com/v0/b/${PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(path)}?alt=media`;
}