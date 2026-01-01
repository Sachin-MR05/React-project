import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import About from "./components/About";
import Missing from "./components/Missing";
import Footer from "./components/Footer";
import Post from "./components/Post";
import { Link,Route, Routes, useNavigate } from "react-router-dom";
import PostLayout from "./components/PostLayout";
import { useEffect, useState } from "react";

import { format } from "date-fns";
import api from "./api/posts"
import { roundToNearestMinutesWithOptions } from "date-fns/fp";
import EditPost from "./EditPost";

function App(){
  const [posts,setPosts]=useState([])
  const [search,setSearch]=useState('')
  const [searchResults,setSearchResults]=useState([])
  const [postTitle,setPostTitle]=useState('')
  const [postBody,setPostBody]=useState('')
  const [editTitle,setEditTitle] =useState('')
  const [editBody,setEditBody] = useState(" ")
  const navigate = useNavigate()

  useEffect(()=>{
    const fetchPosts = async() =>{
      try { const res = await api.get('/posts'); 
        setPosts(res.data); }
      catch(err){
        if(err){
          console.log(err.response.data);
          console.log(err.reaponse.status);
          console.log(err.response.headers);
        }
        else{
          console.log(`error:${err.message}`);
        }
      }
    }
    fetchPosts();
  },[])

  useEffect(()=>{
    const filteredResults=posts.filter((post)=>
    ((post.body).toLowerCase()).includes(search.toLowerCase()) || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [posts,search])

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const id=posts.length ? `${Number(posts[posts.length-1].id)+1}` : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost={ id,title: postTitle, datetime, body:postBody};
    try{
      const res = await api.post("/posts",newPost)
    const allPosts=[...posts, res.data];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/')
    }catch(e){
      console.log(e.message)
    }
  
  }

  const hadleEdit =async(id)=>{
    const datetime = format(new Date(),'MMMM dd, yyyyy pp');
    const updatePost ={id,title:editTitle,datetime,body:editBody};
    try{
      const response = await api.put('/posts/${id}',updatedPost)
      setPosts(posts.map(post=> post.id===id ? {...responce.data}:post));
      setEditTitle('')
      setEditBody('')
      navigate('/')
    }
    catch(e){
      console.log(e.message);
    }
  }

  const handleDelete=async(id)=>{
    try{
    await api.delete(`/posts/${id}`)
    const postsList=posts.filter(post => post.id !== id);
    setPosts(postsList);
    navigate('/')}
    catch(e){
      console.log(`Error : ${e.message}`)
    }
  }
  return (
    <div className="App">
      
      <Header title="Social Media"/>
      <Nav 
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={<Home posts={searchResults} />} />
        <Route path="post">
          <Route index element={<NewPost 
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />} />
          <Route path=":id" element={<PostPage posts={posts} handleDelete={handleDelete}/>} />
        </Route>
        <Route>
          <Route path="/edit/:id" element={<EditPost>
            posts={posts}
            handleDelete ={handleDelete}
            editBody={editBody}
            setEditBody ={setEditBody}
            editTitle = {editTitle}
            setEditTitle = {setEditTitle}
          </EditPost>}></Route>
        </Route>
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
