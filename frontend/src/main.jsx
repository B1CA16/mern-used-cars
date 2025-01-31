import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext.jsx";
import { CarProvider } from "./context/CarContext.jsx";
import ScrollToTop from "./hooks/ScrollToTop.jsx";
import AuthProvider from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <AuthProvider>
            <SearchProvider>
                <CarProvider>
                    <ScrollToTop />
                    <App />
                </CarProvider>
            </SearchProvider>
        </AuthProvider>
    </BrowserRouter>
);
