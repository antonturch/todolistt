import {useEffect, useState} from "react";
import {tasksApi, todolistsApi} from "../api/todolists-api";

export default {
    title: "API"
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export const GetTodolist = () => {
    const [state, setState] = useState<TodolistType[] | null>(null)
    useEffect(() => {
        todolistsApi.getTodolist().then((res) => {
            debugger
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolistPOST = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistTitle = "Самый первый самый настоящий"
        todolistsApi.createTodolist(todolistTitle).then((res) => {
            setState(res.data)
        })
            .catch(() => alert("Все хуево"))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "212d32b9-a36f-4682-8c57-230e04c5e8bc"
        todolistsApi.deleteTodolist(todolistId).then((res) => {
            debugger
            setState(res.data)
        })
            .catch(() => alert("Все хуево"))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "b885fbed-be65-4bb9-a7f6-ea02323edbf0"
        todolistsApi.updateTodolistTitle(todolistId, "Updated title").then((res) => {
            debugger
            setState(res.data)
        })
            .catch(() => alert("Все хуево"))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "b885fbed-be65-4bb9-a7f6-ea02323edbf0"
        tasksApi.getTasks(todolistId).then((res) => {
            debugger
            setState(res.data.items)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<any>(null)
    const createTask = () => {
        const todolistId = "b885fbed-be65-4bb9-a7f6-ea02323edbf0"
        tasksApi.createTasks(todolistId, taskTitle).then((res) => {
            setState(res.data)
        })
            .catch(() => alert("Все хуево"))
    }
    return <div>
        <div>
            <input placeholder={"Title new task"} value={taskTitle}
                   onChange={(e) => setTaskTitle(e.currentTarget.value)}/>
            <button onClick={createTask}>Create task</button>
        </div>
        <div>{JSON.stringify(state)}</div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)
    const deleteTask = () => {
        tasksApi.deleteTask(todolistId, taskId).then((res) => {
            debugger
            setState(res.data)
        })
            .catch(() => alert("Все хуево"))
    }
    return <div>
        <div>{JSON.stringify(state)}</div>
        <input placeholder={"TodolistId"} value={todolistId}
               onChange={(e) => setTodolistId(e.currentTarget.value)}/>
        <input placeholder={"TaskId"} value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
        <button onClick={deleteTask}>Delete task</button>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)
    const updateTaskTitle = () => {
        const todolistId = "b885fbed-be65-4bb9-a7f6-ea02323edbf0"
        tasksApi.updateTaskTitle(todolistId, taskId, taskTitle).then((res) => {
            debugger
            setState(res.data)
        })
            .catch(() => alert("Все хуево"))
    }
    return <div>
        <div>
            <input type="text" value={taskTitle} placeholder={"Task title"}
                   onChange={(e) => setTaskTitle(e.currentTarget.value)}/>
            <input type="text" value={taskId} placeholder={"Task id"}
                   onChange={(e) => setTaskId(e.currentTarget.value)}/>
            <button onClick={updateTaskTitle}>Update task title</button>
        </div>
        <div>{JSON.stringify(state)}</div>
    </div>
}