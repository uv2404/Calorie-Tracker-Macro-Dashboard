import { createContext, useContext, useEffect, useRef, useState } from "react";

const BudgetAlertContext = createContext(null);

/**
 * Tracks the over-budget warning modal. We open the modal automatically on the
 * transition from within-budget -> exceeded (so it pops the moment a meal
 * pushes the user over), and let the user dismiss it without it re-opening
 * until they cross the threshold again.
 */
export const BudgetAlertProvider = ({ exceeded, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const prevExceeded = useRef(false);

  useEffect(() => {
    if (exceeded && !prevExceeded.current) {
      setIsOpen(true); // just crossed into "exceeded"
    }
    prevExceeded.current = exceeded;
  }, [exceeded]);

  const close = () => setIsOpen(false);

  return (
    <BudgetAlertContext.Provider value={{ isOpen, close, exceeded }}>
      {children}
    </BudgetAlertContext.Provider>
  );
};

export const useBudgetAlert = () => {
  const ctx = useContext(BudgetAlertContext);
  if (!ctx) throw new Error("useBudgetAlert must be used within BudgetAlertProvider");
  return ctx;
};
