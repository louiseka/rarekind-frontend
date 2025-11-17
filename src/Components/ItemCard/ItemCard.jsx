import styles from './ItemCard.module.css'

export default function ItemCard({ item, classificationName }) {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeaderContainer}>
                <h3 className={styles.cardHeader}>{item.name}</h3>
                <p className={styles.cardTag}>{classificationName}</p>
            </div>
            <img src={item.image_url} alt={item.name} />
            <p className={styles.cardDescription}>{item.description}</p>
        </div>
    )
}
