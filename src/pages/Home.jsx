import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseHistory from '../components/ExpenseHistory';
import MonthlyExpense from '../components/MonthlyExpense';
import ExpenseGraph from '../components/ExpenseGraph';

const StyledHome = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Home = ({ expenseData, setExpenseData }) => {
    // 선택된 월을 상태로 관리
    const [selectedMonth, setSelectedMonth] = useState(() => {
        const savedMonth = localStorage.getItem('selectedMonth');
        return savedMonth ? parseInt(savedMonth) : 1; // 로컬 스토리지에 저장된 월을 가져오거나 기본값으로 1월 설정
    });

    // 월 변경 함수
    const changeMonth = (month) => {
        setSelectedMonth(month); // 선택된 월 상태 업데이트
        localStorage.setItem('selectedMonth', month.toString()); // 선택된 월을 로컬 스토리지에 저장
    };

    // 새로운 지출 추가 함수
    const onExpenseData = (data) => {
        setExpenseData((prevData) => [...prevData, data]); // 이전 지출 데이터 배열에 새로운 데이터 추가
    };

    // 선택된 월에 해당하는 지출 내역 필터링
    const filteredExpenseData = expenseData.filter((item) => new Date(item.date).getMonth() + 1 === selectedMonth);

    // 컴포넌트가 마운트될 때 로컬 스토리지에서 선택된 월을 가져와서 상태에 설정
    useEffect(() => {
        const savedMonth = localStorage.getItem('selectedMonth');
        if (savedMonth) setSelectedMonth(parseInt(savedMonth));
    }, []);

    return (
        <StyledHome>
            {/* 새로운 지출 추가 컴포넌트 */}
            <ExpenseForm onExpenseData={onExpenseData} />
            {/* 모든 지출 데이터 배열과 현재 선택된 월을 props로 전달 */}
            <ExpenseGraph expenseData={expenseData} selectedMonth={selectedMonth} />
            {/* 현재 선택된 월과 월 변경 함수를 props로 전달 */}
            <MonthlyExpense selectedMonth={selectedMonth} onChangeMonth={changeMonth} />
            {/* 선택된 월에 해당하는 지출 내역을 props로 전달 */}
            <ExpenseHistory expenseData={filteredExpenseData} />
        </StyledHome>
    );
};

// Home 컴포넌트의 prop 타입 지정
Home.propTypes = {
    expenseData: PropTypes.array.isRequired, // 지출 데이터 배열
    setExpenseData: PropTypes.func.isRequired, // 지출 데이터 업데이트 함수
};

export default Home;
