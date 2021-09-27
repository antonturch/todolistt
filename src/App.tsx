import React, {useState} from "react";
import "./App.css";
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import Container from '@mui/material/Container';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksType = { [key: string]: Array<TaskType> }

function App() {

    const TodolistID1 = v1();
    const TodolistID2 = v1();

    let [tasks, setTasks] = useState<TasksType>({
        [TodolistID1]: [{id: v1(), title: "HTML", isDone: true,},
            {id: v1(), title: "CSS", isDone: false,},
            {id: v1(), title: "JS", isDone: false,},],
        [TodolistID2]: [{id: v1(), title: "React", isDone: true,},
            {id: v1(), title: "Material UI", isDone: false,},
            {id: v1(), title: "Redux", isDone: false,},],
    })

    let [todolists, setTodolist] = useState<Array<TodolistType>>([
        {id: TodolistID1, title: "What to lern", filter: "all"},
        {id: TodolistID2, title: "What to buy", filter: "all"},
    ])

    const deleteTask = (taskId: string, TodolistId: string) => {
        debugger
        const undelTasks = tasks[TodolistId].filter((el) => el.id !== taskId)
        setTasks({...tasks, [TodolistId]: undelTasks})
    }

    const filterTasks = (filterValue: FilterType, TodolistId: string) => {
        debugger
        let filtredTodolist = todolists.find((el) => el.id === TodolistId);
        if (filtredTodolist) filtredTodolist.filter = filterValue;
        setTodolist([...todolists]);
    }

    const addNewTask = (title: string, TodolistId: string) => {
        debugger
        const newTask = {id: v1(), title: title, isDone: false,}
        tasks[TodolistId] = [newTask, ...tasks[TodolistId]]
        setTasks({...tasks})
    }

    const setIsDone = (taskId: string, TodolistId: string) => {
        debugger
        const findTask = tasks[TodolistId].find(el => el.id === taskId)
        if (findTask) {
            findTask.isDone = !findTask.isDone
        }
        setTasks({...tasks})
    }

    const deleteTodolist = (TodolistId: string) => {
        debugger
        setTodolist(todolists.filter((el) => el.id !== TodolistId))
    }

    const addNewTodolist = (title: string) => {
        debugger
        const newTodolistId = v1();
        const newTodolist: TodolistType = {id: newTodolistId, title: title, filter: "all"}
        setTodolist([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolistId]: []})
    }

    const setNewTaskTitle = (newTaskTitle: string, todolistId: string, taskId: string) => {
        debugger
        if (taskId !== todolistId) {
            let editTask = tasks[todolistId].find((el) => el.id === taskId)
            if (editTask) editTask.title = newTaskTitle;
            setTasks({...tasks})
        }
    }
    const setNewTodolistTitle = (newTodolistTitle: string, todolistId: string) => {
        debugger
        let editTodolist = todolists.find(el => el.id === todolistId)
        if (editTodolist) editTodolist.title = newTodolistTitle;
        setTodolist([...todolists])
    }

    const actions = [
        {icon: <FileCopyIcon/>, name: "Copy"},
        {icon: <SaveIcon/>, name: "Save"},
        {icon: <PrintIcon/>, name: "Print"},
        {icon: <ShareIcon/>, name: "Share"},
    ];

    return (
        <div className="App">
            <AddItemForm addNewItem={addNewTodolist}/>
            {todolists.map((el) => {
                debugger
                let tasksForTodolist = tasks[el.id]
                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(el => el.isDone === false)
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(el => el.isDone === true)
                }
                return <Todolist key={el.id} setNewTodolistTitle={setNewTodolistTitle} setNewTaskTitle={setNewTaskTitle}
                                 deleteTodolist={deleteTodolist}
                                 todolistId={el.id} filter={el.filter} title={el.title}
                                 tasks={tasksForTodolist}
                                 deleteTask={deleteTask}
                                 filterTasks={filterTasks} addNewTask={addNewTask} setIsDone={setIsDone}/>
            })}
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{position: "absolute", bottom: 16, right: 16}}
                icon={<SpeedDialIcon/>}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                    />
                ))}
            </SpeedDial>
        </div>
    );
}

export default App;