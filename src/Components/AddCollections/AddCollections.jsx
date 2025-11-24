
import styles from './AddCollections.module.css'
import { FaInbox } from 'react-icons/fa6'

export default function AddCollections() {
    return (
        <section className={styles.wrapper}>
            <div className={styles.noItemsContainer}>
                <FaInbox className={styles.inboxIcon} />
                <p className={styles.textBold}>No collections added, yet</p>
                <p className={styles.textLight}>
                    Would you like to add one now?
                </p>
            </div>
        </section>
    )
}