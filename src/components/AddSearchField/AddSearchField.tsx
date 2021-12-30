import React, { useState } from "react";
import "./AddSearch.scss";
import add from "../img/plus.png";
import search from "../img/search.png";
interface fieldType{
    addHandle(taskName:string):void,
    filterHandle(taskName:string):void
}

const AddSearchField:React.FC<fieldType> = ({addHandle,filterHandle}) => {
    const [taskName,setTaskName] = useState<string>("");
    const changeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value === ""){
            filterHandle("")
        }
        setTaskName(e.target.value);
    };
    return (
        <div className="field-box">
            <input type="text" className="field-input" placeholder="Search or add task" onChange={changeHandle} value={taskName}/>
            <div className="button-box">
                <button className="field-button"><img src={add} alt="add-icon" onClick={()=> {addHandle(taskName);setTaskName("")}}/></button>
                <button className="field-button"><img src={search} alt="search-icon" onClick={() =>  filterHandle(taskName)}/></button>
            </div>
        </div>
    );
};

export default AddSearchField;