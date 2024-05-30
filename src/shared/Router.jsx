import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import Layout from '../shared/Layout';
import { useSelector } from 'react-redux'; // Redux의 useSelector를 사용합니다.

const Router = () => {
    const expenseData = useSelector((state) => state.expenseData.items); // Redux 상태에서 expenseData를 가져옵니다.

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
