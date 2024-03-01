import { selector } from "recoil";
import axios from "axios";
import { backendUrlAtom, postsAtom, userTokenState } from "@/state/atoms";
import { postType } from "@/assets/types";

export const currentBlogSelector = selector({
  key: "currentBlogSelector",
  get: ({ get }) => {
    const posts = get(postsAtom);
    if (!posts) return "";
    try {
      return posts[0].id;
    } catch (e) {
      return "";
    }
  },
});

export const isAuthenticatedSelector = selector({
  key: "validateTokenSelector",
  get: async ({ get }) => {
    const backendUrl = get(backendUrlAtom);
    const token = get(userTokenState);
    if (token === "") {
      return false;
    }
    try {
      const response = await axios.get(backendUrl + "/user", {
        headers: {
          Authorization: token,
        },
      });
      if (response.data.found === true)
        axios.defaults.headers.common["Authorization"] = token;
      return response.data.found;
    } catch (error) {
      localStorage.removeItem("token");
      return false;
    }
  },
});

export const postsSelector = selector({
  key: "PostsSelector",
  get: async ({ get }) => {
    const backendUrl = get(backendUrlAtom);
    const token = get(userTokenState);
    if (token === "") {
      return [];
    }
    try {
      const response = await axios(backendUrl + "/blog");
      const posts = response.data.posts;
      return posts;
    } catch (e) {
      console.log(e);
      return [];
    }
  },
});

export const currentPostObjSelector = selector({
  key: "currentPostObjSelector",
  get: ({ get }) => {
    const currentBlogId = get(currentBlogSelector);
    const posts = get(postsSelector);
    const currentPost = posts.find(
      (post: postType) => post.id === currentBlogId
    );
    return currentPost;
  },
});
