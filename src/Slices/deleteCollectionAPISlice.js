import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import makeApiRequest from '../services/apiService'

export const deleteCollection = createAsyncThunk(
    'collection/deleteCollection',
    async ({ collectionId }) => {
        const response = await makeApiRequest(
            `collections/${collectionId}`,
            {
                method: 'DELETE',
            }
        )
        return response
    }
)

const deleteCollectionSlice = createSlice({
    name: 'deleteCollection',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteCollection.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(deleteCollection.fulfilled, (state) => {
                state.status = 'succeeded'
            })
            .addCase(deleteCollection.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
    },
})

export default deleteCollectionSlice.reducer