import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// 항목별 아이콘들
import { IoFastFoodOutline } from 'react-icons/io5';
import { IoBookOutline } from 'react-icons/io5';
import { PiHairDryer } from 'react-icons/pi';
import { LuCandy } from 'react-icons/lu';
import { MdTravelExplore } from 'react-icons/md';
import { MdCastForEducation } from 'react-icons/md';
import { BiDumbbell } from 'react-icons/bi';
import { GiRolledCloth } from 'react-icons/gi';
import { FaRocketchat } from 'react-icons/fa'; // 기타 아이콘

const COLORS = ['#93cde9', '#1BC9A6', '#5D6DBE', '#F15B87', '#F56971', '#E4CB6D', '#FD8A69', '#E8738F', '#FF4560'];

const GraphContainer = styled.div`
    width: 100%;
    background-color: var(--grey-color);
    border-radius: var(--default-radius);
    padding: 10px;
`;

const BarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const Bar = styled.div`
    margin-right: 7px;
    background-color: ${(props) => props.color};
    width: ${(props) => props.width}%;
    height: 30px;
    border-radius: 10px;
    transition: width 2s ease-in-out;

    @media only screen and (max-width: 734px) {
        height: 22px;
    }
`;

const LabelContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 5px 10px;
`;

const Label = styled.p`
    min-width: 70px;

    @media only screen and (max-width: 734px) {
        font-size: 14px;
        min-width: 30px;
    }
`;

const PriceLabel = styled.p`
    min-width: 80px;

    @media only screen and (max-width: 734px) {
        font-size: 14px;
        min-width: 60px;
    }
`;

const NoDataMessage = styled.div`
    color: var(--font-gray-color);
    text-align: center;
    padding: 60px;
`;

const ImageContainer = styled.div`
    position: relative;
    width: 40px;
    height: 40px;
    margin-right: 5px;
    background-color: ${(props) => props.color};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
        font-size: 22px;
        height: auto;
        color: #fff;
    }

    @media only screen and (max-width: 734px) {
        width: 27px;
        height: 27px;

        svg {
            font-size: 17px;
        }

        .Label {
            min-width: 30px;
        }
        .PriceLabel {
            min-width: 50px;
        }
    }
`;

// 항목에 맞는 아이콘을 매핑 (여기에 없는 항목은 기타 아이콘으로 표기됨)
const iconMap = {
    미용: <PiHairDryer />,
    도서: <IoBookOutline />,
    의류비: <GiRolledCloth />,
    식비: <IoFastFoodOutline />,
    간식: <LuCandy />,
    여행: <MdTravelExplore />,
    교육: <MdCastForEducation />,
    운동: <BiDumbbell />,
};

// default아이콘은 기타아이콘으로 설정
const defaultIcon = <FaRocketchat />;

// 애니메이션 상태 초기화
const ExpenseGraph = ({ expenseData, selectedMonth }) => {
    const [animationReady, setAnimationReady] = useState(false);

    // 선택된 월 또는 지출 데이터가 변경될 때 애니메이션 초기화 및 새로운 바 애니메이션 동작
    useEffect(() => {
        setAnimationReady(false);
        const timeout = setTimeout(() => setAnimationReady(true), 200);
        return () => clearTimeout(timeout);
    }, [expenseData, selectedMonth]);

    // 선택된 월에 해당하는 지출 데이터를 필터링
    const filteredExpenseData = expenseData.filter((item) => {
        return new Date(item.date).getMonth() + 1 === selectedMonth;
    });

    // 열의 각 요소를 반복하면서 각 항목별로 지출 금액을 합산함
    //여기서 각 지출 항목(item)을 키로 해당 항목의 총 지출 금액(amount)을 값으로 가지는 객체를 생성
    const categorizedData = filteredExpenseData.reduce((acc, expense) => {
        const { item, amount } = expense;
        if (item && amount) {
            if (!acc[item]) {
                acc[item] = 0;
            }
            acc[item] += amount;
        }
        return acc;
    }, {});

    const sortedData = Object.entries(categorizedData).sort(([, amountA], [, amountB]) => amountB - amountA);
    const totalAmount = Object.values(categorizedData).reduce((acc, amount) => acc + amount, 0);

    return (
        <GraphContainer>
            {Object.keys(categorizedData).length === 0 ? (
                <NoDataMessage>그래프로 표현할 데이터가 없습니다.</NoDataMessage>
            ) : (
                // 정렬된 데이터에 따라 바 차트 렌더링
                sortedData.map(([item, amount], index) => {
                    const selectedColor = COLORS[index % COLORS.length]; //index 값을 사용하여 COLORS 배열에서 적절한 색상을 선택
                    const icon = iconMap[item] || defaultIcon; // 해당 지출 항목에 대한 아이콘을 가져옴 아이콘이 없다면 defaultIcon을 사용
                    return (
                        <BarContainer key={item}>
                            <LabelContainer>
                                {/* 선택한 컬러를 아이콘 배경색으로 지정 해당 지출 항목의 아이콘이 보이게됨 */}
                                <ImageContainer color={selectedColor}>{icon}</ImageContainer>
                                <Label>{item}</Label>
                            </LabelContainer>

                            <Bar
                                color={selectedColor} // 위에서 선택된 색상으로 지정됨
                                width={animationReady ? (amount / totalAmount) * 100 : 0} // `true`이면 애니메이션 효과가 활성화됨
                                title={`${item}: ${((amount / totalAmount) * 100).toFixed(2)}%`} // 바의 너비를 계산해줌 ( 가격 / 가격 합계) X 100 toFixed 소수점 이하 두자리까지 반올림함
                            />
                            <PriceLabel>{`${amount}원`}</PriceLabel>
                        </BarContainer>
                    );
                })
            )}
        </GraphContainer>
    );
};

// PropTypes를 이용한 prop를 검증한다. (에러 처리)
ExpenseGraph.propTypes = {
    expenseData: PropTypes.arrayOf(
        PropTypes.shape({
            item: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            date: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        })
    ).isRequired,
    selectedMonth: PropTypes.number.isRequired,
};

export default ExpenseGraph;
