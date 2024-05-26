import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropTypes from 'prop-types';

const StyledLayout = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const MainContent = styled.div`
    margin: var(--layout-center);
    width: var(--default-width);
    flex: 1;
`;

// 헤더, 푸터 등의 공통 요소를 포함 하고, 특정 페이지에 해당하는 컨텐츠를 넣을 수 있도록 children prop을 사용
const Layout = ({ children }) => {
    return (
        <StyledLayout>
            <Header />
            <MainContent>{children}</MainContent>
            <Footer />
        </StyledLayout>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
