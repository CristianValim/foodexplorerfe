import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./hooks/auth";
import GlobalStyles from "./styles/global";

import { CartProvider } from "./contexts/CartContext";
import { AnimatedRoutes } from "./routes";

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
