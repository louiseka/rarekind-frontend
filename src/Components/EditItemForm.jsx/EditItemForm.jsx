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
                    Name
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter animal name..."
                        required
                        className={styles.name}
                    />
                </label>
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
                    Image
                    <input
                        type="text"
                        placeholder="Enter image URL..."
                        name="image_url"
                        className={styles.image}
                    />
                </label>
                <select
                    className={styles.select}
                    name="classification_id"
                    aria-label="select classification"
                    required
                >
                    <option value="">Select Classification</option>
                    <option value="3">Mammal</option>
                    <option value="2">Bird</option>
                    <option value="1">Reptile</option>
                    <option value="5">Amphibian</option>
                    <option value="4">Fish</option>
                </select>

                <button type="submit" className={styles.button}>
                    UPDATE ANIMAL
                </button>
            </form>
        </div>
    )
}
