import { useState } from 'react';
import { api } from '../api';

export default function ForgotPassword(){
    const [registro,setr]=useState(''); 
    const [email,setE]=useState('');
    const [newPassword,setP]=useState(''); 
    const [msg,setMsg]=useState('');
    
    const submit=async(e)=>{
        e.preventDefault('');
        try{ 
            await api('/auth/reset',{
                method:'POST',
                body:JSON.stringify({registro,email,newPassword})
            });
            setMsg('Contraseña actualizada, ya puedes iniciar sesión.');
        }catch(e){ 
            setMsg(e.message); 
        }
    };
    
    return (
        <form onSubmit={submit}>
            <h4>Restablecer contraseña</h4>
            <input 
                placeholder="Registro" 
                value={registro} 
                onChange={e=>setr(e.target.value)} 
            />
            <input 
                placeholder="Correo" 
                value={email} 
                onChange={e=>setE(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Nueva contraseña" 
                value={newPassword} 
                onChange={e=>setP(e.target.value)} 
            />
            <button>Actualizar</button>
            {msg && <p>{msg}</p>}
        </form>
    );
}