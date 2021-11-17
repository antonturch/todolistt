import {TasksType} from "../AppWithReducers";
import {v1} from "uuid";
import {Dispatch} from "redux";
import {tasksApi} from "../api/todolists-api";
import {AddTodolistAC, RemoveTodolistAC, SetTodolistAC} from "./todolist-reducer";

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}

export type TaskEntityType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export const RemoveTaskAC = (todolistId: string, taskId: string) => ({
    type: "REMOVE-TASK",
    todolistId,
    taskId
} as const)

export const AddTaskAC = (todolistId: string, newTaskTitle: string) => ({
    type: "ADD-TASK",
    todolistId,
    newTaskTitle
} as const)

export const StatusChangeAC = (todolistId: string, taskId: string) => ({
    type: "CHECKBOX-CHANGE",
    todolistId,
    taskId
} as const)

export const ChangeTaskTitleAC = (todolistId: string, taskId: string,
                                  newTaskTitle: string) => ({
    type: "CHANGE-TASK-TITLE",
    todolistId,
    taskId,
    newTaskTitle
} as const)

export const SetTasksAC = (todolistId: string, tasks: TaskEntityType[]) => ({
    type: "SET-TASKS",
    todolistId,
    tasks
} as const)

export type ActionsType =
    ReturnType<typeof SetTasksAC> |
    ReturnType<typeof SetTodolistAC> |
    ReturnType<typeof RemoveTaskAC> |
    ReturnType<typeof AddTaskAC> |
    ReturnType<typeof StatusChangeAC> |
    ReturnType<typeof ChangeTaskTitleAC> |
    ReturnType<typeof RemoveTodolistAC> |
    ReturnType<typeof AddTodolistAC>

const initialState: TasksType = {}

export const taskReducer = (state = initialState, action: ActionsType): TasksType => {
    switch (action.type) {
        case "REMOVE-TASK":
            const undelTasks = state[action.todolistId].filter(el => el.id !== action.taskId);
            return {...state, [action.todolistId]: undelTasks}
        case "ADD-TASK":
            const newTask: TaskEntityType = {
                id: v1(),
                title: action.newTaskTitle,
                description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: "",
                deadline: "",
                todoListId: action.todolistId,
                order: 0,
                addedDate: "",
            }
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        case "CHECKBOX-CHANGE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(
                    // FIX BELOW
                    el => el.id === action.taskId ? {
                        ...el,
                        status: el.status === TaskStatuses.Completed ? TaskStatuses.New :
                            TaskStatuses.Completed
                    } : el)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(
                    el => el.id === action.taskId ? {...el, title: action.newTaskTitle} : el)
            }
        case "ADD-TODOLIST":
            return {[action.todolistId]: [], ...state}
        case "REMOVE-TODOLIST":
            const stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todolists.forEach(el => {
                stateCopy[el.id] = []
            })
            return stateCopy
        }
        case "SET-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        default:
            return state
    }
}

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksApi.getTasks(todolistId)
        .then(res => {
            dispatch(SetTasksAC(todolistId, res.data.items))
        })
}


export const createTasksTC = (todolistId: string, taskTitle: string) => (dispatch: Dispatch) => {
    tasksApi.createTasks(todolistId, taskTitle)
        .then(res => {
            tasksApi.getTasks(todolistId)
                .then(res => dispatch(SetTasksAC(todolistId, res.data.items)))
        })
}

export const deleteTasksTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksApi.deleteTask(todolistId, taskId)
        .then(res => {
            tasksApi.getTasks(todolistId)
                .then(res => dispatch(SetTasksAC(todolistId, res.data.items)))
        })

}

export const changeTaskTitleTC = (todolistId: string, taskId: string,
                                  newTaskTitle: string) => (dispatch: Dispatch) => {
    tasksApi.updateTaskTitle(todolistId, taskId, newTaskTitle)
        .then(res => {
            tasksApi.getTasks(todolistId)
                .then(res => dispatch(SetTasksAC(todolistId, res.data.items)))
        })
}




