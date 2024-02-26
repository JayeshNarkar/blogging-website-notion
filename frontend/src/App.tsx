import { RecoilRoot } from "recoil";
import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import PrivateRoutes from "./pages/PrivateRoutes";
import CreateBlogPostPage from "./pages/CreateBlogPage";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <MainApp />
      </Router>
    </RecoilRoot>
  );
}

function MainApp() {
  return (
    <Routes>
      <Route path="/" Component={LandingPage} />
      <Route path="/signup" Component={SignupPage} />
      <Route path="/signin" Component={SigninPage} />
      <Route element={<PrivateRoutes />}>
        <Route path="/homepage" Component={HomePage} />
        <Route path="/createblog" Component={CreateBlogPostPage} />
      </Route>
    </Routes>
  );
}

export default App;
