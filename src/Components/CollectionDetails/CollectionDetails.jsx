import styles from './CollectionDetails.module.css'
import { FaPencil, FaTrashCan } from 'react-icons/fa6'
import { getTagColorClass } from '../../utils/collections'
import { useSelector, useDispatch } from 'react-redux'
import { deleteCollection } from '../../Slices/deleteCollectionAPISlice'
import { openPopup } from '../../Slices/popupSlice'

export default function CollectionDetails({ collectionToShow }) {
    const dispatch = useDispatch()
    const tags = Array.from(
        new Set(
            collectionToShow.animals.map((animal) => animal.classification_name)
        )
    )
    const imageUrls = collectionToShow.animals.map((animal) => animal.image_url)
    const validImages = imageUrls.filter(Boolean)
    const user = useSelector((state) => state.auth.user)?.id
    const dispatch = useDispatch()

    const handleDeleteCollection = async () => {
            try {
                await dispatch(deleteCollection({ collectionId: collectionToShow.id })).unwrap()
                window.location.href = '/mycollections'
            } catch (error) {
                console.error(error)
            }
        }

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
            {user && user === collectionToShow.user_id && (
            <div className={styles.buttonContainer}>
                <button className={styles.editCollectionButton} onClick={() => dispatch(openPopup('editcollection'))}>
                    <FaPencil className={styles.icon} />
                    EDIT COLLECTION
                </button>
                <button className={styles.deleteCollectionButton} onClick={handleDeleteCollection}>
                    <FaTrashCan className={styles.icon} />
                    DELETE COLLECTION
                </button>
            </div>)}
        </div>
    )
}
