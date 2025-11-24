import styles from './EditCollectionForm.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { closePopup } from '../../Slices/popupSlice'
import { useState, useEffect } from 'react'
import { editCollection } from '../../Slices/editCollectionAPISlice'
import { fetchCollections } from '../../Slices/collectionAPISlice'


function EditCollectionForm() {
    const dispatch = useDispatch()
    const status = useSelector((state) => state.editCollection.status)
    const [errorMessage, setErrorMessage] = useState('')
    const id = window.location.pathname.split('/')[2]
    const collections = useSelector((state) => state.collections.items)
    const collectionToEdit = collections.find(
        (collection) => collection.id === parseInt(id)
    )
    const [formData, setFormData] = useState({
        id: id,
        name: '',
        description: '',
    })

    useEffect(() => {
        if (collectionToEdit) {
            setFormData({
                id: collectionToEdit.id,
                name: collectionToEdit.name,
                description: collectionToEdit.description,
            })
        }
    }, [collectionToEdit])
   

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage('')
        try {
            await dispatch(editCollection({ formData })).unwrap()
            console.log('Collection edited successfully')
            await dispatch(fetchCollections()).unwrap()
            dispatch(closePopup())
        } catch (error) {
            console.error('Error editing collection:', error)
            setErrorMessage(error.message || 'Failed to edit collection')
        }
    }

    return (
        <div className={styles.wrapper}>
            <button
                onClick={() => dispatch(closePopup())}
                className={styles.close}
                aria-label="Close New Collection Form"
            >
                X
            </button>
            <h2>Edit Collection</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Title
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter title..."
                        className={styles.title}
                        required
                        onChange={handleChange}
                        value={formData.name}
                    />
                </label>
                <label className={styles.label}>
                    Description
                    <textarea
                        type="text"
                        name="description"
                        placeholder="Enter description..."
                        className={styles.description}
                        required
                        value={formData.description}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit" className={styles.button}>
                    {status === 'loading' ? 'EDITING...' : 'EDIT COLLECTION'}
                </button>
            </form>
        </div>
    )
}

export default EditCollectionForm