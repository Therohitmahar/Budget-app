import { Button, Stack } from "react-bootstrap";
import { Container } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import { useState } from "react";
import { UNCATEGORIZED_ID, useBudget } from "./context/BudgetContext";
import AddExpenseModal from "./components/AddExpenseModal";
import UncategorizedBudgetcard from "./components/UncategorizedBudgetcard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpenseModal from "./components/ViewExpensesModal";
import useLocalStorage from "./utils/useLocalStorage";
import "./index.css";
import capitalFirstLetter from "./utils/FirstLetterFormatter";

function App() {
  const [name, setName] = useLocalStorage("name", "Rohit");

  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewModalBudgetId, setViewModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();

  const { budgets, getBudgetExpenses, expense } = useBudget();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  const title = capitalFirstLetter(name);
  console.log(title);
  return (
    <>
      <Container>
        <Stack direction="horizontal" gap="2" className="mb-4 mt-4">
          <div className="me-auto">
            <h1>{`${title}'s Budget`}</h1>
            <Button
              variant="outline-dark"
              onClick={() => {
                const prom = prompt("Enter Your Name");
                return prom == null ? null : setName(prom);
              }}
              size="sm"
            >
              Change Name
            </Button>
          </div>
          <div className="button-pair">
            <Button
              variant="primary"
              onClick={() => setShowAddBudgetModal(true)}
            >
              Add Budget
            </Button>

            <Button variant="outline-primary" onClick={openAddExpenseModal}>
              Add Expense
            </Button>
          </div>
        </Stack>
        {budgets.length == 0 && expense.length == 0 ? (
          <div className="When-empty">
            <h1>Your Budget Is Empty</h1>
            <h2>This App will make you smart in planning your expenses.</h2>
            <p>
              This is an app that helps you create a monthly budget, track your
              expenses, and set specific amounts for different spending
              categories. Click{" "}
              <a
                style={{ fontWeight: "bold" }}
                href="https://scribehow.com/shared/Netlify_Workflow__PoSXGsEWQhy_aQkI6mlpYg"
              >
                Here
              </a>{" "}
              to learn more.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(300px, 1fr))",
              gap: "1rem",
              alignItems: "flex-start",
            }}
          >
            {budgets.map((budget) => {
              const amount = getBudgetExpenses(budget.id).reduce(
                (total, expense) => total + expense.amount,
                0
              );

              return (
                <BudgetCard
                  key={budget.id}
                  name={budget.name}
                  amount={amount}
                  max={budget.max}
                  onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                  onViewExpenseClick={() => setViewModalBudgetId(budget.id)}
                />
              );
            })}
            <UncategorizedBudgetcard
              onAddExpenseClick={openAddExpenseModal}
              onViewExpenseClick={() => setViewModalBudgetId(UNCATEGORIZED_ID)}
            />
            <TotalBudgetCard hidesButton={true} />
          </div>
        )}
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpenseModal
        budgetId={viewModalBudgetId}
        handleClose={() => setViewModalBudgetId()}
      />
    </>
  );
}

export default App;
