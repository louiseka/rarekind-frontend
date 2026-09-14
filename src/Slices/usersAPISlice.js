import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import makeApiRequest from '../services/apiService'
import mockUsers from '../data/mockUsers'
import { showToast } from './toastSlice'

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (_, { dispatch }) => {
        try {
            const data = await makeApiRequest('users')
            return { data, isDemo: false }
        } catch (error) {
            console.error(
                'Live API unavailable, showing demo data:',
                error.message
            )
            dispatch(
                showToast(
                    'Showing demo data - live backend is currently unavialble'
                )
            )
            return { data: mockUsers, isDemo: true }
        }
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
                state.items = action.payload.data
                state.isDemo = action.payload.isDemo
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },
})

export default usersAPISlice.reducer
