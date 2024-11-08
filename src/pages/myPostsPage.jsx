import { useEffect, useState } from "react";
import dataService from "../appwrite/config";
import { MyPostCard } from "../components";
import { useSelector } from "react-redux";
import { Query } from "appwrite";
import { Modal, Button, Spinner } from "react-bootstrap"; // Import Bootstrap Modal, Button, and Spinner

function MyPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [postIdToDelete, setPostIdToDelete] = useState(null); // State to store post ID to delete
  const userData = useSelector((state) => state.auth.userData);
  const userIdQuery = [Query.equal("userId", userData.$id)];

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
      setPosts((prevPosts) => prevPosts.filter((post) => post.$id !== postIdToDelete));
      closeDeleteModal(); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    if (userData && userData.$id) {
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
    }
  }, [userData]);

  return (
    <div className="container mb-5">
      <h2 className="text-center mb-4">
        Your Posts
        <hr className="my-2" style={{ border: '2px solid #6c757d', width: '50%', margin: 'auto' }} />
      </h2>
      
      {/* Display loading spinner or message */}
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

      {/* Delete Confirmation Modal */}
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
