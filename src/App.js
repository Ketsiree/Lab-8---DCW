import React, { useState, useEffect } from 'react';
import './Task.css';
import { firestore } from 'firebase';

function App() {
  const [task,setTask] = useState([
    { id: 1,name: 'do homework'},
    { id: 2,name: 'write node js'}
  ])
  
useEffect (() => {})

const retriveData = () => {
  firestore.Collection("tasks").onSnapshotS ( (snapshot)) =>{
console.log(snapshot.docs)
let myTask = snapshot.docs.map{ d => {
  const {id,name} = d.data()
  console.log (id,name)
  return {id,name}
}}
  setTask
  })
}

const deleteTask = (id) => {
  firestore.collection("task").docs(id+'').delete()
}


const renderTask = () => {
  console.log(task)
  if (tasks && tasks.length) {
    return tasks.map((task,index) =>{
      return (
        <li key = {index} >
          {task.id} : {task.name}

          
          <button onClick = { () => deleteTask{task.id}}> delete </button>
          <button onClick = { () => deleteTask{task.id}}> delete </button>

          
        </li>
      )
    })
  } else {
    return <li> No task </li>
  }
}

export default App;
