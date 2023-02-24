import styled from 'styled-components';
import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

function Update() {
    return(
        <TableBox>
            <VPageTitleBox>
                <VPageTitle>Update History</VPageTitle>
            </VPageTitleBox>
            <Table striped>
                <thead>
                <tr>
                    <ThWidth afterWidth="10%">#</ThWidth>
                    <ThWidth afterWidth="30%">version</ThWidth>
                    <ThWidth afterWidth="60%">contents</ThWidth>
                </tr>
                </thead>
                <tbody>
                    <OverlayTrigger
                        trigger="click"
                        placement="bottom"
                        overlay={
                            <Popover id="popover-positioned-bottom">
                            <Popover.Body>
                                <UpdateContents>메뉴 버튼이 추가되고 버튼에 로그아웃 및 업데이트 페이지로 이동할 수 있는 버튼이 추가되었습니다.</UpdateContents>
                            </Popover.Body>
                            </Popover>
                        }>
                    <tr>
                        <td>1</td>
                        <td>v1.1.0</td>
                        <td>메뉴 및 update page 추가</td>
                    </tr>
                    </OverlayTrigger>
                    <OverlayTrigger
                        trigger="click"
                        placement="bottom"
                        overlay={
                            <Popover id="popover-positioned-bottom">
                            <Popover.Body>
                                <UpdateContents>to-do-list 서비스가 시작되었습니다. v1은 배타 버전입니다. 미리 배포하고 사용하시면서 필요한 부분 개선 되었으면 하는 부분을 제 메일로 내용을 남겨주세요.</UpdateContents>
                            </Popover.Body>
                            </Popover>
                        }>
                    <tr>
                        <td>2</td>
                        <td>v1.0.0</td>
                        <td>서비스 배포 시작</td>
                    </tr>
                    </OverlayTrigger>

                </tbody>
            </Table>
        </TableBox>
    );
}

export default Update;

const VPageTitleBox = styled.div`
    margin: 15px 0;
`

const VPageTitle = styled.h2`
    font-weight: 900;
`

const TableBox = styled.div`
    padding: 20px;
    height: 70vh;
    margin: 0px 10%;
`

const ThWidth = styled.td`
    width: ${(p) => p.afterWidth};
`

const UpdateContents = styled.span`
    font-weight: 900;
` 