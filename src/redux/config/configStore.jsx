import { configureStore } from '@reduxjs/toolkit';
import expenseDataReducer from '../modules/expenseDate';

const store = configureStore({
    reducer: {
        expenseData: expenseDataReducer,
    },
});

export default store;
