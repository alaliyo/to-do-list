import { useState, useEffect } from 'react';
import { dbService } from '../../firebase';
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import ToDo from "./ToDo";

function ToDoListBody({ userObj, lookupDate, dispWidSize }) {
    const [toDoList, setToDoList] = useState([]);

    // Get 게시물
    useEffect(() => {
        const q = query(
            collection(dbService, userObj === null ? "to-do-list" : userObj.email),
            orderBy("userId", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const toDoListArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
        setToDoList(toDoListArr);
        });
    }, [userObj])

    return (
        <div>
            {userObj === null ? null : toDoList.map(e => (
                <ToDo key={e.id} dispWidSize={dispWidSize} toDoObj={e} userObj={userObj} isOwner={e.userId === userObj.email} DateOwner={lookupDate === e.createdDate}/>
            ))}
        </div>
    );
}

export default ToDoListBody;

