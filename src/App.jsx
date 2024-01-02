import { NotebookPage } from "./pages/notebook/NotebookPage";
import { AppError } from "./pages/error/AppError";
import { RouterError } from "./pages/error/RouterError";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ErrorBoundary } from "react-error-boundary";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="h-[100svh] overflow-y-hidden bg-midnight font-lexend leading-none text-whiteSmoke">
      <ErrorBoundary FallbackComponent={AppError}>
        <Router>
          <Routes>
            <Route path="/" element={<NotebookPage />} />
            <Route path="*" element={<RouterError />} />
          </Routes>
        </Router>
        <ToastContainer />
      </ErrorBoundary>
    </div>
  );
}

export default App;

/*
 * PROJECT IMPORT STRUCTURE
 * <Local Components - local utilities - adapters>
 * <React/Custom Hooks>
 * <3rd party libraries (components - hooks - utilities )>
 * <Icons/Assets>
 */

// todo: navigate app with keyboard
