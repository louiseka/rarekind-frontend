import styles from './CollectionCard.module.css'
import { Link, useParams } from 'react-router-dom'
import { getTagColorClass } from '../../utils/collections'
import { useSelector } from 'react-redux'

export default function CollectionCard({ collection }) {
    const { id } = useParams()
    const tags = Array.from(
        new Set(collection.animals.map((animal) => animal.classification_name))
    )
    const users = useSelector((state) => state.users.items)
    const getRandomImage = () => {
        const animalsWithImages = collection.animals.filter(
            (animal) => animal.image_url
        )
        if (animalsWithImages.length === 0) return null
        const randomIndex = Math.floor(Math.random() * animalsWithImages.length)
        return animalsWithImages[randomIndex].image_url
    }

    const currentUser = useSelector((state) => state.auth.user)
    const collectionOwner = users.find((u) => u.id === collection.user_id)
    const collectionOwnerName =
        collectionOwner?.name ||
        (currentUser?.id === collection.user_id
            ? currentUser.name
            : 'Unknown User')

    const coverImage = getRandomImage()

    const collectionLink = location.pathname.startsWith('/mycollections')
        ? `/mycollections/${collection.id}`
        : location.pathname.startsWith('/user')
        ? `/user/${id}/collection/${collection.id}`
        : `/collection/${collection.id}`

    return (
        <Link to={collectionLink} className={styles.card}>
            <div className={styles.cardContainer}>
                {coverImage && (
                    <div className={styles.cardImage}>
                        <img
                            src={coverImage}
                            alt={collection.name}
                            className={styles.coverImage}
                        />
                    </div>
                )}
                <div className={styles.cardText}>
                    <h3 className={styles.cardHeader}>{collection.name}</h3>
                    {tags &&
                        tags.map((tag) => (
                            <p
                                key={tag}
                                className={`${
                                    styles.cardTag
                                } ${getTagColorClass(tag)} `}
                            >
                                {tag}
                            </p>
                        ))}

                    <p className={styles.cardDetails}>
                        <span className={styles.cardStatusTitle}>Created:</span>{' '}
                        <time dateTime="14:00">
                            {new Date(collection.created_at).toLocaleString()}
                        </time>
                    </p>
                    <p className={styles.cardDetails}>
                        <span className={styles.cardStatusTitle}>
                            Last updated:
                        </span>{' '}
                        <time>
                            {' '}
                            {new Date(collection.updated_at).toLocaleString()}
                        </time>
                    </p>
                    <p className={styles.cardDetails}>
                        <span className={styles.cardStatusTitle}>
                            Created by:
                        </span>{' '}
                        {collectionOwnerName}
                    </p>
                </div>
            </div>
        </Link>
    )
}
