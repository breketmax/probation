import React from "react";
import "./ListItem.scss";

interface itemType {
    label:string,
    done:boolean,
    progress:boolean,
    active:boolean,
    id:number,
    activeHandle(itemKey:number):void,
    size:number
}
const ListItem:React.FC<itemType> = ({label,done,progress,active,id,activeHandle,size}) => {
    const respLabel = (size < 125 && label.length > 4) ? label.slice(0,2) + "...":
                      (size < 175 && label.length > 6) ? label.slice(0,5) + "...":
                      (size < 190 && label.length > 14) ? label.slice(0,8) + "...":
                      (size < 250 && label.length > 14) ? label.slice(0,10) + "...":
                      (size < 300 && label.length > 18) ? label.slice(0,15) + "...":
                      (size < 350 && label.length > 20) ? label.slice(0,18) + "...":
                      (size < 400 && label.length > 30) ? label.slice(0,20) + "...":
                      (size < 500 && label.length > 35) ? label.slice(0,24) + "...":
                      (size < 600 && label.length > 40) ? label.slice(0,25) + "...":
                      (size < 700 && label.length > 50) ? label.slice(0,30) + "...":label;
                      //Обрезания имени в зависимости от ширины окна задач
    return (
        <>
            <li 
                className = {"list-item" + (progress ? " progress": "")  + (done ? " done" : "")    + (active ? " active" : "")}
                onClick={() => activeHandle(id)}
            >{respLabel}</li>    
            {/* элемент списка задач с классами из его состояние, по клику в App передается id элемента и он становится активным */}
        </>
    );
};

export default ListItem;
