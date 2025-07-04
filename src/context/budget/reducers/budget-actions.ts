//DISPARAMOS LAS ACCIONES CON EL PAYLOAD

import { BudgetActions, type ActionType } from "../budget-context.types";


export const addBudgetAction = (dispatch: React.Dispatch<ActionType>, budget: number) => {
    dispatch({type: BudgetActions.ADD_BUDGET, payload: budget});
}

