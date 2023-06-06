import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Post from "./Post";
import CreatePostPage from "./CreatePostPage";

function UserProfile() {
  const params = useParams();
  console.log(params);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await fetch("http://localhost:4000/post").then((response) => {
        response.json().then((posts) => {
          setPosts(posts);
        });
      });
    }
    fetchData();
  }, []);
  return (
    <div style={{ backgroundColor: "#f8f9fa" }}>
      <section>
        <div
          class="rounded-top text-white d-flex flex-row"
          style={{ backgroundColor: "#000", height: "200px" }}>
          <div
            class="ms-4 mt-5 ml-2 d-flex flex-column"
            style={{ width: "180px", height: "250px" }}>
            <img
              src={`http://localhost:4000/${userInfo.ProfileImage}`}
              alt="Generic placeholder image"
              class="img-fluid img-thumbnail mt-4 mb-2"
              style={{ width: "180px", Zindex: 1, height: "300px" }}
            />
            <Link
              type="button"
              class="btn btn-outline-dark"
              data-mdb-ripple-color="dark"
              style={{ Zindex: 1 }}>
              Edit profile
            </Link>
          </div>
          <div class="ms-3" style={{ margin: "130px 0px 0px 30px" }}>
            <h5>{userInfo.username}</h5>
            <p>New York</p>
          </div>
        </div>{" "}
        <div class="p-4 text-black" style={{ backgroundColor: "#f8f9fa" }}>
          <div class="d-flex justify-content-end text-center py-1">
            <div>
              <p class="mb-1 h5">253</p>
              <p class="small text-muted mb-0">Articals</p>
            </div>
            <div class="px-3">
              <p class="mb-1 h5">1026</p>
              <p class="small text-muted mb-0">Followers</p>
            </div>
            <div>
              <p class="mb-1 h5">478</p>
              <p class="small text-muted mb-0">Following</p>
            </div>
          </div>
        </div>
      </section>
      <div>
        <blockquote className="blockquote text-center">
          <p class="mb-0">NEW POST</p>
          <footer className="blockquote-footer">
            Always Write What You Thing About
          </footer>
        </blockquote>
        <CreatePostPage />
      </div>
      <hr />
      <hr />
      <div>
        {posts.length > 0 &&
          posts.map((post) => {
            if (post.author._id === userInfo.id) {
              return (
                <div style={{ marginTop: "30px" }}>
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
                    <button className="btn btn-outline-secondary" type="button">
                      Delete
                    </button>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}

export default UserProfile;
