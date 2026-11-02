import {redirect} from "@sveltejs/kit";
import {PUBLIC_DIRECTUS_URL} from "$app/env/public";

export async function load() {
    redirect(307, `${PUBLIC_DIRECTUS_URL}/admin`, { external: true });
}