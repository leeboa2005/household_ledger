import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import icons from '../assets/graph/icons';

const COLORS = [
    '#93CDE9',
    '#1BC9A6',
    '#5D6DBE',
    '#F15B87',
    '#F56971',
    '#E4CB6D',
    '#fc8969',
    '#E8738F',
    '#FF4560',
    '#A4DDED',
    '#FFB347',
    '#B39EB5',
    '#fa635b',
    '#ffd1dc',
];

const GraphContainer = styled.div`
    width: 100%;
    background-color: var(--grey-color);
    border-radius: var(--default-radius);
    padding: 17px 10px;
`;

const BarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const Bar = styled.div`
    margin-right: 7px;
    //배경색을 props로 전달받은 color 값으로 설정
    background-color: ${(props) => props.color};
    // bar 컴포넌트의 너비를 props로 전달받은 width 값의 백분율로 설정
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
    // props로 전달된 color 값을 설정
    background-color: ${(props) => props.color};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
        width: 22px;
        height: auto;
        color: #fff;
    }

    @media only screen and (max-width: 734px) {
        width: 27px;
        height: 27px;

        svg {
            width: 17px;
        }

        .Label {
            min-width: 30px;
        }
        .PriceLabel {
            min-width: 50px;
        }
    }
`;

const ExpenseGraph = ({ expenseData, selectedMonth }) => {
    const [animationReady, setAnimationReady] = useState(false); // 애니메이션 상태 초기화

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
    const categorizedData = filteredExpenseData.reduce((accumulated, expense) => {
        const { item, amount } = expense;
        if (item && amount) {
            if (!accumulated[item]) {
                accumulated[item] = 0;
            }
            accumulated[item] += Number(amount);
        }
        return accumulated;
    }, {});

    // Object.entries : 주어진 객체의 속성(key-value 쌍)을 [키, 값] 쌍의 배열로 반환
    // Object.values : 주어진 객체의 값들만을 배열로 반환

    // 객체를 배열로 변환하고, 지출 금액(amount)을 기준으로 내림차순으로 정렬
    const sortedData = Object.entries(categorizedData).sort(([, amountA], [, amountB]) => amountB - amountA);
    // categorizedData객체의 값들을 모두 더하여 총 지출 금액을 계산함
    const totalAmount = Object.values(categorizedData).reduce((accumulated, amount) => accumulated + amount, 0);

    return (
        <GraphContainer>
            {Object.keys(categorizedData).length === 0 ? (
                <NoDataMessage>그래프로 표현할 데이터가 없습니다.</NoDataMessage>
            ) : (
                // 정렬된 데이터에 따라 바 차트 렌더링
                sortedData.map(([item, amount], index) => {
                    const selectedColor = COLORS[index % COLORS.length]; //index 값을 사용하여 COLORS 배열에서 적절한 색상을 선택
                    const IconComponent = icons[item] || icons['기타']; // 해당 지출 항목에 대한 아이콘을 가져옴 아이콘이 없다면 기타 아이콘을 사용
                    return (
                        <BarContainer key={item}>
                            <LabelContainer>
                                {/* 선택한 컬러를 아이콘 배경색으로 지정 해당 지출 항목의 아이콘이 보이게됨 */}
                                <ImageContainer color={selectedColor}>
                                    <IconComponent />
                                </ImageContainer>
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

// Prop Types를 이용한 prop를 검증한다. (에러 처리)
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
