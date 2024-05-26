import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

const ModifyBox = styled.div`
    width: 100%;

    input {
        padding: 8px;
        margin-right: 10px;
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

const Detail = ({ expenseData, setExpenseData }) => {
    const { id } = useParams(); // URL에서 id 피라미터를 가져옴
    const navigate = useNavigate(); // 페이지 이동시 필요한 함수

    const [isEditing, setIsEditing] = useState(false); // 편집 모드 초기값
    const [editedExpense, setEditedExpense] = useState(''); // 수정 모드 초기값

    // 수정 버튼 클릭 시 편집 모드로 전환됨
    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        // id 값이 일치하면 `editedExpense`로 대체한다. 일치하지 않으면 유지함
        const updatedData = expenseData.map((item) => (item.id.toString() === id ? editedExpense : item));
        setExpenseData(updatedData); // setExpenseData 이후에 updatedData를 정의

        setIsEditing(false); // 수정모드 종료됨
        alert(`정상적으로 수정 되었습니다.`);
        navigate('/'); // 수정되고 홈으로 이동됨
    };

    // 취소 버튼 클릭시 수정 모드 종료됨
    const handleCancel = () => {
        setIsEditing(false);
    };

    // 삭제 버튼 클릭 시 해당 지출 내역 삭제
    const handleDelete = () => {
        // 삭제된 내역을 제외한 새로운 지출 내역 배열을 생성
        const updatedData = expenseData.filter((item) => item.id.toString() !== id);
        alert(`정말로 지출 내역을 삭제하시겠습니까?`);
        setExpenseData(updatedData); // 지출 내역 업데이트 됨
        alert(`정상적으로 삭제 되었습니다.`);
        navigate('/'); // 홈 으로 이동
    };

    // 뒤로가기 버튼 틀릭시 이전 페이지로 이동
    const handleBack = () => {
        navigate(-1);
    };

    // 입력 필드 값 변경 시 해당 값을 상태에 반영
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedExpense((prevExpense) => ({ ...prevExpense, [name]: value }));
    };

    // 지출 내역 데이터가 변경되거나 id 파라미터가 변경될 때 실행
    useEffect(() => {
        // id에 해당하는 지출 내역을 찾아 상태에 저장
        const foundExpense = expenseData ? expenseData.find((item) => item.id.toString() === id) : null;
        setEditedExpense(foundExpense); //foundExpense 값으로 업데이트
    }, [expenseData, id]);

    return (
        <StyledDetail>
            {/* 지출 내역이 있으면 내역을 보여주고, 없으면 메시지를 표시 */}
            {editedExpense ? (
                isEditing ? (
                    // 수정 모드일 때
                    <StyledDetailBox key={editedExpense.id}>
                        <ModifyBox>
                            <input type="text" name="date" value={editedExpense.date} onChange={handleChange} />
                            <input type="text" name="item" value={editedExpense.item} onChange={handleChange} />
                            <input
                                type="text"
                                name="description"
                                value={editedExpense.description}
                                onChange={handleChange}
                            />
                            <input type="text" name="amount" value={editedExpense.amount} onChange={handleChange} />
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

// PropType 지정
Detail.propTypes = {
    expenseData: PropTypes.array.isRequired,
    setExpenseData: PropTypes.func.isRequired,
};

export default Detail;
