import React, { useEffect, useState } from "react";
import dataService from "../appwrite/config";
import { PostCard } from "../components";

function AllPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading , setLoading] = useState(true);
  useEffect(() => {
    dataService.getPosts().then((data) => {
      if (data) {
        console.log(data)
        setPosts(data.documents);
        setLoading(false);
      }
    });
  }, []);

  return (
    <div className="container mb-5">
      <h2 className="text-center mb-5">
        All Posts
        <hr className="my-2" style={{ border: '2px solid #6c757d    ', width: '50%', margin: 'auto' }} />
      </h2>
      {posts.length === 0 && loading === false ? (
        <center><h2>No Posts To Show</h2></center>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {posts.map((post) => (
            <div className="col" key={post.$id}>
              <div className="card align-items-center shadow-sm p-4">
                <PostCard post={post}></PostCard>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllPostsPage;
