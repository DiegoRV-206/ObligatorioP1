let loggedUser = null;
let localConnected = null;
let IdUser = 0;
let loggedScreen = "";
let encontroPendiente = false;
function show(id){
    document.querySelector(`#${id}`).style.display = "block";
}
function hide(id){
    document.querySelector(`#${id}`).style.display = "none";
}

function onLogin(e){
    
    e.preventDefault();
    const inputUser = document.querySelector("#user").value;
    const inputPass = document.querySelector("#pass").value;
    let noIngreso= false;
    const inputUserConvertido = inputUser.toLowerCase()
    localConnected = null;

    //Validaciones para logearse
    if(inputUser!=""&&inputPass!=""){
        /*peoples.push({username:user});
        peoples.push({pass:password});
        */
       for(let i=0; i<users.length;i++){
        
           if(users[i].username==inputUserConvertido && users[i].password==inputPass){
                loggedUser = users[i] 
                document.querySelector("#Homee").innerHTML = `Welcome ${loggedUser.name}`;
            }
            if(inputUser != users[i].username || inputPass != users[i].password){
                noIngreso = true;
            }

        }
        if(noIngreso = true){
            alert("Nombre o contraseña incorrecta")
        }
        if(loggedUser.type == "persona"){
            hide("LoginScreen");
            show("LobbyUser");
            loggedScreen = "LobbyUser";
            show("forLoginScreens")
            tabla()
            
        }else if(loggedUser.type == "local"){
            hide("LoginScreen");
            show("lobbyLocal");
            show("forLoginScreens")
            loggedScreen = "lobbyLocal";
            document.querySelector("#Home").innerHTML = `Welcome ${loggedUser.name} !`
            localConnected = searchLocal("userOwned", loggedUser.id)
            show("forLoginScreens")
            onLobbyLocal()

        }
        
       
    }else{
        if(inputUser == "" || inputPass == ""){
            alert("No deje campos vacios")
        }
        
        
        
    }
    
}

function onReserve(){
    
    const inputGuests = Number(document.querySelector("#NumberOfGuests").value);
    const localSelected = Number(document.querySelector(".selecReserve").value);
    //const localSelected = Number(selectPlace.value);
    const local = searchLocal("id", localSelected)
    let validacionGuests = inputGuests>0;
    
    //validaciones
    if(inputGuests !=""&&validacionGuests){
        
        let pusheoReserva = true;
        local.reservas.forEach(function(reserva){
            if(loggedUser.id == reserva.idUser && reserva.status == "pendiente"){ 
                pusheoReserva = false;
            }
            
        })  
        if(pusheoReserva == true){
            if(inputGuests< local.cupos){
                local.reservas.push(new Reserva(loggedUser.id,loggedUser.name, inputGuests, local.id));
                //local.contador.push(new Contador(local.id, getAutoIncrementId(local.contador)))
                
                    loggedUser.contador.forEach(function(it){

                        
                        if(it.userName == loggedUser.name){
                            it.contadorRes = it.contadorRes+1
                        }
                        
                        if(it.userName != loggedUser.name){
                            users.contador.push(new Contador(local.id, loggedUser.name))
                            it.contadorRes = it.contadorRes+1

                        }
                        
                    })
                
                local.cupos = local.cupos-inputGuests
            }else{
                document.querySelector("#pReserva").innerHTML = "El local no cuenta con el aforo suficiente";

            }
        }else{
            document.querySelector("#pReserva").innerHTML = "Ya tiene una reserva en este local";

        }
        
    }
}
function onRegister(e){
    hide("LoginScreen")
    show("RegisterScreen")
    e.preventDefault();
    const registerName = document.querySelector("#registerName").value;
    const registerUserName = document.querySelector("#registerUserName").value;
    const registerPass = document.querySelector("#registerPass").value;
    const btnLogin = document.querySelector("#login");
    btnLogin.addEventListener("click",toLogin);
    
    let validCharacter = false;
  
    let chararcterMayus = false;
    let characterNumber = false;
    let characterMinus = false;
    //validaciones para contraseña
    
  

    for(let i=0; i <= registerPass.length-1;i++){
        
        if(registerPass.charCodeAt(i)>=65 && registerPass.charCodeAt(i)<=90){
            chararcterMayus= true;
        }
        if(registerPass.charCodeAt(i)>=97 && registerPass.charCodeAt(i)<=122){
            characterMinus= true;
        }
        if(registerPass.charCodeAt(i)>=48 && registerPass.charCodeAt(i)<=57){
            characterNumber= true;
        }             
    }
    if(characterMinus==true&&characterNumber==true&&chararcterMayus==true){
        validCharacter = true;
    }
    let validaRegisterPass = registerPass.length>=6&&validCharacter==true;

    //validamos que el nombre de usuario no existe antes, que los campos estén completos y que la contraseña cumpla los requisitos
    let usuarioYaExiste=null;
   
    if(validaRegisterPass==true){
        users.forEach(function(value){
            if(registerUserName == value.username){
                usuarioYaExiste=true;
            }
    
        });
        
        if(usuarioYaExiste==true){
            alert("El usuario ya existe")
        }
        if(usuarioYaExiste!=true){
            alert("Se creo el usuario de forma correcta")
            users.push(new User(getAutoIncrementId(users),registerName, registerUserName.toLowerCase(),registerPass,"persona"));
            loggedScreen = "#RegisterScreen" 
            hide("RegisterScreen")
            show("LoginScreen")
        }

    }
    
    
}
//Funcionalidad de botones *HOME**INFO**LOGOUT**&&LobbyLocal(realizar reservas)
let resusuario=0;

