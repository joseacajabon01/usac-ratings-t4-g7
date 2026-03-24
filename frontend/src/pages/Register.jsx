import { useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [f,setF]=useState({registro:'',nombres:'',apellidos:'',email:'',password:''});
  const [msg,setMsg]=useState(''); const nav=useNavigate();
  const submit=async(e)=>{ e.preventDefault(); setMsg('');
    try{ await api('/auth/register',{method:'POST',body:JSON.stringify(f)}); setMsg('Registrado. Ahora inicia sesión.'); nav('/login'); }
    catch(e){ setMsg(e.message); }
  };
  return (<form onSubmit={submit}>
    <h4>Registro</h4>
    {msg && <p>{msg}</p>}
    {['registro','nombres','apellidos','email','password'].map(k=>
      <input key={k} placeholder={k} type={k==='password'?'password':'text'}
             value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})} />)}
    <button>Crear cuenta</button>
  </form>);
}
