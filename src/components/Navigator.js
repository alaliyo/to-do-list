import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import DorpdownMenu from './DorpdownMenu';

function Navigator({ userObj, loggedIn }) {

    return (
        <Navbar>
            <Container>
                <Navbar.Brand href="/">To Do List</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    
                    {loggedIn ? (
                        <>
                        <Navbar.Text>
                            <EmailText>{userObj.email}</EmailText>
                        </Navbar.Text>
                        <DorpdownMenu />
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
`