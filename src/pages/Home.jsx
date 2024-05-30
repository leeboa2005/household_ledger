import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpenseData } from '../redux/modules/expenseDataSlice';
import styled from 'styled-components';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseHistory from '../components/ExpenseHistory';
import MonthlyExpense from '../components/MonthlyExpense';
import ExpenseGraph from '../components/ExpenseGraph';

const StyledHome = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Home = () => {
    const dispatch = useDispatch(); // Redux store에서 지출 데이터를 가져옴
    const expenseData = useSelector((state) => state.expenseData.items);

    // 새로운 지출 데이터를 Redux store에 추가하는 함수
    const onExpenseData = (data) => {
        dispatch(addExpenseData(data));
    };

    // 선택된 월과 해당 월을 변경하는 상태와 함수를 생성
    const [selectedMonth, setSelectedMonth] = useState(() => {
        const savedMonth = localStorage.getItem('selectedMonth');
        return savedMonth ? parseInt(savedMonth) : 1;
    });

    // 월 변경 함수
    const onchangeMonth = (month) => {
        setSelectedMonth(month);
        localStorage.setItem('selectedMonth', month.toString());
    };

    // 선택된 월에 해당하는 지출 데이터를 필터링
    const filteredExpenseData = expenseData.filter((item) => {
        return new Date(item.date).getMonth() + 1 === selectedMonth;
    });

    return (
        <StyledHome>
            {/* 새로운 지출 추가 함수를 받음 */}
            <ExpenseForm onExpenseData={onExpenseData} />
            {/* expenseData 은 모든 지출 데이터 배열, selectedMonth은 현재 선택된 월을 나타냄*/}
            <ExpenseGraph expenseData={expenseData} selectedMonth={selectedMonth} />
            {/* selectedMonth 현재 선택된 월, onChangeMonth 월을 변경할 때 호출 함수 */}
            <MonthlyExpense selectedMonth={selectedMonth} onChangeMonth={onchangeMonth} />
            {/* 선택된 월에 해당하는 지출 내역 데이터 배열 */}
            <ExpenseHistory expenseData={filteredExpenseData} />
        </StyledHome>
    );
};

export default Home;
