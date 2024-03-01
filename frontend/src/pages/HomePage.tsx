import CustomLoader from "@/components/ui/custom-loader";
import CustomSidebar from "@/components/ui/custom-sidebar";
import { currentBlogAtom, currentPostObjAtom } from "@/state/atoms";
import { useEffect } from "react";
import { useRecoilStateLoadable, useRecoilValueLoadable } from "recoil";

const HomePage = () => {
  const [currentPostLoading, setCurrentPost] =
    useRecoilStateLoadable(currentPostObjAtom);
  const [currentBlogLoading, setCurrentBlog] =
    useRecoilStateLoadable(currentBlogAtom);

  if (
    currentPostLoading.state === "loading" ||
    currentBlogLoading.state === "loading"
  ) {
    return <CustomLoader />;
  } else if (
    currentPostLoading.state === "hasError" ||
    currentBlogLoading.state === "hasError"
  ) {
    return <h1>Error faced :p</h1>;
  } else {
    console.log(currentPostLoading.contents);
    console.log(currentBlogLoading.contents);

    return (
      <div className="grid grid-cols-8">
        <div className="col-span-3 lg:col-span-2 border-r-2 border-primary min-h-[90vh]">
          <CustomSidebar />
        </div>
        <div className="col-span-5 lg:col-span-6">
          <p>Insert text field here</p>
        </div>
      </div>
    );
  }
};

export default HomePage;
