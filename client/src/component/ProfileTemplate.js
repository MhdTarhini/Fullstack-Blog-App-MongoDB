import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

function ProfileTemplate() {
  const { userInfo } = useContext(UserContext);
  return (
    <div>
      <section>
        <div
          className="rounded-top text-white d-flex flex-row"
          style={{ backgroundColor: "#000", height: "200px" }}>
          <div
            className="ms-4 mt-5 ml-2 d-flex flex-column"
            style={{ width: "180px", height: "250px" }}>
            <img
              src={
                userInfo.ProfileImage
                  ? `http://localhost:4000/${userInfo.ProfileImage}`
                  : `http://localhost:4000/uploads/272e932b686d420022deb7ec56ea1e9f.jpg`
              }
              alt="Generic placeholder image"
              className="img-fluid img-thumbnail mt-4 mb-2"
              style={{ width: "180px", Zindex: 1, height: "300px" }}
            />
            <Link
              type="button"
              className="btn btn-outline-dark"
              data-mdb-ripple-color="dark"
              style={{ Zindex: 1 }}>
              Edit profile
            </Link>
          </div>
          <div className="ms-3" style={{ margin: "130px 0px 0px 30px" }}>
            <h5>{userInfo.username}</h5>
            <p>New York</p>
          </div>
        </div>{" "}
        <div className="p-4 text-black" style={{ backgroundColor: "#f8f9fa" }}>
          <div className="d-flex justify-content-end text-center py-1">
            <div>
              <p className="mb-1 h5">253</p>
              <p className="small text-muted mb-0">Articals</p>
            </div>
            <div className="px-3">
              <p className="mb-1 h5">1026</p>
              <p className="small text-muted mb-0">Followers</p>
            </div>
            <div>
              <p className="mb-1 h5">478</p>
              <p className="small text-muted mb-0">Following</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProfileTemplate;
