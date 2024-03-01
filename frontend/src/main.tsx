import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { useEffect, useState } from "react";
import CustomLoader from "./components/ui/custom-loader.tsx";

function Main() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <CustomLoader />;

  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
