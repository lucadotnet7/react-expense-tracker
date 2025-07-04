//ARCHIVO PARA GENERAR TODOS LOS TYPES NECESARIOS PARA EL CONTEXT Y REDUCER
export enum BudgetActions {
    ADD_BUDGET = 'ADD_BUDGET'
}

export type BudgetState = {
    budget: number
}

export type ActionType = {
    type: BudgetActions,
    payload?: any
}

export type BudgetContextActions = {
    [key: string]: (payload?: any) => void
}

export type BudgetContextType = { state: BudgetState; actions: BudgetContextActions };