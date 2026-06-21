import { Component } from "react";
import { AlertTriangle } from "lucide-react";

/**
 * Class-based error boundary — catches render errors anywhere in the tree and
 * shows a friendly fallback instead of a blank screen.
 */
export default class ErrorBoundary extends Component {
  state = { hasError: false, message: "" };

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
          <AlertTriangle className="h-12 w-12 text-amber-400" />
          <h1 className="text-xl font-semibold">Something went wrong</h1>
          <p className="max-w-md text-sm text-slate-400">{this.state.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-500"
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
