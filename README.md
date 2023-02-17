# to-do-list
<h2>기획</h2>
<h3> - 회원 가입 후 자신의 스케줄을 날자에 맞게 반환하며 추가, 수정, 삭제를 자유롭게 하는 것! </h3>
<br/>

## 트러블 슈팅
<h3>1. 달력 및 날짜 구현</h3>
<details>
<h3> - 고민</h3>
<ol>
  <li>달력 구현을 어떻게 할 것이가? <a href="https://github.com/alaliyo/to-do-list/blob/main/src/components/ToDoListHeader.js">(해결)</a></li>
  <li>1일 이전 또는 마지막 일수 이후 시 달과 년도를 어떻게 바꿀 것인가 <a href="https://github.com/alaliyo/to-do-list/blob/main/src/components/ToDoListHeader.js#:~:text=useEffect((,1%5D)">(해결)</a></li>
  <li>이전 달로 넘어갔을 때 최대 일수를 어떻게 구현할 것인가
  <details>
  ```javascript
  const [maxDate, setMaxDate] = useState(new Date(year, month, 0).getDate());
  [date, setDate] = useState(new Date().getDate());
  
  // -
  setMaxDate(new Date(year, month-1, 0).getDate());
  setDate(new Date(year, month-1, 0).getDate());
  // +
  setMaxDate(new Date(year, month + 1, 0).getDate());
  ```
  </details>
   </li>
  <li>해달 달력에서 To-Do를 장성했을 때 어떻게 데이터 값으로 데이터 베이스에 넘기냐 (해결)</li>
</ol>
<h4> - 트러블</h4>
<ol>
  <li>일 +- 리모컨을 누를 시 달 변동 될 경우 원하는 일이 나오지 않음</li>
  <li>useEffect의 []안에 date를 넣어 계속 호출하는 상황 발생</li>
</ol>
<h4> - 해결</h4>
<ol>
  <li>new Date시 month가 당일 값을 반환하지 않아서 생기는 오류 증가 시 +1 감소 시 -1 붙임으로 해결</li>
  <li>블린 형태로 조건을 넣어서 해결</li>
</ol>
</details>
