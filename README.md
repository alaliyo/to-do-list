# to-do-list
<h2>기획</h2>
<h3> - 회원 가입 후 자신의 스케줄을 날자에 맞게 반환하며 추가, 수정, 삭제를 자유롭게 하는 것! </h3>
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
