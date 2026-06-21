import MainLayout from "./layouts/MainLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";

/** Root application component. Single-page dashboard for this prototype. */
export default function App() {
  return (
    <MainLayout>
      <Dashboard />
    </MainLayout>
  );
}
