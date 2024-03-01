import { postsAtom } from "@/state/atoms";
import { useRecoilValueLoadable } from "recoil";
import CustomLoader from "./custom-loader";

const PostsComponent = () => {
  const postsObj = useRecoilValueLoadable(postsAtom);
  if (postsObj.state === "hasError") return <h1>Error While loading</h1>;
  else if (postsObj.state === "loading") return <CustomLoader />;
  else {
    const posts = postsObj.contents;
    console.log(posts);
    return (
      <>
        <h1>Hello from posts</h1>
      </>
    );
  }
};

export default PostsComponent;
