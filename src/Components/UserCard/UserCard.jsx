import styles from './UserCard.module.css'
import { useSelector } from 'react-redux'

export default function UserCard({ user }) {
    const collections = useSelector((state) => state.collections.items)
    const collectionCount = collections.reduce(
        (acc, c) => (c.user_id === user.id ? acc + 1 : acc),
        0
    )
    const userCollections = collections.filter((c) => c.user_id === user.id)

    let profileImageUrl = null
    for (const collection of userCollections) {
        if (Array.isArray(collection.animals)) {
            const hasImage = collection.animals.find((a) => a.image_url)
            if (hasImage) {
                profileImageUrl = hasImage.image_url
                break
            }
        }
    }

    return (
        <div className={styles.card}>
            <div>
                <h3>{user.name}</h3>
                <p>Number of collections:{' '} {collectionCount}</p>
            </div>
            <div>
                {profileImageUrl && (
                    <img
                        src={profileImageUrl}
                        alt={user.name}
                        className={styles.cardImage}
                    />
                )}
            </div>
        </div>
    )
}
