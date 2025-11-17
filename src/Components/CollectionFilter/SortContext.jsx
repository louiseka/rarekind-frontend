import { createContext, useContext, useState } from 'react'

const SortContext = createContext()

export function SortProvider({ children }) {
    const [sortOrder, setSortOrder] = useState('recent')
    return (
        <SortContext.Provider value={{ sortOrder, setSortOrder }}>
            {children}
        </SortContext.Provider>
    )
}

export function useSort() {
    return useContext(SortContext)
}
