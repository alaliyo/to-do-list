import styled from 'styled-components';

function Footer() {
    return (
        <FooterBox>
            <FlexBox>
                <TextBox>Title: to-do-list</TextBox>
                <TextBox>Producer: 김성원</TextBox>
                <TextBox>Version: v1.0.0</TextBox>
            </FlexBox>
            <FlexBox>
                <TextBox>지금은 베타 버전입니다.</TextBox>
                <TextBox>회원 탈퇴 및 비밀번호 변경 문의는</TextBox>
                <TextBox>des321321@daum.net</TextBox>
            </FlexBox>
        </FooterBox>
    )
}

export default Footer;

const FooterBox = styled.footer`
    border-top: 2px solid rgb(230, 230, 230);
    margin-top: 20px;
    padding: 20px 10% ;
    height: 100px;
    width: 100vw;
    color: rgb(150, 150, 150);
    font-size: 12px;
    display: flex;
`

const FlexBox = styled.div`
    width: 50%;
`

const TextBox = styled.div`
    margin-bottom: 2px;
`

// const FooterAText = styled.a`
//     color: rgb(150, 150, 150);
//     text-decoration: none;
//     &:hover{color: rgb(150, 150, 150);}
//     margin-bottom: 3px;
// `