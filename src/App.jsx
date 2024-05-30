// App.jsx

import { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Router from './shared/Router';
import dummy from './db/fakeData.json';

// reset css 설정
const GlobalStyle = createGlobalStyle`${reset}
/* font */
@font-face {
    font-family: 'SUIT-Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

* {
    box-sizing: border-box !important;
}
 body {
  font-family: var(--font-default);
  font-size: var(--font-text-size) ;
  color :var(--font-color);
  font-weight: 500;

 }
 a{
    text-decoration: none;
    color :var(--font-color);
 }
 button {
    border: none;
        border-radius: var(--default-radius-2);
        font-weight: 600;
        cursor: pointer;
        border: none;
 }

 :root {
    --default-width: 920px;
    --grey-color: #f5f5f7;
    --main-color: #91cfec
    --font-color: #222;
    --font-gray-color: #a2a2a2;
    --font-white-color: #fff;
    --font-footer-color: #eeeeee;
    --border-style:1px solid #ccc;
    --font-default: 'SUIT-Regular';
    --font-text-size: 16px;
    --font-bold:600;
    --layout-center: 0 auto;
    --default-radius: 16px;
    --default-radius-2: 6px;
}

section{
    width: 100%;
    border-radius: var(--default-radius);
}

@media only screen and (max-width: 1068px) {
    :root {
        --default-width: 720px;
    }
}

@media only screen and (max-width: 734px) {
    :root {
        --default-width: 420px;
        --font-text-size: 14px;
    }
}

@media only screen and (max-width: 420px) {
    :root {
        --default-width: 320px;
    }
}

`;

const App = () => {
    // 초기 데이터 dummy 값을 업데이트함
    const initialData = dummy.map((expense) => ({
        id: expense.id,
        date: expense.date,
        item: expense.item,
        amount: expense.amount,
        description: expense.description,
    }));

    const [expenseData, setExpenseData] = useState(initialData);

    return (
        <div>
            <GlobalStyle />
            {/* 라우터 컴포넌트 렌더링 */}
            <Router expenseData={expenseData} setExpenseData={setExpenseData} />
        </div>
    );
};

export default App;
