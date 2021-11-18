import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    FilterType,
    RemoveTodolistAC,
    TodolistEntityType
} from "./todolist-reducer";
import {Grid} from "@mui/material";
import {Todolist} from "./Todolist";

export const TodolistsList: React.FC<{}> = ({}) => {
    const todolists = useSelector<AppRootStateType, TodolistEntityType[]>(state => state.todolist)
    const dispatch = useDispatch();

    const filterTasks = useCallback((todolistId: string, newTodolistFilter: FilterType) => {
        dispatch(ChangeTodolistFilterAC(todolistId, newTodolistFilter));
    }, [dispatch])
    const deleteTodolist = useCallback((todolistId: string) => {
        dispatch(RemoveTodolistAC(todolistId))
    }, [dispatch])
    const setNewTodolistTitle = useCallback((todolistId: string, newTodolistTitle: string) => {
        dispatch(ChangeTodolistTitleAC(todolistId, newTodolistTitle))
    }, [dispatch])

    return <Grid container spacing={3} style={{justifyContent: "center"}}>
        {todolists.map((el: TodolistEntityType) => {
            return <Grid item maxWidth={"400px"} key={el.id}>
                <Todolist setNewTodolistTitle={setNewTodolistTitle}
                          deleteTodolist={deleteTodolist}
                          todolistId={el.id} filter={el.filter} title={el.title}
                          filterTasks={filterTasks}/>
            </Grid>
        })}
    </Grid>
}