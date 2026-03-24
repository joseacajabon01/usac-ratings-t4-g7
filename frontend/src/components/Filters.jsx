export default function Filters({filters,setFilters,courses}){
  const clear = ()=> setFilters({});
  return (
    <div className="card">
      <div style={{display:'flex', gap:10, flexWrap:'wrap'}}>
        <select value={filters.courseId||''} onChange={e=>setFilters(f=>({...f,courseId:e.target.value||undefined}))}>
          <option value="">-- Curso --</option>
          {courses.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input placeholder="Buscar por nombre de curso"
               value={filters.courseName||''}
               onChange={e=>setFilters(f=>({...f,courseName:e.target.value||undefined}))}/>
        <input placeholder="Buscar por catedrático"
               value={filters.profName||''}
               onChange={e=>setFilters(f=>({...f,profName:e.target.value||undefined}))}/>
        <button type="button" className="btn-ghost" onClick={clear}>Limpiar</button>
      </div>
    </div>
  );
}
