import styled from 'styled-components';
import {  doc, deleteDoc, updateDoc } from "firebase/firestore";
import { dbService } from '../firebase';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function ToDo({ toDoObj, isOwner }) {
    const [edit, setEdit] = useState(false);
    const [newToDo, setnewToDo] = useState(toDoObj.text);
    const  ToDoTextRef =  doc(dbService, "to-do-lists", `${toDoObj.id}`);

    const onDeleteClick = async() => {
        const ok = window.confirm("삭제하시겠습니까?");
        if (ok) {
            await deleteDoc(ToDoTextRef);
        }
    };

    const toggleEduting = () => setEdit((prev => !prev));

    const onSubmit = async(e) => {
        e.preventDefault();
        await updateDoc(ToDoTextRef, {
            text: newToDo,
            });
            setEdit((prev => !prev));
    }

    const onChange = (e) => {
        const {
            target: { value }
        } = e;
        setnewToDo(value);
    };
    
    return (
        <div>
            {edit ? (
                <Form onSubmit={onSubmit}>
                    <InputGroup className="mb-3">
                        <Form.Control
                            onChange={onChange} value={newToDo} type="text"
                            placeholder="수정할 내용을 적어주세요"
                            maxLength="50"
                        />
                        <Button onClick={toggleEduting} variant="outline-secondary" id="button-addon2" type="submit">
                        완료
                        </Button>
                        <Button variant="outline-secondary" id="button-addon2" onClick={toggleEduting}>취소</Button>
                    </InputGroup>
                </Form>
            ) : (
                isOwner && (
                    <ToDoBox>
                        <Stack direction="horizontal" gap={3}>
                            <h4>{newToDo}</h4>
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
`