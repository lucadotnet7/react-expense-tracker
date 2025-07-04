import { useReducer, createContext, type ReactNode, useMemo, useCallback, useContext } from "react";
import { budgetReducer, initialState } from "./reducers/budget-reducer";
import type { BudgetContextType } from "./budget-context.types";
import { addBudgetAction } from "./reducers/budget-actions";

export const BudgetContext = createContext<BudgetContextType>({} as BudgetContextType);

export function BudgetProvider({children}: {children: ReactNode}) {
    const [state, dispatch] = useReducer(budgetReducer, initialState);

    const addBudget = useCallback((budget: number) => addBudgetAction(dispatch, budget), [dispatch]);

    const fullCtx: BudgetContextType = useMemo(() => ({
        state: {...state},
        actions: {
            add: addBudget
        }
    }), [state]);

    return (
        <BudgetContext.Provider value={fullCtx}>
            {children}
        </BudgetContext.Provider>
    );
}

export const useBudgetContext = () => useContext(BudgetContext);