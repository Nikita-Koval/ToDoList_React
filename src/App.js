import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

    const style = {
    color: 'red',
    fontSize:  '42px',
    marginLeft: '50px'
  }

  useEffect(async() => {
    await axios.get('http://localhost:8080/allTasks').then(res => {
      setTasks(res.data);
    });
  }); //get all tasks

  const addNewTask = async () => {
    await axios.post('http://localhost:8080/createTask', {
      text,
      isCheck: false
    }).then(res => {
      setText('');
      setText(res.data.data);
    });
  }; //create task

  const checkboxChange = async (index) => {
    const { _id, isCheck } = tasks[index];
    await axios.patch("http://localhost:8080/updateTask", {
        _id,
        isCheck: !isCheck,
      }).then((res) => {
        setTasks(res.data);
      });
  }; //chenge checkbox

  const deleteTask = async (index) => {
    await axios.delete(`http://localhost:8080/deleteTask?_id=${tasks[index]._id}`).then((res) => {
      setTasks(res.data);
    });
    }; //delete task
  
  return (
    <div className='logo'>
      <header>
        <h1>To do list:</h1>
        <input type='text' value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={() => addNewTask()}>Add</button>
      </header>
      <div>
        {
          tasks.map((task, index) => 
            <div key={`task-${index}`}>
              <input className="taskCheck"
                type="checkbox"
                checked={task.isCheck}
                onChange={() => checkboxChange(index)}
              />
              <span>{task.text}</span>
              <span style={style} onClick={() => deleteTask(index)}>X</span>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;