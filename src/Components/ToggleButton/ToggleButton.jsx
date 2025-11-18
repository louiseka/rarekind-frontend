import { FaSortUp, FaSortDown } from 'react-icons/fa6'
import styles from './ToggleButton.module.css'

export default function ToggleButton({ showContent, handleToggle }) {
    return (
        <button className={styles.showButton} onClick={handleToggle}>
            {!showContent ? (
                <>
                    SEE MORE <FaSortDown />
                </>
            ) : (
                <>
                    SEE LESS <FaSortUp />
                </>
            )}
        </button>
    )
}
