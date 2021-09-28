import {StateReducerType, userReducer} from "./user-reducer";

test("user reducer should increment only age", () => {
    const startState: StateReducerType = {
        age: 23,
        childrenCount: 0,
        name: "Anton",
    }

    const endState: StateReducerType = userReducer(startState, {type: "INCREMENT-AGE"})

    expect(endState.age).toBe(24)
    expect(endState.childrenCount).toBe(0)
})

test("user reducer should increment only childrenCount", () => {
    const startState: StateReducerType = {
        age: 23,
        childrenCount: 0,
        name: "Anton",
    }

    const endState: StateReducerType = userReducer(startState, {type: "INCREMENT-CHILDREN-COUNT"});

    expect(endState.childrenCount).toBe(1);
    expect(endState.age).toBe(23)
})

test("user reducer should change user name", () => {
    const startState: StateReducerType = {
        age: 23,
        childrenCount: 0,
        name: "Anton",
    }

    const endState: StateReducerType = userReducer(startState, {type: "CHANGE-USER-NAME", newUserName: "Alice Glass"})

    expect(endState.name).toBe("Alice Glass")
    expect(startState.name).toBe("Anton")
})