import { useEffect, useState } from "react";
import dataService from "../appwrite/config";
import { MyPostCard } from "../components";
import { useSelector } from "react-redux";
import { Query } from "appwrite";
import { Modal, Button, Spinner } from "react-bootstrap";

function MyPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const userData = useSelector((state) => state.auth.userData);
  const userIdQuery = userData?.$id ? [Query.equal("userId", userData.$id)] : null;

  const openDeleteModal = (postId) => {
    setPostIdToDelete(postId);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setShowModal(false);
    setPostIdToDelete(null);
  };

  const deletePost = async () => {
    try {
      await dataService.deletePost(postIdToDelete);
      setPosts((prevPosts) => prevPosts.filter((post) => post?.$id !== postIdToDelete));
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    if (userIdQuery) {
      dataService.getPosts(userIdQuery)
        .then((data) => {
          if (data && data.documents) {
            setPosts(data.documents);
          } else {
            console.error("No documents found or invalid response structure", data);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [userIdQuery]);

  if (!userData) {
    return <p className="text-center">Please log in to view your posts.</p>;
  }

  return (
    <div className="container mb-5">
      <h2 className="text-center mb-4">
        Your Posts
        <hr className="my-2" style={{ border: '2px solid #6c757d', width: '50%', margin: 'auto' }} />
      </h2>
      
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Loading posts...</p>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mt-3">
          {posts.length === 0 ? (
            <div className="col">
              <h2>No Posts To Show</h2>
            </div>
          ) : (
            posts.map((post) => (
              <div className="col" key={post.$id}>
                <div className="card shadow-sm">
                  <MyPostCard post={post} deletePost={() => openDeleteModal(post.$id)} />
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <Modal show={showModal} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            No
          </Button>
          <Button variant="danger" onClick={deletePost}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MyPostsPage;
