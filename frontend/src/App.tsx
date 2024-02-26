import "./App.css";
import { Button } from "@/components/ui/button";

function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}

function App() {
  return (
    <>
      <Home />
    </>
  );
}

export default App;
