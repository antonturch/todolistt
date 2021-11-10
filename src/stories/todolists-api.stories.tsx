import {useEffect, useState} from "react";
import {todolistsApi} from "../api/todolists-api";

export default {
    title: "API"
}

const settings = {
    withCredentials: true,
    headers: {
        "api-key": "cf073426-4174-4c42-a07f-d5b89d961d16"
    }
}

export const GetTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.getTodolist().then((res) => {
            debugger
            setState(res)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolistPOST = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.createTodolist().then((res) => {
            setState(res.data)
        })
            .catch(() => alert("Все хуево"))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "3db3e513-e7d2-4822-bfe1-470cf6c71e81"
        todolistsApi.deleteTodolist().then((res) => {
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
        todolistsApi.updateTodolistTitle().then((res) => {
            debugger
            setState(res.data)
        })
            .catch(() => alert("Все хуево"))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}