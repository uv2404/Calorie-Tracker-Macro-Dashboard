import Navbar from "../components/Navbar.jsx";

/** Page shell: sticky navbar + centered, responsive content container. */
export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
