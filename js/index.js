
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
                        onkeyup="actualizarColorEscribiendo(this)" > `;           
        }
        horario+= `</div>`
    }                    
        horario += `</div>`
    horarios.innerHTML = horario;
    let materias=document.getElementsByClassName("materia")
    
    for (let i = 0; i < materias.length; i++) {
        const element = materias [i];
        element.style.background="#ffffff";
    }
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
    nc.type="color";
    nc.value=colorAleatorio();
    nc.id="nc"+numNotacion;
    nc.addEventListener("change", function(){ actualizarColorBoton(this.id); })
    notacionN.appendChild(nc);

    let nt=document.createElement("input");
    nt.className="notacion-texto"
    nt.type="text";
    nt.id="nt"+numNotacion;
    nt.addEventListener("keyup", function(){ actualizarColorBoton(this.id); })
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
            if(compararCelda(celda,id,0)==true){
                return;
            }
        }
    }             
}


//Actualizacion de Color escribiendo en las celdas.
function actualizarColorEscribiendo(celda){ 
    for (let i = 1; i <= numNotacion; i++) {
        if(compararCelda(celda,i,1)==true){
            return;
        };
        console.log(i)
    }
}



//Compara las celdas mediante su contenido y cambia el color de las celdas.
function compararCelda(celda,id,tipo){
    let valor=celda.value;
    let materia=document.getElementById("nt"+id).value;
    let color=document.getElementById("nc"+id).value;
    let rgb=hexToRgb(color);
    //Dando formato rgb
    let colorRGB=`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
    let array= materia.split("");
    let array2=valor.split("");
    let cadenaIgual=true;
    if(array.length>0){
        for (let i = 0; i < array.length; i++) {
            const element = array [i];
            const element2 = array2[i]
            if(element != element2){
                cadenaIgual=false;
            }
        }

        if(cadenaIgual==true){
            celda.style.background=color;
            return true;
        }else {
            if(tipo==1){
                celda.style.background= "#ffffff";
            }
            return false;

        }
    }else if(tipo==0){
        if(celda.style.backgroundColor==colorRGB){
            celda.style.background= "#ffffff";
        }
    }
}

//Conversion de Hexadecimal a componentes RGB
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  //Funcion para generar numeros aleatorios
  function aleatorio(inferior,superior){
    numPosibilidades = superior - inferior
    aleat = Math.random() * numPosibilidades
    aleat = Math.floor(aleat)
    return parseInt(inferior) + aleat
 }
//Funcion para generar colores aleatorios
  function colorAleatorio(){
    hexadecimal = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F")
    color_aleatorio = "#";
    for (i=0;i<6;i++){
       posarray = aleatorio(0,hexadecimal.length)
       color_aleatorio += hexadecimal[posarray]
    }
    return color_aleatorio
 }