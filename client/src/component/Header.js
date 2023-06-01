import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header(){

  const [username,setUsername]=useState(null);

  useEffect(()=>{
    fetch('http://localhost:4000/profile',{
      credentials:'include',
    }).then(response=>response.json()).then(userInfo=>
      setUsername(userInfo.username))
  },[])

  function logout(){
    fetch('http://localhost:4000/logout',{
      credentials: 'include',
      method:"POST"
    })
    setUsername(null)
  }
    return(
        <header>
            <Link to='/' className='logo'>logo</Link>
            <nav>
              {username && (
                <>
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