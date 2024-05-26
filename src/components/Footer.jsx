import styled from 'styled-components';

const StyledFooter = styled.footer`
    width: 100%;
    background-color: #eeeeee;
    border-top: var(--border-style);
    margin: var(--layout-center);
    color: var(--font-gray-color);
    padding: 25px 0;
    text-align: center;
`;

const Footer = () => {
    return (
        <StyledFooter>
            <span>copyright @Boa</span>
        </StyledFooter>
    );
};

export default Footer;
