import {authentication, createDirectus, rest} from '@directus/sdk';
import {PUBLIC_DIRECTUS_URL} from "$env/static/public";

function initApp() {
    return createDirectus(
        PUBLIC_DIRECTUS_URL,
    ).with(rest()).with(authentication('cookie', {credentials: 'include'}));
}

export const directus = initApp();