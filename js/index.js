
//Variables Globales.
var numHorarios=0
var numNotacion=0;
crearHorario()


//Creando horario.
function crearHorario(){
    let horario=`<div class="horario" id="h${numHorarios}">
                    <div class="header-Horario">
                        <p class="horas">Hora</p>
                        <p class="dia">Lunes</p>
                        <p class="dia">Martes</p>
                        <p class="dia">Miércoles</p>
                        <p class="dia">Jueves</p>
                        <p class="dia">Viernes</p>
                        <p class="dia">Sábado</p>
                    </div>`;
    //Obtenemos la referencia a donde se colocara nuestro nuevo horario.
    let horarios = document.getElementById("horarios");
    //Aumentamos el numero de horario existente. 
    for (let r = 7; r < 22; r++) {
        horario+= `<div class="materias">
                    <p class="hora">${r}:00 - ${r+1}:00</p>`;
        for (let c = 0; c < 6; c++) {
            horario+=`<input class="materia" id="${numHorarios}${r}${c}" autocomplete="off"
                        onkeyup="actualizarColorEscribiendo(this)"> `;           
        }
        horario+= `</div>`
    }                    
        horario += `</div>`
    horarios.innerHTML = horario;   
}

//Creacion de una notacion.
function agregarNotacion(){
    numNotacion++;
    let notaciones=document.getElementById("notaciones");

    let notacion=document.createElement("div");
    notacion.id=notacion;

    let notacionN=document.createElement("div");
    notacionN.classname="notacion";
    notacionN.id="notacion"+numNotacion;

    let nc=document.createElement("input");
    nc.addEventListener("change", function(){ actualizarColorBoton(this.id); })
    nc.type="color";
    nc.id="nc"+numNotacion;
    notacionN.appendChild(nc);

    let nt=document.createElement("input");
    nt.addEventListener("keyup", function(){ actualizarColorBoton(this.id); })
    nt.className="notacion-texto"
    nt.type="text";
    nt.id="nt"+numNotacion;
    notacionN.appendChild(nt);

    let nb=document.createElement("button");
    nb.addEventListener("click", function(){ actualizarColorBoton(this.id); })
    nb.id="nb"+numNotacion;
    nb.innerHTML="Actualizar";
    //notacionN.appendChild(nb);

    notacion.appendChild(notacionN);
    notaciones.appendChild(notacion);
}


//Actualziacion de Color con Boton Actualizar de notaciones
function actualizarColorBoton(idInput){
    console.log(idInput)
    let id=idInput.substring(2); 
    for (let r = 7; r < 22; r++) {
        for (let c = 0; c < 6; c++) {
            let idCelda =`${numHorarios}${r}${c}`;
            let celda= document.getElementById(idCelda);
            compararCelda(celda,id);
        }
    }             
}


//Actualizacion de Color escribiendo en las celdas.
function actualizarColorEscribiendo(celda){ 
    for (let i = 1; i <= numNotacion; i++) {
        compararCelda(celda,i);
    }
}



//Compara las celdas mediante su contenido y cambia el color de las celdas.
function compararCelda(celda,id){
    console.log(celda.id)

    let valor=celda.value;
    let materia=document.getElementById("nt"+id).value;
    let color=document.getElementById("nc"+id).value;
    let array= materia.split("");
    let array2=valor.split("");

    let cadenaIgual=true;
    if(array2[0]!=""){
        if(array.length>0){
            for (let i = 0; i < array.length; i++) {
                const element = array [i];
                const element2 = array2[i]
                if(element != element2){
                    cadenaIgual=false;
                    celda.style.background="white";
                }
            }
            if(cadenaIgual==true){
                celda.style.background=color;
            }else {
                celda.style.background="white";
            }
        }
    }
}

