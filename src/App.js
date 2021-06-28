import React, {useState, useEffect} from 'react';
import './App.scss';
import axios from 'axios';
import accept from '../src/accept.ico'
import canc from '../src/canc.png'
import del from '../src/del.png'
import dit from '../src/dit.png'

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
  } //addingg by Enter
  
  const checkboxChange = async (index) => {
    const { _id, isCheck } = tasks[index];
    await axios.patch("http://localhost:8080/updateTask", {
      _id,
      isCheck: !isCheck
    }).then((res) => {
      setTasks(res.data);
      });
  }; //change checkbox

  const editTask = (index) => {
    setIndex(index);
    setNewText(tasks[index].text);
  }; //edit task

  const doneTask = async (index) => {
    const { _id } = tasks[index];
    if(newText === '') {
      alert('Enter your text !') } else {
    await axios.patch("http://localhost:8080/updateTask", {
      _id,
      text: newText,
    }).then((res) => {
      setTasks(res.data);
      });
    setIndex();
  }
  };

  const cancelTask = (index) => {
    setIndex();
  }; //quit from editing task

  const deleteTask = async (index) => {
    await axios.delete(`http://localhost:8080/deleteTask?_id=${tasks[index]._id}`).then((res) => {
      setTasks(res.data);
    });
  }; //delete task
  
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
            return indexEdit === index ? (
              <div className='textEdit' key={`task-${index}`}>
                <input
                type="text"
                onChange={(e) => setNewText(e.target.value)}
                value={newText}
                />
                <img
                src={accept}
                onClick={() => doneTask(index)}
              />
                <img
                src={canc}
                onClick={() => cancelTask(index)}
              />
              </div>
            ) : (
            <div
            className='wrapper'
            key={`task-${index}`}>
              <div className='taskCont'>
                <input className="taskCheck"
                type="checkbox"
                checked={task.isCheck}
                onChange={() => checkboxChange(index)}
                />
                <span className={task.isCheck ? "doneTask" : "textTask"}>{task.text}</span>
                <div className='imgCont'>
                  <img
                  src={dit}
                  onClick={() => editTask(index)}
                  />
                  <img
                  src={del}
                  onClick={() => deleteTask(index)}
                  />
                </div>
              </div>
            </div>
            )
      })
    }
      </div>
    </div>
  );
}

export default App;