import { FaSearch } from 'react-icons/fa'
import { useSearch } from '../CollectionSearch/SearchContext.jsx'
import styles from './UserSearch.module.css'

export default function UserSearch() {
    const { query, setQuery } = useSearch()

    return (
        <div className={styles.searchContainer}>
            <input
                className={styles.searchInput}
                aria-label="Search users"
                name="search"
                id="search"
                type="text"
                placeholder="Search users..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            ></input>

            <FaSearch className={styles.searchButton} />
        </div>
    )
}
