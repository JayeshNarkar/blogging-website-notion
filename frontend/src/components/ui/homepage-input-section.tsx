import { backendUrlAtom, currentBlogAtom, postsAtom } from "@/state/atoms";
import {
  useRecoilStateLoadable,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import CustomLoader from "./custom-loader";
import axios from "axios";
import { useEffect, useRef } from "react";

const HomepageInputSection = () => {
  const [currentBlogLoading, setCurrentBlog] =
    useRecoilStateLoadable(currentBlogAtom);

  const setPosts = useSetRecoilState(postsAtom);

  const backendUrl = useRecoilValue(backendUrlAtom);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.addEventListener("input", autoResize, false);

      // Initial resize
      autoResize();

      // Remove event listener on cleanup
      return () => {
        textArea.removeEventListener("input", autoResize, false);
      };
    }

    function autoResize() {
      if (textArea) {
        textArea.style.height = "auto";
        textArea.style.height = textArea?.scrollHeight + "px";
      }
    }
  }, [textAreaRef, currentBlogLoading?.contents]);

  if (currentBlogLoading.state === "loading") return <CustomLoader />;
  else if (currentBlogLoading.state === "hasError")
    return <h1>Error faced :p</h1>;
  else {
    const currentBlog = currentBlogLoading.contents;

    const titleChangehandler = async (
      e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      if (currentBlog) {
        setCurrentBlog({
          ...currentBlog,
          title: e.target.value,
        });
        try {
          setPosts((currentPosts) =>
            currentPosts.map((post) => {
              if (post.id === currentBlog.id) {
                return {
                  ...currentBlog,
                  title: e.target.value,
                };
              } else {
                return post;
              }
            })
          );
          await axios.put(backendUrl + "/blog", {
            id: currentBlog.id,
            title: e.target.value,
          });
        } catch (error) {
          console.log(error);
        }
      }
    };

    const contentChangehandler = async (
      e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      if (currentBlog) {
        setCurrentBlog({
          ...currentBlog,
          content: e.target.value,
        });
        try {
          setPosts((currentPosts) =>
            currentPosts.map((post) => {
              if (post.id === currentBlog.id) {
                return {
                  ...currentBlog,
                  content: e.target.value,
                };
              } else {
                return post;
              }
            })
          );
          await axios.put(backendUrl + "/blog", {
            id: currentBlog.id,
            content: e.target.value,
          });
        } catch (error) {
          console.log(error);
        }
      }
    };

    if (!currentBlog) return <></>;
    return (
      <div className="m-3 min-h-screen md:min-h-[90vh]">
        <div className="font-semibold">
          <label htmlFor="title" className="text-primary text-xl">
            Title:
          </label>
          <textarea
            value={currentBlog.title}
            className="w-full h-full bg-transparent border-none p-3 outline-none text-2xl"
            placeholder="Title"
            id="title"
            onChange={titleChangehandler}
            style={{ resize: "none" }}
          />
        </div>
        <br />
        <div>
          <label
            htmlFor="content"
            className="font-semibold text-primary text-xl"
          >
            Content:
          </label>
          <textarea
            ref={textAreaRef}
            value={currentBlog.content}
            className="w-full h-full bg-transparent border-none p-3 outline-none"
            placeholder="Content"
            id="content"
            onChange={contentChangehandler}
            style={{ resize: "none" }}
          />
        </div>
      </div>
    );
  }
};

export default HomepageInputSection;
