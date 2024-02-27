import axios from "axios";
import { atom, selector } from "recoil";

export const userTokenState = atom<string>({
  key: "userToken",
  default: localStorage.getItem("token") || "",
});

export const isAuthenticatedAtom = atom<Boolean>({
  key: "isAuthenticated",
  default: selector({
    key: "validateTokenSelector",
    get: async ({ get }) => {
      const token = get(userTokenState);
      if (token === "") {
        return false;
      }
      try {
        await axios.get("/api/v1/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return true;
      } catch (error) {
        localStorage.removeItem("token");
        return false;
      }
    },
  }),
});

export const emailAtom = atom<string>({
  key: "email",
  default: "",
});

export const passwordAtom = atom<string>({
  key: "password",
  default: "",
});

export const titleAtom = atom<string>({
  key: "title",
  default: "",
});

export const contentAtom = atom<string>({
  key: "content",
  default: "",
});

export const backendUrlAtom = atom<string>({
  key: "backendUrl",
  default: "https://backend.jayesh-narkar18.workers.dev/api/v1",
});
