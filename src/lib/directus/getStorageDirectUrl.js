import {PUBLIC_DIRECTUS_URL} from "$env/static/public";

export function getStorageDirectUrl(uuid) {
    return `${PUBLIC_DIRECTUS_URL}/assets/${uuid}`;
}