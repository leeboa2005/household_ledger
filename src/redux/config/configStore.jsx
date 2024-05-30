import { configureStore } from '@reduxjs/toolkit';
import expenseDataReducer from '../modules/expenseDataSlice';

//configureStore 함수를 사용하여 Redux 스토어를 설정
const store = configureStore({
    reducer: {
        expenseData: expenseDataReducer,
    },
});

export default store;
