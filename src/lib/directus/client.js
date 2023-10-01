import {createDirectus, rest} from '@directus/sdk';

function initApp() {
    return createDirectus(
        'https://iteusc-backend.unixfy.net',
    ).with(rest());
}

export const directus = initApp();