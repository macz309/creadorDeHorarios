
//Variables Globales.
var numHorarios=0
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
            horario+=`<input class="materia" id="${numHorarios}${r}${c}" autocomplete="off"> `;           
        }
        horario+= `</div>`
    }                    
        horario += `</div>`
    horarios.innerHTML = horario;
    crearMiniatura();    
}

function crearMiniatura(){
    //Obtenemos la referencia a donde se colocara nuestro control de color del horario.
    let miniatura = document.getElementById("miniatura");
    let miniaturaColor = `<h4>Ajustar color en celdas.</h4>
                    <div class="header-miniatura">
                        <p class="dia-mini">Lu</p>
                        <p class="dia-mini">Ma</p>
                        <p class="dia-mini">Mi</p>
                        <p class="dia-mini">Ju</p>
                        <p class="dia-mini">Vi</p>
                        <p class="dia-mini">Sá</p>
                    </div>
                        `;
    for (let r = 7; r < 22; r++) {
        miniaturaColor += `<div class="miniatura-col">`;
        for (let c = 0; c < 6; c++) {
            miniaturaColor +=`
            <input type="color" class="cuadroColor" id="${r}${c}" value="#ffffff"
            onChange="actualizarColor(this.value,this.id)">`;            
        }
        miniaturaColor += `<p class=hora-mini>${r}:00 - ${r+1}:00 </p></div>`
    }
    miniatura.innerHTML = miniaturaColor;
}

function actualizarColor(color,id){
    console.log(color,id)
    let idCelda=numHorarios+id;
    console.log()
    let celda=document.getElementById(idCelda.toString());
    console.log(celda)
    celda.style.background= color;

}