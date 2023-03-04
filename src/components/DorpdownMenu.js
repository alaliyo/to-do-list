import { authService } from '../firebase';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function DorpdownMenu({ dispWidSize }) {
    const onLogOutClick = () => {
        authService.signOut();
        alert("로그아웃 되었습니다.")
        window.location.href="/"
    }

    return (
        <div>
            <DropdownButton
                as={ButtonGroup}
                key="Secondary"
                id="dropdown-variants-Secondary"
                variant={"Secondary".toLowerCase()}
                title={dispWidSize > 768 ? "메뉴" : "☰"}
                align="end"
                size="sm"
            >
                <Dropdown.Item eventKey="1" href="/update">Update</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="2" onClick={onLogOutClick}>LogOut</Dropdown.Item>
            </DropdownButton>
        </div>
    );
}

export default DorpdownMenu