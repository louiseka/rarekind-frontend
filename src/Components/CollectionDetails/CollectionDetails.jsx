import styles from './CollectionDetails.module.css'
import { FaPencil, FaTrashCan } from 'react-icons/fa6'

export default function CollectionDetails({
    collectionToShow,
    classificationNameMap,
    items,
}) {
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
        <div className={styles.collectionContainer}>
            <div className={styles.descriptionContainer}>
                <h3 className={styles.title}>DESCRIPTION</h3>
                <p className={styles.descriptionText}>
                    {collectionToShow.description}
                </p>
            </div>
            <div className={styles.additionalContainer}>
                <h3 className={styles.title}>ADDITIONAL</h3>
                <p className={styles.additionalText}>
                    Additional info filled up by the user when creating
                    collection. This text could be quite long so we don't want
                    it to be in a narrow column.
                </p>
            </div>
            <div className={styles.tagsContainer}>
                <h4 className={styles.title}>TAGS</h4>
                <ul className={styles.tagList}>
                    {tags.map((t) => (
                        <li key={t} className={styles.tag}>
                            {t}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.statusContainer}>
                <p className={styles.statusDetails}>
                    <span className={styles.statusTitle}>CREATED: </span>
                    <time dateTime={collectionToShow.date_created}>
                        {' '}
                        {new Date(
                            collectionToShow.date_created
                        ).toLocaleString()}{' '}
                    </time>
                </p>
                <p className={styles.statusDetails}>
                    <span className={styles.statusTitle}>LAST UPDATED:</span>
                    <time dateTime={collectionToShow.date_updated}>
                        {new Date(
                            collectionToShow.date_updated
                        ).toLocaleString()}
                    </time>
                </p>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.editCollectionButton}>
                    <FaPencil className={styles.icon} />
                    EDIT COLLECTION
                </button>
                <button className={styles.deleteCollectionButton}>
                    <FaTrashCan className={styles.icon} />
                    DELETE COLLECTION
                </button>
            </div>
        </div>
    )
}
