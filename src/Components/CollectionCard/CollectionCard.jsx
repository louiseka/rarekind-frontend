import styles from './CollectionCard.module.css'
import { Link } from 'react-router-dom'
import { getTagColorClass } from '../../utils/collections'

export default function CollectionCard({ collection }) {
    const tags = Array.from(
        new Set(collection.animals.map((animal) => animal.classification_name))
    )
    const getRandomImage = () => {
        const animalsWithImages = collection.animals.filter(
            (animal) => animal.image_url
        )
        if (animalsWithImages.length === 0) return null
        const randomIndex = Math.floor(Math.random() * animalsWithImages.length)
        return animalsWithImages[randomIndex].image_url
    }

    const coverImage = getRandomImage()
    
     const prefix = location.pathname.startsWith('/mycollections')
        ? 'mycollections'
        : 'collection'
     
    return (
        <Link to={`/collection/${collection.id}`} className={styles.card}>
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
                </div>
            </div>
 
            )}

        </Link>
    )
}
