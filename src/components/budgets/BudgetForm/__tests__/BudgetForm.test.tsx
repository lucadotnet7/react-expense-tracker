import BudgetForm from "../BudgetForm";
import { screen, render } from "@testing-library/react";
import { userEvent } from '@testing-library/user-event';

const mockAddNewBudget = jest.fn();

jest.mock('../../../../hooks/useBudget', () => ({
  useBudget: () => ({
    state: {},
    addNewBudget: mockAddNewBudget
  })
}));

describe("Component - BudgetForm", () => {
    beforeEach(() => {
        mockAddNewBudget.mockClear();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("Render", () => {
        test("01 - Should render correctly", () => {
            render(<BudgetForm />);

            const labelElement = screen.getByLabelText('Definir presupuesto');
            const inputElement = screen.getByPlaceholderText('Define tu presupuesto');
            const buttonElement = screen.getByRole('button', {name: 'Definir'});

            expect(labelElement).toBeInTheDocument();
            expect(inputElement).toBeInTheDocument();
            expect(buttonElement).toBeInTheDocument();
        });

        test("02 - Should disabled submit button when budget is invalid (0, negative or NaN)", () => {
            render(<BudgetForm />);

            const buttonElement = screen.getByRole('button', {name: 'Definir'});

            expect(buttonElement).toBeDisabled();
        });
    });

    describe("User events", () => {
        test("01 - Should enable submit button when budget valid (greater than 0)", async () => {
            userEvent.setup();
            render(<BudgetForm />);

            const inputElement = screen.getByPlaceholderText('Define tu presupuesto');
            const buttonElement = screen.getByRole('button', {name: 'Definir'});

            await userEvent.type(inputElement, "1000");

            expect(buttonElement).toBeEnabled();
        });

        test("02 - Should updates input value when typing", async () => {
            userEvent.setup();
            render(<BudgetForm />);

            const inputElement = screen.getByPlaceholderText('Define tu presupuesto');
            
            await userEvent.type(inputElement, "1000");

            expect(inputElement).toHaveValue(1000);
        });

        test("03 - Should calls addNewBudget when press submit button", async () => {
            userEvent.setup();
            render(<BudgetForm />);

            const inputElement = screen.getByPlaceholderText('Define tu presupuesto');
            const buttonElement = screen.getByRole('button', {name: 'Definir'});

            await userEvent.type(inputElement, "1000");
            await userEvent.click(buttonElement);

            expect(mockAddNewBudget).toHaveBeenCalledWith(1000);
            expect(mockAddNewBudget).toHaveBeenCalledTimes(1);
        });
    });
});