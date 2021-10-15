import {TasksType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolist-reducer";

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

export const taskReducer = (state: TasksType, action: ActionsType): TasksType => {
    switch (action.type) {
        case "REMOVE-TASK":
            const undelTasks = state[action.todolistId].filter(el => el.id !== action.taskId);
            return {...state, [action.todolistId]: undelTasks}
        case "ADD-TASK":
            const newTask: TaskType = {id: v1(), title: action.newTaskTitle, isDone: false}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        case "CHECKBOX-CHANGE":
            const editableTaskForChangeCheckbox = state[action.todolistId].find(
                el => el.id === action.taskId)
            if (editableTaskForChangeCheckbox) {
                editableTaskForChangeCheckbox.isDone = !editableTaskForChangeCheckbox.isDone
            }
            return {...state}
        case "CHANGE-TASK-TITLE":
            const editableTaskForChangeTitle = state[action.todolistId].find(
                el => el.id === action.taskId)
            if (editableTaskForChangeTitle) {
                editableTaskForChangeTitle.title = action.newTaskTitle
            }
            return {...state}
        case "ADD-TODOLIST":
            return {...state, [action.todolistId]: []}
        case "REMOVE-TODOLIST" :
            const stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        default:
            throw new Error("I don't understand this action type")
    }
}

