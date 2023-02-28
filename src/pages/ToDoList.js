import styled from 'styled-components';
import ToDoListHeader from '../components/ToDoListpage/ToDoListHeader';
import ToDoListBody from '../components/ToDoListpage/ToDoListBody';
import { useState } from 'react';

function ToDoList({ userObj, loggedIn }) {
    const [lookupDate, setLookupDate] = useState("");
    const getDate = (e) => {
        setLookupDate(e)
    }

    return (
        <div>
            <HeaderTitle>To-Do-List</HeaderTitle>
            <ToDoListBox>
                <ToDoListHeader loggedIn={loggedIn} userObj={userObj} getDate={getDate} />
                <ToDoListBody userObj={userObj} lookupDate={lookupDate} />
            </ToDoListBox>
        </div>
    )
}

export default ToDoList;

const ToDoListBox = styled.div`
    padding: 20px;
    height: 70vh;
    margin: 0px 10%;
    background-color: #ffeedd;
    border-radius: 15px;
`

const HeaderTitle = styled.h2`
    text-align : center;
    font-size: 40px;
    font-weight: 900;
    margin-top: 30px;
    margin-bottom: 20px;
`