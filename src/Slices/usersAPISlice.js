import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import makeApiRequest from '../services/apiService'

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        const data = await makeApiRequest('users')
        return data
    }
)

const usersAPISlice = createSlice({
    name: 'users',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },
})

export default usersAPISlice.reducer