import styles from './EditItemForm.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { closePopup } from '../../Slices/popupSlice'
import { fetchItemsByCollectionId } from '../../Slices/itemAPISlice'
import {
    clearItemToEdit,
    editItem,
    clearCollectionId,
} from '../../Slices/editItemSlice'

export default function EditItemForm() {
    const dispatch = useDispatch()

    const itemToEdit = useSelector((state) => state.editItem.item)
    const collectionId = useSelector((state) => state.editItem.collectionId)

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image_url: '',
        classification_id: '',
    })

    useEffect(() => {
        if (itemToEdit) {
            setFormData({
                name: itemToEdit.name,
                description: itemToEdit.description,
                image_url: itemToEdit.image_url,
                classification_id: itemToEdit.classification_id,
            })
        }
    }, [itemToEdit])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(
            editItem({
                animalId: itemToEdit.id,
                updatedData: { collection_id: collectionId, ...formData },
            })
        )
        await dispatch(fetchItemsByCollectionId(collectionId))
        dispatch(closePopup())
        dispatch(clearItemToEdit())
        dispatch(clearCollectionId())
    }

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
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Name
                    <input
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
                        placeholder="Enter item description..."
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
                    UPDATE ANIMAL
                </button>
            </form>
        </div>
    )
}
