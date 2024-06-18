import React from "react";
import ReactDOM from "react-dom/client";

import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/notifications/styles.css";

import "./index.css";
// declare global {
//   interface Window {
//     arweaveWallet: {
//       connect: (foo: string[]) => void;
//       disconnect: () => void;
//       getActiveAddress: () => void;
//     };
//   }
// }

import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ArweaveWalletKit } from "@arweave-wallet-kit/react";
import ArConnectStrategy from "@arweave-wallet-kit/arconnect-strategy";
import OthentStrategy from "@arweave-wallet-kit/othent-strategy";

import { MantineProvider } from "@mantine/core";
import Add from "./pages/Add";
import { Notifications } from "@mantine/notifications";
import IssuesMap from "./pages/Map";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/add",
    element: <Add />,
  },
  {
    path: "/map",
    element: <IssuesMap />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ArweaveWalletKit
      config={{
        permissions: ["ACCESS_ADDRESS", "ACCESS_PUBLIC_KEY", "SIGN_TRANSACTION", "DISPATCH", "SIGNATURE"],
        ensurePermissions: true,
        strategies: [new OthentStrategy(), new ArConnectStrategy()],
      }}
    >
      <MantineProvider>
        <Notifications position="top-right" />
        <RouterProvider router={router} />
      </MantineProvider>
    </ArweaveWalletKit>
  </React.StrictMode>
);
