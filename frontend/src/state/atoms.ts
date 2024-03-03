import { atom } from "recoil";
import {
  currentBlogSelector,
  isAuthenticatedSelector,
  postsSelector,
} from "./selector";
import { postType } from "@/assets/types";

export const currentBlogAtom = atom<postType | null>({
  key: "currentBlog",
  default: currentBlogSelector,
});

export const userTokenState = atom<string>({
  key: "userToken",
  default: localStorage.getItem("token") || "",
});

export const isAuthenticatedAtom = atom<Boolean>({
  key: "isAuthenticated",
  default: isAuthenticatedSelector,
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

export const postsAtom = atom<postType[]>({
  key: "Posts",
  default: postsSelector,
});
