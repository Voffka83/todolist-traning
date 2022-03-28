import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from "./App";

type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodolistProps = {
    todolistTitle: string
    button: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    addTasks: (title: string) => void
    changeStatus: (id: string, isDone: boolean) => void
    filter: FilterValueType
}

export function Todolist(props: TodolistProps) {
    let [newTasksTitle, setNewTasksTitle] = useState("")

    let [error, setError] = useState <string | null> (null)

    let onAddTasksHandler = () => {
        if (newTasksTitle.trim() !== "" && newTasksTitle !== "kaka") {
            props.addTasks(newTasksTitle.trim())
            setNewTasksTitle("")
        } else{
            setError("Title is required")
        }
    }

    let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTasksTitle(e.currentTarget.value)
        // props.changeStatus(t.id, setNewTasksTitle)
    }

    let onKeyPresHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            onAddTasksHandler()
        }
    }

    let onAllClickHandler = () => {
        props.changeFilter("All")
    }
    let onActiveClickHandler = () => {
        props.changeFilter("Active")
    }
    let onCompletedClickHandler = () => {
        props.changeFilter("Completed")
    }

    return (
        <div>
            <h3>{props.todolistTitle}</h3>
            <div>
                <input value={newTasksTitle}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPresHandler}
                       className={error ? "error" : ""}
                />

                <button onClick={onAddTasksHandler}>{props.button}</button>
                {error && <div className="error-message">{error}</div>}

            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        let onClickHandler = () => {props.removeTask(t.id)}
                        let onChangeHandler =( e: ChangeEvent<HTMLInputElement>) =>{
                            props.changeStatus(t.id, e.currentTarget.checked)}
                        return (
                            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <input type="checkbox"
                                       onChange={onChangeHandler}
                                       checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={onClickHandler}>-x-</button>
                            </li>
                        )
                    })
                }
            </ul>

            <div>
                <button className={props.filter === "All" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "Active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "Completed" ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}