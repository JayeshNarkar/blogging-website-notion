import { RecoilRoot, useRecoilValueLoadable } from "recoil";
import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import CreateBlogPostPage from "./pages/CreateBlogPage";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import AuthenticatedRoutes from "./pages/AuthenticatedRoutes";
import UnAuthenticatedRoutes from "./pages/UnAuthenticatedRoutes";

import { ThemeProvider } from "./components/ui/theme-provider";
import NavbarCustom from "./components/ui/custom-navbar";

import { isAuthenticatedAtom } from "@/state/atoms";
import { BeatLoader } from "react-spinners";

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
    return (
      <div className="flex justify-center items-center h-screen">
        <BeatLoader color="#36d7b7" loading={true} size={10} />
      </div>
    );
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
            <Route path="/homepage" Component={HomePage} />
            <Route path="/createblog" Component={CreateBlogPostPage} />
          </Route>
        </Routes>
      </>
    );
  }
}

export default App;
