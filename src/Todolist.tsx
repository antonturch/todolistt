import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "./AddItemForm";
import "./App.css";
import {Button, IconButton, Paper, Tooltip} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {
    AddTaskAC,
    ChangeTaskTitleAC,
    createTasksTC,
    deleteTasksTC,
    fetchTasksTC,
    StatusChangeAC,
    TaskEntityType,
    TaskStatuses
} from "./state/task-reducer";
import {Task} from "./Task";
import {EditableSpan} from "./EditableSpan";
import {changeTodolistTitleTC, deleteTodolistTC, FilterType} from "./state/todolist-reducer";


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

    useEffect(() => {
        dispatch(fetchTasksTC(todolistId))
    }, [])

    const tasks = useSelector<AppRootStateType, TaskEntityType[]>(state => state.tasks[todolistId])
    const deleteTask = (todolistId: string, taskId: string) => {
        // dispatch(RemoveTaskAC(todolistId, taskId))
        dispatch(deleteTasksTC(todolistId, taskId))
    }

    const addNewTask = useCallback((todolistId: string, newTaskTitle: string) => {
        dispatch(AddTaskAC(todolistId, newTaskTitle))
    }, [dispatch])

    const changeStatus = useCallback((todolistId: string, taskId: string) => {
        dispatch(StatusChangeAC(todolistId, taskId))
    }, [dispatch])

    const setNewTaskTitle = useCallback((todolistId: string, taskId: string, newTaskTitle: string) => {
        dispatch(ChangeTaskTitleAC(todolistId, taskId, newTaskTitle))
    }, [dispatch])

    let tasksForTodolist = tasks
    if (filter === "active") {
        tasksForTodolist = tasks.filter((el: TaskEntityType) => el.status === TaskStatuses.New)
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter((el: TaskEntityType) => el.status === TaskStatuses.Completed)
    }

    const setNewTodolistItem = useCallback((newTodolistTitle: string) => {
        // setNewTodolistTitle(newTodolistTitle, todolistId)
        dispatch(changeTodolistTitleTC(todolistId, newTodolistTitle))
    }, [setNewTodolistTitle, todolistId])

    const tasksElements = tasksForTodolist.map(
        el => <Task changeStatus={changeStatus} setNewTaskTitle={setNewTaskTitle} task={el}
                    todolistId={todolistId} deleteTask={deleteTask} key={el.id}/>)


    const allBtn = useCallback(() => filterTasks(todolistId, "all"),
        [filterTasks, todolistId])
    const actvBtn = useCallback(() => {filterTasks(todolistId, "active")},
        [filterTasks, todolistId])
    const complBtn = useCallback(() => filterTasks(todolistId, "completed"),
        [filterTasks, todolistId])

    const addNewItem = useCallback((newItemText: string) => {
        // addNewTask(todolistId, newItemText)

        dispatch(createTasksTC(todolistId, newItemText))
    }, [addNewTask, todolistId])

    return (
        <Paper style={{padding: "20px"}} elevation={2}>
            <h3 style={{textAlign: "center"}}><EditableSpan
                setNewItemTitleHandler={setNewTodolistItem}
                title={title}/>
                <Tooltip title="Delete">
                    <IconButton aria-label="delete" size="small">
                        <DeleteIcon onClick={() => dispatch(deleteTodolistTC(todolistId))}
                                    fontSize="inherit"/>
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

