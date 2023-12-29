export function groupDataByProperty(data, property) {
    // takes input data (directus-generated array of entities) and groups it by the given property
    let groupedData = new Map([])
    data.forEach(item => {
        const propertyValue = item[property]
        if (!groupedData.get(propertyValue)) {
            groupedData.set(propertyValue, [])
        }
        groupedData.get(propertyValue).push(item)
    })
    return groupedData
}