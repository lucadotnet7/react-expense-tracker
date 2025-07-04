import { render, screen } from "@testing-library/react";
import Header from "../Header";

describe("Component - Header", () => {
    describe("Render", () => {
        test("01 - Should render correctly", () => {
            render(<Header />);

            const h1Element = screen.getByRole('heading', 
            {
                level: 1, 
                name: "Planificador de gastos"
            });

            expect(h1Element).toBeInTheDocument();
        });
    });
});