import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import Header from "../components/shared/Header/Header";
import BudgetForm from "../components/budgets/BudgetForm/BudgetForm";
import BudgetTracker from "../components/budgets/BudgetTracker/BudgetTracker";

export default function Home() {
  const { state } = useBudget();

  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
      </div>
    </>
  )
}
