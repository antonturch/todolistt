import React, {ChangeEvent, useState} from "react";
import {FilterType, TaskType} from "./AppWithReducers";
import {AddItemForm} from "./AddItemForm";
import "./App.css";
import {Button, Checkbox, IconButton, Paper, TextField, Tooltip} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {AddTaskAC, ChangeTaskTitleAC, CheckboxChangeAC, RemoveTaskAC} from "./state/task-reducer";


export type TodolistPropsType = {
    setNewTodolistTitle: (newTodolistTitle: string, todolistId: string) => void
    todolistId: string
    filter: FilterType
    title: string
    filterTasks: (todolistId: string, newTodolistFilter: FilterType) => void
    deleteTodolist: (todolistId: string) => void
}

export const Todolist = ({
                             setNewTodolistTitle,
                             deleteTodolist,
                             todolistId,
                             title,
                             filterTasks,
                             filter
                         }: TodolistPropsType) => {
    console.log("Todolist rendered")

    const dispatch = useDispatch();
    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todolistId])
    const deleteTask = (todolistId: string, taskId: string) => {
        dispatch(RemoveTaskAC(todolistId, taskId))
    }

    const addNewTask = (todolistId: string, newTaskTitle: string) => {
        dispatch(AddTaskAC(todolistId, newTaskTitle))
    }

    const setIsDone = (todolistId: string, taskId: string) => {
        dispatch(CheckboxChangeAC(todolistId, taskId))
    }

    const setNewTaskTitle = (todolistId: string, taskId: string, newTaskTitle: string) => {
        dispatch(ChangeTaskTitleAC(todolistId, taskId, newTaskTitle))
    }

    let tasksForTodolist = tasks
    if (filter === "active") {
        tasksForTodolist = tasks.filter((el: TaskType) => el.isDone === false)
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter((el: TaskType) => el.isDone === true)
    }

    const tasksElements = tasksForTodolist.map(el => {

        const isDoneHandler = (TodolistId: string, taskId: string) => {
            setIsDone(TodolistId, taskId)
        }

        const setNewTaskTitleHandler = (todolistId: string, taskId: string, newTaskTitle: string) => {
            setNewTaskTitle(todolistId, taskId, newTaskTitle)
        }
        const label = {inputProps: {"aria-label": "Checkbox demo"}};
        return <li className={el.isDone ? "is-done" : ""} key={el.id}>

            <Checkbox checked={el.isDone}
                      onChange={() => isDoneHandler(todolistId, el.id)}
                      {...label}
                      icon={<BookmarkBorderIcon/>}
                      checkedIcon={<BookmarkIcon/>}
            />
            <EditableSpan setNewItemTitleHandler={(newTaskTitle) =>
                setNewTaskTitleHandler(todolistId, el.id, newTaskTitle)}
                          title={el.title}/>
            <IconButton aria-label="delete" size="small">
                <DeleteIcon onClick={() => deleteTask(todolistId, el.id)} fontSize="inherit"/>
            </IconButton>
        </li>
    })

    const allBtn = () => filterTasks(todolistId, "all")
    const actvBtn = () => {
        filterTasks(todolistId, "active")
    }
    const complBtn = () => filterTasks(todolistId, "completed")

    const addNewItem = (newItemText: string) => {
        addNewTask(todolistId, newItemText)
     }


    return (
        <Paper style={{padding: "20px"}} elevation={2}>
            <h3 style={{textAlign: "center"}}><EditableSpan
                setNewItemTitleHandler={(newTodolistTitle) => setNewTodolistTitle(newTodolistTitle,
                    todolistId)}
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
        let newTaskTitle = event.currentTarget.value;
        setTaskTitle(newTaskTitle)
        setNewItemTitleHandler(newTaskTitle)
    }
    const onBlurHandler = () => setEditMode(false)
    return (
        <span>
            {editMode &&
            <TextField multiline variant={"standard"} onChange={correctTask} value={taskTitle} autoFocus
                       onBlur={onBlurHandler}/>}
            {editMode || <span style={{wordWrap: "break-word"}}
                               onDoubleClick={() => setEditMode(true)}>{taskTitle}</span>}
        </span>
    )
}
