import styles from './EditCollectionForm.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { closePopup } from '../../Slices/popupSlice'
import { useState } from 'react'
import { editCollection } from '../../Slices/editCollectionAPISlice'
import { fetchCollections } from '../../Slices/collectionAPISlice'


function EditCollectionForm() {
    const dispatch = useDispatch()
    const status = useSelector((state) => state.editCollection.status)
    const [errorMessage, setErrorMessage] = useState('')
    const user = useSelector((state) => state.auth.user)?.id
    const id = window.location.pathname.split('/')[2]
    const [formData, setFormData] = useState({
        id: id,
        user_id: user,
        name: '',
        description: '',
    })
    console.log('Editing collection with data:', formData)
    console.log(formData.id)
    console.log('Collection ID:', id)
    console.log('User ID:', user)

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
                        placeholder="Enter collection title..."
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