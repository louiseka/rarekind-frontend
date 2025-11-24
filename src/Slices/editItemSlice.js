import makeApiRequest from '../services/apiService'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const editItem = createAsyncThunk(
    'collection/editItem',
    async ({ animalId, updatedData }) => {
        const response = await makeApiRequest(`animals/${animalId}`, {
            method: 'PATCH',
            body: JSON.stringify({ id: animalId, ...updatedData }),
        })
        return response
    }
)

const editItemSlice = createSlice({
    name: 'editItem',
    initialState: {
        item: null,
        collectionId: null,
    },
    reducers: {
        setItemToEdit: (state, action) => {
            state.item = action.payload
        },
        clearItemToEdit: (state) => {
            state.item = null
        },
        setCollectionId: (state, action) => {
            state.collectionId = action.payload
        },
        clearCollectionId: (state) => {
            state.collectionId = null
        },
    },
})

export const {
    setItemToEdit,
    clearItemToEdit,
    setCollectionId,
    clearCollectionId,
} = editItemSlice.actions
export default editItemSlice.reducer
