
export async function load({locals}) {
    return {
        user: locals.user,
        title: "Admin Page",
        // Do not allow search engines to index this page
        noIndex: true
    }
}