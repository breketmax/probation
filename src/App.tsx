import React, { ChangeEvent, useState } from 'react';
import "./App.scss";
import AddSearchField from './components/AddSearchField';
import List from './components/List';
import TaskSetting from './components/TaskSetting';

interface todoDataTypes{
  label:string,
  done:boolean,
  progress:boolean,
  active:boolean,
  id:number
}

const App:React.FC = () => {
  const [filter,setFilter] = useState<string>("");
  const [size,setSize] = useState<number>(400);
  const [todoData,setTodoData] = useState<todoDataTypes[]>([
                                          {"label":"Make awesome app","done":false, "progress":false,"active":true,"id":1},
                                          {"label":"Drink coffee","done":true, "progress":false,"active":false,"id":2},
                                          {"label":"Complete probation","done":false, "progress":false,"active":false,"id":3},
                                          {"label":"Finish project","done":false, "progress":false,"active":false,"id":4},
                                          {"label":"Turn off light","done":false, "progress":true,"active":false,"id":5}]);
  const deleteHandle = (itemKey:number) => {
    const todoDataCopy = [...todoData].filter(el => el.id !== itemKey );
    setTodoData(todoDataCopy);
  };
  const progressHandle = (itemKey:number) => {
    const todoDataCopy = [...todoData].map(el => {
      if(el.id === itemKey){
        el.progress = true;
        el.done = false;
      }
      return el;
    });
    setTodoData(todoDataCopy);
  };
  const doneHandle = (itemKey:number) => {
    const todoDataCopy = [...todoData].map(el => {
      if(el.id === itemKey){
        el.done = true;
        el.progress= false;
      }
      return el;
    });
    setTodoData(todoDataCopy);
  };
  const activeHandle = (itemKey:number) => {
    const todoDataCopy = [...todoData].map(el => {
      if (el.id === itemKey){
        el.active = true;
      }
      else{
        el.active = false
      }
      return el;
    });
    setTodoData(todoDataCopy);
  };
  const addHandle = (taskName:string) => {
    if(taskName !== ""){
      const newId = todoData.length === 0 ? 1 : todoData[todoData.length-1].id+1;
      const newTask = {"label":taskName,"done":false, "progress":false,"active":false,"id":newId};
      const todoDataCopy = [...todoData, newTask];
      setTodoData(todoDataCopy);
    }
  };
  const filterHandle = (taskName:string) => {
    setFilter(taskName);
  };
  const changeHandle = (newName:string,itemKey:number) =>{
    const todoDataCopy = [...todoData].map(el => {
      if(el.id === itemKey){
        el.label = newName;
        return el;
      }
      return el;
    });
    setTodoData(todoDataCopy);
  };
  const resizeHandle = (e:ChangeEvent<HTMLInputElement>) => {
    setSize(Number(e.target.value));
  };
  return (
    <div className="container">
      <div className="todo-list">
        <div className="tasks" style={{width:size}}>
          <AddSearchField addHandle={addHandle} filterHandle={filterHandle}/>
          <List activeHandle={activeHandle} data={todoData} filter={filter} size={size}/>
          <input className="resize" type="range" min="100" max="800" step="0.1" value={size} onChange={resizeHandle}/>
        </div>

        <div className="task-settings" style={{width:1140-size}}>
            <TaskSetting size={1140-size} data={todoData} deleteHandle={deleteHandle} doneHandle={doneHandle} progressHandle={progressHandle} changeHandle={changeHandle}/> 
        </div>
      </div>

    </div>
  );
}

export default App;
