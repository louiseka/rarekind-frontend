import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import makeApiRequest from '../services/apiService'

export const addCollection = createAsyncThunk(
    'collection/addCollection',
    async ({ updatedData }) => {
        const response = await makeApiRequest(
            `collections`,
            {
                method: 'POST',
                body: JSON.stringify(updatedData),
            }
        )
        return response
    }
)

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

const addCollectionSlice = createSlice({
    name: 'addCollection',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addCollection.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(addCollection.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload
            })
            .addCase(addCollection.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
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

export default addCollectionSlice.reducer