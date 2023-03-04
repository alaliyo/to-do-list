/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { dbService } from '../../firebase';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Stack from 'react-bootstrap/Stack';


function Header({ userObj, getDates }) {
    const [schedule, setSchedule] = useState('');
    const [scheduleDate, setScheduleDate] = useState(new Date().toLocaleDateString().replace(/\./g, '').replace(/\s/g, '-'));
    const [year, setYear] = useState(Number(moment().format('YYYY')));
    const [month, setMonth] = useState(Number(moment().format('M')));
    const [date, setDate] = useState(Number(moment().format('D')));
    const [maxDate, setMaxDate] = useState(Number(moment().endOf('month').format('D')));
    const [calenderDate, setCalenderDate] = useState(new Date());

    const onChange = (e) => {
        setSchedule(e.target.value);
    }

    const dateDown = () => {
        setDate(e => e - 1);
        setScheduleDate(new Date(year, month-1, date-1).toLocaleDateString().replace(/\./g, '').replace(/\s/g, '-'));
        setMaxDate(Number(moment(`${year}/${month}/01`).endOf('month').format('D')));
    }

    const dateUp = () => {
        setDate(e => e + 1);
        setScheduleDate(new Date(year, month-1, date+1).toLocaleDateString().replace(/\./g, '').replace(/\s/g, '-'));
        setMaxDate(Number(moment(`${year}/${month}/01`).endOf('month').format('D')));
    }

    useEffect(() => {
        getDates(scheduleDate);
    }, [date, calenderDate]);

    useEffect(() => {
        if (date < 1) {
            setMonth(e => e - 1);
            setMaxDate((moment(`${year}/${month-1}/01`).endOf('month').format('D')));
            setDate((moment(`${year}/${month-1}/01`).endOf('month').format('D')));
        } else if (date > maxDate) {
            setMonth(e => e + 1);
            setMaxDate((moment(`${year}/${month+1}/01`).endOf('month').format('D')));
            setDate(1);
        }
    }, [date])

    useEffect(() => {
        if (month > 12) {
            setYear(e => e + 1);
            setMonth(1);
            setDate(1);
            setMaxDate((moment(`${year}/${month}/01`).endOf('month').format('D')));
        } else if (month < 1) {
            setYear(e => e - 1);
            setMonth(12);
            setDate(31);
            setMaxDate((moment(`${year}/${month}/31`).endOf('month').format('D')));
        }
    }, [date]);

    const dateChang = (e) => {
        setCalenderDate(e.target.value);
        e.target.value = "";
    }

    useEffect(() => {
        setScheduleDate(new Date(calenderDate).toLocaleDateString().replace(/\./g, '').replace(/\s/g, '-'));
        setMaxDate(Number(moment(calenderDate).endOf('month').format('D')));
        setYear(Number(moment(calenderDate).format('YYYY')));
        setMonth(Number(moment(calenderDate).format('M')));
        setDate(Number(moment(calenderDate).format('D')));
    }, [calenderDate]);

    // POST 입력
    const dataPost = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(dbService, userObj === null ? "to-do-list" : userObj.email), {
            text: schedule,
            userId: userObj.email,
            createdDate: scheduleDate,
            check: false
        });
        } catch (error) {
        }
        setSchedule("");
    }

    return (
        <div>
            <Stack direction="horizontal" gap={3}>
                <TextBox><TextSpan>{year}/{month}/{date}</TextSpan></TextBox>
                <input onChange={dateChang} type="date" />
                <ArrowBox className="ms-auto" onClick={dateDown}>◀</ArrowBox>
                <ArrowBox onClick={dateUp}>▶</ArrowBox>
            </Stack>
            <ToDoInputBox>
                <Form onSubmit={dataPost}>
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
    color: black;
    width: 32px;
    height: 30px;
    display: flex;
    background-color: white;
    text-align : center;
    border-radius: 16px;
    border: 2px solid gray;
    cursor: pointer;
    &:hover {
        color: white;
        background-color: gray;
        transition: 0.5s;
    }
`

const TextBox = styled.div`
    margin-left: 20px;
`

const TextSpan = styled.span`
    font-size: 20px;
    font-weight: bold;
`