import { createSlice } from '@reduxjs/toolkit';
import fakeData from '../../db/fakeData.json';

const expenseDataSlice = createSlice({
    name: 'expenseData',
    initialState: {
        items: fakeData, // 처음에 dummy data를 초기값으로 설정
    },
    reducers: {
        addExpenseData: (state, action) => {
            // 새로운 지출 데이터를 배열에 추가합니다.
            state.items.push(action.payload);
        },
        // action.payload에 있는 id와 일치하지 않는 항목을 필터링하여 새로운 배열을 생성해 반환함
        deleteExpenseData: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        updateExpenseData: (state, action) => {
            // 액션 페이로드에서 id와 업데이트된 데이터를 추출합니다.
            const { id, updatedData } = action.payload;
            // 주어진 id에 해당하는 지출 데이터의 인덱스를 찾습니다.
            const index = state.items.findIndex((item) => item.id === id);
            // 인덱스가 유효한 경우에만 데이터를 업데이트합니다.
            if (index !== -1) {
                state.items[index] = { ...state.items[index], ...updatedData };
            }
        },
    },
});

export const { addExpenseData, deleteExpenseData, updateExpenseData } = expenseDataSlice.actions;
export default expenseDataSlice.reducer;
