import { useReducer, useEffect } from "react"
import { activityReducer, initialState } from "./reducers/activity/activity-reducer";

import Form from "./components/Form"
import ListActivities from "./components/ListActivities";
import Header from "./components/Header";
import CaloriesTracker from "./components/CaloriesTracker";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities));
  }, [state.activities]);

  return (
    <>
        <Header
         activities={state.activities}
         dispatch={dispatch}/>

        <Form 
          state={state}
          dispatch={dispatch}/>

        <CaloriesTracker 
          activities={state.activities}/>

        <ListActivities 
          activities={state.activities}
          dispatch={dispatch} />

    </>
  )
}

export default App
