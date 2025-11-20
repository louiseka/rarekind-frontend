import styles from './CollectionCard.module.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectClassificationNameMap } from '../../Slices/classificationAPISlice.js'

export default function CollectionCard({ collection, items }) {
    const classificationNameMap = useSelector(selectClassificationNameMap)
    const tags = Array.from(
        new Set(
            items
                .map((i) =>
                    classificationNameMap?.get(String(i.classification_id))
                )
                .filter(Boolean)
        )
    )
    return (
        <Link to={`/collection/${collection.id}`} className={styles.card}>
            <h3 className={styles.cardHeader}>{collection.name}</h3>
            {tags.map((tag) => (
                <p className={styles.cardTag} key={tag}>
                    {tag}
                </p>
            ))}
            <p className={styles.cardDetails}>
                <span className={styles.cardStatusTitle}>Created:</span>{' '}
                <time dateTime="14:00">
                    {' '}
                    {new Date(collection.date_created).toLocaleString()}
                </time>
            </p>
            <p className={styles.cardDetails}>
                <span className={styles.cardStatusTitle}>Last updated:</span>{' '}
                <time>
                    {' '}
                    {new Date(collection.date_updated).toLocaleString()}
                </time>
            </p>
        </Link>
    )
}
