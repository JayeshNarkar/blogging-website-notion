import { backendUrlAtom, currentBlogAtom, postsAtom } from "@/state/atoms";
import { useRecoilStateLoadable, useRecoilValue } from "recoil";

import React, { useState, startTransition } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import CustomLoader from "./custom-loader";
import { Input } from "./input";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { Button } from "./button";
import { TrashIcon } from "@radix-ui/react-icons";
import { postType } from "@/assets/types";

export default function CustomSidebar() {
  let [currentBlogLoading, setCurrentBlog] =
    useRecoilStateLoadable(currentBlogAtom);
  let [postsLoading, setPosts] = useRecoilStateLoadable(postsAtom);

  const backendUrl = useRecoilValue(backendUrlAtom);

  const [search, setSearch] = useState("");
  const [postBeingDeleted, setPostBeingDeleted]: [
    postBeinDeleted: string[] | 1,
    setPostBeingDeleted: any
  ] = useState([]);
  const [postLoading, setPostLoading] = useState(false);

  const changeCurrentActiveHandler = (post: postType) => {
    startTransition(() => {
      setCurrentBlog(post);
    });
  };

  if (
    postsLoading.state === "loading" ||
    currentBlogLoading.state === "loading"
  ) {
    return <CustomLoader />;
  } else if (
    postsLoading.state === "hasError" ||
    currentBlogLoading.state === "hasError"
  ) {
    return <h1> Error :p</h1>;
  } else {
    const posts = postsLoading.contents;
    const currentBlog = currentBlogLoading.contents;
    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );

    const deletePostHandler = async (post: postType) => {
      try {
        setPostBeingDeleted([...postBeingDeleted, post.id]);
        const response = await axios.delete(backendUrl + "/blog", {
          data: {
            id: post.id,
          },
        });
        console.log(response);
        if (response.data.deleted)
          setPosts((posts) =>
            posts.filter((postParam) => postParam.id !== post.id)
          );
      } catch (e) {
        console.log(e);
      }
    };

    const addNewBlogHandler = async () => {
      try {
        setPostLoading(true);
        const response = await axios.get(backendUrl + "/newblog");
        console.log(response.data);
        setPosts([...posts, response.data.newPost]);
      } catch (error) {
        console.log(error);
      } finally {
        setPostLoading(false);
      }
    };

    return (
      <>
        <div className="border-b-2 border-primary p-3">
          <Input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />
        </div>
        <div className="border-b-2 border-primary">
          <h1 className="font-bold text-xl text-primary m-3">
            <button onClick={addNewBlogHandler} className="hover:underline">
              New page +
            </button>
          </h1>
        </div>
        <Accordion type="single" collapsible className="text-muted-foreground">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <p className="ml-3 text-xl font-bold">Your Blogs:</p>
            </AccordionTrigger>
            <hr className="border border-primary" />
            {filteredPosts &&
              filteredPosts.map((post, index) => {
                return (
                  <React.Fragment key={index}>
                    <AccordionContent
                      className={`flex text-center font-semibold text-xl m-3 justify-between content-between ${
                        post.id === currentBlog?.id ? "text-primary" : ""
                      } ${" "} ${
                        postBeingDeleted.find(
                          (deletedPost) => deletedPost === post.id
                        )
                          ? "text-muted"
                          : ""
                      }
                      `}
                      id={post.id}
                    >
                      <button
                        onClick={() => changeCurrentActiveHandler(post)}
                        className="hover:underline"
                      >
                        -- {post.title}
                      </button>
                      <Button
                        variant={"destructive"}
                        onClick={() => {
                          deletePostHandler(post);
                        }}
                      >
                        <TrashIcon />
                      </Button>
                    </AccordionContent>
                    <hr className="mx-4 border border-primary" />
                  </React.Fragment>
                );
              })}
            {postLoading && (
              <>
                <AccordionContent className="flex justify-center items-center">
                  <BeatLoader
                    color="hsl(47.9 95.8% 53.1%)"
                    loading={true}
                    size={10}
                  />
                </AccordionContent>
                <hr className="mx-4 border border-primary" />
              </>
            )}
            <AccordionContent className="text-center font-semibold text-md m-3 flex justify-left content-left">
              <button onClick={addNewBlogHandler} className="hover:underline">
                ++Add New Page
              </button>
            </AccordionContent>
            <hr className="border border-primary" />
          </AccordionItem>
        </Accordion>
      </>
    );
  }
}
