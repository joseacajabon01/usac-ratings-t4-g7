const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export function setToken(t){ localStorage.setItem('tk', t); }
export function getToken(){ return localStorage.getItem('tk'); }
export async function api(path, opts={}){
  const headers = { 'Content-Type':'application/json', ...(opts.headers||{}) };
  const tk = getToken(); if (tk) headers.Authorization = 'Bearer '+tk;
  const res = await fetch(`${API}${path}`, { ...opts, headers });
  if (!res.ok) {
    let msg = 'Error';
    try { msg = (await res.json()).error || msg; } catch {}
    throw new Error(msg);
  }
  return res.json();
}
