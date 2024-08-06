import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./contexts/ThemeContext";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./styles/global";
import { AuthProvider } from "./hooks/auth";
import { ToastContainer } from "react-toastify";

import { AnimatedRoutes } from "./routes";
import { CartProvider } from "./contexts/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider>
				<GlobalStyles />
				<AuthProvider>
					<CartProvider>
						<AnimatedRoutes />
						<ToastContainer
							position="bottom-right"
							autoClose={5000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
							theme="colored"
						/>
					</CartProvider>
				</AuthProvider>
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
