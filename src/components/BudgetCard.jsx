import React from "react";
import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import formatter from "../utils/currencyFormatter";

function BudgetCard({
  name,
  amount,
  max,
  hidesButton,
  onAddExpenseClick,
  onViewExpenseClick,
}) {
  return (
    <Card>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-item-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {formatter(amount)}
            {max && (
              <span className="text-muted fs-6 ms-1">/{formatter(max)}</span>
            )}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={getBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
        {!hidesButton && (
          <Stack direction="horizontal" gap="2" className="mt-4">
            <Button
              className="ms-auto"
              variant="outline-primary"
              onClick={onAddExpenseClick}
            >
              Add Expenses
            </Button>
            <Button onClick={onViewExpenseClick} variant="outline-secondary">
              View Expense
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
}
function getBarVariant(amount, max) {
  let ratio = amount / max;
  if (ratio < 0.25) return "success";
  if (ratio < 0.5) return "primary";
  if (ratio < 0.75) return "warning";
  return "danger";
}

export default BudgetCard;