function onInfo(){
    document.querySelector("#welcomeInfo").innerHTML = `Welcome ${loggedUser.name} !`;
    document.querySelector("#subTitle").innerHTML = `Your reserves for today ...`;
    let totalRes = document.querySelector("#totalReservas")
    totalRes.innerHTML = "";
    const stadisticas = document.querySelector("#stadisticas")
    const tabla = document.querySelector("#pendings");
    tabla.innerHTML = "";
    const tabla2 = document.querySelector("#endings");
    tabla2.innerHTML = "";
    
    if(loggedUser.type == "persona"){
        hide("LobbyUser")
        show("userInfo")
        let tablita = `<table>
                <tr><th colspan="6">Pendientes</th></tr>
            <tr>
                <th>Local</th>
                <th>adres</th>
                <th>Category</th>
                <th>Guests</th>
                <th>Picture</th>
                <th>Status</th>
            </tr>`;

            locales.forEach(function(item){
                item.reservas.forEach(function(it){
                    

                    if(loggedUser.id == it.idUser && it.status == "pendiente"){ 
                        let disabled = ""
                        
                        tablita += `
                        <tr>
                        <td>${item.localName}</td>
                        <td>${item.address}</td>
                        <td>${item.type}</td>
                        <td>${it.guests}</td>
                        <td>${item.image}</td>
                        <td>${it.status}<button style="color: #fbf5f5; background-color: black"class="btnCancel" ${disabled} data-id="${item.id}">Cancelar</button></td>
                        </tr>
                        `;
                    }  
                })
            }) 
            tablita += `</table> <br /> <br />`;
            tabla.innerHTML = tablita; 
            document.querySelectorAll(".btnCancel").forEach(function (btn) {
            btn.addEventListener('click', onCancelUser);
        })
        
        let tablita2 = `<table> 
            <tr><th colspan="9">Finalizadas</th></tr>
            <tr>
                <th>Local</th>
                <th>adres</th>
                <th>Category</th>
                <th>Guests</th>
                <th>Picture</th>
                <th>Status</th>
                <th>Total de reservas del local</th>
                <th>Porcentaje de sus reservas</th>
                <th>Rating</th>
                
            </tr>`;
            let hayFinalizadas=false;
            
            
            
            locales.forEach(function(item){

                item.reservas.forEach(function(it){
                    let disabled = ""
                        if(it.rate != 0){
                            disabled = 'disabled="disabled"'
                            
                        }
                        users.forEach(function(usuario){
                            usuario.contador.forEach(function(conta){
                                if(conta.userName == loggedUser.name && conta.identificador == item.id){
                                    resusuario = conta.contadorRes
                                }
                                if(conta.userName != loggedUser.name){
                                   resusuario = 0;
                                }
                            })
                        })
                        
                        if(loggedUser.id == it.idUser && it.status == "finalizada"){ 
                            
                            hayFinalizadas=true;
                            let calificacion="No calificado";
                            if(it.rate>0){
                                calificacion=it.rate;
                            }
                            
                            
                            tablita2 += `
                            <tr>
                            <td>${item.localName}</td>
                            <td>${item.address}</td>
                            <td>${item.type}</td>
                            <td>${it.guests}</td>
                            <td>${item.image}</td>
                            <td>${it.status}</td>
                            <td>Este local tiene ${item.reservas.length} reservas actual(es)</td>
                            <td>${(resusuario*100)/item.reservas.length}%</td>
                            <td><input id="inputRate" type="number" placeholder="ingrese su calificacion"><button class="btnRate" ${disabled} data-id="${item.id}">Rate</button><br /><p class="${item.localName}">${calificacion}</p></td>
                            
                            </tr>
                            `;
                        }   
                })
            }) 
        tablita2 += `</table>`;
        tabla2.innerHTML = tablita2;
        const btnRating = document.querySelector(".btnRate")
        if(hayFinalizadas){

            btnRating.addEventListener("click", onRate)
        }
        let misRes = 0;

        locales.forEach(function(local){
            local.reservas.forEach(function(res){
                if(res.idUser == loggedUser.id){
                    misRes = misRes+1
                    
                }
            })
        })
        let idLocalFav = 0;
        let MaxCR = 0;
        let nameLocalFav = "";
        
        locales.forEach(function(local){
            local.reservas.forEach(function(reserv){
                let cr =0;
                if(reserv.idUser == loggedUser.id){
                    cr =cr+1
                    
                }
                if(cr>=MaxCR){
                    MaxCR = cr
                    idLocalFav = reserv.localID
                }
                
                nameLocalFav = local.localName
            
            })
        })
         
        totalRes.innerHTML = `Hasta ahora realizaste ${misRes} reservas, y el local más visitado fue ${nameLocalFav}`;
        
        
    }else if(loggedUser.type == "local"){
        hide("lobbyLocal")
        show("infoLocal")
    }
}
function onRate(){
    const inputRate = Number(document.querySelector("#inputRate").value)
    const reservaUserId = Number(this.getAttribute('data-id'));
    const btn = this;

    if(inputRate>0 && inputRate<=5 && inputRate != ""){
        locales.forEach(function(item){
            if(reservaUserId == item.id){
                item.reservas.forEach(function(it){
                    if(it.idUser == loggedUser.id){
                        it.rate = inputRate
                        btn.setAttribute('disabled', 'disabled');
                        document.querySelector(`.${item.localName}`).innerHTML = `La calificacion fue de: ${it.rate}`

                    }
                })
            }
            
        })
    }else{
        document.querySelector("#errorQ").innerHTML = "La calificacion ingresada debe ser mayor a 0 y menor a 6, solo se ingresan números"
    }
    
    
}
function tabla(){//es el select que muestra los locales a reservar

    const selectPlace = document.querySelector(".selecReserve"); 
    selectPlace.innerHTML = "";
    locales.forEach(function(local){
    
        if(local.status == "available"){
            selectPlace.innerHTML += `
            <option value="${local.id}">${local.localName}</option>
            `;
        }
    })
    
}
function onHome(){ //esconde y muestra pantallas
    if(loggedUser.type == "persona"){
        hide("userInfo")
        show("LobbyUser")
    }else if(loggedUser.type == "local"){
        hide("infoLocal")
        show("lobbyLocal")
    }
}
function toLogin(e){ //Voy al login
    e.preventDefault();
    hide(pantallas());
    let show1 = document.querySelector(`#userInfo`).style.display = "block";
    let hide1 = document.querySelector(`#userInfo`).style.display = "none";

    if(show1 != hide1){
        hide("userInfo")
        hide("forLoginScreens")
    }
    show("LoginScreen");
    loggedUser = null;
    document.querySelector("#user").value = "";
    
    document.querySelector("#pass").value = "";

    
    
}
function onLobbyLocal(){
    let acumularPendientes = 0;
    let acumFinalizadas = 0;
    let acumMiCalificacion = 0;
    let cadaRate = 0;
    let cadaRateLocal = 0;
    let acumCalificacionLocales = 0;
    
    console.log("Cargó lobbyLocal")
    document.querySelector("#btnCupos").addEventListener("click",onCupos);
    document.querySelector("#pCupos").innerHTML = `La capacidad maxima del local es de ${localConnected.cupos} personas`;
    document.querySelector("#btnEstadoReservas").addEventListener("click", onStatus)
    document.querySelector("#btnHabilitar").addEventListener("click", onStatusOK);
    document.querySelector("#search").addEventListener("click",onSearch)
    const tabla = document.querySelector("#tabla");
    tabla.innerHTML = "";
    const porcentaje = document.querySelector("#porcentaje");
    const miCalificacion = document.querySelector("#miCalificacion");
    const totalReservas = document.querySelector("#totalReservas");

    //calculo de porcentaje
    localConnected.reservas.forEach(function(item){ 
        if(item.status == "pendiente"){
            guestsNow= guestsNow + item.guests
        }
        if(item.status == "finalizada"){
            acumFinalizadas = acumFinalizadas+1
        }
        if(item.rate>=0){
            acumMiCalificacion = acumMiCalificacion+1
            cadaRate = cadaRate + item.rate;
        }
    })
    let calculoPorcentaje = (guestsNow*100)/localConnected.cuposMax;
    porcentaje.innerHTML = "El porcentaje de ocupación es del "+ calculoPorcentaje + "%";
    miCalificacion.innerHTML = "Mi rating es de "+cadaRate/acumMiCalificacion+ " puntos";
    totalReservas.innerHTML = "El total de reservas es de "+localConnected.reservas.length+" las cuales "+acumularPendientes+" se encuentran pendientes y "+acumFinalizadas+" finalizadas";
    const divTabla = document.querySelector("#tablaLocal");
    divTabla.innerHTML = "";
    let ratings=0;
    let tablita2 = `<table> 
    <tr><th colspan="2">Estadisticas</th></tr>
    <tr>
        <th>Nombre de local</th>
        <th>Promedio de calificaciones de locales</th>
    </tr>`;
    
    locales.forEach(function(r){ 
        acumCalificacionLocales=0
        r.reservas.forEach(function(item){
            if(item.rate >0) {
                cadaRateLocal = cadaRateLocal+item.rate;
                acumCalificacionLocales= acumCalificacionLocales+1
            }     
        })

        if(acumCalificacionLocales == 0){
            tablita2 += `
            <tr>
                <td>${r.localName}</td>
                <td>No tiene calificaciones</td>
            </tr>
            `;
            
        }else{
            ratings = cadaRateLocal/acumCalificacionLocales 
            tablita2 += `
            <tr>
                <td>${r.localName}</td>
                <td>${ratings}</td>
            </tr>
            `;
        }
      
    })

    tablita2 += `</table><br />`;
    divTabla.innerHTML = tablita2;
    
    //cargar dentro de un for la tabla
    let tablita = `<table> 
    <tr><th colspan="4">Reservas</th></tr>
    <tr>
        <th>id</th>
        <th>name</th>
        <th>Guests</th>
        <th>Status</th>
    </tr>`;

    localConnected.reservas.forEach(function(r){ 
     let disabled = ""
     if(r.status == "finalizada" || r.status == "cancelada") {
        disabled = 'disabled="disabled"'
     }
        if(r.status == "pendiente" || r.status == "finalizada"){
        tablita += `
            <tr>
                <td>${r.idUser}</td>
                <td>${r.name}</td>
                <td>${r.guests}</td>
                <td>${r.status}<button class="btnFinalizar" ${disabled} data-id="${r.idUser}">Finalizar</button></td>

            </tr>
            `;
        }
    })

    
    tablita += `</table>`;
    tabla.innerHTML = tablita;
    document.querySelectorAll(".btnFinalizar").forEach(function (btn) {
        btn.addEventListener('click', onFinalizar);
    })
        
    
}
let ArraySearch = []
let encontrado;
function onSearch(){
    const inputSearch = document.querySelector("#inputSearch").value
    const tablita3 = document.querySelector("#msjeSearch")
    tablita3.innerHTML = "";

    localConnected.reservas.forEach(function(item){

        if(item.status == "pendiente"){

            if(item.name.includes(inputSearch)){
                ArraySearch.push(item)
            }else{
                alert("No hay resultados para su busqueda")
            }

        }

    })   
    let tablita;
    if(ArraySearch.length > 0){  
        tablita = `<table>
                    <tr><th colspan="4">Resultado de busqueda</th></tr>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>Guests</th>
                        <th>Status</th>
                    </tr>`;
                    ArraySearch.forEach(function(r){
                        let disabled = ""
                        if(r.status == "finalizada" || r.status == "cancelada") {
                            disabled = 'disabled="disabled"'
                        }

                        if(r.status == "pendiente" || r.status == "finalizada"){
                            tablita += `
                            <tr>
                                <td>${r.idUser}</td>
                                <td>${r.name}</td>
                                <td>${r.guests}</td>
                                <td>${r.status}<button class="btnFinalizar" ${disabled} data-id="${r.idUser}">Finalizar</button></td>
                            </tr>
                            `;
                        }
                    })
                    tablita += `</table>`;
                tablita3.innerHTML = tablita;
    }                
                document.querySelectorAll(".btnFinalizar").forEach(function (btn) {
                    btn.addEventListener('click', onFinalizar);

                })

}
let guestsNow=0;
function onCupos(){
    const inputCupos = document.querySelector("#inputCupos").value;
    //consulta si tiene reservas finalizadas y hace:
   
    locales.forEach(function(local){
        
        local.reservas.forEach(function(res){
            if(local.id == localConnected.id && local.reservas.length>0){
                if(res.status == "pendiente"){
                    encontroPendiente = true;
                }
            }
        })   
    })
    if(encontroPendiente == false){
        localConnected.cupos = inputCupos;
        localConnected.cuposMax = inputCupos
    }else{
        document.querySelector("#errorModAforo").innerHTML = "Tiene reservas pendientes, no puede modificar cupos"
    }
    onLobbyLocal()
}
function onStatus(){
    localConnected.status = "ocupado";
    onInfo()
    show("lobbyLocal")
    document.querySelector("#msjStatus").innerHTML = "Se han deshabilitado las reservas a los clientes"
}
function onStatusOK(){
    localConnected.status = "available";
    onInfo()
    show("lobbyLocal")
    document.querySelector("#msjStatus").innerHTML = "Se han habilitado las reservas a los clientes"

}
function onFinalizar(e){
    e.preventDefault();
    //cambiar estado de reserva
    const reservaUserId = Number(this.getAttribute('data-id'));
    const btn = this;
    localConnected.reservas.forEach(function (reserva) {

    if (reserva.idUser == reservaUserId && reserva.status == "pendiente") {
        reserva.status = "finalizada";
        localConnected.cupos = localConnected.cupos + reserva.guests
        btn.setAttribute('disabled', 'disabled');

    }
  });
  // Esto vuelve a dibujar la nueva tabla con un to-do menos
  onLobbyLocal();
  onSearch()
  
}
let newReservas = [];

function onCancelUser(e){
    e.preventDefault();
    //cambiar estado de reserva
    const reservaUserId = Number(this.getAttribute('data-id'));
   
     
    locales.forEach(function (reserva) {
    reserva.reservas.forEach(function(i){
        if(loggedUser.id == i.idUser){
            if(i.localID == reservaUserId && i.status == "pendiente") {
                i.status = "cancelada";

            }
        }
    })
    });
    locales.forEach(function (reserva) {
        reserva.reservas.forEach(function(i){

            if(i.status == "pendiente"){
                newReservas.push(new Reserva(i.idUser,i.name,i.guests,i.localID));
                
            }
        })
    });
    locales.reservas = newReservas 
    onInfo()
    
    
}
function searchLocal(key, value) {
    let local = null;
    locales.forEach(function(l) {
        if(l[key] == value) {
            local = l
        }
    })
    return local; 
}

function search(key, value, arr) {
    itemFound = null;
    arr.reservas.forEach(function(item){
        if (item[key] == value) {
            itemFound = item;
        }
    })
    return console.log(itemFound)
}
function pantallas(){
    
    return loggedScreen;
}
