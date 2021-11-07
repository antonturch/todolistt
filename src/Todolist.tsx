import React, {ChangeEvent, useCallback, useState} from "react";
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

export const Todolist = React.memo(({
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


    const addNewTask = useCallback((todolistId: string, newTaskTitle: string) => {
        dispatch(AddTaskAC(todolistId, newTaskTitle))
    }, [dispatch])

    const setIsDone = useCallback((todolistId: string, taskId: string) => {
        dispatch(CheckboxChangeAC(todolistId, taskId))
    }, [dispatch])

    const setNewTaskTitle = useCallback((todolistId: string, taskId: string, newTaskTitle: string) => {
        dispatch(ChangeTaskTitleAC(todolistId, taskId, newTaskTitle))
    }, [dispatch])

    let tasksForTodolist = tasks
    if (filter === "active") {
        tasksForTodolist = tasks.filter((el: TaskType) => el.isDone === false)
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter((el: TaskType) => el.isDone === true)
    }

    const setNewTodolistItem = useCallback((newTodolistTitle: string) => {
        setNewTodolistTitle(newTodolistTitle, todolistId)
    }, [setNewTodolistTitle, todolistId])

    const tasksElements = tasksForTodolist.map(
        el => <Task setIsDone={setIsDone} setNewTaskTitle={setNewTaskTitle} task={el}
                    todolistId={todolistId} deleteTask={deleteTask} key={el.id}/>)


    const allBtn = useCallback(() => filterTasks(todolistId, "all"),
        [filterTasks, todolistId])
    const actvBtn = useCallback(() => {filterTasks(todolistId, "active")},
        [filterTasks, todolistId])
    const complBtn = useCallback(() => filterTasks(todolistId, "completed"),
        [filterTasks, todolistId])

    const addNewItem = useCallback((newItemText: string) => {
        addNewTask(todolistId, newItemText)
    }, [addNewTask, todolistId])

    return (
        <Paper style={{padding: "20px"}} elevation={2}>
            <h3 style={{textAlign: "center"}}><EditableSpan
                setNewItemTitleHandler={setNewTodolistItem}
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
})

export type EditableSpanPropsType = {
    title: string
    setNewItemTitleHandler: (newTaskTitle: string) => void
}

export const EditableSpan = React.memo(({title, setNewItemTitleHandler}: EditableSpanPropsType) => {
    console.log("EditableSpan rendered")
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
})

type TaskPropsType = {
    setIsDone: (todolistId: string, taskId: string) => void
    setNewTaskTitle: (todolistId: string, taskId: string, newTaskTitle: string) => void
    task: TaskType
    todolistId: string
    deleteTask: (todolistId: string, taskId: string) => void
}

const Task: React.FC<TaskPropsType> = React.memo(
    ({setIsDone, setNewTaskTitle, task, todolistId, deleteTask}) => {
        console.log("Task render")
        const isDoneHandler = (TodolistId: string, taskId: string) => {
            setIsDone(TodolistId, taskId)
        }

        const setNewTaskTitleHandler = useCallback(
            (todolistId: string, taskId: string, newTaskTitle: string) => {
                setNewTaskTitle(todolistId, taskId, newTaskTitle)
            }, [setNewTaskTitle])
        const label = {inputProps: {"aria-label": "Checkbox demo"}};
        return <li className={task.isDone ? "is-done" : ""} key={task.id}>

            <Checkbox checked={task.isDone}
                      onChange={() => isDoneHandler(todolistId, task.id)}
                      {...label}
                      icon={<BookmarkBorderIcon/>}
                      checkedIcon={<BookmarkIcon/>}
            />
            <EditableSpan setNewItemTitleHandler={(newTaskTitle) => {
                setNewTaskTitleHandler(todolistId, task.id, newTaskTitle)
            }}
                          title={task.title}/>
            <IconButton aria-label="delete" size="small">
                <DeleteIcon onClick={() => deleteTask(todolistId, task.id)} fontSize="inherit"/>
            </IconButton>
        </li>
    })