import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledMonthlyWrap = styled.section`
    width: 100%;
    background-color: #fff;
    margin: 20px 0;
    padding: 20px 0;
    border-radius: 16px;
`;

const StyledMonthlyBtnWrap = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 120px);
    justify-content: space-evenly;
    gap: 20px;
`;

const StyledMonthlyBtn = styled.div`
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    display: flex;
    height: 60px;
    padding: 20px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    color: #000;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    background-color: ${(props) =>
        props.$active ? '#91cfec' : '#f6f7fa'}; // 활성화 됬을때 #91cfec , 비활성화 됬을떄 #f6f7fa
`;

const MonthlyExpense = ({ selectedMonth, onChangeMonth }) => {
    const monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; // 월
    const [activeMonth, setActiveMonth] = useState(selectedMonth); // 부모 컴포넌트로 부터 받은 선택된 월 상태관리

    useEffect(() => {
        onChangeMonth(activeMonth); // 선택된 월이 변경될 때마다 부모 컴포넌트로 선택된 월을 전달하고 로컬 스토리지에 저장한다.
        localStorage.setItem('selectedMonth', activeMonth.toString());
    }, [activeMonth, onChangeMonth]);

    return (
        <StyledMonthlyWrap>
            <StyledMonthlyBtnWrap>
                {/* 1 ~ 12월 버튼생성 */}
                {monthArr.map((month) => (
                    // 선택된 월에 따라 활성, 비활성 스타일 적용 클릭시 해당 월로 이동
                    <StyledMonthlyBtn key={month} $active={activeMonth === month} onClick={() => setActiveMonth(month)}>
                        {month}월
                    </StyledMonthlyBtn>
                ))}
            </StyledMonthlyBtnWrap>
        </StyledMonthlyWrap>
    );
};

MonthlyExpense.propTypes = {
    selectedMonth: PropTypes.number.isRequired,
    onChangeMonth: PropTypes.func.isRequired,
};

export default MonthlyExpense;
