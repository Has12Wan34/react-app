import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface userInitialStateType {
    users: Users[] | null | undefined | [],
    user: Users | {} | null | undefined,
    status: string | null | undefined;
    error: string | null | undefined;
};

interface Users {
    prefix: string;
    fname: string;
    lname: string;
    passport: string;
    amount: number | null;
    gender: string;
    nationality: string;
    birthdate: string;
}

const initialState : userInitialStateType = {
    users: [],
    user: {},
    status: 'idle',
    error: null
};

// export const fetchTravels = createAsyncThunk(
// 'travel/fetchTravels',
// async (config) => {
//     const res = await travelAPI.get('/api/travels', config);
//     return res.data;
// }
// );

// export const fetchTravelsById = createAsyncThunk(
// 'travel/fetchTravelsById',
// async (config) => {
//     const { id } = config;
//     const res = await travelAPI.get(`/api/travel/${id}`);
//     return res.data;
// }
// );

// export const fetchSearchTravels = createAsyncThunk(
// 'travel/fetchSearchTravels',
// async (config) => {
//     const res = await travelAPI.get('/api/travels/search', config);
//     return res.data;
// }
// );

export const addUser = createAsyncThunk(
    'user/addUser',
    async (body:Users) => {
        return body;
    }
);

// export const editTravel = createAsyncThunk(
// 'travel/editTravel',
// async (config) => {
//     const { id, body } = config;
//     const res = await travelAPI.put(`/api/travel/${id}`, body);
//     return res.data;
// }
// );

// export const removeTravel = createAsyncThunk(
// 'travel/removeTravel',
// async (config) => {
//     const { id } = config;
//     const res = await travelAPI.delete(`/api/travel/${id}`);
//     return res.data;
// }
// );

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        initializeDataFromLocalStorage: (state) => {
            const users = localStorage.getItem('users');
            if (users) {
              state.users = JSON.parse(users);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addUser.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(addUser.fulfilled, (state:any, action) => {
            state.status = 'succeeded';
            localStorage.setItem('users', JSON.stringify([action.payload, ...state.users]));
            state.users = [action.payload, ...state.users];
        })
        builder.addCase(addUser.rejected, (state:any, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
    //extraReducers: {
        // [addUser.pending]: (state) => {
        // state.status = 'loading';
        // },
        // [addUser.fulfilled]: (state, action) => {
        // state.status = 'succeeded';
        // state.travels = [action.payload, ...state.travels];
        // },
        // [addUser.rejected]: (state, action) => {
        // state.status = 'failed';
        // state.error = action.error.message;
        // },
        // [editTravel.pending]: (state) => {
        // state.status = 'loading';
        // },
        // [editTravel.fulfilled]: (state, action) => {
        // state.status = 'succeeded';
        // const index = state.travels.findIndex(item => item.id === action.payload.id);
        // if (index !== -1) {
        //     state.travels[index] = action.payload;
        // }
        // },
        // [editTravel.rejected]: (state, action) => {
        // state.status = 'failed';
        // state.error = action.error.message;
        // },
        // [fetchTravels.pending]: (state) => {
        // state.status = 'loading';
        // },
        // [fetchTravels.fulfilled]: (state, action) => {
        // state.status = 'succeeded';
        // state.travels = action.payload;
        // },
        // [fetchTravels.rejected]: (state, action) => {
        // state.status = 'failed';
        // state.error = action.error.message;
        // },
        // [fetchSearchTravels.pending]: (state) => {
        // state.status = 'loading';
        // },
        // [fetchSearchTravels.fulfilled]: (state, action) => {
        // state.status = 'succeeded';
        // state.travels = action.payload;
        // },
        // [fetchSearchTravels.rejected]: (state, action) => {
        // state.status = 'failed';
        // state.error = action.error.message;
        // },
        // [fetchTravelsById.pending]: (state) => {
        // state.status = 'loading';
        // },
        // [fetchTravelsById.fulfilled]: (state, action) => {
        // state.status = 'succeeded';
        // state.travel = action.payload;
        // },
        // [fetchTravelsById.rejected]: (state, action) => {
        // state.status = 'failed';
        // state.error = action.error.message;
        // },
        // [removeTravel.pending]: (state) => {
        // state.status = 'loading';
        // },
        // [removeTravel.fulfilled]: (state, action) => {
        // state.status = 'succeeded';
        // state.travels = action.payload;
        // },
        // [removeTravel.rejected]: (state, action) => {
        // state.status = 'failed';
        // state.error = action.error.message;
        // },
    //}
});

export const userServices = {
    actions: userSlice.actions, 
};

const userReducer = userSlice.reducer 
export default userReducer