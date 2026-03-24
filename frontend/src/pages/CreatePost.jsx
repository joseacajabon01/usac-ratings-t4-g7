import { useEffect, useState } from 'react';
import { api } from '../api';
export default function CreatePost(){
  const [courses,setCourses]=useState([]); const [courseId,setCourseId]=useState('');
  const [profName,setProfName]=useState(''); const [message,setMessage]=useState('');
  useEffect(()=>{ (async()=>setCourses(await api('/courses')))(); },[]);
  const submit=async(e)=>{ e.preventDefault();
    await api('/posts',{method:'POST',body:JSON.stringify({courseId:courseId||undefined, profName, message})});
    alert('Publicación creada'); window.location.href='/';
  };
  return (<form onSubmit={submit}>
    <h4>Nueva publicación</h4>
    <select value={courseId} onChange={e=>setCourseId(e.target.value)}>
      <option value="">(o elige curso)</option>
      {courses.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
    </select>
    <input placeholder="o escribe catedrático" value={profName} onChange={e=>setProfName(e.target.value)} />
    <textarea placeholder="Mensaje" value={message} onChange={e=>setMessage(e.target.value)} />
    <button>Publicar</button>
  </form>);
}
