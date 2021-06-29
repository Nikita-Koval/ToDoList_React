import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditingTask from './EditingTask';
import GoodTask from './GoodTask';
import './App.scss';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [indexEdit, setIndex] = useState(null);
  const [newText, setNewText] = useState("");

  tasks.sort((a, b) => a.isCheck - b.isCheck);

  useEffect(async() => {
    await axios.get('http://localhost:8080/allTasks').then(res => {
      setTasks(res.data);
    });
  }); //get all tasks

  const addNewTask = async () => {
    if(text === '') {
      alert('Enter your text !') } else {
        await axios.post('http://localhost:8080/createTask', {
          text,
          isCheck: false
        }).then(res => {
          setText(res.data);
          setText('');
        });
  }
  }; //create task

  const enterFunc = (event) => {
    if(event.key === 'Enter'){
      addNewTask()
    }
  } //adding by Enter
  
  return (
    <div className='logo'>
      <header>
        <h1>To do list:</h1>
        <div className='control'>
          <input 
            type='text'
            placeholder='Enter your text...'
            className='inputText'
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(event) => enterFunc(event)}
          />
          <button 
            className='btnAdd'
            onClick={() => addNewTask()}>Add</button>
        </div>
      </header>

      <div className='tasksCont'>
        {
          tasks.map((task, index) => {
            return indexEdit === index ? 
            (<EditingTask 
                key={`task-${index}`} 
                index={index} 
                task={task} 
                setTasks={setTasks} 
                setIndex={setIndex} />) 
                : 
            (<GoodTask 
                key={`task-${index}`} 
                index={index}  
                task={task} 
                setIndex={setIndex} 
                setNewText={setNewText} 
                setTasks={setTasks} />)
      })
    }
      </div>
    </div>
  );
}

export default App;