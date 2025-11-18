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

    const imageUrls = items.map((item) => item.image_url)

    return (
        <div className={styles.collectionContainer}>
            <h2 className={styles.pageTitle}>{collectionToShow.name} </h2>
            <div className={styles.descriptionContainer}>
                <h3 className={styles.title}>DESCRIPTION</h3>
                <p className={styles.descriptionText}>
                    {collectionToShow.description}
                </p>
            </div>
            <div className={styles.additionalContainer}>
                <h3 className={styles.title}>PHOTOS</h3>
                {imageUrls.map((url) => (
                    <img key={url} src={url} />
                ))}
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
