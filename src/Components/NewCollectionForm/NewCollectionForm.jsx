import styles from './NewCollectionForm.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { closePopup } from '../../Slices/popupSlice'
import { use, useState } from 'react'
import { addCollection } from '../../Slices/addCollectionAPISlice'
import { fetchCollections } from '../../Slices/collectionAPISlice'
import { useNavigate } from 'react-router-dom' 

function NewCollectionForm() {
    const dispatch = useDispatch()
    const status = useSelector((state) => state.addCollection.status)
    const [errorMessage, setErrorMessage] = useState('')
    const user = useSelector((state) => state.auth.user)?.id
    const [formData, setFormData] = useState({
        user_id: user,
        name: '',
        description: '',
    })


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage('')
        try {
            await dispatch(addCollection({ formData })).unwrap()
            console.log('Collection added successfully')
            await dispatch(fetchCollections()).unwrap()
            dispatch(closePopup())
        } catch (error) {
            console.error('Error adding collection:', error)
            setErrorMessage(error.message || 'Failed to create collection')
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
            <h2>New Collection</h2>
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
                    {status === 'loading' ? 'CREATING...' : 'CREATE COLLECTION'}
                </button>
            </form>
        </div>
    )
}

export default NewCollectionForm
