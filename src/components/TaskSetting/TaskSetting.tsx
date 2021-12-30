import React, { ChangeEvent, useEffect, useState } from "react";
import "./TaskSetting.scss";
import binImg from "../img/bin.png";
import editImg from "../img/edit-text.png";
import completeImg from "../img/checked.png";
import progressImg from "../img/time.png";
import tickImg from "../img/tick.png";

interface itemsType {
    label:string,
    done:boolean,
    progress:boolean,
    active:boolean,
    id:number    
}
interface dataTypes {
    data: itemsType[],
    deleteHandle(itemKey:number):void,
    progressHandle(itemKey:number):void,
    doneHandle(itemKey:number):void,
    changeHandle(newName:string, itemKey:number):void,
    size:number
}
const TaskSetting:React.FC<dataTypes> = ({data,deleteHandle,progressHandle,doneHandle,changeHandle,size}) =>{
    const activeEl = data.filter(el => el.active)[0];
    const [newName,setNewName] = useState<string>("");
    const [edit,setEdit] = useState<boolean>(false);
    const nameHandle = (e:ChangeEvent<HTMLInputElement>) => {
        setNewName(e.target.value);
    };
    useEffect(()=>{
        setEdit(false);
    },[activeEl]);
    if (typeof activeEl === 'undefined'){
        return (
            <div className="task-header"><h1>Select or add task</h1></div>
        )
    }   
    const respLabel = (size < 345 && activeEl.label.length > 20) ? activeEl.label.slice(0,15) + "...":
                      (size < 500 && activeEl.label.length > 25) ? activeEl.label.slice(0,18) + "...":
                      (size < 650 && activeEl.label.length > 30) ? activeEl.label.slice(0,25) + "...":
                      (size < 700 && activeEl.label.length > 35) ? activeEl.label.slice(0,28) + "...":
                      activeEl.label;
    return (
        
        <>
            <div className="task-header">{edit ? <><input autoFocus placeholder="Enter new task name" onChange={nameHandle} type="text"/><button onClick={() => {changeHandle(newName,activeEl.id);setEdit(false);}}><img src={tickImg} alt="tick-icon"/></button></> : <h1>{respLabel}</h1>}</div>
            <div className="task-button-box">
                <div className="button-row">
                    <button className="setting-button delete" onClick={() => deleteHandle(activeEl.id)}><img src={binImg} alt="bin-icon" /></button>
                    <button className="setting-button edit" onClick={()=> setEdit(true)}><img src={editImg} alt="pen-icon" /></button>
                </div>
                <div className="button-row">
                    <button className={"setting-button progress " + (activeEl.progress ? "in-state" : "")} onClick={() => progressHandle(activeEl.id)}><img src={progressImg} alt="progress-icon" /></button>
                    <button className={"setting-button done " + (activeEl.done ? "in-state" : "")} onClick={() => doneHandle(activeEl.id)}><img src={completeImg} alt="complete-icon" /></button>
                </div>     
            </div>           
        </>
    );
};

export default TaskSetting;