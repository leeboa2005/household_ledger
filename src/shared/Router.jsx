import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import Layout from '../shared/Layout';
import { useSelector } from 'react-redux'; // Redux의 useSelector를 사용합니다.

const Router = () => {
    const selectExpenseData = (state) => state.expenseData.items; // Redux state에서 expenseData를 가져옵니다.
    const expenseData = useSelector(selectExpenseData);

    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home expenseData={expenseData} />} />
                    <Route path="/detail/:id" element={<Detail expenseData={expenseData} />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default Router;
