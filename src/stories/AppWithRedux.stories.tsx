import AppWithReducers from "../AppWithReducers";
import {Provider} from "react-redux";
import {store} from "../state/store";

export default {
    title: "AppWithRedux",
    component: AppWithReducers,
}

export const AppWithReducersStory = () => {
    return (
        <Provider store={store}>
            <AppWithReducers/>
        </Provider>
    )
}