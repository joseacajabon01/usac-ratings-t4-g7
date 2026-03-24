import { useEffect, useState } from 'react';
import { api, getToken } from '../api';

export default function MyCourses(){
  const [courses,setCourses]=useState([]);
  const [mine,setMine]=useState([]);
  const [addId,setAddId]=useState('');

  useEffect(()=>{ (async()=>{
    if(getToken()){
      try{
        setCourses(await api('/courses'));
        setMine(await api('/me/courses'));
      }catch(e){ console.error(e); }
    }
  })(); },[]);

  const add=async(e)=>{ e.preventDefault(); if(!addId) return;
    await api('/me/courses',{method:'POST',body:JSON.stringify({courseId:addId})});
    setMine(await api('/me/courses'));
    setAddId('');
  };

  const totalCreditos = mine.length * 5;

  return <div style={{maxWidth:800, margin:'0 auto'}}>
    <h4>Mis cursos aprobados (créditos: {totalCreditos})</h4>
    <ul>{mine.map(c=><li key={c.id}>{c.code} - {c.name}</li>)}</ul>
    <form onSubmit={add} style={{display:'flex', gap:8, marginTop:8}}>
      <select value={addId} onChange={e=>setAddId(e.target.value)}>
        <option value="">Seleccionar curso…</option>
        {courses.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <button>Agregar</button>
    </form>
  </div>;
}