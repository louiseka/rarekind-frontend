import styles from './CollectionFilter.module.css'
import { useSort } from './SortContext'

export default function CollectionFilter() {
    const { sortOrder, setSortOrder } = useSort()

    return (
        <div className={styles.filterWrapper}>
            <select
                className={styles.filter}
                aria-label="Sort items by"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
            >
                <option value="most-recent">Most Recent</option>
                <option value="title-a-z">Title (A-Z)</option>
                <option value="title-z-a">Title (Z-A)</option>
            </select>
        </div>
    )
}
