import styles from './ItemCard.module.css'
import { FaPencil, FaTrashCan } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import { openPopup } from '../../Slices/popupSlice'
export default function ItemCard({ item, classificationName }) {
    const dispatch = useDispatch()

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
                <p className={styles.cardTag}>{classificationName}</p>
            </div>
            <p className={styles.cardDescription}>{item.description}</p>
            <div className={styles.buttonContainer}>
                <button
                    className={styles.editButton}
                    onClick={() => dispatch(openPopup('edititem'))}
                >
                    <FaPencil />
                </button>
                <button className={styles.deleteButton}>
                    <FaTrashCan />
                </button>
            </div>
        </div>
    )
}
