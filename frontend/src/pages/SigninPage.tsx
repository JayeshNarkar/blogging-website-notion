import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  CheckIcon,
  EnvelopeClosedIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";

import { signinType } from "@jayeshn/blog-common/dst";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  backendUrlAtom,
  emailAtom,
  isAuthenticatedAtom,
  passwordAtom,
} from "@/state/atoms";
import axios from "axios";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const SigninPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useRecoilState(emailAtom);
  const [password, setPassword] = useRecoilState(passwordAtom);
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedAtom);
  const backendUrl = useRecoilValue(backendUrlAtom);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const payload: signinType = {
      email,
      password,
    };
    try {
      const response = await axios.post(backendUrl + "/signin", payload);
      localStorage.setItem("token", `Bearer ${response.data.jwt}`);
      setSuccessMessage("Signed in successfully!");
      axios.defaults.headers.common["Authorization"] =
        localStorage.getItem("token");
      setTimeout(() => {
        setIsAuthenticated(true);
        navigate("/home");
      }, 5000);
    } catch (error: any) {
      console.log(error);
      setSuccessMessage("");
      setErrorMessage(error?.response?.data?.message || "Error signing in");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <>
      <div className="flex content-center justify-center mx-3">
        {successMessage && (
          <Alert className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 my-4">
            <CheckIcon className="h-4 w-4" />
            <AlertTitle>Congrats!</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}
        {errorMessage && (
          <Alert
            variant="destructive"
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 my-4"
          >
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
      </div>
      <div
        className={`flex items-center justify-center ${
          errorMessage || successMessage ? "" : "min-h-[80vh]"
        }`}
      >
        <Card className={`${errorMessage ? "shake" : ""}`}>
          <CardHeader>
            <CardTitle>SignIn Form</CardTitle>
            <CardDescription>Log into an existing account:</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="w-full max-w-xs" onSubmit={formSubmitHandler}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="john.robert@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button className="mt-3" type="submit" disabled={isLoading}>
                <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
                {isLoading ? "Loading" : "Signin"}
              </Button>
            </form>
            <div>
              Don't have an account?{" "}
              <button
                onClick={() => {
                  navigate("/signup");
                }}
                className="hover:underline text-blue-400 hover:text-blue-600 mt-2"
              >
                Signup
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SigninPage;
