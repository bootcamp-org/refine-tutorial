import { Authenticated, Refine, WelcomePage } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage,
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
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { RefinePostList } from "pages/blog-posts/list";
import { RefinePostEdit } from "pages/blog-posts/edit";
import { RefinePostShow } from "pages/blog-posts/show";
import { RefinePostCreate } from "pages/blog-posts/create";
import authProvider from "authProvider";

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
              authProvider={authProvider}
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
                    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                      <ThemedLayoutV2>
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route index element={<WelcomePage />} />
                  <Route path="blog-posts">
                    <Route index element={<RefinePostList />} />
                    <Route path="show/:id" element={<RefinePostShow />} />
                    <Route path="edit/:id" element={<RefinePostEdit />} />
                    <Route path="create" element={<RefinePostCreate />} />
                  </Route>

                  <Route path="posts" element={<MuiInferencer />}>
                    <Route path="show/:id" element={<MuiInferencer />} />
                    <Route path="edit/:id" element={<MuiInferencer />} />
                    <Route path="create" element={<MuiInferencer />} />
                  </Route>

                  <Route path="test" element={<h1>Hello World</h1>} />
                </Route>
                <Route
                  element={
                    <Authenticated fallback={<Outlet />}>
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<AuthPage type="login" />} />
                  <Route
                    path="/register"
                    element={<AuthPage type="register" />}
                  />
                  <Route
                    path="/forgot-password"
                    element={<AuthPage type="forgotPassword" />}
                  />
                  <Route
                    path="/update-password"
                    element={<AuthPage type="updatePassword" />}
                  />
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
