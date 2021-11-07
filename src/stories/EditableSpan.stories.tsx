import {EditableSpan} from "../EditableSpan";
import {action} from "@storybook/addon-actions";

export default {
    title: "EditbleSpan component",
    component: EditableSpan
}

const setNewItemTitleHandler = action("Изменить элемент")

export const EditableSpanStory = () => {
  return <EditableSpan title={"Input smth"} setNewItemTitleHandler={setNewItemTitleHandler}/>
}