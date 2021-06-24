import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  useEffect(async() => {
    await axios.get('http://localhost:8080/allTasks').then(res => {
      setTasks(res.data);
    });
  });

  const addNewTask = async () => {
    await axios.post('http://localhost:8080/createTask', {
      text,
      isCheck: false
    }).then(res => {
      setText('');
      console.log(res.data);
    });
  };
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
              <input type='checkbox' isCheck={task.isCheck} />
              <span>{task.text}</span>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;