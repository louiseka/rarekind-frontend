import styles from './AddItemForm.module.css'
import { useDispatch } from 'react-redux'
import { closePopup } from '../../Slices/popupSlice'
import { FaTrashCan } from "react-icons/fa6";

function AddItemForm() {
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
            <h2>Add Animal</h2>
            <form className={styles.form}>
                <label className={styles.label}>
                    Name
                    <textarea
                        type="text"
                        name="name"
                        placeholder="Enter animal name..."
                        className={styles.name}
                    />
                </label>
                <label className={styles.label}>
                    Description
                    <textarea
                        type="text"
                        name="description"
                        placeholder="Enter animal description..."
                        className={styles.description}
                    />
                </label>
                <select className={styles.select} name="classification" aria-label='select classification'>
                    <option value="">Select Classification</option>
                    <option value="mammal">Mammal</option>
                    <option value="bird">Bird</option>
                    <option value="reptile">Reptile</option>
                    <option value="amphibian">Amphibian</option>
                    <option value="fish">Fish</option>
                </select>
                <button type="submit" className={styles.button}>
                    ADD ANIMAL
                </button>
                <button type="submit" className={styles.deleteButton}>
                    <FaTrashCan className={styles.deleteIcon} />
                    DELETE ANIMAL
                </button>
            </form>
        </div>
    )
}

export default AddItemForm