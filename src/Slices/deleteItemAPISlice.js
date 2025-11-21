import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import makeApiRequest from '../services/apiService'

export const deleteItem = createAsyncThunk(
    'collection/deleteItem',
    async (animalId) => {
        const response = await makeApiRequest(`animals/${animalId}`, {
            method: 'DELETE',
        })
        return response
    }
)

const deleteItemSlice = createSlice({
    name: 'deleteItem',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
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

export default deleteItemSlice.reducer
