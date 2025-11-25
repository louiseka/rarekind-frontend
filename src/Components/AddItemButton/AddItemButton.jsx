import { FaPlus } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import { openPopup } from '../../Slices/popupSlice'
import styles from './AddItemButton.module.css'

export default function AddItemButton() {
    const dispatch = useDispatch()

    return (
        <button
            className={styles.addItemButton}
            onClick={() => dispatch(openPopup('additem'))}
        >
            <FaPlus />
            ADD ANIMAL
        </button>
    )
}
