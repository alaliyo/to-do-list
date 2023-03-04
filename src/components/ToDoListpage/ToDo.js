import styled from 'styled-components';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { dbService } from '../../firebase';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Badge from 'react-bootstrap/Badge';

function ToDo({ dispWidSize, toDoObj, isOwner, DateOwner, userObj }) {
    const [edit, setEdit] = useState(false);
    const [newToDo, setnewToDo] = useState(toDoObj.text);
    const [check, setCheck] = useState(toDoObj.check);
    const ToDoTextRef = doc(dbService, userObj === null ? "to-do-list" : userObj.email, `${toDoObj.id}`);

    const onDeleteClick = async() => {
        const ok = window.confirm("삭제하시겠습니까?");
        if (ok) {
            await deleteDoc(ToDoTextRef);
        }
    };

    const toggleEduting = () => setEdit((prev => !prev));

    const onPut = async(e) => {
        e.preventDefault();
        await updateDoc(ToDoTextRef, {
            text: newToDo,
            });
            setEdit((prev => !prev))
    }

    const onChange = (e) => {
        const {
            target: { value }
        } = e;
        setnewToDo(value);
    };

    const onCheck = async(e) => {
        e.preventDefault();
        await updateDoc(ToDoTextRef, {
            check: !check,
            });
            setCheck(prev => !prev)
    }
    
    return (
        <div>
            {edit ? (
                <ToDoBox>
                    <Form>
                        <InputGroup>
                            <Form.Control
                                onChange={onChange} value={newToDo} type="text"
                                placeholder="수정할 내용을 적어주세요"
                                maxLength="50"
                            />
                            <Button onClick={onPut} variant="outline-secondary" id="button-addon2" type="submit">완료</Button>
                            <Button variant="outline-secondary" id="button-addon2" type="button" onClick={toggleEduting}>취소</Button>
                        </InputGroup>
                    </Form>
                </ToDoBox>
            ) : (
                isOwner && DateOwner && (
                    <ToDoBox>
                        <Stack direction="horizontal" gap={dispWidSize > 768 ? 3 : 1}>
                            <Badgebox onClick={onCheck}>{check? <Badge bg="success">완료</Badge> : <Badge bg="danger">진행중</Badge>}</Badgebox>
                            {check ? <ContentsText><del>{newToDo}</del></ContentsText> : <ContentsText>{newToDo}</ContentsText>}
                            <Button className="ms-auto" variant="outline-secondary" onClick={toggleEduting}>수정</Button>
                            <CloseButton onClick={onDeleteClick} />
                        </Stack>
                    </ToDoBox>
                )
            )}
        </div>
    );
}

export default ToDo;

const ToDoBox = styled.div`
    border: 2px solid rgb(150, 150, 150);
    border-radius: 15px;
    padding: 10px;
    margin-bottom: 10px;
    background-color: white;
    @media screen and (max-width: 768px) {
        padding: 5px
    }
`

const Badgebox = styled.button`
    background-color: white;
    border: 0;
    margin-bottom: 5px;
`

const ContentsText = styled.span`
    font-size: 19px;
    font-weight: 900;
    @media screen and (max-width: 768px) {
        font-size: 15px
    }
` 