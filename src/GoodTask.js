import React from 'react';
import axios from 'axios';
import del from '../src/del.png';
import dit from '../src/dit.png';

const GoodTask = ({index, task, setIndex, setNewText, setTasks}) => {

  const editTask = (index) => {
    setIndex(index);
    setNewText(task.text);
  }; //edit task

  const deleteTask = async (index) => {
    await axios.delete(`http://localhost:8080/deleteTask?_id=${task._id}`).then((res) => {
      setTasks(res.data);
    });
  }; //delete task

  const checkboxChange = async (index) => {
    const { _id, isCheck } = task;
    await axios.patch("http://localhost:8080/updateTask", {
      _id,
      isCheck: !isCheck
    }).then((res) => {
      setTasks(res.data);
      });
  }; //change checkbox

  return (
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
}

export default GoodTask;