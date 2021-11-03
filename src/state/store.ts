import {combineReducers, createStore} from "redux";
import {taskReducer} from "./task-reducer";
import {todolistReducer} from "./todolist-reducer";

export const rootReducer = combineReducers({
    todolist: todolistReducer,
    tasks: taskReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)



// @ts-ignore
window.store = store