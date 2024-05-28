import { createSlice } from '@reduxjs/toolkit';
import fakeData from '../../db/fakeData.json';

const expenseDataSlice = createSlice({
    name: 'expenseData',
    initialState: {
        items: fakeData,
    },
    reducers: {
        addExpenseData: (state, action) => {
            state.items.push(action.payload);
        },
        deleteExpenseData: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        updateExpenseData: (state, action) => {
            const { id, updatedData } = action.payload;
            const index = state.items.findIndex((item) => item.id === id);
            if (index !== -1) {
                state.items[index] = { ...state.items[index], ...updatedData };
            }
        },
    },
});

export const { addExpenseData, deleteExpenseData, updateExpenseData } = expenseDataSlice.actions;
export default expenseDataSlice.reducer;
