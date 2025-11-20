import styles from './AddItemForm.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { closePopup } from '../../Slices/popupSlice'
import { FaTrashCan } from 'react-icons/fa6'
import { useState } from 'react'
import { addItem } from '../../Slices/addItemAPISlice'
import { deleteItem } from '../../Slices/addItemAPISlice'
import { fetchItemsByCollectionId } from '../../Slices/itemAPISlice'

function AddItemForm() {
    const dispatch = useDispatch()
    const id = window.location.pathname.split('/')[2]
    const { status, error } = useSelector((state) => state.addItem)

    const [formData, setFormData] = useState({
        collection_id: id,
        name: '',
        description: '',
        image_url: '',
        classification_id: '',
    })

    console.log(formData)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(addItem({ collectionId: id, updatedData: formData }))
            .then(() => {
                dispatch(fetchItemsByCollectionId(id))
                dispatch(closePopup())
            })
            .catch((error) => console.error('Error adding animal:', error))
    }
    console.log(id)

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
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Name
                    <textarea
                        type="text"
                        name="name"
                        placeholder="Enter animal name..."
                        required
                        className={styles.name}
                        onChange={handleChange}
                        value={formData.name}
                    />
                </label>
                <label className={styles.label}>
                    Description
                    <textarea
                        type="text"
                        name="description"
                        placeholder="Enter animal description..."
                        required
                        className={styles.description}
                        onChange={handleChange}
                        value={formData.description}
                    />
                </label>
                <label className={styles.label}>
                    Image
                    <input
                        type="text"
                        placeholder="Enter image URL..."
                        name="image_url"
                        className={styles.image}
                        onChange={handleChange}
                        value={formData.image_url}
                    />
                </label>
                <select 
                    className={styles.select}
                    name="classification_id"
                    aria-label="select classification"
                    required
                    onChange={handleChange}
                    value={formData.classification_id}
                >
                    <option value="">Select Classification</option>
                    <option value="3">Mammal</option>
                    <option value="2">Bird</option>
                    <option value="1">Reptile</option>
                    <option value="5">Amphibian</option>
                    <option value="4">Fish</option>
                </select>
                <button type="submit" className={styles.button}>
                    {status === 'loading' ? 'ADDING...' : 'ADD ANIMAL'}
                </button>
                <button type="button" className={styles.deleteButton}>
                    <FaTrashCan className={styles.deleteIcon} />
                    DELETE ANIMAL
                </button>
            </form>
        </div>
    )
}

export default AddItemForm
