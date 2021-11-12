import axios from "axios";
import {TodolistType} from "../stories/todolists-api.stories";

// const settings = {
//     withCredentials: true,
//     headers: {
//         "api-key": "cf073426-4174-4c42-a07f-d5b89d961d16"
//     }
// }

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    headers: {
        "api-key": "cf073426-4174-4c42-a07f-d5b89d961d16",
    },
    withCredentials: true,
})

export type ApiTodolistResponseType<todolist = {}> = {
    data: todolist
    resultCode: number
    messages: string[]
}

export const todolistsApi = {
    getTodolist: () => {
        return instance.get<TodolistType[]>("todo-lists")
    },
    createTodolist: (todolistTitle: string) => {
        return instance.post<ApiTodolistResponseType<{
            item: TodolistType
        }>>("todo-lists", {title: todolistTitle}
        )
    },
    deleteTodolist: (todolistId: string) => {
        return instance.delete<ApiTodolistResponseType>(
            `todo-lists/${todolistId}`)
    },
    updateTodolistTitle: (todolistId: string, newTitle: string) => {
        return instance.put<ApiTodolistResponseType>(`todo-lists/${todolistId}`,
            {title: newTitle}
        )
    },
}

export type ApiTaskResponseType = {
    items: TaskType
    totalCount: number
    error: string | null
    // resultCode: number
    // messages: string[]
}

export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}


export const tasksApi = {
    getTasks: (todolistId: string) => {
        return instance.get<ApiTaskResponseType>(
            `todo-lists/${todolistId}/tasks`)
    },
    createTasks: (todolistId: string, taskTitle: string) => {
        return instance.post<ApiTodolistResponseType<{
            item: TodolistType
        }>>(`todo-lists/${todolistId}/tasks`,
            {title: taskTitle})
    },
    deleteTask: (todolistId: string, taskId: string) => {
        return instance.delete<ApiTodolistResponseType>(
            `todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTaskTitle: (todolistId: string, taskId: string, newTaskTitle: string) => {
        return instance.put<ApiTodolistResponseType>(
            `todo-lists/${todolistId}/tasks/${taskId}`,
            {
                title: newTaskTitle,
                description: "required(string)",
                completed: true,
                status: 1,
                priority: 1,
                startDate: new Date(),
                deadline: new Date(),
            })
    },
}