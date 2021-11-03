import React from "react";
import "./App.css";
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {Container, Grid, SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC
} from "./state/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksType = { [key: string]: Array<TaskType> }


function AppWithReducers() {
    console.log("App rendered")

    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolist)

    const filterTasks = (todolistId: string, newTodolistFilter: FilterType) => {
        dispatch(ChangeTodolistFilterAC(todolistId, newTodolistFilter));
    }
    const deleteTodolist = (todolistId: string) => {
        dispatch(RemoveTodolistAC(todolistId))
    }

    const addNewTodolist = (newTodolistTitle: string) => {
        const newTodolistId = v1();
        dispatch(AddTodolistAC(newTodolistTitle, newTodolistId))
    }

    const setNewTodolistTitle = (todolistId: string, newTodolistTitle: string) => {
        dispatch(ChangeTodolistTitleAC(todolistId, newTodolistTitle))
    }

    const actions = [
        {icon: <FileCopyIcon/>, name: "Copy"},
        {icon: <SaveIcon/>, name: "Save"},
        {icon: <PrintIcon/>, name: "Print"},
        {icon: <ShareIcon/>, name: "Share"},
    ];

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        *TODOLIST*
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px", justifyContent: "center"}}>
                    <AddItemForm addNewItem={addNewTodolist}/>
                </Grid>
                <Grid container spacing={3} style={{justifyContent: "center"}}>
                    {todolists.map((el: TodolistType) => {
                        return <Grid item maxWidth={"400px"} key={el.id}>
                            <Todolist setNewTodolistTitle={setNewTodolistTitle}
                                      deleteTodolist={deleteTodolist}
                                      todolistId={el.id} filter={el.filter} title={el.title}
                                      filterTasks={filterTasks}/>
                        </Grid>
                    })}
                </Grid>
            </Container>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{position: "absolute", bottom: 16, right: 16}}
                icon={<SpeedDialIcon/>}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                    />
                ))}
            </SpeedDial>
        </div>
    );
}

export default AppWithReducers;