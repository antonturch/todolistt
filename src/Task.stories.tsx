import {Task} from "./Task";
import {action} from "@storybook/addon-actions";
import {v1} from "uuid";

export default {
    title: "Task component",
    component: Task
}

const setIsDone = action("Set 'isDone'")
const setNewTaskTitle = action("setNewTaskTitle")
const task = {
    id: v1(),
    title: "HTML",
    isDone: true,
    description: "",
    status: 0,
    priority: 0,
    startDate: "",
    deadline: "",
    todoListId: "",
    order: 0,
    addedDate: "",
}
const deleteTask = action("deleteTask")

export const TaskStory = () => {
    return <Task setIsDone={setIsDone} setNewTaskTitle={setNewTaskTitle} task={task} todolistId={"1"}
                 deleteTask={deleteTask}/>
}