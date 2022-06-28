window.addEventListener("load",onLoad);
function onLoad(){
    //BOTONES PANTALLA LOGIN
    
    const login = document.querySelector("#btnLogin");
    login.addEventListener("click",onLogin);
    //BOTONES PANTALLA REGISTRO
    //btnLogin & btnSignUp se comparten en pantallas login&register
    const btnRegister = document.querySelector("#btnRegister");
    btnRegister.addEventListener("click",onRegister);
    //BOTONES PANTALLA DE RESERVAS
    const btnReserva = document.querySelector(".boton");
    btnReserva.addEventListener("click", onReserve);
    //pantalla lobby
    const btnLogOut = document.querySelector("#btnLogOut");
    btnLogOut.addEventListener("click", toLogin);

    const btnInfo = document.querySelector("#btnInfo");
    btnInfo.addEventListener("click",onInfo);
    
    const btnHome = document.querySelector("#btnHome");
    btnHome.addEventListener("click",onHome)

    const btnSignUp = document.querySelector("#signUp");
    btnSignUp.addEventListener("click",showRegister);
    const btnLogin = document.querySelector("#loginn");
    btnLogin.addEventListener("click",btLogin)
    

    //PROBLEMAS:
    /* La tabla... Cuando deshabilito el local me tira error xq no cargó la tabla */    
}
function btLogin(){
    hide("RegisterScreen")
    show("LoginScreen")

}
function showRegister(){
    hide("LoginScreen")
    show("RegisterScreen")
}

