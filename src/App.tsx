import { useState } from "react";
import type { Page } from "./types";
import { Layout } from "./components/Layout";
import { ProductsPage } from "./pages/ProductsPage";
import { SalesPage } from "./pages/SalesPage";
import { DashboardPage } from "./pages/DashboardPage";

function App() {
  const [page, setPage] = useState<Page>("products");

  return (
    <Layout currentPage={page} onNavigate={setPage}>
      {page === "products" && <ProductsPage />}
      {page === "sales" && <SalesPage />}
      {page === "dashboard" && <DashboardPage />}
    </Layout>
  );
}

export default App;
