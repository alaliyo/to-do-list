# to-do-list
<h2>기획</h2>
<h3> - 회원 가입 후 자신의 스케줄을 날자에 맞게 반환하며 추가, 수정, 삭제를 자유롭게 하는 것! </h3>

<br/>

## 링크
<a href="https://to-do-list-5d16b.firebaseapp.com/">to-do-list-5d16b.firebaseapp.com</a>

<br/>

## 진행 상황
<details>
  <ol>
    <h3>(완료)</h3>
    <details>
      <li>로그인 기능 구현 완료</li>
      <li>firebase에 연결 및 todo 저장, 수정, 삭제</li>
      <li>계정별 게시물 보이기</li>
      <li>계정별 데이터 베이스 생성</li>
      <li>해당 날짜에 todo작성 시 날짜 data 저장하여 해당 날짜에만 띄우기 </li>
      <li>완료, 진행중 체크 버튼 구현 및 true, false 데이터 값을 저장 후 get 했을 때도 적용</li>
      <li>input date type에도 날짜 이동하고 게시물 불러 오는 기능 구현</li>
      <li>firebase에 배포</li>
      <li>footer 생성</li>
      <li>업데이트 페이지 생성 및 버전 알림</li>
      <li>admin 계정 및 업데이트 테이블 및 계시물 생성</li>
      <li>비밀번호 변경 및 찾기, 계정 탈퇴 기능</li>
      <li>모바일에서 접속 시 반응형으로 사용하기 편하게 디자인 변경</li>
    </details>
  </ol>
    <ol>
    <h3>(계획)</h3>
    <details>
      <li>게시물 위치 변경 시 DB값 보내고 UX/UI 적용하는 부분 고민 밒 설계</li>
      <li>게시물 위치 변경 적옹하기</li>
      <li>완료하지 못한 스케줄 확인할 수 있는 페이지 완성</li>
      <li>시간 바 넣는 기능 구현</li>
    </details>
  </ol>
</details>

<br/>

## 트러블 슈팅
<h3>1. 달력 및 날짜 구현</h3>
<details>
<h3>트러블 슈팅 해결</h3>
<ol>
  <li>달력 구현을 어떻게 할 것이가? <a href="https://github.com/alaliyo/to-do-list/blob/main/src/components/ToDoListHeader.js">(해결)</a></li>
  <li>이전 달로 넘어갔을 때 달과 최대 일수변화 시 해당 달이 아닌 다른 날의 딸의 최대 일수를 불러옴.<br/>
  (해결) setDate시 직접 달 부분에 +1 또는 -1을 함</li>

  ```javascript
  const [maxDate, setMaxDate] = useState(new Date(year, month, 0).getDate());
  [date, setDate] = useState(new Date().getDate());
  
  // -
  setMaxDate(new Date(year, month-1, 0).getDate());
  setDate(new Date(year, month-1, 0).getDate());
  // +
  setMaxDate(new Date(year, month + 1, 0).getDate());
  ```

  <li>리모컨으로 날짜를 변경해고 글을 작성 시 데이터에 스케줄 날짜를 넣는데 불필요한 코드들이 많아짐<br/>
    (해결) State로 선어하여 하나의 값이 계속 변경되게 하고 다른 부분에 선언하여 사용하는 것으로 해결</li>
  
  ```javascript
  const [scheduleDate, setScheduleDate] = useState(new Date().toLocaleDateString().replace(/\./g, '').replace(/\s/g, '-'));
  
  const dateDown = () => {
      setDate(e => e - 1);
      setScheduleDate(new Date(year, month-1, date-1).toLocaleDateString().replace(/\./g, '').replace(/\s/g, '-'))
  }

  const dateUp = () => {
      setDate(e => e + 1);
      setScheduleDate(new Date(year, month-1, date+1).toLocaleDateString().replace(/\./g, '').replace(/\s/g, '-'))
  }
  // 데이터 전송 시
  createdDate: scheduleDate,
  ```
  
</ol>
</details>


<h3>2. 첫 배포</h3>
<details>
<h4> - 히스토리를 보면 알 수 있지만 많은 시도가 있었다. 여기서 여러가지 문제가 발생했었다. 그러면서 알게 된점.</h4>
<ol>
<li>github page는 한 index만 지원한다. BrowserRouter로 주소를 2개 이상 만들게 되면 메인 페이지를 제외한 다른 페지이는 404가 뜬다. </li>
<li>BrowserRouter를 배포하게 되면 새로고침 또는 다른 페이지 이동시 404가 뜬다.(해결 코드) firebase.json에 적용</li>

```
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
```

</ol>
</details>


<h3>3. 반응형 디자인</h3>
<details>
<h4> - 반응형 css는 공부만 해봤지 사용은 처음이다.</h4>
<ol>
<li>반응형이 처음이지만 css에 무난하게 적용을 했지만 js의 값을 변경하는 것을 못해 공부함. <br /> (해결) window.innerWidth를 사용해 크기 값을 주고 삼항연산자를 이용해 변경함.</li>
<li>웹 크기가 바뀔 때마가 값을 실시간으로 반환해야 하는데 하는 방법을 몰라 useEffect []에 뭘 넣을지 고민함. <br /> (해결)</li>

```
  const [dispWidSize, setDispWidSize] = useState(window.innerWidth);

  useEffect(()=> {
    const windowResize = () => {
      setDispWidSize(window.innerWidth)
    }
    window.addEventListener(`resize`, windowResize);
  }, []);
```

<li> 반응형 디자인을 구성했지 않아서 어떻게 해야할지 고민 중... 원하는 기능 추가되면 그려봐야 할 듯...</li>
</ol>
</details>


<h3>4. js date 내장함수의 ios에서 미지원 </h3>
<details>
<h4> - moment 라이브러리를 이용해 해결.</h4>
<ol>
<li>반응형을 만들고 안드로이드, ios 환경에서 잘 되는지 확인을 했는데 ios Date 내장함수 미지원으로 인한 오류 발생 <br />
(해결) moment 라이브러리를 활용해서 해결했으며 Date 관련 많은 코드들이 수정되고 위치도 변경하여 history 링크를 남김</li>
<a href="https://github.com/alaliyo/to-do-list/commit/a1ea3986f224c922527fc50f942ef3f68810a871">fix: ios에서 js date 함수들을 지원하지 않아 moment 라이브러리로 수정</a>
</ol>
</details>
