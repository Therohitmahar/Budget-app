import React from "react";
import BudgetCard from "./BudgetCard";
import { useBudget } from "../context/BudgetContext";

function TotalBudgetCard() {
  const { expense, budgets } = useBudget();
  const amount = expense.reduce((total, expe) => total + expe.amount, 0);
  const max = budgets.reduce((total, budget) => total + budget.max, 0);

  console.log("max form total  ", max);
  return max === 0 ? null : (
    <BudgetCard amount={amount} name="Total" max={max} hidesButton />
  );
}

export default TotalBudgetCard;
