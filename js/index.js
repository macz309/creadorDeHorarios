
//Variables Globales.
var numNotacion=0;
var horarioActual="Inicial"
var horariosCreados=document.getElementById("horariosCreados");
var notaciones=document.getElementById("notaciones");
var notacionVacia=notaciones.innerHTML;
var contenidoHorario=iniciarContenido();
var notacionesCreadas=new Array();

//Correr al iniciar.
desplegarHorario();
cargandoHorarioInicial();


//-------------------FUNCIONES--------------------------\\

//Crea un arreglo vacio equivalente a las celdas disponibles del horario.
function iniciarContenido(){
    let contenido=[]
    for (let r = 7; r < 22; r++) {
        let temp=[]
        for (let c = 0; c < 6; c++) {
            temp.push("");
        }
        contenido.push(temp)
    }
    return contenido;
}

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

//Cargando informacio inicial del LocalStorage
function cargandoHorarioInicial(){
    if(localStorage.length>0){
        for (const key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                const element = localStorage[key];
                let horarioCreado=document.createElement("option");
                horarioCreado.innerHTML=key
                horariosCreados.appendChild(horarioCreado);
            }
        }
        //Cargando Horario "inicial"
        cargarHorario();
    }else{
        let horarioCreado=document.createElement("option");
        horarioCreado.innerHTML="Inicial"
        horariosCreados.appendChild(horarioCreado);
    }
    //Despliega el nombre del horario actual.
    let actual= document.getElementById("horarioActual");
    actual.value=horarioActual;
}

//Creacion de una notacion.
function agregarNotacion(){
    numNotacion++;
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
    let color=colorAleatorio();
    nc.value=color;
    nc.id="nc"+numNotacion;
    nc.addEventListener("change", function(){ actualizarColorNotacion(this) });
    notacionN.appendChild(nc);
    //Agregando Entrada de Texto
    let nt=document.createElement("input");
    nt.className="notacion-texto"
    nt.type="text";
    nt.id="nt"+numNotacion;
    nt.addEventListener("keyup", function(){ actualizarColorNotacion(this) });
    notacionN.appendChild(nt);
    notacion.appendChild(notacionN);
    notaciones.appendChild(notacion);
    //Creando objeto nuevaNotacion
    let nuevaNotacion={
        color:color,
        texto:""
    }
    //Almacenando nuevaNotacion en las notaciones creadas.
    notacionesCreadas.push(nuevaNotacion);
}

//Guardar horarioActual
function guardarHorario(){
    let objeto={
        horario: contenidoHorario,
        infoNotas:notacionesCreadas,
        notas: notaciones.innerHTML
    };
    localStorage.setItem(horarioActual,JSON.stringify(objeto));
}

//Cargar horario
function cargarHorario(){
    //Limpiar colores anteriores.
    limpiarColor();
    console.log(horariosCreados.value)
    horarioActual=horariosCreados.value;
    //Recuperando valores de contenidoHorario y notacionesCreadas
    let cargado= JSON.parse(localStorage.getItem(horarioActual))
    contenidoHorario=cargado.horario;
    notaciones.innerHTML=cargado.notas;
    notacionesCreadas=cargado.infoNotas;
    numNotacion=cargado.infoNotas.length;
    cargarNotaciones();
    cargarContenido();
}

//Carga el contenido almacenado en el localStorage correspondientes al horario
function cargarContenido(){
    for (let r = 7; r < 22; r++) {
        for (let c = 0; c < 6; c++) {
            let idCelda =`${r}${c}`;
            let celda= document.getElementById(idCelda);
            celda.value=contenidoHorario[r-7][c];
            actualizarColorEscribiendo(celda);
        }
    }
}

//Carga las notaciones almacenadas en el localStorage correspondientes al horario
function cargarNotaciones(){
    for (let i = 0; i < notacionesCreadas.length; i++) {
        const element = notacionesCreadas[i];
        let notacionColor = document.getElementById(`nc${i+1}`);
        let notacionTexto = document.getElementById(`nt${i+1}`);
        notacionColor.addEventListener("change", function(){ actualizarColorNotacion(this) });
        notacionTexto.addEventListener("keyup", function(){ actualizarColorNotacion(this) });
        notacionColor.value = element.color;
        notacionTexto.value = element.texto;    
    }
}

//Crear Horario nuevo.
function crearNuevoHorario(){
    numNotacion=0;
    horarioActual=document.getElementById("nombreNuevo").value;
    //Vaciando caja de texto.
    document.getElementById("nombreNuevo").value="";
    notaciones.innerHTML=notacionVacia;
    contenidoHorario=iniciarContenido();
    notacionesCreadas=new Array();
    guardarHorario();
    //Agregar nombre de horario en el selector de horarios
    let horarioCreado=document.createElement("option");
        horarioCreado.innerHTML=horarioActual;
        horariosCreados.appendChild(horarioCreado);
    //Despliega el nombre del horario actual.
    let actual= document.getElementById("horarioActual");
    actual.value=horarioActual;
    //Cargar contenido en blanco
    cargarContenido();
    //Limpiar colores anteriores.
    limpiarColor();
}

//Actualziacion de Color de notaciones
function actualizarColorNotacion(input){
    let id=input.id.substring(2); 
    //Actualizacion de datos almacenados en notacionesCreadas.
    if(input.type=="color"){
        notacionesCreadas[id-1].color=input.value;
    }else{
        notacionesCreadas[id-1].texto=input.value;
    }
    //Actualizar Color en celdas
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
    actualizarContenidoHorario(celda.id,celda.value);
    for (let i = 1; i <= numNotacion; i++) {
        if(compararCelda(celda,i,1)==true){
            return;
        };
    }
}

//Actualizar contenidoHorario
function actualizarContenidoHorario(id,value){
    let r2=0
    let c2=0
    if(id.length>2){
        r2= parseInt(id.substring(0,2));
        c2= parseInt(id.substring(2));
    }else{
        r2= parseInt(id.substring(0,1));
        c2= parseInt(id.substring(1));
    }
    contenidoHorario[r2-7][c2]=value;
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


//Limpiar color de las celdas
function limpiarColor(){
    let dias=document.getElementsByClassName("materias")
    for (let i = 0; i < dias.length; i++) {
        const element = dias[i];
        element.style.background="#ffffff";
        
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