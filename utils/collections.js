export function sortCollections(collections, sortOrder) {
    return [...collections].sort((a, b) => {
        switch (sortOrder) {
            case 'title-a-z':
                return a.name.localeCompare(b.name)
            case 'title-z-a':
                return b.name.localeCompare(a.name)
            case 'most-recent':
                return new Date(b.createdAt) - new Date(a.createdAt)
            default:
                return 0
        }
    })
}

export function searchCollectionsByQuery(collections, query) {
    if (!query.trim()) return collections
    return collections.filter((collection) =>
        collection.name.toLowerCase().includes(query.toLowerCase())
    )
}
