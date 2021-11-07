import {TaskType} from "./AppWithReducers";
import React, {useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DeleteIcon from "@mui/icons-material/Delete";
import {EditableSpan} from "./EditableSpan";

type TaskPropsType = {
    setIsDone: (todolistId: string, taskId: string) => void
    setNewTaskTitle: (todolistId: string, taskId: string, newTaskTitle: string) => void
    task: TaskType
    todolistId: string
    deleteTask: (todolistId: string, taskId: string) => void
}
export const Task: React.FC<TaskPropsType> = React.memo(
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