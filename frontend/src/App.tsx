import { RecoilRoot, useRecoilValueLoadable } from "recoil";
import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import AuthenticatedRoutes from "./pages/AuthenticatedRoutes";
import UnAuthenticatedRoutes from "./pages/UnAuthenticatedRoutes";

import { ThemeProvider } from "./components/ui/theme-provider";
import NavbarCustom from "./components/ui/custom-navbar";
import CustomLoader from "./components/ui/custom-loader";
import { isAuthenticatedAtom } from "@/state/atoms";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RecoilRoot>
        <Router>
          <MainApp />
        </Router>
      </RecoilRoot>
    </ThemeProvider>
  );
}

function MainApp() {
  const isAuthenticated = useRecoilValueLoadable(isAuthenticatedAtom);
  if (isAuthenticated.state === "loading") {
    return <CustomLoader />;
  } else if (isAuthenticated.state === "hasError") {
    return <h1>Error while authenticating </h1>;
  } else {
    return (
      <>
        <NavbarCustom />
        <Routes>
          <Route path="/" Component={LandingPage} />
          <Route element={<UnAuthenticatedRoutes />}>
            <Route path="/signup" Component={SignupPage} />
            <Route path="/signin" Component={SigninPage} />
          </Route>
          <Route element={<AuthenticatedRoutes />}>
            <Route path="/home" Component={HomePage} />
          </Route>
        </Routes>
      </>
    );
  }
}

export default App;
