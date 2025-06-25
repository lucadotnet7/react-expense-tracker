import { Activity } from "../../models";

export interface ActivityActions {
    type: 'save-activity' | 'set-activeId' | 'delete-activity' | 'reset-activities',
    payload: { newActivity: Activity } | {id: string}
}