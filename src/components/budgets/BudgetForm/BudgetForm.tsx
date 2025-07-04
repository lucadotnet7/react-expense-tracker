import { useMemo, useState } from "react";
import { useBudget } from "../../../hooks/useBudget";

function BudgetForm() {
  const [budget, setBudget] = useState(0);
  const { addNewBudget } = useBudget();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setBudget(e.target.valueAsNumber);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addNewBudget(budget);
  }

  const isBudgetValid = useMemo(() => {
    return isNaN(budget) || budget <= 0;
  }, [budget]);

  return (
    <form className="space-y-5" onSubmit={e => handleSubmit(e)}>
        <div className="flex flex-col space-y-5">
          <label htmlFor="inp-budget" className="text-4xl text-blue-600 font-bold text-center">
            Definir presupuesto
          </label>
          <input 
            id="inp-budget"
            type="number"
            name="inp-budget"
            className="bg-white border border-gray-200 p-2 rounded-sm"
            placeholder="Define tu presupuesto"
            onChange={(e) => handleChange(e)}
            value={budget} />
        </div>
        <input 
          className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase rounded-sm disabled:opacity-40" 
          type="submit"
          value="Definir"
          disabled={isBudgetValid} />
    </form>
  )
}

export default BudgetForm;