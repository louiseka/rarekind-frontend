import styles from './ItemCard.module.css'
import { getTagColorClass } from '../CollectionDetails/CollectionDetails'

export default function ItemCard({ item, classificationName }) {
    const t = classificationName
    
    return (
        <div className={styles.card}>
            <div className={styles.cardHeaderContainer}>
                <h3 className={styles.cardHeader}>{item.name}</h3>
                <p className={`${styles.tag} ${getTagColorClass(t)}`}>{classificationName}</p>
            </div>
            <img src={item.image_url} alt={item.name} />
            <p className={styles.cardDescription}>{item.description}</p>
        </div>
    )
}
