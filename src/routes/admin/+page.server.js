
export async function load({locals}) {
    // note that we can't just return locals.user because it's not serializable; we have to convert it to json first
    console.log(locals.user.toJSON())
    return {
        user: locals.user.toJSON(),
        title: "Admin Page"
    }
}