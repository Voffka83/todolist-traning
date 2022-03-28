import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from 'uuid';
// import {title} from 'process';

export type FilterValueType = "All" | "Active" | "Completed";

function App() {
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: false},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "GIT", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "RestAPI", isDone: true},
        {id: v1(), title: "GraphQL", isDone: false}
    ]);

    let [filter, setFilter] = useState<FilterValueType>("All")
    let tasksForTodoList = tasks;
    if (filter === "Active") {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }
    if (filter === "Completed") {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks)
    }

    function changeFilter(value: FilterValueType) {
        setFilter(value);
    }

    function addTasks(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }

    function changeStatus(id: string, isDone: boolean) {
        let task = tasks.find(t => t.id === id)
        if (task) {  //псевдо истина/псевдо ложь это выражение - если nask существует, то поменять значение
            task.isDone = isDone;
        }
        setTasks([...tasks])

    }

    return (
        <div className="App">
            <Todolist todolistTitle="What to learn"
                      button="Add"
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTasks={addTasks}
                      changeStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
