
export async function load({locals}) {
    // note that we can't just return locals.user because it's not serializable; we have to convert it to json first
    return {
        user: locals.user,
        title: "Admin Page",
        // Do not allow search engines to index this page
        noIndex: true
    }
}