import { Activity } from "../../models";
import { ActivityActions } from "./activity-actions.interface";
import { ActivityState } from "./activity-state.interface";

export const initialState: ActivityState = {
    activities: _initActivities(),
    activeId: ''
}

export function activityReducer(state: ActivityState = initialState, action: ActivityActions) {
    if(action.type === 'save-activity' && 'newActivity' in action.payload)
        return _saveActivity(state, action.payload.newActivity);
    
    else if(action.type === 'set-activeId' && 'id' in action.payload)
        return _setActiveId(state, action.payload.id);

    else if(action.type === 'delete-activity' && 'id' in action.payload)
        return _deleteActivity(state, action.payload.id);

    else if(action.type === 'reset-activities')
        return _resetActivities();

    return state;
}

function _initActivities(): Activity[] {
    const activitiesFromLS = localStorage.getItem('activities')

    return activitiesFromLS ? JSON.parse(activitiesFromLS) : [];
}

function _saveActivity(state: ActivityState, newActivity: Activity): ActivityState {
    let updatedActivities : Activity[] = [];

    if(state.activeId) {
        updatedActivities = state.activities.map(activity => activity.id === state.activeId 
                                                    ? newActivity 
                                                    : activity);
    } else {
        updatedActivities = [...state.activities, newActivity]
    }

    return {
        ...state,
        activities: updatedActivities,
        activeId: ''
    };
}

function _setActiveId(state: ActivityState, id: Activity['id']): ActivityState {
    return {
        ...state,
        activeId: id
    }
}

function _deleteActivity(state: ActivityState, id: Activity['id']): ActivityState {
    return {
        ...state,
        activities: state.activities.filter(activity => activity.id !== id),
        activeId: ''
    };
}

function _resetActivities() {
    localStorage.removeItem('activities');

    return {
        activities: [],
        activeId: ''
    }
}