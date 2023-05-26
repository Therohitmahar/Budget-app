import React from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import { UNCATEGORIZED_ID, useBudget } from "../context/BudgetContext";
import formatter from "../utils/currencyFormatter";
import capitalFirstLetter from "../utils/FirstLetterFormatter";

function ViewExpenseModal({ budgetId, handleClose }) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudget();

  const expenses = getBudgetExpenses(budgetId);
  const budget =
    UNCATEGORIZED_ID === budgetId
      ? { name: "Uncategorized", id: UNCATEGORIZED_ID }
      : budgets.find((b) => b.id === budgetId);
  return (
    <>
      <Modal show={budgetId != null} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Stack direction="horizontal" gap="2">
              <div>Expenses - {capitalFirstLetter(budget?.name)}</div>
              {budgetId !== UNCATEGORIZED_ID && (
                <Button
                  onClick={() => {
                    deleteBudget(budget);
                    handleClose();
                  }}
                  variant="outline-danger"
                >
                  Delete
                </Button>
              )}
            </Stack>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack direction="vertical" gap={"3"}>
            {expenses.map((expense) => (
              <Stack direction="horizontal" gap={"2"} key={expense.id}>
                <div className="me-auto fs-4">
                  {capitalFirstLetter(expense.description)}
                </div>
                <div className="fs-5">{formatter(expense.amount)}</div>
                <Button
                  onClick={() => deleteExpense(expense)}
                  size="sm"
                  variant="outline-danger"
                >
                  &times;
                </Button>
              </Stack>
            ))}
          </Stack>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ViewExpenseModal;
