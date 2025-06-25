import { Activity } from "../../models";

export interface ActivityState {
    activities: Activity[];
    activeId: Activity['id'];
}