import styles from './ItemCard.module.css'
import { FaPencil, FaTrashCan } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { openPopup } from '../../Slices/popupSlice'
import { deleteItem } from '../../Slices/deleteItemAPISlice'
import { fetchItemsByCollectionId } from '../../Slices/itemAPISlice'
import { getTagColorClass } from '../../utils/collections'


export default function ItemCard({ item, collectionId, collectionUserId }) {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)?.id
    console.log(user)
    console.log(collectionUserId)

    const deleteAnimal = async () => {
        try {
            await dispatch(deleteItem(item.id))
            await dispatch(fetchItemsByCollectionId(collectionId))
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className={styles.card}>
            {item.image_url && (
                <div className={styles.imageContainer}>
                    <img
                        className={styles.cardImage}
                        src={item.image_url}
                        alt={item.name}
                    />
                </div>
            )}
            <div className={styles.cardHeaderContainer}>
                <h3 className={styles.cardHeader}>{item.name}</h3>
                {item.classification_name && (
                    <p
                        className={`${styles.tag} ${getTagColorClass(
                            item.classification_name
                        )} `}
                    >
                        {item.classification_name}
                    </p>
                )}
            </div>
            <p className={styles.cardDescription}>{item.description}</p>
            {user && user === collectionUserId && (
                <div className={styles.buttonContainer}>
                    <button
                        className={styles.editButton}
                        onClick={() => dispatch(openPopup('edititem'))}
                        aria-label={`Edit the animal ${item.name}`}
                    >
                        <FaPencil />
                    </button>
                    <button
                        className={styles.deleteButton}
                        onClick={deleteAnimal}
                        aria-label={`Delete the animal ${item.name}`}
                    >
                        <FaTrashCan />
                    </button>
                </div>
            )}
        </div>
    )
}
