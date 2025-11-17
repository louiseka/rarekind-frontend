import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiService from '../services/apiService'

export const addItem = createAsyncThunk(
    'collection/addItem',
    async ({ collectionId, updatedData }) => {
        const response = await apiService(
            `collections/${collectionId}/items`,
            {
                method: 'POST',
                body: JSON.stringify(updatedData),
            }
        )
        return response
    }
)

export const deleteItem = createAsyncThunk(
    'collection/deleteItem',
    async ({ collectionId, itemId }) => {
        const response = await apiService(
            `collections/${collectionId}/items/${itemId}`,
            {
                method: 'DELETE',
            }
        )
        return response
    }
)

const addItemSlice = createSlice({
    name: 'addItem',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addItem.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(addItem.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload
            })
            .addCase(addItem.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
            .addCase(deleteItem.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(deleteItem.fulfilled, (state) => {
                state.status = 'succeeded'
            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
    },
})

export default addItemSlice.reducer