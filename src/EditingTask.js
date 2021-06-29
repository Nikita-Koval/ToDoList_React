import React, {useState, useEffect} from 'react';
import axios from 'axios';
import accept from '../src/accept.ico';
import canc from '../src/canc.png';

const EditingTask = ({index, task, setTasks, setIndex}) => {
  const [newText, setNewText] = useState(task.text);

  useEffect(async() => {
    await axios.get('http://localhost:8080/allTasks').then(res => {
      setTasks(res.data);
    });
  }); //get all tasks

  const doneTask = async (index) => {
    const { _id } = task;
    if(newText === '') {
      alert('Enter your text !') } else {
        await axios.patch("http://localhost:8080/updateTask", {
          _id,
          text: newText
        }).then((res) => {
        setTasks(res.data);
        });
    setIndex();
    }
  };

  const cancelTask = (index) => {
    setIndex();
  }; //quit from editing task

  return (
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
  )
}

export default EditingTask;