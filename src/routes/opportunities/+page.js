export async function load({parent}) {
    const {test} = await parent();
    return { test }
}