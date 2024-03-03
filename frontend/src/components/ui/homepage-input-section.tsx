import { backendUrlAtom, currentBlogAtom, postsAtom } from "@/state/atoms";
import {
  useRecoilStateLoadable,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import CustomLoader from "./custom-loader";
import axios from "axios";

const HomepageInputSection = () => {
  const [currentBlogLoading, setCurrentBlog] =
    useRecoilStateLoadable(currentBlogAtom);

  const setPosts = useSetRecoilState(postsAtom);

  const backendUrl = useRecoilValue(backendUrlAtom);

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
          console.log("accessed");
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
          console.log("accessed");
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
      <div className="m-3 grid grid-rows-8">
        <div className="row-span-3 font-semibold">
          <label htmlFor="title" className="text-primary">
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
        <div className="row-span-5">
          <label htmlFor="content" className="font-semibold text-primary">
            Content:
          </label>
          <textarea
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
