import styles from './CollectionDetails.module.css'
import { FaPencil, FaTrashCan } from 'react-icons/fa6'
import { getTagColorClass } from '../../utils/collections'
import authService from '../../services/authService'

export default function CollectionDetails({ collectionToShow }) {
    const tags = Array.from(
        new Set(
            collectionToShow.animals.map((animal) => animal.classification_name)
        )
    )
    const imageUrls = collectionToShow.animals.map((animal) => animal.image_url)
    const validImages = imageUrls.filter(Boolean)
    const user = authService.getUser()
    console.log(user)
    console.log(collectionToShow.user_id)

    return (
        <div className={styles.collectionContainer}>
            <div className={styles.descriptionContainer}>
                <h3 className={styles.title}>DESCRIPTION</h3>
                <p className={styles.descriptionText}>
                    {collectionToShow.description}
                </p>
            </div>
            {validImages.length >= 1 && (
                <div className={styles.additionalContainer}>
                    <h3 className={styles.title}>PHOTOS</h3>
                    <div className={styles.imageContainer}>
                        {validImages.slice(0, 2).map((url) => (
                            <img
                                key={url}
                                src={url}
                                className={styles.summaryImage}
                            />
                        ))}
                    </div>
                </div>
            )}
            <div className={styles.tagsContainer}>
                <h4 className={styles.title}>TAGS</h4>
                <ul className={styles.tagList}>
                    {tags.map((tag) => (
                        <li
                            key={tag}
                            className={`${styles.tag} ${getTagColorClass(
                                tag
                            )} `}
                        >
                            {tag}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.statusContainer}>
                <p className={styles.statusDetails}>
                    <span className={styles.statusTitle}>CREATED: </span>
                    <time dateTime={collectionToShow.created_at}>
                        {new Date(collectionToShow.created_at).toLocaleString()}
                    </time>
                </p>
                <p className={styles.statusDetails}>
                    <span className={styles.statusTitle}>LAST UPDATED:</span>
                    <time dateTime={collectionToShow.updated_at}>
                        {new Date(collectionToShow.updated_at).toLocaleString()}
                    </time>
                </p>
            </div>
            {user.id === collectionToShow.user_id && (
            <div className={styles.buttonContainer}>
                <button className={styles.editCollectionButton}>
                    <FaPencil className={styles.icon} />
                    EDIT COLLECTION
                </button>
                <button className={styles.deleteCollectionButton}>
                    <FaTrashCan className={styles.icon} />
                    DELETE COLLECTION
                </button>
            </div>)}
        </div>
    )
}
