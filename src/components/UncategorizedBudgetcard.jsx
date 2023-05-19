import React from "react";
import BudgetCard from "./BudgetCard";
import { UNCATEGORIZED_ID, useBudget } from "../context/BudgetContext";

function UncategorizedBudgetcard(props) {
  const { getBudgetExpenses } = useBudget();
  const amount = getBudgetExpenses(UNCATEGORIZED_ID).reduce(
    (total, curr) => total + curr.amount,
    0
  );
  if (amount === 0) return null;
  return <BudgetCard amount={amount} name="Uncategorized" {...props} />;
}

export default UncategorizedBudgetcard;
