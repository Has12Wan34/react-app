import { configureStore } from '@reduxjs/toolkit';
import { userServices } from '../features/user/userSlice';
import userReducer from '../features/user/userSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

const store = configureStore({
  reducer: {
    users: userReducer,
    user: userReducer,
  },
  
});

store.dispatch(userServices.actions.initializeDataFromLocalStorage());

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>() 
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector 

export default store