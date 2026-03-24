import { Link, Outlet, useNavigate } from 'react-router-dom';
import { getToken } from './api';

export default function App(){
  const nav = useNavigate();
  const logged = !!getToken();
  return (
    <div className="container">
      <header className="header">
        <nav className="nav">
          <h3 className="brand">USAC Ratings</h3>
          <Link to="/">Inicio</Link>
          <Link to="/search">Buscar perfiles</Link>
          {logged && <Link to="/mycourses">Mis cursos</Link>}
          <span className="spacer" />
          {logged ? (
            <>
              <Link to="/create">Nueva publicación</Link>
              <button className="btn-ghost" onClick={()=>{ localStorage.clear(); nav('/'); }}>Salir</button>
            </>
          ) : (
            <>
              <Link to="/login">Entrar</Link>
              <Link to="/register">Registro</Link>
            </>
          )}
        </nav>
      </header>

      <main className="grid">
        <Outlet/>
      </main>
    </div>
  );
}
