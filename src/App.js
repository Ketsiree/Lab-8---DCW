import React, { useState, useEffect } from 'react'
import { firestore } from './index'
import 'firebase/firestore'
import Task from './Task'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

function App() {

  const [tasks, setTasks] = useState([
    { id: 1, name: "do homework" },
    { id: 2, name: "write node js" }
  ]);

  const [name, setName] = useState('')

  useEffect(() => {
    retriverData()
  }, [])

  const retriverData = () => {
    firestore.collection("task").onSnapshot((snapshot) => {
      console.log(snapshot.docs)
      let mytask = snapshot.docs.map(d => {
        const { id, name } = d.data()
        return { id, name }
      })
      setTasks(mytask)
    })
  }

  const addTask = () => {
    let id = (tasks.length === 0) ? 1 : tasks[tasks.length - 1].id + 1
    firestore.collection("task").doc(id.toString()).set({ id, name })
  }


  const renderTask = () => {
    if (tasks && tasks.length) {
      return (tasks.map((text, index) => {
        return (
          <Task key={index} task={text} deleteTask={deleteTask} editTask={editTask} />
        )
      }
      )
      )
    }
    else
      return (<ll> No task </ll>)
  }
  const editTask = (id) => {
    firestore.collection("task").doc(id + '').set({ id, name })
  }
  const deleteTask = (id) => {
    firestore.collection("task").doc(id + '').delete()
  }

  return (
    <div>
      <div>
        <input type="text" name="name" onChange={(e) => setName(e.target.value)} />
        <div>
          <Button variant="outline-primary" onClick={addTask}>Add</Button>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        {
          renderTask()
        }
      </div>
    </div>
  );
}
export default App;

//Hello















