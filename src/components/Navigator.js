import React from 'react';
import styled from 'styled-components';
import { authService } from '../firebase';
import { getAuth, sendPasswordResetEmail, deleteUser } from 'firebase/auth';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import DorpdownMenu from './DorpdownMenu';
import Dropdown from 'react-bootstrap/Dropdown';


function Navigator({ userObj, loggedIn, dispWidSize }) {

  // 비밀번호 변경 클릭 시 비밀번호 이메일 요청
  const changePasswordUsingEmail = async () => {
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, userObj.email);
      alert('이메일로 비밀번호 재설정 메일을 보냈습니다. 변경 후 재 로그인 해주세요');
      authService.signOut();
      window.location.href="/"
    } catch ({ code, message }) {
      alert(message);
    }
  };

  // 회원 탈퇴
  const secession = async () => {
    const isSecession = window.confirm("회원 탈퇴를 하시겠습니까?");
    if (isSecession) {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        await deleteUser(user);
        alert("회원 탈퇴가 완료되었습니다. 사용해주셔서 감사합니다.");
        window.location.href="/"
      }
      catch ({ code, message }) {
        alert(message);
      }
    }
  };

  const CustomToggle = React.forwardRef(({ onClick }, ref) => (
    <EmailText ref={ref} onClick={(e) => {onClick(e);}}>{ dispWidSize > 768 ? userObj.email : userObj.email.split('@')[0]}</EmailText>
  ));


    return (
        <Navbar>
            <Container>
                <Navbar.Brand href="/">To Do List</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    
                    {loggedIn ? (
                        <>
                        <Dropdown>
                            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components"></Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="1" onClick={changePasswordUsingEmail}>비밀번호변경</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item eventKey="2" onClick={secession}>회원탈퇴</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <DorpdownMenu dispWidSize={dispWidSize} />
                        </>
                    ) : (
                        <Navbar.Text>
                            <Button variant="light" href="login">
                                로그인
                            </Button>
                        </Navbar.Text>
                    )}
                
                </Navbar.Collapse>
            </Container>
      </Navbar>
    );
}

export default Navigator;

const EmailText = styled.span`
  margin-right: 10px;
  text-decoration: none;
  color: #808080;
  cursor: pointer;
  &:hover {
    color: black;
  }
`