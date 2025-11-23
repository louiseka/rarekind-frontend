import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import makeApiRequest from '../services/apiService'

export const editCollection = createAsyncThunk(
    'collection/editCollection',
    async ({ formData }) => {
        const response = await makeApiRequest(`collections/${formData.id}`, {
            method: 'PUT',
            body: JSON.stringify(formData),
        })
        console.log(formData.id)
        return response
    }
)

const editCollectionSlice = createSlice({
    name: 'editCollection',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(editCollection.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(editCollection.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload
            })
            .addCase(editCollection.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
    },
})

export default editCollectionSlice.reducer
