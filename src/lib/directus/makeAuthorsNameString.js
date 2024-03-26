export default function makeAuthorsNameString(authors) {
    // takes an array of directus author objects and converts their names to a nice string
    if (authors.length === 1) { return `${authors[0].authors_id.first_name} ${authors[0].authors_id.last_name}` }
    const lastAuthor = authors[authors.length - 1]
    const otherAuthors = authors.slice(0, authors.length - 1)
    return otherAuthors.map((author) => `${author.authors_id.first_name} ${author.authors_id.last_name}`).join(', ') + ` and ${lastAuthor.authors_id.first_name} ${lastAuthor.authors_id.last_name}`
}