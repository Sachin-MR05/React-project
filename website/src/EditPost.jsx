import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const EditPost = ({post, handleEdit,editBody,setEditBody,editTitle,setEditTiltle}) => {
  const {id} =useParams();
  const post =posts.find(post => (post.id).toString()===id);

  useEffect(()=>{
    if(post){
      setEditTiltle(post.title);
      setEditTiltle(post.body);
    }
  },[post,setEditTiltle,setEditBody])
return(
  <main className='NewPost'> {editTitle && 
  <>
  <h2>EditPost</h2>
  <form className='newpostform'onSubmit={(e)=>e.preventDefault()}>
    
  </form>
  </>}</main>
)
}

export default EditPost
