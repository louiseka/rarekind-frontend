import styles from './CollectionCard.module.css'
import { Link } from 'react-router-dom'
import { getTagColorClass } from '../../utils/collections'

export default function CollectionCard({ collection }) {
    const tags = Array.from(
        new Set(collection.animals.map((animal) => animal.classification_name))
    )
    const getRandomImage = () => {
        const animalsWithImages = collection.animals.filter(animal => animal.image_url)
        const randomIndex = Math.floor(Math.random() * collection.animals.length)
        if (animalsWithImages.length === 0) return null
        return collection.animals[randomIndex].image_url
    }
    
    const coverImage = getRandomImage()
    
    return (
        <Link to={`/collection/${collection.id}`} className={styles.card}>
            <div>
            <h3 className={styles.cardHeader}>{collection.name}</h3>
            {tags && 
                tags.map((tag) => (
                    <p
                        key={tag}
                        className={`${styles.cardTag} ${getTagColorClass(
                            tag
                        )} `}
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
                <span className={styles.cardStatusTitle}>Last updated:</span>{' '}
                <time> {new Date(collection.updated_at).toLocaleString()}</time>
            </p>
            </div>
            <img src={coverImage} alt={collection.name} className={styles.coverImage} />
        </Link>
    )
}
