import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface userInitialStateType {
    users: Users[] | undefined | [];
    user: Users | null;
    status: string | null | undefined;
    error: string | null | undefined;
};

interface Users {
    key: string;
    prefix: string;
    fname: string;
    lname: string;
    passport: string | undefined;
    phonenumber: string;
    cardnumber: string;
    salary: number | null;
    gender: string;
    nationality: string;
    birthdate: string;
}

const initialState : userInitialStateType = {
    users: [],
    user: null,
    status: 'idle',
    error: null
};

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (body:Users) => {
        return body;
    }
);

export const editUser = createAsyncThunk(
    'user/editUser',
    async (body:Users) => {
        return body;
    }
);

export const addUser = createAsyncThunk(
    'user/addUser',
    async (body:Users) => {
        const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
        body.key = id;
        return body;
    }
);

export const removeUser = createAsyncThunk(
    'user/removeUser',
    async (arr:React.Key[]) => {
        return arr;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        initializeDataFromLocalStorage: (state) => {
            const users = localStorage.getItem('users');
            const user = localStorage.getItem('user');
            if (users) {
              state.users = JSON.parse(users);
            }
            if (user) {
                state.user = JSON.parse(user);
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
        builder.addCase(removeUser.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(removeUser.fulfilled, (state:any, action) => {
            state.status = 'succeeded';
            const newUsers = state.users.filter((item: Users) => !action.payload.includes(item?.key));
            localStorage.setItem('users', JSON.stringify(newUsers));
            state.users = newUsers;
        })
        builder.addCase(removeUser.rejected, (state:any, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        builder.addCase(fetchUser.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(fetchUser.fulfilled, (state:any, action) => {
            state.status = 'succeeded';
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.user = action.payload;
        })
        builder.addCase(fetchUser.rejected, (state:any, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        builder.addCase(editUser.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(editUser.fulfilled, (state:any, action) => {
            state.status = 'succeeded';
            const targetIndex = state.users.findIndex((item: Users) => item.key === action.payload.key);
            state.users[targetIndex].prefix = action.payload.prefix;
            state.users[targetIndex].fname = action.payload.fname;
            state.users[targetIndex].lname = action.payload.lname;
            state.users[targetIndex].birthdate = action.payload.birthdate;
            state.users[targetIndex].nationality = action.payload.nationality;
            state.users[targetIndex].cardnumber = action.payload.cardnumber;
            state.users[targetIndex].passport = action.payload.passport;
            state.users[targetIndex].phonenumber = action.payload.phonenumber;
            state.users[targetIndex].salary = action.payload.salary;
            state.users[targetIndex].gender = action.payload.gender;
        })
        builder.addCase(editUser.rejected, (state:any, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
});

export const userServices = {
    actions: userSlice.actions, 
};

const userReducer = userSlice.reducer 
export default userReducer