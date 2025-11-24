import { FaPlus } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import { openPopup } from '../../Slices/popupSlice'
import styles from './AddCollectionButton.module.css'

export default function AddCollectionButton() {
    const dispatch = useDispatch()

    return (
        <button
            className={styles.addCollectionButton}
            onClick={() => dispatch(openPopup('newcollection'))}
        >
            <FaPlus className={styles.addIcon} />
            ADD COLLECTION
        </button>
    )
}
