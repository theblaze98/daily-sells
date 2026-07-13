import { type ReactNode, useState } from "react";
import type { Page } from "../types";
import { useExchangeRate } from "../hooks/useExchangeRate";
import { ExchangeRateModal } from "./ExchangeRateModal";

type Props = {
  children: ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
};

const tabs: { page: Page; label: string; icon: string }[] = [
  { page: "products", label: "Productos", icon: "📦" },
  { page: "sales", label: "Ventas", icon: "💰" },
  { page: "dashboard", label: "Dashboard", icon: "📊" },
];

export function Layout({ children, currentPage, onNavigate }: Props) {
  const { rate, setExchangeRate } = useExchangeRate();
  const [showRate, setShowRate] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-zinc-100">
      <header className="bg-zinc-900/95 backdrop-blur border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
        <h1 className="font-bold text-base tracking-tight">DailySells</h1>
        <button
          onClick={() => setShowRate(true)}
          className="flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors"
        >
          <span className="text-blue-400 font-bold">{rate.toFixed(2)}</span>
          <span className="text-zinc-400">Bs/USD</span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
        {children}
      </main>

      <nav className="flex bg-zinc-900 border-t border-zinc-800 pb-1">
        {tabs.map(({ page, label, icon }) => (
          <button
            key={page}
            onClick={() => onNavigate(page)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium transition-colors rounded-t-xl ${
              currentPage === page
                ? "text-blue-400"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <span className="text-base">{icon}</span>
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
