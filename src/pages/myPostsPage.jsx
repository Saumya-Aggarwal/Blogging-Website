import { useEffect, useState } from "react";
import dataService from "../appwrite/config";
import { MyPostCard } from "../components";
import { useSelector } from "react-redux";
import { Query } from "appwrite";

function MyPostsPage() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const userIdQuery = [Query.equal("userId", userData.$id)];

  useEffect(() => {
    if (userData && userData.$id) {
      dataService.getPosts(userIdQuery).then((data) => {
        if (data && data.documents) {
          setPosts(data.documents);
          console.log(data);
        } else {
          console.error("No documents found or invalid response structure", data);
        }
      });
    }
  }, [userData]);

  return (
    <div className="container mb-5">
      <h2 className="text-center mb-4">
        Your Posts
        <hr className="my-2" style={{ border: '2px solid #6c757d    ', width: '50%', margin: 'auto' }} />
      </h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mt-3">
        {posts.length === 0 ? (
          <div className="col">
            <h2>No Posts To Show</h2>
          </div>
        ) : (
          posts.map((post) => (
            <div className="col" key={post.$id}>
              <div className="card shadow-sm">
                <MyPostCard post={post} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyPostsPage;
