import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Users, userInitialStateType } from '../../models/form';

// สร้าง initialState เริ่มต้นสำหรับสถานะ
const initialState : userInitialStateType = {
    users: [],
    user: null,
    status: 'idle',
    error: null
};

// สร้างฟังก์ชันสำหรับดึงข้อมูลผู้ใช้
export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (id:string) => {
        const job = new Promise<string>((resolve, reject) => {
            setTimeout(() => {
              if (id) {
                resolve(id);
              } else {
                reject(Error("id required"));
              }
            }, 1000);
          });
        return await job;
    }
);

// สร้างฟังก์ชันสำหรับแก้ไขข้อมูลผู้ใช้
export const editUser = createAsyncThunk(
    'user/editUser',
    async (body:Users) => {
        const job = new Promise<Users>((resolve, reject) => {
            setTimeout(() => {
              if (body && Object.keys(body).length > 0) {
                resolve(body);
              } else {
                reject(Error("body required"));
              }
            }, 1000);
          });
        return await job;
    }
);

// สร้างฟังก์ชันสำหรับเพิ่มผู้ใช้ใหม่
export const addUser = createAsyncThunk(
    'user/addUser',
    async (body:Users) => {
        const job = new Promise<Users>((resolve, reject) => {
            setTimeout(() => {
              if (body && Object.keys(body).length > 0) {
                const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
                body.key = id;
                resolve(body);
              } else {
                reject(Error("body required"));
              }
            }, 1000);
          });
        return await job;
    }
);

// สร้างฟังก์ชันสำหรับลบผู้ใช้
export const removeUser = createAsyncThunk(
    'user/removeUser',
    async (arr:React.Key[]) => {
        return arr;
    }
);

// สร้าง Slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // ฟังก์ชันเพื่อกำหนดค่าข้อมูลจาก Local Storage เมื่อโหลดแอปพลิเคชัน
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
     // การจัดการผลลัพธ์ของฟังก์ชันที่สร้างขึ้นด้วย createAsyncThunk
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
            const user = state.users.find((item: Users) => item.key === action.payload)
            localStorage.setItem('user', JSON.stringify(user));
            state.user = user;
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
            localStorage.setItem('user', JSON.stringify(state.users[targetIndex]));
            localStorage.setItem('users', JSON.stringify(state.users));
        })
        builder.addCase(editUser.rejected, (state:any, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
});

// สร้างการบริการสำหรับใช้งาน Slice
export const userServices = {
    actions: userSlice.actions, 
};

// สร้าง Reducer
const userReducer = userSlice.reducer 
export default userReducer