import React, { useEffect, useState } from "react";
import dataService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import { BlogPost, Loader} from "../components";
import { IoMdArrowRoundBack } from "react-icons/io";

function PostPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage error
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      dataService.getPost(slug)
        .then((post) => {
          if (post) {
            setPost(post);
            setLoading(false); // Set loading to false when data is fetched
          } else {
            setError("Post not found.");
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error(err);
          setError("An error occurred while fetching the post.");
          setLoading(false);
        });
    } else {
      setError("Invalid post slug.");
      navigate("/");
    }
  }, [slug, navigate]);

  if (loading) {
    return <div className="container"><Loader></Loader></div>; // Loading state
  }

  if (error) {
    return (
      <div className="container">
        <h2>{error}</h2>
        <button onClick={() => navigate(-1)} className="btn btn-secondary mt-3">
        <IoMdArrowRoundBack className="me-1 mb-1" />
        Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="btn btn-secondary mb-4">
      <IoMdArrowRoundBack className="me-1 mb-1" />
      Go Back
      </button>
      <BlogPost post={post} />
    </div>
  );
}


export default PostPage;
