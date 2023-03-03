//import styled from 'styled-components';
import UpdateContents from '../components/Updatepage/UpdateContents';

function Update({ userObj, loggedIn}) {
    if(loggedIn === false) {
        alert('로그인 후 사용 가능합니다')
        window.location.href="/login"
    }
    
    return(
        <div>
            <UpdateContents userObj={userObj} loggedIn={loggedIn} />
        </div>
    );
}

export default Update;

