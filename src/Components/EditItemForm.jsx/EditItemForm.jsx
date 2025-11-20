import styles from './EditItemForm.module.css'
import { useDispatch } from 'react-redux'
import { closePopup } from '../../Slices/popupSlice'
import { FaTrashCan } from 'react-icons/fa6'

export default function EditItemForm() {
    const dispatch = useDispatch()

    return (
        <div className={styles.wrapper}>
            <button
                onClick={() => dispatch(closePopup())}
                className={styles.close}
                aria-label="Close add item"
            >
                X
            </button>
            <h2>Edit your Animal</h2>
            <form className={styles.form}>
                <label className={styles.label}>
                    Description
                    <textarea
                        type="text"
                        name="description"
                        placeholder="Enter item description..."
                        className={styles.description}
                    />
                </label>
                <label className={styles.label}>
                    Additional notes
                    <textarea
                        type="text"
                        name="notes"
                        placeholder="Enter additional notes..."
                        className={styles.notes}
                    />
                </label>
                <button type="submit" className={styles.button}>
                    UPDATE ITEM
                </button>
                <button type="submit" className={styles.deleteButton}>
                    <FaTrashCan className={styles.deleteIcon} />
                    DELETE ITEM
                </button>
            </form>
        </div>
    )
}
