import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Post from "./Post";
import CreatePostPage from "./CreatePostPage";
import ProfileTemplate from "./ProfileTemplate";

function UserProfile() {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      console.log(userId);
      await fetch(`http://localhost:4000/user/${userId}`).then((response) => {
        response.json().then((posts) => {
          setPosts(posts);
        });
      });
    }
    fetchData();
  }, [userId]);
  async function DeletePost(postID) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (confirmed) {
      await fetch(`http://localhost:4000/post/${postID}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            alert("Delete successful");
            window.location.reload(false);
          } else {
            alert("Delete failed");
          }
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div style={{ backgroundColor: "#f8f9fa" }}>
      <ProfileTemplate />
      <CreatePostPage />
      <hr />
      <hr />
      <div>
        {posts.length > 0 &&
          posts.map((post) => {
            return (
              <div style={{ marginTop: "30px" }} key={post._id}>
                <Post {...post} key={post._id} />
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button className="btn btn-primary me-md-2" type="button">
                    <Link
                      to={`/edit/${post._id}`}
                      style={{ textDecoration: "none", color: "white" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                      Edit Post
                    </Link>
                  </button>
                  <button
                    className="btn btn-primary me-md-2"
                    type="button"
                    onClick={() => {
                      DeletePost(post._id);
                    }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        {posts.length <= 0 && <> no post</>}
      </div>
    </div>
  );
}

export default UserProfile;
