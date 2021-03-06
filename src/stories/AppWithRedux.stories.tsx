import AppWithReducers from "../app/AppWithReducers";
import {ReduxStoreProviderDecorator} from "../ReduxStoreProviderDecorator";

export default {
    title: "AppWithRedux",
    component: AppWithReducers,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReducersStory = () => {
    return (
        <AppWithReducers/>
    )
}