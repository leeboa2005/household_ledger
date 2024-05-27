import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ExpenseProvider from './context/ExpenseProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* ExpenseProvider 컴포넌트를 사용하여 지출 관련 데이터를 
        제공 하위 컴포넌트들이 지출 데이터에 접근하고 수정 할 수 있게함*/}
        <ExpenseProvider>
            <App />
        </ExpenseProvider>
    </React.StrictMode>
);
