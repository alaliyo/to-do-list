import { useState, useEffect } from 'react';
import { dbService } from '../firebase';
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import ToDo from "./ToDo";

function ToDoListBody({ userObj }) {
    const [toDoList, setToDoList] = useState([]);

    // Get
    useEffect(() => {
        const q = query(
            collection(dbService, "to-do-lists"),
            orderBy("userId", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const toDoListArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
        setToDoList(toDoListArr);
        });
    }, [])

    return (
        <div>
            {userObj === null ? null : toDoList.map(e => (
                <ToDo key={e.id} toDoObj={e} isOwner={e.userId === userObj.email}/>
            ))}
        </div>
    );
}

export default ToDoListBody;

