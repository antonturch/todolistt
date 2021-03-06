import axios from "axios";
import {TaskEntityType} from "../features/Todolists/task-reducer";


// const settings = {
//     withCredentials: true,
//     headers: {
//         "api-key": "cf073426-4174-4c42-a07f-d5b89d961d16"
//     }
// }

//types
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type ApiTodolistResponseType<todolist = {}> = {
    data: todolist
    resultCode: number
    messages: string[]
}
export type ApiTaskResponseType = {
    items: TaskEntityType[]
    totalCount: number
    error: string | null
    // resultCode: number
    // messages: string[]
}
const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    headers: {
        "api-key": "cf073426-4174-4c42-a07f-d5b89d961d16",
    },
    withCredentials: true,
})

//API objs
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