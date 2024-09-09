export default function makeAuthorsNameString(people) {
    // takes an array of directus author objects and converts their names to a nice string
    if (people.length === 1) { return `${people[0].people_id.first_name} ${people[0].people_id.last_name}` }
    const lastAuthor = people[people.length - 1]
    const otherAuthors = people.slice(0, people.length - 1)
    return otherAuthors.map((person) => `${person.people_id.first_name} ${person.people_id.last_name}`).join(', ') + ` and ${lastAuthor.people_id.first_name} ${lastAuthor.people_id.last_name}`
}