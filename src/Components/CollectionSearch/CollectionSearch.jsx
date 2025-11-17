import { FaSearch } from 'react-icons/fa'
import { useSearch } from './SearchContext.jsx'
import styles from './CollectionSearch.module.css'

export default function CollectionSearch() {
    const { query, setQuery } = useSearch()

    return (
        <div className={styles.searchContainer}>
            <input
                className={styles.searchInput}
                aria-label="Search collections"
                name="search"
                id="search"
                type="text"
                placeholder="Search collections..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            ></input>

            <FaSearch className={styles.searchButton} />
        </div>
    )
}
