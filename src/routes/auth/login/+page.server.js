import {redirect} from "@sveltejs/kit";
import {PUBLIC_DIRECTUS_URL} from "$env/static/public";

export async function load() {
    redirect(307, `${PUBLIC_DIRECTUS_URL}/admin`);
}