import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { dbService } from '../../firebase';
import { collection, onSnapshot, query } from "firebase/firestore";
import UpdateModal from './AddContents';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';

function UpdateContents({ userObj, loggedIn }) {
    const [updateList, setUpdateList] = useState([]);

    // 스케줄 Get
    useEffect(() => {
        const q = query(
            collection(dbService, "version")
        );
        onSnapshot(q, (snapshot) => {
            const updateListtArr = snapshot.docs.map((doc) => ({
                ...doc.data(),
            }));
            updateListtArr.sort((a, b) => b.versId - a.versId)
            setUpdateList(updateListtArr);
        });
    }, [userObj])

    return(
        <TableBox striped bordered hover>
            { loggedIn && <>
            <VPageTitleBox>
                <Stack direction="horizontal" gap={4}>
                    <VPageTitle>Update History <br /><VPageEx>(열을 클릭해 상세 내용을 확인하세요)</VPageEx></VPageTitle>
                    { userObj.email === "des321321@naver.com" && <UpdateModal userObj={userObj} upListLen={updateList.length}></UpdateModal> }
                </Stack>
            </VPageTitleBox >
            <Table striped>
                <thead>
                    <tr>
                        <ThWidth afterWidth="10%">#</ThWidth>
                        <ThWidth afterWidth="30%">version</ThWidth>
                        <ThWidth afterWidth="60%">contents</ThWidth>
                    </tr>
                </thead>
                {updateList.map((e, i) => (<>
                    <Thead key={i}>
                        <OverlayTrigger
                            trigger="click"
                            placement="bottom"
                            overlay={
                                <Popover id="popover-positioned-bottom">
                                <Popover.Body>
                                    <Contents>{e.versionContents}</Contents>
                                </Popover.Body>
                                </Popover>
                            }>
                            <tr>
                                <td>{i+1}</td>
                                <td>{e.versionNum}</td>
                                <td>{e.versionTitle}</td>
                            </tr>
                        </OverlayTrigger>
                    </Thead>
                </>))}
            </Table>
            </>}
        </TableBox>
    );
}

export default UpdateContents;

const VPageTitleBox = styled.div`
    margin: 15px 0;
`

const VPageTitle = styled.h2`
    font-weight: 900;
`

const VPageEx = styled.span`
    font-weight: 900;
    font-size: 12px;
`

const TableBox = styled.div`
    padding: 20px;
    height: 70vh;
    margin: 0px 10%;
    @media screen and (max-width: 768px){
        margin: 0;
    }
`

const ThWidth = styled.td`
    width: ${(p) => p.afterWidth};
`

const Contents = styled.span`
    font-weight: 900;
` 

const Thead = styled.thead`
    background-color: white;
    &:hover {
        background-color: #e2e2e2;
        transition: 0.5s;
    }
`