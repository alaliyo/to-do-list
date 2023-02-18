import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { authService } from '../firebase';

function Navigator({ userObj, loggedIn }) {

    const onLogOutClick = () => {
        console.log("반응")
        authService.signOut();
        window.location.reload(`${process.env.PUBLIC_URL}/`);
    }

    return (
        <Navbar>
            <Container>
                <Navbar.Brand href={`${process.env.PUBLIC_URL}/`}>To Do List</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        {loggedIn ? (
                            <>
                            <span>{userObj.email}님 환영합니다.</span>
                            <Button variant="light" onClick={onLogOutClick}>로그아웃</Button>
                            </>
                        ) : (
                            <Button variant="light" href={`${process.env.PUBLIC_URL}/login`}>
                                로그인
                            </Button>
                        )}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
      </Navbar>
    );
}

export default Navigator;