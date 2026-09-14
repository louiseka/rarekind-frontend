const mockCollections = [
    {
        id: 1,
        user_id: 1,
        name: 'Reptile Rarities',
        description: 'A curated set of rare and exotic reptile species.',
        animals: [
            {
                id: 1,
                collection_id: 1,
                name: 'Panther Chameleon',
                classification_name: 'Reptile',
                description: 'A colour changing reptile native to Madagascar.',
                image_url: '/images/mock-chameleon.jpg',
            },
            {
                id: 2,
                collection_id: 1,
                name: 'Blue-Tongued Skink',
                classification_name: 'Reptile',
                description:
                    'Known for its striking blue tongue used to deter predators.',
                image_url: '/images/mock-skink.jpg',
            },
        ],
        created_at: '2026-06-01T10:00:00Z',
        updated_at: '2026-06-01T10:00:00Z',
    },
    {
        id: 2,
        user_id: 1,
        name: 'Tropical Birds',
        description: 'Vibrant, uncommon bird species from tropical regions.',
        animals: [
            {
                id: 3,
                collection_id: 2,
                name: 'Resplendent Quetzal',
                classification_name: 'Bird',
                description:
                    'A vividly coloured bird found in Central American cloud forests.',
                image_url: '/images/mock-quetzal.jpg',
            },
        ],
        created_at: '2026-06-02T10:00:00Z',
        updated_at: '2026-06-02T10:00:00Z',
    },
]

export default mockCollections
