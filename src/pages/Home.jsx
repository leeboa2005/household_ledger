import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseHistory from '../components/ExpenseHistory';
import MonthlyExpense from '../components/MonthlyExpense';
import ExpenseGraph from '../components/ExpenseGraph';
import PropTypes from 'prop-types';

const StyledHome = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Home = ({ expenseData, setExpenseData }) => {
    // 선택된 월과 해당 월을 변경하는 상태와 함수를 생성
    const [selectedMonth, setSelectedMonth] = useState(() => {
        const savedMonth = localStorage.getItem('selectedMonth');
        return savedMonth ? parseInt(savedMonth) : 1; // 로컬 스토리지에 저장된 월을 가져오거나 기본값으로 1월로 설정
    });

    // 월 변경 함수
    const changeMonth = (month) => {
        setSelectedMonth(month); // 선택된 월 상태를 업데이트
        localStorage.setItem('selectedMonth', month.toString()); // 선택된 월을 로컬 스토리지에 저장
    };

    const onExpenseData = (data) => {
        // 이전 지출 데이터 배열에 새로운 데이터를 추가
        setExpenseData((prevData) => [...prevData, data]);
    };

    // 선택된 월에 해당하는 지출 데이터를 필터링
    const filteredExpenseData = expenseData.filter((item) => {
        return new Date(item.date).getMonth() + 1 === selectedMonth;
    });

    // 컴포넌트가 마운트될 때 로컬 스토리지에서 선택된 월을 가져와서 상태에 설정
    useEffect(() => {
        const savedMonth = localStorage.getItem('selectedMonth');
        if (savedMonth) {
            setSelectedMonth(parseInt(savedMonth));
        }
    }, []);

    return (
        <StyledHome>
            {/* 새로운 지출 추가 함수를 받음 */}
            <ExpenseForm onExpenseData={onExpenseData} />
            {/* expenseData 은 모든 지출 데이터 배열, selectedMonth은 현재 선택된 월을 나타냄*/}
            <ExpenseGraph expenseData={expenseData} selectedMonth={selectedMonth} />
            {/* selectedMonth 현재 선택된 월, onChangeMonth 월을 변경할 때 호출 함수 */}
            <MonthlyExpense selectedMonth={selectedMonth} onChangeMonth={changeMonth} />
            {/* 선택된 월에 해당하는 지출 내역 데이터 배열 */}
            <ExpenseHistory expenseData={filteredExpenseData} />
        </StyledHome>
    );
};

Home.propTypes = {
    expenseData: PropTypes.array.isRequired,
    setExpenseData: PropTypes.func.isRequired,
};

export default Home;
