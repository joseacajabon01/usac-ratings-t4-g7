import React, { useEffect, useState } from 'react';
import { api, getToken } from '../api';

export default function PostCard({p,onComment,refreshKey}){
  const [text,setText]=useState('');
  const [comments,setComments]=useState([]);

  const loadComments = async ()=>{ try{ setComments(await api(`/posts/${p.id}/comments`)); }catch{} };
  useEffect(()=>{ loadComments(); },[p.id, refreshKey]);

  const submit = async ()=>{
    if (!getToken()) return alert('Inicia sesión.');
    if (!text.trim()) return;
    await onComment(p.id, text.trim());
    setText('');
  };

  return (
    <article className="card">
      <div className="post-header">
        <div className="post-title">
          {p.course_name || 'General'} {p.prof_name ? <span className="badge">{p.prof_name}</span> : null}
        </div>
        <div className="post-meta">{new Date(p.created_at).toLocaleString()}</div>
      </div>

      <p className="m8">{p.message}</p>
      <div className="small m8">Autor: <b>{p.nombres} {p.apellidos}</b> ({p.registro})</div>

      <div className="hr" />

      <section className="comments">
        <h5 className="m8">Comentarios</h5>
        {comments.length===0 && <div className="small">No hay comentarios aún</div>}
        <div className="grid">
          {comments.map(c=>
            <div key={c.id} className="comment">
              <b>{c.nombres} {c.apellidos}</b>: {c.content}
              <div className="small">{new Date(c.created_at).toLocaleString()}</div>
            </div>
          )}
        </div>
        <div className="m8" />
        <div style={{display:'flex', gap:8}}>
          <input placeholder="Escribe un comentario..." value={text}
                 onChange={e=>setText(e.target.value)} disabled={!getToken()} />
          <button onClick={submit} disabled={!getToken()}>Enviar</button>
          {!getToken() && <span className="small">(inicia sesión para comentar)</span>}
        </div>
      </section>
    </article>
  );
}
