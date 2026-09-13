import { apply, setAttr, remove } from '@directus/visual-editing';
import { invalidateAll } from '$app/navigation';
import { PUBLIC_DIRECTUS_URL } from "$env/static/public";

let isApplied = false;

export async function initializeVisualEditor() {
    if (typeof window === 'undefined') {
        return;
    }

    if (isApplied) {
        remove();
        isApplied = false;
    }

    try {
        await apply({
            directusUrl: PUBLIC_DIRECTUS_URL,
            onSaved: async (data) => {
                console.log('Content saved successfully:', data);

                try {
                    await invalidateAll();
                    console.log('Page data refreshed successfully');
                } catch (error) {
                    console.error('Failed to refresh page data:', error);
                    window.location.reload();
                }
            }
        });
        isApplied = true;
    } catch (error) {
        console.error('Failed to initialize visual editor:', error);
    }
}

export function cleanupVisualEditor() {
    if (typeof window !== 'undefined' && isApplied) {
        remove();
        isApplied = false;
    }
}

export { setAttr };