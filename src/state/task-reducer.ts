import {TasksType} from "../AppWithReducers";
import {v1} from "uuid";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    TodolistID1,
    TodolistID2
} from "./todolist-reducer";

enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

enum TaskPriorities {
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

export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    todolistId: string
    taskId: string
}
export type AddTaskActionType = {
    type: "ADD-TASK"
    todolistId: string
    newTaskTitle: string
}

export type CheckboxChangeActionType = {
    type: "CHECKBOX-CHANGE"
    todolistId: string
    taskId: string
}

export type ChangeTasksTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    todolistId: string
    taskId: string
    newTaskTitle: string
}

export const RemoveTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => ({
    type: "REMOVE-TASK",
    todolistId,
    taskId
})

export const AddTaskAC = (todolistId: string, newTaskTitle: string): AddTaskActionType => ({
    type: "ADD-TASK",
    todolistId,
    newTaskTitle
})

export const CheckboxChangeAC = (todolistId: string, taskId: string): CheckboxChangeActionType => ({
    type: "CHECKBOX-CHANGE",
    todolistId,
    taskId
})

export const ChangeTaskTitleAC = (todolistId: string, taskId: string,
                                  newTaskTitle: string): ChangeTasksTitleActionType => ({
    type: "CHANGE-TASK-TITLE",
    todolistId,
    taskId,
    newTaskTitle
})

export type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | CheckboxChangeActionType
    | ChangeTasksTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType;

const initialState: TasksType = {
    [TodolistID1]: [{
        id: v1(),
        title: "HTML1",
        description: "",
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Middle,
        startDate: "",
        deadline: "",
        todoListId: TodolistID1,
        order: 0,
        addedDate: "",
    },
        {
            id: v1(),
            title: "HTML2",
            description: "",
            status: TaskStatuses.New,
            priority: TaskPriorities.Middle,
            startDate: "",
            deadline: "",
            todoListId: TodolistID1,
            order: 0,
            addedDate: "",
        },
        {
            id: v1(),
            title: "HTML3",
            description: "",
            status: 0,
            priority: TaskPriorities.Middle,
            startDate: "",
            deadline: "",
            todoListId: TodolistID1,
            order: 0,
            addedDate: "",
        },],
    [TodolistID2]: [{
        id: v1(),
        title: "HTML4",
        description: "",
        status: TaskStatuses.InProgress,
        priority: TaskPriorities.Middle,
        startDate: "",
        deadline: "",
        todoListId: TodolistID2,
        order: 0,
        addedDate: "",
    },
        {
            id: v1(),
            title: "HTML5",
            description: "",
            status: TaskStatuses.Draft,
            priority: TaskPriorities.Middle,
            startDate: "",
            deadline: "",
            todoListId: TodolistID2,
            order: 0,
            addedDate: "",
        },
        {
            id: v1(),
            title: "HTML6",
            description: "",
            status: TaskStatuses.New,
            priority: TaskPriorities.Middle,
            startDate: "",
            deadline: "",
            todoListId: TodolistID2,
            order: 0,
            addedDate: "",
        },],
}

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
                priority: 0,
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
                    el => el.id === action.taskId ? {...el, status: el.status} : el)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(
                    el => el.id === action.taskId ? {...el, title: action.newTaskTitle} : el)
            }
        case "ADD-TODOLIST":
            return {...state, [action.todolistId]: []}
        case "REMOVE-TODOLIST":
            const stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        default:
            return state
    }
}

