import { useEffect, useState } from 'react';
import { api, getToken } from '../api';
import { useParams } from 'react-router-dom';

export default function Profile(){
  const { registro } = useParams();
  const [user,setUser]=useState(null);
  const [courses,setCourses]=useState([]);
  const [mine,setMine]=useState([]);
  const [addId,setAddId]=useState('');
  const [me,setMe]=useState(null);

  useEffect(()=>{ (async()=>{
    setUser(await api(`/users/${registro}`));
    setCourses(await api('/courses'));
    setMine(await api(`/users/${registro}/courses`));
    if (getToken()) { try { setMe(await api('/me')); } catch {} }
  })(); },[registro]);

  const add=async(e)=>{ e.preventDefault(); if(!addId) return;
    await api('/me/courses',{method:'POST',body:JSON.stringify({courseId:addId})});
    setMine(await api(`/users/${registro}/courses`));
    setAddId('');
  };

  if(!user) return '...';
  const totalCreditos = mine.length * 5;
  const puedoEditar = !!me && me.registro === registro;

  return (<div>
    <h4>Perfil de {user.nombres} {user.apellidos}</h4>
    <p>Registro: {user.registro} · Email: {user.email}</p>

    <h5 style={{marginTop:12}}>Cursos aprobados (créditos: {totalCreditos})</h5>
    <ul>{mine.map(c=><li key={c.id}>{c.code} - {c.name}</li>)}</ul>

    {puedoEditar && (
      <form onSubmit={add} style={{marginTop:8}}>
        <select value={addId} onChange={e=>setAddId(e.target.value)}>
          <option value="">Agregar curso…</option>
          {courses.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <button>Agregar</button>
      </form>
    )}
  </div>);
}
