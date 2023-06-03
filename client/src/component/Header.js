import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Header(){

  // const [username,setUsername]=useState(null); // we Used context instead 
  const {setUserInfo, userInfo}=useContext(UserContext)
  useEffect( ()=>{
    async function fetchData(){
      try {
        await fetch('http://localhost:4000/profile',{
          credentials:'include',
        }).then(response=>response.json()).then(userInfo=>
          // setUsername(userInfo.username)
          setUserInfo(userInfo))
        
      } catch (error) {
        console.log("not ign on")
      }
    }
    fetchData()
  },[setUserInfo]);
      
  function logout(){
    fetch('http://localhost:4000/logout',{
      credentials: 'include',
      method:"POST"
    })
    setUserInfo(null)
  }
  const username = userInfo?.username;
    return(
        <header>
            <Link to='/' className='logo'>logo</Link>
            <nav>
              {username && (
                <>
                <span style={{fontWeight: 'bold'}}>HELLO {username.toUpperCase()}</span>
                <Link to='/create'>Create New Post</Link>
                <a onClick={logout} href='/' >Logout</a>
                </>
              )}
              {!username && (
                <>
                  <Link to='/login'>login</Link>
                  <Link to='/register'>Register</Link>
                </>
              )}
            </nav>
       </header>
    )
}

export default Header;