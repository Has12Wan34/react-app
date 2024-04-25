import { configureStore } from '@reduxjs/toolkit';
import { userServices } from '../features/user/userSlice';
import userReducer from '../features/user/userSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

// สร้าง store ด้วย reducer
const store = configureStore({
  reducer: {
    user: userReducer
  },
});

// เรียกใช้งาน initializeDataFromLocalStorage เมื่อ store ถูกสร้างขึ้น
store.dispatch(userServices.actions.initializeDataFromLocalStorage());

// กำหนดชนิดของ RootState เป็น ReturnType ของ getState() ของ store
export type RootState = ReturnType<typeof store.getState>

// กำหนดชนิดของ AppDispatch เป็น typeof dispatch ของ store
export type AppDispatch = typeof store.dispatch

// สร้าง hook สำหรับใช้งาน dispatch และ selector ในแอปพลิเคชัน
export const useAppDispatch = () => useDispatch<AppDispatch>() 
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector 

export default store