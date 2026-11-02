import {PUBLIC_DIRECTUS_URL} from "$app/env/public";

export function getStorageDirectUrl(uuid) {
    return `${PUBLIC_DIRECTUS_URL}/assets/${uuid}`;
}