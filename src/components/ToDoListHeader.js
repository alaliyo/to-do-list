import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { dbService } from '../firebase';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Stack from 'react-bootstrap/Stack';

function Header({ userObj }) {
    const [schedule, setSchedule] = useState('');
    const [scheduleDate, setScheduleDate] = useState(new Date().toLocaleDateString().replace(/\./g, '').replace(/\s/g, '-'));
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth()+1);
    const [date, setDate] = useState(new Date().getDate());
    const [maxDate, setMaxDate] = useState(new Date(year, month, 0).getDate());

    const onChange = (e) => {
        setSchedule(e.target.value);
    }

    const dateDown = () => {
        setDate(e => e - 1);
        setScheduleDate(new Date(year, month-1, date-1).toLocaleDateString().replace(/\./g, '').replace(/\s/g, '-'))
    }

    const dateUp = () => {
        setDate(e => e + 1);
        setScheduleDate(new Date(year, month-1, date+1).toLocaleDateString().replace(/\./g, '').replace(/\s/g, '-'))
    }

    useEffect(() => {
        if (date < 1) {
            setMonth(e => e - 1);
            setMaxDate(new Date(year, month-1, 0).getDate());
            setDate(new Date(year, month-1, 0).getDate());
        } else if (date > maxDate) {
            setMonth(e => e + 1);
            setMaxDate(new Date(year, month + 1, 0).getDate());
            setDate(1);
        }
        console.log(scheduleDate, year, month, date, maxDate);
    }, [date < 1 || date > maxDate])

    useEffect(() => {
        if (month > 12) {
            setYear(e => e + 1);
            setMonth(1)
            setDate(1)
        } else if (month < 1) {
            setYear(e => e - 1);
            setMonth(12)
            setDate(31)
        }
    }, [month > 12 || month < 1])

    // POST 입력
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(dbService, "to-do-lists"), {
            text: schedule,
            userId: userObj.email,
            createdDate: scheduleDate,
            chack: false
        });
        } catch (error) {
        }
        setSchedule("");
    };

    return (
        <div>
            <Stack>
                {year}/{month}
            </Stack>
            <Stack direction="horizontal" gap={3}>
                {date}
                <ArrowBox className="ms-auto" onClick={dateDown}>◀</ArrowBox>
                <ArrowBox onClick={dateUp}>▶</ArrowBox>
            </Stack>
            <ToDoInputBox>
                <Form onSubmit={onSubmit}>
                    <InputGroup className="mb-3">
                        <Form.Control
                        onChange={onChange} value={schedule} type="text"
                        placeholder="스케줄을 입력해주세요"
                        maxLength="50"
                        />
                        <Button variant="outline-secondary" id="button-addon2" type="submit">
                        확인
                        </Button>
                    </InputGroup>
                </Form>
            </ToDoInputBox>
        </div>
    );
}

export default Header

const ToDoInputBox = styled.div`
    margin: 10px;
    background-color: white;
`

const ArrowBox = styled.button`
    width: 30px;
    height: 30px;
    background-color: white;
    text-align : center;
    border-radius: 15px;
    border: 2px solid gray;
    cursor: pointer;
    &:hover {
        color: white;
        background-color: gray;
        transition: 0.5s;
    }
`