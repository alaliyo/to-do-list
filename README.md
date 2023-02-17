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
  <li>이전 달로 넘어갔을 때 최대 일수를 어떻게 구현할 것인가</li>

  ```javascript
  const [maxDate, setMaxDate] = useState(new Date(year, month, 0).getDate());
  [date, setDate] = useState(new Date().getDate());
  
  // -
  setMaxDate(new Date(year, month-1, 0).getDate());
  setDate(new Date(year, month-1, 0).getDate());
  // +
  setMaxDate(new Date(year, month + 1, 0).getDate());
  ```

  <li>해달 달력에서 To-Do를 장성했을 때 어떻게 데이터 값으로 데이터 베이스에 넘기냐 (해결)</li>
  
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
