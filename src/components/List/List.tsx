import React from "react";
import ListItem from "../ListItem";
import "./List.scss";

interface itemsType {
    label:string,
    done:boolean,
    progress:boolean,
    active:boolean,
    id:number
}
interface dataTypes {
    data: itemsType[],
    activeHandle(itemKey:number):void,
    filter:string,
    size:number
}
const List:React.FC<dataTypes> = ({data,activeHandle,filter,size}) => {
    const listData = [...data].filter(el => {return (el.label.toLowerCase()).match(filter.toLowerCase())});
    //При получении списка задач создается отфильтрованная копия с учетом ключевого слова
    if(filter === ""){    //Если фильтр пуст, то выводится весь список
        return (
            <>
            <ul className="list">
                {data.map(el => {
                    return (
                        <ListItem size={size} activeHandle={() => activeHandle(el.id)} label={el.label} done={el.done} progress={el.progress} active={el.active} id={el.id} key={el.id}/>
                    );
                })}
            </ul>
        </>
        );
    }
    return (            //Иначе рендерится только те item'ы которые подходят по ключевому слову 
        <>
            <ul className="list">
                {listData.map(el => {
                    return (
                        <ListItem size={size} activeHandle={() => activeHandle(el.id)} label={el.label} done={el.done} progress={el.progress} active={el.active} id={el.id} key={el.id}/>
                    );
                })}
            </ul>
        </>
    );
};

export default List;
