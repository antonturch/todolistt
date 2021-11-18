import React, {useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DeleteIcon from "@mui/icons-material/Delete";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {changeTaskTitleTC, TaskEntityType} from "../task-reducer";
import {useDispatch} from "react-redux";

type TaskPropsType = {
    changeStatus: (todolistId: string, taskId: string) => void
    setNewTaskTitle: (todolistId: string, taskId: string, newTaskTitle: string) => void
    task: TaskEntityType
    todolistId: string
    deleteTask: (todolistId: string, taskId: string) => void
}
export const Task: React.FC<TaskPropsType> = React.memo(
    ({changeStatus, setNewTaskTitle, task, todolistId, deleteTask}) => {
        console.log("Task render")
        const dispatch = useDispatch()

        const changeStatusHadler = (TodolistId: string, taskId: string) => {
            changeStatus(TodolistId, taskId)
        }

        const setNewTaskTitleHandler = useCallback(
            (todolistId: string, taskId: string, newTaskTitle: string) => {
                setNewTaskTitle(todolistId, taskId, newTaskTitle)
            }, [setNewTaskTitle])
        const label = {inputProps: {"aria-label": "Checkbox demo"}};
        return <li className={task.status ? "is-done" : ""} key={task.id}>

            <Checkbox checked={Boolean(task.status)}
                      onChange={() => changeStatusHadler(todolistId, task.id)}
                      {...label}
                      icon={<BookmarkBorderIcon/>}
                      checkedIcon={<BookmarkIcon/>}
            />
            <EditableSpan setNewItemTitleHandler={(newTaskTitle) => {
                // setNewTaskTitleHandler(todolistId, task.id, newTaskTitle)
                dispatch(changeTaskTitleTC(todolistId, task.id, newTaskTitle))
            }}
                          title={task.title}/>
            <IconButton aria-label="delete" size="small">
                <DeleteIcon onClick={() => deleteTask(todolistId, task.id)} fontSize="inherit"/>
            </IconButton>
        </li>
    })