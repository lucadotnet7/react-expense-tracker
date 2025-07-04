import { useBudget } from '../useBudget';
import { act, renderHook } from '@testing-library/react';

const mockAddBudget = jest.fn();
const mockState = {
    budget: 0
}

jest.mock('../../context/budget/BudgetContext', () => ({
    useBudgetContext: () => ({
        state: mockState,
        actions: { addBudget: mockAddBudget }
    })
}));

describe("Hook - Use Budget", () => {

    beforeEach(() => {
        mockAddBudget.mockClear();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("01 - Should render the budget in 0", () => {
        const { result } = renderHook(useBudget);

        expect(result.current.state.budget).toBe(0);
    });

    test("02 - Should change budget state value when execute addNewBudget", () => {
        const { result } = renderHook(useBudget);

        act(() => {
            result.current.addNewBudget(10);
        });

        expect(mockAddBudget).toHaveBeenCalledTimes(1);
        expect(mockAddBudget).toHaveBeenCalledWith(10);
    });
});