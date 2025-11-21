import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import makeApiRequest from '../services/apiService'

export const fetchItemsByCollectionId = createAsyncThunk(
    'items/fetchItemsByCollectionId',
    async (collectionId) => {
        const data = await makeApiRequest(`collections/${collectionId}/animals`)

        // normalize the API response in case data is not an array

        let items = []
        if (Array.isArray(data.animals)) {
            items = data.animals
        }
        return items
    }
)

const itemsAPISlice = createSlice({
    name: 'items',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItemsByCollectionId.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchItemsByCollectionId.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload
            })
            .addCase(fetchItemsByCollectionId.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },
})

export default itemsAPISlice.reducer
