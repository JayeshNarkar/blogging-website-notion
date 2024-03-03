import { SquareIcon } from "@radix-ui/react-icons";
import { Button } from "./button";
import { ModeToggle } from "./mode-toggle";
import { isAuthenticatedAtom } from "@/state/atoms";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

const NavbarCustom = () => {
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedAtom);
  const navigate = useNavigate();

  const LogOutHander = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex justify-between p-2 border-b-2 border-primary">
      <div className="flex justify-start content-start mr-2">
        <button
          className="flex items-center justify-center mr-2 hover:underline"
          onClick={() => navigate("/")}
        >
          <SquareIcon />
          MEDIUM
        </button>
      </div>
      <div className="flex items-end justify-end">
        {isAuthenticated ? (
          <Button
            variant={"secondary"}
            className="mr-2 font-bold"
            onClick={LogOutHander}
          >
            Log out
          </Button>
        ) : (
          <>
            <Button
              className="mr-2 font-bold"
              onClick={() => navigate("/signin")}
              variant={"secondary"}
            >
              Sign In
            </Button>
            <Button
              className="mr-2"
              onClick={() => navigate("/signup")}
              variant={"default"}
            >
              Sign Up
            </Button>
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default NavbarCustom;
