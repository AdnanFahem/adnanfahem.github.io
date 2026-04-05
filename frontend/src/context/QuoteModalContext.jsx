import { createContext, useContext, useState } from "react";
import QuoteModal from "@/components/QuoteModal";

const QuoteModalContext = createContext();

export function QuoteModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState("");

  const openQuoteModal = (service = "") => {
    setPreselectedService(service);
    setIsOpen(true);
  };

  const closeQuoteModal = () => {
    setIsOpen(false);
    setPreselectedService("");
  };

  return (
    <QuoteModalContext.Provider value={{ openQuoteModal, closeQuoteModal }}>
      {children}
      <QuoteModal
        isOpen={isOpen}
        onClose={closeQuoteModal}
        preselectedService={preselectedService}
      />
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  const context = useContext(QuoteModalContext);
  if (!context) {
    throw new Error("useQuoteModal must be used within a QuoteModalProvider");
  }
  return context;
}
