import { useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';

export default function SearchProfiles(){
  const [registro,setRegistro]=useState('');
  const [error,setError]=useState('');
  const nav = useNavigate();

  const submit=async(e)=>{ e.preventDefault(); setError('');
    try{
      await api(`/users/${registro.trim()}`); // valida existencia
      nav(`/profile/${registro.trim()}`);
    }catch{ setError('Usuario no encontrado'); }
  };

  return <div style={{maxWidth:800, margin:'0 auto'}}>
    <h4>Buscar perfiles</h4>
    <form onSubmit={submit} style={{display:'flex', gap:8}}>
      <input placeholder="Registro académico"
             value={registro} onChange={e=>setRegistro(e.target.value)} />
      <button>Buscar</button>
    </form>
    {error && <p style={{color:'crimson'}}>{error}</p>}
  </div>;
}
