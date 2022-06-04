const colors = require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');

// const {mostrarMenu,pausa} = require('./helpers/mensajes')
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

console.clear();

const main = async () => {
    console.log('Hola mundo')
    let opt = '';
    const tareas = new Tareas();
    let tareasDB = leerDB();
    if(tareasDB){
        
        tareas.cargarTareasFromArray(tareasDB)
    }
    do{
        opt = await inquirerMenu();

        switch(opt){
            case '1':
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc)
                break;
            case '2':
                // if(leerDB())tareasDB = leerDB();

                tareas.listadoCompleto()
                break;
            case '3':
                
                tareas.listarPendientesCompletadas();
                break;
            case '4':
                tareas.listarPendientes();
                break;
            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoTareas);
                
                const ok = await confirmar('Estas seguro?');
                if(ok)tareas.completarTareas(ids);
                
                // console.log(ids)
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoTareas);
                if(id !== '0'){
                    const ok = await confirmar('Estas seguro?');
                    if(ok){
                        tareas.borrarTarea(id);
                        // guardarDB(tareas.listadoTareas)
                    }
                    // console.log(ok)
                }
                break;
            case '0':
                break;
            }
                    
        guardarDB( tareas.listadoTareas);
        

        await pausa();

    } while( opt !== '0')
    // mostrarMenu();
}

main();