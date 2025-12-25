import { Link } from "react-router-dom"

const Nav = ({ search,setSearch }) => {
  return (
    <nav className="Nav">
      <form className="Nav" onSubmit={(e)=> e.preventDefault()}></form>
      <label htmlFor="search" >search Posts</label>
      <input 
      id="search"
      type="text"
      placeholder="search post"
      value={search}
      onChange={(e)=>setSearch(e.target.value)}></input>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="post">Post</Link></li>
        <li><Link to="about">About</Link></li>
      </ul>

    </nav>
  )
}

export default Nav
