import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { PolygonAmoyTestnet } from "@thirdweb-dev/chains";
import { ChainId, ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";
import { StateContextProvider } from "./context";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThirdwebProvider
        activeChain={PolygonAmoyTestnet}
        clientId={process.env.CLIENT_ID}
        desiredChainId={ChainId.Mumbai}
        supportedWallets={[
          metamaskWallet({
            recommended: true,
          }),
        ]}
      >
        <StateContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </StateContextProvider>
      </ThirdwebProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
