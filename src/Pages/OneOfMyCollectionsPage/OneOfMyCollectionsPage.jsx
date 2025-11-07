import styles from './OneOfMyCollectionsPage.module.css'

function OneOfMyCollectionsPage() {
    return (
        <section className={styles.wrapper}>
            <div className={styles.collectionContainer}>
                <h2>Title of Collection </h2>
                <div className={styles.descriptionContainer}>
                    <h3>Description</h3>
                    <p>
                        Additional info filled up by the user when creating
                        collection. This text could be quite long so we don't
                        want it to be in a narrow column.
                    </p>
                </div>
                <div className={styles.additionalContainer}>
                    <h3>Additional</h3>
                    <p>
                        Additional info filled up by the user when creating
                        collection. This text could be quite long so we don't
                        want it to be in a narrow column.
                    </p>
                </div>
                <div className={styles.tagsContainer}>
                    <h3>Tags</h3>
                    <ul className={styles.tagList}>
                        <li className={styles.tag}>Tag</li>
                        <li className={styles.tag}>Tag</li>
                    </ul>
                </div>
                <div className={styles.statusContainer}>
                    <p className={styles.statusDetails}>
                        <span className={styles.statusTitle}>Created:</span>{' '}
                        Today at
                        <time dateTime="14:00"> 2:00pm</time>
                    </p>
                    <p className={styles.statusDetails}>
                        <span className={styles.statusTitle}>
                            Last updated:
                        </span>{' '}
                        Today at
                        <time dateTime="14:00"> 2:00pm</time>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default OneOfMyCollectionsPage
