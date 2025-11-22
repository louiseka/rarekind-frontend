import AddItemButton from '../AddItemButton/AddItemButton'
import styles from './AddItems.module.css'
import authService from '../../services/authService'
import { FaInbox } from 'react-icons/fa6'

export default function AddItems() {
    const user = authService.getUser()?.id
    return (
        <section className={styles.wrapper}>
            <div className={styles.noItemsContainer}>
                <FaInbox className={styles.inboxIcon} />
                <p className={styles.textBold}>No items added, yet</p>
                <p className={styles.textLight}>
                    Would you like to add one now?
                </p>
                <AddItemButton />
            </div>
        </section>
    )
}
