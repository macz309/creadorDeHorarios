
//Variables Globales.
var numHorarios=0
var numNotacion=0;


//Correr al iniciar.
desplegarHorario()



//-------------------FUNCIONES--------------------------\\
//Creando y desplegando horario.
function desplegarHorario(){
    const dias=["Lunes","Martes","Miércoles","Jueves", "Viernes", "Sábado"]
    let horarios = document.getElementById("horarios");
    
    //Creando cabecera del horario.
    let headerHorario = document.createElement("div");
    headerHorario.className="header-Horario"
    //Agregando Hora a la cabecera.
    let hora=document.createElement("p");
    hora.className="horas";
    hora.innerHTML="Hora";
    headerHorario.appendChild(hora);
    //Agregando los dias en la cabecera.
    for (let i = 0; i < dias.length; i++) {
        const element = document.createElement("p");
        element.className="dia";
        element.innerHTML=dias[i]
        headerHorario.appendChild(element);
    }
    horarios.appendChild(headerHorario);

    //Creando cuerpo del horario.
    for (let r = 7; r < 22; r++) {
        let renglon=document.createElement("div");
        renglon.className="materias";
        //Creando horas laterales.
        let horas=document.createElement("p");
        horas.className="horas";
        horas.innerHTML=`${r}:00 - ${r+1}:00</p>`;
        renglon.appendChild(horas);
        //Creando todas las celdas.
        for (let c = 0; c < 6; c++) {
            let columna=document.createElement("input");
            columna.id=`${r}${c}`;
            columna.className="materias";
            columna.autocomplete="off";
            columna.addEventListener("keyup", function(){ actualizarColorEscribiendo(this); });
            columna.style.background="#ffffff";
            renglon.appendChild(columna);
        }
        horarios.appendChild(renglon);
    } 
}

//Creacion de una notacion.
function agregarNotacion(){
    numNotacion++;
    let notaciones=document.getElementById("notaciones");
    //Creando notación nueva
    let notacion=document.createElement("div");
    notacion.id="notacion";
    //Creando notaciónN
    let notacionN=document.createElement("div");
    notacionN.classname="notacion";
    notacionN.id="notacion"+numNotacion;
    //Agregando Selector de color
    let nc=document.createElement("input");
    nc.type="color";
    nc.value=colorAleatorio();
    nc.id="nc"+numNotacion;
    nc.addEventListener("change", function(){ actualizarColorBoton(this.id); })
    notacionN.appendChild(nc);
    //Agregando Entrada de Texto
    let nt=document.createElement("input");
    nt.className="notacion-texto"
    nt.type="text";
    nt.id="nt"+numNotacion;
    nt.addEventListener("keyup", function(){ actualizarColorBoton(this.id); })
    notacionN.appendChild(nt);
    notacion.appendChild(notacionN);
    notaciones.appendChild(notacion);
}


//Actualziacion de Color con Boton Actualizar de notaciones
function actualizarColorBoton(idInput){
    console.log(idInput)
    let id=idInput.substring(2); 
    for (let r = 7; r < 22; r++) {
        for (let c = 0; c < 6; c++) {
            let idCelda =`${r}${c}`;
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
    //Actualizando/Manteniedno Color
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