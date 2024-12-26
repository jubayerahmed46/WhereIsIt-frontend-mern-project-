import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import Button1 from "../../components/common/btns/Button1";
import { Link } from "react-router";
import Spinner from "../spinner/Spinner";
import useAxiosInstance from "../../hooks/useAxiosInstance";

export default function LatestLostAndFound() {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(true);
  const instance = useAxiosInstance();

  useEffect(() => {
    (async function fetchPosts() {
      try {
        const { data } = await instance.get("/posts?searchText=latest");
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err.message);
      } finally {
        setLoader(false);
      }
    })();
  }, [instance]);

  if (loader) {
    return <Spinner />;
  }

  return (
    <div className="pt-8 ">
      <div className="container mx-auto py-8">
        <div>
          <h2 className="text-3xl  tracking-tight text-gray-900 font-bold">
            Latest Lost and Found Items
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 xl:gap-x-8">
          {posts.map((post) => (
            <div
              key={post._id}
              className="group relative border p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link to="/lost-and-found">
            <Button1 className="text-white bg-blue-600 hover:bg-blue-700">
              See All
            </Button1>
          </Link>
        </div>
      </div>
    </div>
  );
}
