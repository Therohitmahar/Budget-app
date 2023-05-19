import { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import useLocalStorage from "../utils/useLocalStorage";

const BudgetsContext = createContext();

export function useBudget() {
  return useContext(BudgetsContext);
}

export const UNCATEGORIZED_ID = "Uncategorized";

export const BudgetProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expense, setExpenses] = useLocalStorage("expenses", []);

  function getBudgetExpenses(budgetId) {
    return expense.filter((item) => item.budgetId === budgetId);
  }
  function addExpense({ description, amount, budgetId }) {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { id: uuid(), description, amount, budgetId }];
    });
  }
  function addBudget({ name, max }) {
    setBudgets((prevBudget) => {
      if (prevBudget.find((budget) => budget.name === name)) {
        return prevBudget;
      }
      return [...prevBudget, { id: uuid(), name, max }];
    });
  }
  function deleteBudget({ id }) {
    setExpenses((prevExpense) => {
      return prevExpense.map((expense) => {
        if (expense.budgetId !== id) return expense;
        return { ...expense, budgetId: UNCATEGORIZED_ID };
      });
    });
    setBudgets((prevBudget) => {
      return prevBudget.filter((bud) => bud.id !== id);
    });
  }
  function deleteExpense({ id }) {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  }
  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expense,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
