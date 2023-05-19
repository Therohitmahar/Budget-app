import React, { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { UNCATEGORIZED_ID, useBudget } from "../context/BudgetContext";

function AddExpenseModal({ show, handleClose, defaultBudgetId }) {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const BudgetIdRef = useRef();
  const { addExpense, budgets } = useBudget();
  function handleSubmit(e) {
    e.preventDefault();
    addExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: BudgetIdRef.current.value,
    });
    handleClose();
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit} closebutton={"true"}>
          <Modal.Header closeButton>New Expense</Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>description</Form.Label>
              <Form.Control
                type="text"
                ref={descriptionRef}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="Number"
                ref={amountRef}
                min={0}
                step={0.01}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="budgetId">
              <Form.Label>Budget</Form.Label>
              <Form.Select
                ref={BudgetIdRef}
                defaultValue={defaultBudgetId}
                required
              >
                <option id={UNCATEGORIZED_ID}>Uncategorized</option>
                {budgets.map((budget) => (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button type="submit" variant="success">
                Add
              </Button>
            </div>
          </Modal.Body>
        </Form>
      </Modal>
    </>
  );
}

export default AddExpenseModal;
