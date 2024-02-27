import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BeatLoader } from "react-spinners";
import { useEffect, useState } from "react";

function Main() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer); // cleanup on unmount
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BeatLoader color="#007BFF" loading={true} size={10} />
      </div>
    );
  }

  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
