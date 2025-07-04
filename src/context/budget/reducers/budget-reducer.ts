//EJECUTAMOS LAS ACCIONES
import { BudgetActions, type ActionType, type BudgetState } from "../budget-context.types";

export const initialState: BudgetState = {
    budget: 0
}

export function budgetReducer(state: BudgetState = initialState, action: ActionType) {
    switch(action.type) {
        case BudgetActions.ADD_BUDGET: {
            return {
                ...state,
                budget: action.payload
            };
        }
        default:
            return state;
    }
}
