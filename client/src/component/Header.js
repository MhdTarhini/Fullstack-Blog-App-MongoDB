import { Link } from "react-router-dom";

function Header(){
    return(
        <header>
            <Link to='/' className='logo'>logo</Link>
            <nav>
              <Link to='/login'>login</Link>
              <Link to='/'>Register</Link>
            </nav>
       </header>
    )
}

export default Header;