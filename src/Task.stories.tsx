import {Task} from "./Task";
import {action} from "@storybook/addon-actions";

export default {
    title: "Task component",
    component: Task
}

const setIsDone = action("Set 'isDone'")
const setNewTaskTitle = action("setNewTaskTitle")
const task = {id: "0", title: "React", isDone: true,}
const deleteTask = action("deleteTask")

export const TaskStory = () => {
  return <Task setIsDone={setIsDone} setNewTaskTitle={setNewTaskTitle} task={task} todolistId={"1"} deleteTask={deleteTask}/>
}