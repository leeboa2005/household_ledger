// Router.jsx

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import Layout from '../shared/Layout';
import PropTypes from 'prop-types';

const Router = ({ expenseData, setExpenseData }) => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    {/* 홈 패이지의 컴포넌트에 지출 데이터와 지출 데이터 설정 함수를 전달 */}
                    <Route path="/" element={<Home expenseData={expenseData} setExpenseData={setExpenseData} />} />
                    {/* 디테일 페이지의 컴포넌트에 지출 데이터와 지출 데이터 설정 함수를 전달 */}
                    <Route
                        path="/detail/:id"
                        element={<Detail expenseData={expenseData} setExpenseData={setExpenseData} />}
                    />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

// prop Type 지정
Router.propTypes = {
    expenseData: PropTypes.array.isRequired,
    setExpenseData: PropTypes.func.isRequired,
};

export default Router;
