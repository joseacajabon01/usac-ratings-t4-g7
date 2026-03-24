import { useState } from 'react';
import { api, setToken } from '../api';
import { useNavigate, Link } from 'react-router-dom';

export default function Login(){
  const [registro,setRegistro]=useState(''); const [password,setPassword]=useState('');
  const [err,setErr]=useState(''); const nav=useNavigate();
  const submit=async(e)=>{ e.preventDefault(); setErr('');
    try{ const {token}=await api('/auth/login',{method:'POST',body:JSON.stringify({registro,password})});
      setToken(token); nav('/');
    }catch(e){ setErr(e.message); }
  };
  return (<form onSubmit={submit}>
    <h4>Iniciar sesión</h4>
    {err && <p style={{color:'crimson'}}>{err}</p>}
    <input placeholder="Registro académico" value={registro} onChange={e=>setRegistro(e.target.value)} />
    <input type="password" placeholder="Contraseña" value={password} onChange={e=>setPassword(e.target.value)} />
    <button>Entrar</button> <Link to="/forgot">¿Olvidaste tu contraseña?</Link>
  </form>);
}
