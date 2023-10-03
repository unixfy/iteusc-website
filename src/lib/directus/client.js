import {authentication, createDirectus, rest} from '@directus/sdk';

function initApp() {
    return createDirectus(
        'https://iteusc-backend.unixfy.net',
    ).with(rest()).with(authentication('cookie', {credentials: 'include'}));
}

export const directus = initApp();