import React, {ChangeEvent, useState} from "react";
import {FilterType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import "./App.css";

import {Button, Checkbox, IconButton, Paper, Tooltip, TextField, Grid} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";


export type TodolistPropsType = {
    setNewTodolistTitle: (newTodolistTitle: string, todolistId: string) => void
    todolistId: string
    filter: FilterType
    title: string
    tasks: Array<TaskType>
    deleteTask: (taskId: string, TodolistId: string) => void
    filterTasks: (filterValue: FilterType, id: string) => void
    addNewTask: (title: string, TodolistId: string) => void
    setIsDone: (taskId: string, TodolistId: string) => void
    deleteTodolist: (todolistId: string) => void
    setNewTaskTitle: (newTaskTitle: string, todolistId: string, taskId: string) => void
}

export const Todolist = ({
                             setNewTodolistTitle,
                             setNewTaskTitle,
                             deleteTodolist,
                             todolistId,
                             title,
                             tasks,
                             deleteTask,
                             filterTasks,
                             addNewTask,
                             setIsDone,
                             filter
                         }: TodolistPropsType) => {
    const tasksElements = tasks.map(el => {

        const isDoneHandler = (taskId: string, TodolistId: string) => {
            setIsDone(taskId, TodolistId)
        }

        const setNewTaskTitleHandler = (newTaskTitle: string, todolistId: string, taskId: string) => {
            setNewTaskTitle(newTaskTitle, todolistId, taskId)
        }
        const label = {inputProps: {"aria-label": "Checkbox demo"}};
        return <li className={el.isDone ? "is-done" : ""} key={el.id}>

            <Checkbox checked={el.isDone}
                      onChange={() => isDoneHandler(el.id, todolistId)}
                      {...label}
                      icon={<BookmarkBorderIcon/>}
                      checkedIcon={<BookmarkIcon/>}
            />
            <EditableSpan setNewItemTitleHandler={(newTaskTitle) =>
                setNewTaskTitleHandler(newTaskTitle, todolistId, el.id)}
                          title={el.title}/>
            <IconButton aria-label="delete" size="small">
                <DeleteIcon onClick={() => deleteTask(el.id, todolistId)} fontSize="inherit"/>
            </IconButton>
        </li>
    })

    const allBtn = () => filterTasks("all", todolistId)
    const actvBtn = () => filterTasks("active", todolistId)
    const complBtn = () => filterTasks("completed", todolistId)

    const addNewItem = (newItemText: string) => {
        addNewTask(newItemText, todolistId)
    }


    return (
            <Paper style={{padding: "20px"}} elevation={2}>
            <h3 style={{textAlign: "center"}}><EditableSpan
                setNewItemTitleHandler={(newTodolistTitle) => setNewTodolistTitle(newTodolistTitle, todolistId)}
                title={title}/>
                <Tooltip title="Delete">
                    <IconButton aria-label="delete" size="small">
                        <DeleteIcon onClick={() => deleteTodolist(todolistId)} fontSize="inherit"/>
                    </IconButton>
                </Tooltip>
            </h3>
            <AddItemForm addNewItem={addNewItem}/>
            <ul>
                {tasksElements}
            </ul>
            <div>
                <Button size={"small"} variant={filter === "all" ? "contained" : "outlined"}
                        onClick={allBtn}>All</Button>
                <Button size={"small"} variant={filter === "active" ? "contained" : "outlined"}
                        onClick={actvBtn}>Active</Button>
                <Button size={"small"} variant={filter === "completed" ? "contained" : "outlined"}
                        onClick={complBtn}>Completed</Button>
            </div>
            </Paper>
    )
}

export type EditableSpanPropsType = {
    title: string
    setNewItemTitleHandler: (newTaskTitle: string) => void
}

export const EditableSpan = ({title, setNewItemTitleHandler}: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [taskTitle, setTaskTitle] = useState<string>(title)
    const correctTask = (event: ChangeEvent<HTMLInputElement>) => {
        debugger
        let newTaskTitle = event.currentTarget.value;
        setTaskTitle(newTaskTitle)
        setNewItemTitleHandler(newTaskTitle)
    }
    const onBlurHandler = () => setEditMode(false)
    return (
        <span>
            {editMode && <TextField multiline variant={"standard"} onChange={correctTask} value={taskTitle} autoFocus onBlur={onBlurHandler}/>}
            {editMode || <span style={{wordWrap: "break-word"}} onDoubleClick={() => setEditMode(true)}>{taskTitle}</span>}
        </span>
    )
}
