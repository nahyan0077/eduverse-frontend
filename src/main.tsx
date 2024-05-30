import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store/index.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";




const clientId = String(import.meta.env.VITE_GOOGLE_CLIENT_ID);





ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
			<Provider store={store}>
				<GoogleOAuthProvider clientId={clientId}>
					<App />
				</GoogleOAuthProvider>
			</Provider>
		</ThemeProvider>
	</React.StrictMode>
);
