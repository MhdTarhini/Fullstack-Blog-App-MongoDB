import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Header() {
  // const [username,setUsername]=useState(null); // we Used context instead
  const { userInfo, setUserInfo } = useContext(UserContext);
  useEffect(() => {
    console.log(userInfo);
    async function fetchData() {
      try {
        await fetch("http://localhost:4000/profile", {
          credentials: "include",
        })
          .then((response) => response.json())
          .then((userInfo) =>
            // setUsername(userInfo.username)
            setUserInfo(userInfo)
          );
      } catch (error) {
        console.log("not ign on");
      }
    }
    fetchData();
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }
  const username = userInfo?.username;
  const ProfileImage = userInfo?.ProfileImage;
  return (
    <header>
      <Link to="/" className="logo">
        logo
      </Link>
      <nav>
        {username && (
          <>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href=""
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
                  <span style={{ fontWeight: "bold" }}>
                    <img
                      src={`http://localhost:4000/${ProfileImage}`}
                      className="rounded-circle"
                      style={{ width: "50px" }}
                      alt="Avatar"
                    />{" "}
                    {username.toUpperCase()}
                  </span>
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                  <Link to="/create" className="dropdown-item">
                    Create New Post
                  </Link>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" onClick={logout} href="/">
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
{
  /* <span style={{fontWeight: 'bold'}}>HELLO {username.toUpperCase()}</span>
<Link to='/create'>Create New Post</Link>
<a onClick={logout} href='/' >Logout</a> */
}