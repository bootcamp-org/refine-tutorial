import { Refine, WelcomePage } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
} from "@refinedev/mui";

import {
  AutoAwesomeMosaic,
  AutoAwesomeMotion,
  Backup,
  Bookmarks,
  Dashboard,
} from "@mui/icons-material/";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { MuiInferencer } from "@refinedev/inferencer/mui";
import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { ColorModeContextProvider } from "./contexts/color-mode";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              dataProvider={{
                default: dataProvider("https://api.fake-rest.refine.dev"),
                typicode: dataProvider("https://jsonplaceholder.typicode.com"),
              }}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
              resources={[
                {
                  name: "post",
                  meta: { icon: <Dashboard /> },
                },
                {
                  name: "test",
                  meta: { icon: <Bookmarks /> },
                },
                {
                  name: "blog_posts",
                  list: "/blog-posts",
                  show: "/blog-posts/show/:id",
                  create: "/blog-posts/create",
                  edit: "/blog-posts/edit/:id",
                  meta: {
                    canDelete: true,
                    label: "Refine posts",
                    icon: <AutoAwesomeMotion />,
                    dataProviderName: "default",
                    parent: "post",
                  },
                },
                {
                  name: "posts",
                  list: "/posts",
                  show: "/posts/show/:id",
                  create: "/posts/create",
                  edit: "/posts/edit/:id",
                  meta: {
                    canDelete: false,
                    label: "Typicode posts",
                    icon: <AutoAwesomeMosaic />,
                    dataProviderName: "typicode",
                    parent: "post",
                  },
                },
                {
                  name: "fake_resource",
                  list: "/test",
                  meta: {
                    label: "Fake resource",
                    icon: <Backup />,
                    parent: "test",
                  },
                },
              ]}
            >
              <Routes>
                <Route
                  element={
                    <ThemedLayoutV2>
                      <Outlet />
                    </ThemedLayoutV2>
                  }
                >
                  <Route index element={<WelcomePage />} />
                  <Route path="blog-posts" element={<MuiInferencer />}>
                    <Route path="show/:id" element={<MuiInferencer />} />
                    <Route path="edit/:id" element={<MuiInferencer />} />
                    <Route path="create" element={<MuiInferencer />} />
                  </Route>

                  <Route path="posts" element={<MuiInferencer />}>
                    <Route path="show/:id" element={<MuiInferencer />} />
                    <Route path="edit/:id" element={<MuiInferencer />} />
                    <Route path="create" element={<MuiInferencer />} />
                  </Route>

                  <Route path="test" element={<h1>Hello World</h1>} />
                </Route>
              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
