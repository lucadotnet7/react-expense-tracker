import { useBudgetContext } from "../context/budget/BudgetContext";

export function useBudget() {
    const { state, actions: { add } } = useBudgetContext();

    function addNewBudget(budget: number) {
        add(budget);
    }

    return {
        state,
        addNewBudget
    }
}