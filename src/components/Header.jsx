import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledHeader = styled.header`
    width: var(--default-width);
    padding: 10px 0;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    margin: 0 auto;
    color: #000;
    font-size: 16px;
    font-weight: 600;

    img {
        width: 130px;
    }
`;

const Header = () => {
    return (
        <StyledHeader>
            <h1>
                <Link to="/">
                    <img src="/logo.png" alt="로고"></img>
                </Link>
            </h1>
        </StyledHeader>
    );
};

export default Header;
