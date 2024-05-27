// ExpenseHistory.jsx

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledHistoryWrap = styled.section`
    width: 100%;
    padding: 20px;
    background-color: var(--grey-color);
    border-radius: var(--default-radius);
    margin-bottom: 30px;

    p.no_expense_msg {
        text-align: center;
        color: var(--font-gray-color);
    }
`;

const StyledHistoryList = styled.ul`
    width: 100%;
    margin: 10px 0;

    li {
        padding: 15px 20px;
        background-color: #fdfdfd;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
    }
    li div {
        width: 80%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    li div p:first-child {
        margin-bottom: 10px;
        font-size: 12px;
        color: var(--font-gray-color);
    }
    li div p:last-child {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
    }
`;

const ExpenseHistory = ({ expenseData }) => {
    const navigate = useNavigate();

    const handleClick = (id) => {
        // 클릭된 지출 항목의 ID를 이용하여 해당 Detail 페이지로 이동
        navigate(`/detail/${id}`);
    };

    return (
        // 지출 내역이 없는 경우 메세지를 표시하고, 있는 경우 지출 항목이 나열됨
        <StyledHistoryWrap>
            {expenseData.length === 0 ? (
                <p className="no_expense_msg">지출내역이 없습니다.</p>
            ) : (
                <StyledHistoryList>
                    {expenseData.map((expense) => (
                        <li key={expense.id} onClick={() => handleClick(expense.id)}>
                            <div>
                                <p>{expense.date}</p>
                                <p>{`${expense.item} - ${expense.description}`}</p>
                            </div>
                            <span>{`${expense.amount} 원`}</span>
                        </li>
                    ))}
                </StyledHistoryList>
            )}
        </StyledHistoryWrap>
    );
};

// prop Type 지정
ExpenseHistory.propTypes = {
    expenseData: PropTypes.array.isRequired,
};

export default ExpenseHistory;
