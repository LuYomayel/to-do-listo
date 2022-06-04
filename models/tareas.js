const Tarea = require("./tarea");
const colors = require('colors')
class Tareas {
    _listado = {};

    constructor(){
        this._listado = {}
    }

    get listadoTareas(){
        const listado = [];

        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea)
            // console.log(listado)
        })

        return listado;
    }

    cargarTareasFromArray(tareas = []){
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea(desc=''){

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto(){
        this.listadoTareas.forEach( (tarea,index) => {
            let id = `${index+1}`.green;
            let desc = tarea.desc;
            let completo = tarea.completadoEn ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${id}. ${desc} :: ${completo}`)
        })
    }

    listarPendientesCompletadas( ){
        this.listadoTareas.forEach( (tarea,index) => {
            if(tarea.completadoEn){
                let id = `${index+1}`.green;
                let desc = tarea.desc;
                let completo = 'Completada'.green;
                console.log(`${id}. ${desc} :: ${tarea.completadoEn}`)
            }
        })
    }

    listarPendientes( ){
        this.listadoTareas.forEach( (tarea,index) => {
            
            if(!tarea.completadoEn){
                let id = `${index+1}`.green;
                let desc = tarea.desc;
                let completo = 'Pendiente'.red;
                console.log(`${id}. ${desc} :: ${completo}`)
            }
        })
    }

    borrarTarea( id){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    completarTareas(ids){
        ids.forEach( id => {
            const tarea = this._listado[id];
            if( !tarea.completadoEn){
                let date = new Date();
                let horas = `${date.getHours()}`
                let minutos = `${date.getMinutes()}`
                date = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} a las ${horas.padStart(2,0)}:${minutos.padStart(2,0)}`

                tarea.completadoEn = date;
            }
        });

        this.listadoTareas.forEach( tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}

module.exports = Tareas;