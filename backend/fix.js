const { pool } = require('./src/db');

async function fix() {
    try {
        console.log('Limpiando caracteres extraños en la base de datos...');
        
        // Diccionario de correcciones de codificación
        const fixes = [
            { mal: 'Ã¡', bien: 'á' },
            { mal: 'Ã©', bien: 'é' },
            { mal: 'Ã­', bien: 'í' }, 
            { mal: 'Ã³', bien: 'ó' },
            { mal: 'Ãº', bien: 'ú' },
            { mal: 'Ã±', bien: 'ñ' }
        ];
        
        // Ejecutar las actualizaciones
        for (let f of fixes) {
            await pool.query("UPDATE courses SET name = REPLACE(name, ?, ?)", [f.mal, f.bien]);
        }
        
        console.log('¡Listo! Todas las tildes y eñes fueron corregidas.');
        process.exit(0);
    } catch (error) {
        console.error('Hubo un error:', error);
        process.exit(1);
    }
}

fix();