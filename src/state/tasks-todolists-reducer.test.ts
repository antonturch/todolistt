import {v1} from "uuid";
import {
    AddTodolistAC,
    RemoveTodolistAC,
    SetTodolistAC,
    TodolistEntityType,
    todolistReducer
} from "./todolist-reducer";
import {TaskPriorities, taskReducer, TaskStatuses} from "./task-reducer";
import {TodolistType} from "../api/todolists-api";

test("add correct file stryctyre in tasks and todolists", () => {
    const TodolistID1 = v1();
    const TodolistID2 = v1();

    const startTodolistState: TodolistEntityType[] = [
        {id: TodolistID1, title: "What to learn", filter: "all", addedDate: "", order: 0,},
        {id: TodolistID2, title: "What to buy", filter: "all", addedDate: "", order: 0,},
    ]

    const startTasksState = {
        [TodolistID1]: [{
            id: "0",
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
                id: "1",
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
                id: "2",
                title: "HTML3",
                description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: "",
                deadline: "",
                todoListId: TodolistID1,
                order: 0,
                addedDate: "",
            },],
        [TodolistID2]: [{
            id: "3",
            title: "HTML4",
            description: "",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Middle,
            startDate: "",
            deadline: "",
            todoListId: TodolistID2,
            order: 0,
            addedDate: "",
        },
            {
                id: "4",
                title: "HTML5",
                description: "",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: "",
                deadline: "",
                todoListId: TodolistID2,
                order: 0,
                addedDate: "",
            },
            {
                id: "5",
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

    const endTodolistState = todolistReducer(startTodolistState, AddTodolistAC("Added todolist"))
    const endTasksState = taskReducer(startTasksState, AddTodolistAC("Added todolist"))

    expect(endTodolistState.length).toBe(3)
    expect(endTodolistState[0].title).toBe("Added todolist")

    expect(endTasksState).toEqual({
        ["123"]: [],
        [TodolistID1]: [{
            id: "0",
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
                id: "1",
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
                id: "2",
                title: "HTML3",
                description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: "",
                deadline: "",
                todoListId: TodolistID1,
                order: 0,
                addedDate: "",
            },],
        [TodolistID2]: [{
            id: "3",
            title: "HTML4",
            description: "",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Middle,
            startDate: "",
            deadline: "",
            todoListId: TodolistID2,
            order: 0,
            addedDate: "",
        },
            {
                id: "4",
                title: "HTML5",
                description: "",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: "",
                deadline: "",
                todoListId: TodolistID2,
                order: 0,
                addedDate: "",
            },
            {
                id: "5",
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
    })
})

test("delete correct file stryctyre in tasks and todolists", () => {
    const TodolistID1 = v1();
    const TodolistID2 = v1();

    const startTodolistState: TodolistEntityType[] = [
        {id: TodolistID1, title: "What to learn", filter: "all", addedDate: "", order: 0,},
        {id: TodolistID2, title: "What to buy", filter: "all", addedDate: "", order: 0,},
    ]

    const startTasksState = {
        [TodolistID1]: [{
            id: "0",
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
                id: "1",
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
                id: "2",
                title: "HTML3",
                description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: "",
                deadline: "",
                todoListId: TodolistID1,
                order: 0,
                addedDate: "",
            },],
        [TodolistID2]: [{
            id: "3",
            title: "HTML4",
            description: "",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Middle,
            startDate: "",
            deadline: "",
            todoListId: TodolistID2,
            order: 0,
            addedDate: "",
        },
            {
                id: "4",
                title: "HTML5",
                description: "",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: "",
                deadline: "",
                todoListId: TodolistID2,
                order: 0,
                addedDate: "",
            },
            {
                id: "5",
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

    const endTodolistState = todolistReducer(startTodolistState, RemoveTodolistAC(TodolistID1))
    const endTasksState = taskReducer(startTasksState, RemoveTodolistAC(TodolistID1))

    expect(endTodolistState.length).toBe(1)
    expect(endTodolistState[0].id).toBe(TodolistID2)

    expect(endTasksState).toEqual({
        [TodolistID2]: [{
            id: "3",
            title: "HTML4",
            description: "",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Middle,
            startDate: "",
            deadline: "",
            todoListId: TodolistID2,
            order: 0,
            addedDate: "",
        },
            {
                id: "4",
                title: "HTML5",
                description: "",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: "",
                deadline: "",
                todoListId: TodolistID2,
                order: 0,
                addedDate: "",
            },
            {
                id: "5",
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
    })
    // expect(endTasksState).toEqual({
    //     [TodolistID2]: [{
    //         id: "31",
    //         title: "HTML4",
    //         description: "",
    //         status: TaskStatuses.Completed,
    //         priority: TaskPriorities.Middle,
    //         startDate: "",
    //         deadline: "",
    //         todoListId: TodolistID2,
    //         order: 0,
    //         addedDate: "",
    //     },
    //         {
    //             id: "4",
    //             title: "HTML5",
    //             description: "",
    //             status: TaskStatuses.Completed,
    //             priority: TaskPriorities.Middle,
    //             startDate: "",
    //             deadline: "",
    //             todoListId: TodolistID2,
    //             order: 0,
    //             addedDate: "",
    //         },
    //         {
    //             id: "5",
    //             title: "HTML6",
    //             description: "",
    //             status: TaskStatuses.New,
    //             priority: TaskPriorities.Middle,
    //             startDate: "",
    //             deadline: "",
    //             todoListId: TodolistID2,
    //             order: 0,
    //             addedDate: "",
    //         },],
    // })
})

test("set correct id of todolist to task", () => {
    const TodolistID1 = v1();
    const TodolistID2 = v1();

    const startTodolistState: TodolistType[] = [
        {id: "1", title: "What to learn", addedDate: "", order: 0,},
        {id: "2", title: "What to buy", addedDate: "", order: 0,},
    ]

    const startTasksState = {
        [TodolistID1]: [{
            id: "0",
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
                id: "1",
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
                id: "2",
                title: "HTML3",
                description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: "",
                deadline: "",
                todoListId: TodolistID1,
                order: 0,
                addedDate: "",
            },],
        [TodolistID2]: [{
            id: "3",
            title: "HTML4",
            description: "",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Middle,
            startDate: "",
            deadline: "",
            todoListId: TodolistID2,
            order: 0,
            addedDate: "",
        },
            {
                id: "4",
                title: "HTML5",
                description: "",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: "",
                deadline: "",
                todoListId: TodolistID2,
                order: 0,
                addedDate: "",
            },
            {
                id: "5",
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

    const endTodolistState = todolistReducer([], SetTodolistAC(startTodolistState))
    const endTasksState = taskReducer(startTasksState, SetTodolistAC(startTodolistState))

    expect(endTodolistState.length).toBe(2)
    expect(endTodolistState[0].id).toBe("1")
    expect(endTodolistState[1].id).toBe("2")

    expect(endTasksState["1"]).toEqual([])
    expect(endTasksState["2"]).toEqual([])
    // expect(endTasksState["3"]).toEqual([])
})