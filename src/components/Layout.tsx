import { type ReactNode, useState } from "react";
import type { Page } from "../types";
import { useExchangeRate } from "../hooks/useExchangeRate";
import { ExchangeRateModal } from "./ExchangeRateModal";

type Props = {
  children: ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
};

const tabs: { page: Page; label: string }[] = [
  { page: "products", label: "Productos" },
  { page: "sales", label: "Ventas" },
  { page: "dashboard", label: "Dashboard" },
];

export function Layout({ children, currentPage, onNavigate }: Props) {
  const { rate, setExchangeRate } = useExchangeRate();
  const [showRate, setShowRate] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-700 text-white px-4 py-2 flex items-center justify-between shadow">
        <h1 className="font-bold text-base">DailySells</h1>
        <button
          onClick={() => setShowRate(true)}
          className="flex items-center gap-1 bg-blue-600 px-2.5 py-1 rounded-lg text-xs font-medium active:bg-blue-500"
        >
          <span>Bs</span>
          <span className="font-bold">{rate.toFixed(2)}</span>
          <span className="text-[10px] opacity-80">/USD</span>
        </button>
      </header>
      <main className="flex-1 overflow-y-auto p-3">{children}</main>
      <nav className="flex border-t bg-white shadow">
        {tabs.map(({ page, label }) => (
          <button
            key={page}
            onClick={() => onNavigate(page)}
            className={`flex-1 py-2.5 text-center text-xs font-medium transition-colors ${
              currentPage === page
                ? "text-blue-700 border-t-2 border-blue-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>
      {showRate && (
        <ExchangeRateModal
          currentRate={rate}
          onSave={setExchangeRate}
          onClose={() => setShowRate(false)}
        />
      )}
    </div>
  );
}
