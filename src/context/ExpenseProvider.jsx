import { createContext, useState } from 'react';
import dummy from '../db/fakeData.json';

// 새로운 컨텍스트 생성 지출데이터 전역으로 관리함
export const ExpenseInfoContext = createContext();

// `children` props을 파라미터로 받음
const ExpenseProvider = ({ children }) => {
    const [expenseData, setExpenseData] = useState(
        // 처음 dummy 데이터를 초기값으로 설정
        dummy.map((expense) => ({
            id: expense.id,
            date: expense.date,
            item: expense.item,
            amount: expense.amount,
            description: expense.description,
        }))
    );

    return (
        //  value prop으로 expenseData와 setExpenseData를 가진 객체를 전달함 그리고 이 컨텍스트 안에 있는 children 컴포넌트들을 렌더링함
        <ExpenseInfoContext.Provider value={{ expenseData, setExpenseData }}>{children}</ExpenseInfoContext.Provider>
    );
};

export default ExpenseProvider;
