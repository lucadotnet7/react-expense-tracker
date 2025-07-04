import Home from "../Home";
import { render, screen } from "@testing-library/react";

jest.mock('../../components/shared/Header/Header', () => {
    return function Header() {
        return(
            <header data-testid='header-mock'>
            </header>
        );
    }
});

jest.mock('../../components/budgets/BudgetForm/BudgetForm', () => {
    return function BudgetForm() {
        return(
            <form data-testid='form-mock'></form>
        );
    }
});

describe("Page - Home", () => {
    describe("Render", () => {
        test("01 - Should render correctly", () => {
            render(<Home />);

            const header = screen.getByTestId('header-mock');
            const form = screen.getByTestId('form-mock'); 
            
            expect(header).toBeInTheDocument();
            expect(form).toBeInTheDocument();
        });
    });
})