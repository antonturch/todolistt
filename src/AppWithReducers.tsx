import React, {useCallback, useEffect} from "react";
import "./App.css";
import {Todolist} from "./Todolist";
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
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    createTodolistTC,
    fetchTodolistsTC,
    FilterType,
    RemoveTodolistAC,
    TodolistEntityType
} from "./state/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskEntityType} from "./state/task-reducer";


export type TasksType = { [key: string]: Array<TaskEntityType> }

function AppWithReducers() {
    console.log("App rendered")
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])


    const todolists = useSelector<AppRootStateType, TodolistEntityType[]>(state => state.todolist)

    const filterTasks = useCallback((todolistId: string, newTodolistFilter: FilterType) => {
        dispatch(ChangeTodolistFilterAC(todolistId, newTodolistFilter));
    }, [dispatch])

    const deleteTodolist = useCallback((todolistId: string) => {
        dispatch(RemoveTodolistAC(todolistId))
    }, [dispatch])

    const addNewTodolist = useCallback((newTodolistTitle: string) => {
        // dispatch(AddTodolistAC(newTodolistTitle))
        dispatch(createTodolistTC(newTodolistTitle))
    }, [dispatch])

    const setNewTodolistTitle = useCallback((todolistId: string, newTodolistTitle: string) => {
        dispatch(ChangeTodolistTitleAC(todolistId, newTodolistTitle))
    }, [dispatch])

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
                    {todolists.map((el: TodolistEntityType) => {
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