import { createSlice } from '@reduxjs/toolkit'

const navbarSlice = createSlice({
    name: 'navbar',
    initialState: {
        collectionName: null,
    },
    reducers: {
        setCollectionName(state, action) {
            state.collectionName = action.payload
        },
        clearCollectionName(state) {
            state.collectionName = null
        },
    },
})

export const { setCollectionName, clearCollectionName } = navbarSlice.actions
export default navbarSlice.reducer