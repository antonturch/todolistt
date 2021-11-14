import {applyMiddleware, combineReducers, createStore} from "redux";
import {taskReducer} from "./task-reducer";
import {todolistReducer} from "./todolist-reducer";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
    todolist: todolistReducer,
    tasks: taskReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))



// @ts-ignore
window.store = store