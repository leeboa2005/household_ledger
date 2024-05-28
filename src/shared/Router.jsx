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
                    {/* 홈 페이지 */}
                    <Route path="/" element={<Home expenseData={expenseData} setExpenseData={setExpenseData} />} />

                    {/* 디테일 페이지 */}
                    <Route
                        path="/detail/:id"
                        element={<Detail expenseData={expenseData} setExpenseData={setExpenseData} />}
                    />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

// PropType 검증
Router.propTypes = {
    expenseData: PropTypes.array.isRequired,
    setExpenseData: PropTypes.func.isRequired,
};

export default Router;
