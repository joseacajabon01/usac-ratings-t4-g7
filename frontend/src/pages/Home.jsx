import { useEffect, useState } from 'react';
import { api, getToken } from '../api';
import { Link } from 'react-router-dom';
import Filters from '../components/Filters.jsx';
import PostCard from '../components/PostCard.jsx';

export default function Home(){
  const [courses,setCourses]=useState([]);
  const [filters,setFilters]=useState({});
  const [posts,setPosts]=useState([]);
  const [refreshKey,setRefreshKey]=useState(0);

  const load = async()=>{
    const qs = new URLSearchParams(Object.fromEntries(
      Object.entries(filters).filter(([,v])=>v!==undefined && v!=='')
    )).toString();
    setPosts(await api('/posts'+(qs?`?${qs}`:'')));
  };

  useEffect(()=>{ (async()=>{
    try{ setCourses(await api('/courses')); } catch(e){ setCourses([]); }
    await load();
  })(); },[]);
  useEffect(()=>{ load(); },[filters.courseId,filters.courseName,filters.profName]);

  const onComment = async(id,content)=>{
    if (!getToken()) return alert('Inicia sesión.');
    await api(`/posts/${id}/comments`,{method:'POST',body:JSON.stringify({content})});
    setRefreshKey(x=>x+1); // refresca comentarios
  };

  return (<div>
    <h4>Publicaciones</h4>
    <Filters filters={filters} setFilters={setFilters} courses={courses}/>
    {getToken() && <Link to="/create">Crear publicación</Link>}
    <div>{posts.map(p=><PostCard key={p.id} p={p} onComment={onComment} refreshKey={refreshKey} />)}</div>
  </div>);
}
