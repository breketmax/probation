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
    const changeHandle = (e: React.ChangeEvent<HTMLInputElement>) => { //Функция изменения значения input'a
        if(e.target.value === ""){
            filterHandle("")                    //если input пуст, показывается весь список задач без необходимости нажатия на кнопку поиска
        }
        setTaskName(e.target.value);     //изменение состояния значения input'a
    };
    return (
        <div className="field-box">
            <input type="text" className="field-input" placeholder="Search or add task" onChange={changeHandle} value={taskName}/>
            <div className="button-box">
                <button className="field-button"><img src={add} alt="add-icon" onClick={() => {addHandle(taskName);setTaskName("")}}/></button>
                {/* По клику, в App передается имя новой задачи и очистка поля ввода */}
                <button className="field-button"><img src={search} alt="search-icon" onClick={() =>  filterHandle(taskName)}/></button>
                {/* По клику, в App передается ключевое слово фильтра */}
            </div>
        </div>
    );
};

export default AddSearchField;