import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ExpenseInfoContext } from '../context/ExpenseProvider';

const StyledDetail = styled.div`
    margin-top: 30px;
`;

const StyledDetailBox = styled.div`
    padding: 30px;
    background-color: #f8f8f8;
    border-radius: var(--default-radius);
    border: var(--border-style);
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const InfoBox = styled.div`
    width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    p:first-child {
        margin-bottom: 10px;
        font-size: 12px;
        color: var(--font-gray-color);
    }

    p:last-child {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
    }
`;

const ModifyBox = styled.form`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;

    fieldset {
        display: flex;
        flex-direction: column;
        flex: 1 1 0%;
        min-width: 120px;
    }

    label {
        margin-bottom: 5px;
        font-weight: var(--font-bold);
        display: block;
    }

    input {
        padding: 8px;
        margin-bottom: 10px;
        border: var(--border-style);
        border-radius: var(--default-radius-2);

        @media only screen and (max-width: 1068px) {
            margin-bottom: 10px;
        }

        @media only screen and (max-width: 734px) {
            width: 100%;
        }
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
    margin: 20px 0 40px 0;

    button {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        color: var(--font-white-color);
    }

    .edit {
        background-color: #1bc9a6;
    }

    .delete {
        background-color: #67b0b6;
    }

    .back {
        background-color: #91cfec;
    }

    .save {
        background-color: #1bc9a6;
    }

    .cancel {
        background-color: #91cfec;
    }
`;

const Detail = () => {
    const { expenseData, setExpenseData } = useContext(ExpenseInfoContext);
    const { id } = useParams(); // URL에서 id 파라미터를 가져옴
    const navigate = useNavigate(); // 페이지 이동시 필요한 함수

    const [isEditing, setIsEditing] = useState(false); // 편집 모드 초기값
    const [editedExpense, setEditedExpense] = useState({ date: '', item: '', description: '', amount: 0 });

    // 수정 버튼 클릭 시 편집 모드로 전환됨
    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        if (!editedExpense.date || !editedExpense.item || !editedExpense.description || !editedExpense.amount) {
            alert('입력창을 모두 입력해주세요.');
            return;
        }

        // 금액이 0 이하인지 확인
        if (Number(editedExpense.amount) <= 0) {
            alert('금액은 0보다 커야 합니다.');
            return;
        }

        // id 값이 일치하면 `editedExpense`로 대체한다. 일치하지 않으면 유지함
        const updatedData = expenseData.map((item) => (item.id.toString() === id ? editedExpense : item));
        setExpenseData(updatedData); // setExpenseData 이후에 updatedData를 정의
        setIsEditing(false); // 수정모드 종료됨
        alert(`정상적으로 수정 되었습니다.`);
        navigate('/'); // 수정되고 홈으로 이동됨
    };

    // 취소 버튼 클릭시 수정 모드 종료됨
    const handleCancel = () => {
        // 수정 중인 내용을 초기값으로 되돌리기 위해 원래의 내용을 재설정
        const originalExpense = expenseData.find((item) => item.id.toString() === id);
        setEditedExpense(originalExpense);
        setIsEditing(false);
    };

    // 삭제 버튼 클릭 시 해당 지출 내역 삭제
    const handleDelete = () => {
        // 삭제 전 확인을 위한 확인 대화상자를 띄웁니다.
        const confirmed = confirm('정말 삭제하시겠습니까? 😮');
        if (confirmed) {
            // 삭제가 확인되면
            alert('삭제되었습니다. 👋');
            // 선택한 ID와 일치하지 않는 지출 항목들로 업데이트된 데이터를 필터링합니다.
            const updatedData = expenseData.filter((item) => item.id.toString() !== id);
            setExpenseData(updatedData);
            // 삭제 후 홈 페이지로 이동합니다.
            navigate('/');
        } else {
            // 삭제가 취소된 경우
            alert('취소 되었습니다.');
        }
    };

    // 뒤로가기 버튼 클릭시 이전 페이지로 이동
    const handleBack = () => {
        navigate(-1);
    };

    // 입력 필드 값 변경 시 해당 값을 상태에 반영
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedExpense((prevExpense) => ({
            ...prevExpense,
            [name]: name === 'amount' ? (value ? parseInt(value) : '') : value.toString(),
        }));
    };
    // 지출 내역 데이터가 변경되거나 id 파라미터가 변경될 때 실행
    useEffect(() => {
        // id에 해당하는 지출 내역을 찾아 상태에 저장
        const foundExpense = expenseData ? expenseData.find((item) => item.id.toString() === id) : null;
        setEditedExpense(foundExpense ? { ...foundExpense } : { date: '', item: '', description: '', amount: 0 });
    }, [expenseData, id]);

    return (
        <StyledDetail>
            {/* 지출 내역이 있으면 내역을 보여주고, 없으면 메시지를 표시 */}
            {editedExpense ? (
                isEditing ? (
                    // 수정 모드일 때
                    <StyledDetailBox key={editedExpense.id}>
                        <ModifyBox>
                            <fieldset>
                                <label htmlFor="date">날짜</label>
                                <input
                                    type="date"
                                    name="date"
                                    placeholder="YYYY-MM-DD"
                                    value={editedExpense.date}
                                    onChange={handleChange}
                                />
                            </fieldset>
                            <fieldset>
                                <label htmlFor="item">항목</label>
                                <input
                                    type="text"
                                    name="item"
                                    placeholder="지출 항목"
                                    value={editedExpense.item}
                                    onChange={handleChange}
                                />
                            </fieldset>
                            <fieldset>
                                <label htmlFor="amount">금액</label>
                                <input
                                    type="number"
                                    name="amount"
                                    placeholder="지출 금액"
                                    value={editedExpense.amount}
                                    onChange={handleChange}
                                />
                            </fieldset>
                            <fieldset>
                                <label htmlFor="description">내용</label>

                                <input
                                    type="text"
                                    name="description"
                                    placeholder="지출 내용"
                                    value={editedExpense.description}
                                    onChange={handleChange}
                                />
                            </fieldset>
                        </ModifyBox>
                    </StyledDetailBox>
                ) : (
                    // 수정 모드가 아닐 때
                    <StyledDetailBox key={editedExpense.id}>
                        <InfoBox>
                            <p>{editedExpense.date}</p>
                            <p>{`${editedExpense.item} - ${editedExpense.description}`}</p>
                        </InfoBox>
                        <span>{`${editedExpense.amount} 원`}</span>
                    </StyledDetailBox>
                )
            ) : (
                <h2>항목을 찾을 수 없습니다.</h2>
            )}

            {/* 수정 모드 여부에 따라 다른 버튼 그룹을 렌더링 */}
            <ButtonGroup>
                {isEditing ? (
                    // 수정 모드일 때 저장 및 취소 버튼 표시
                    <>
                        <button className="save" onClick={handleSave}>
                            저장
                        </button>
                        <button className="cancel" onClick={handleCancel}>
                            취소
                        </button>
                    </>
                ) : (
                    // 수정 모드가 아닐 때 수정, 삭제, 뒤로가기 버튼 표시
                    <>
                        <button className="edit" onClick={handleEdit}>
                            수정
                        </button>
                        <button className="delete" onClick={handleDelete}>
                            삭제
                        </button>
                        <button className="back" onClick={handleBack}>
                            뒤로가기
                        </button>
                    </>
                )}
            </ButtonGroup>
        </StyledDetail>
    );
};

export default Detail;
