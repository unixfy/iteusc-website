// this function just get some details from the user object
// note function name must start with _ otherwise SvelteKit will have an error (as normally +server.js can only export GET, POST, PATCH, etc)
export function getSession(user) {
    if (user) {
        return {
            id: user.uid,
            email: user.email,
            name: user.name,
            email_verified: user.email_verified
        }
    }
    return {user}
}