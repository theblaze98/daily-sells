import type { ReactNode } from "react";
import type { Page } from "../types";

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
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-blue-600 text-white px-4 py-3 text-center font-bold text-lg shadow">
        DailySells
      </header>
      <main className="flex-1 overflow-y-auto p-4">{children}</main>
      <nav className="flex border-t bg-white">
        {tabs.map(({ page, label }) => (
          <button
            key={page}
            onClick={() => onNavigate(page)}
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
              currentPage === page
                ? "text-blue-600 border-t-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}
