class User {
    constructor(id, name, username, pass, type) {
        this.id = id;
        this.name=name;
        this.username=username;
        this.password=pass;
        this.type=type;
        this.contador = [];

    }
    
}
const users = [
    new User(1, "Martin", "martin.luz", "Martin1", "persona"),
    new User(2, "Pepito", "pepesburger", "Burgers1", "local"),
    new User(3, "Leandro", "pizzanapoletana", "Pizzas1", "local"),
    new User(4, "Santiago", "elasador", "Asado1", "local"),
    new User(5, "Diego", "falconmasters", "Teatro1", "local"),
    new User(6, "Federico", "samustheatres", "Teatro2", "local"),
    new User(7, "Agustin", "grapparte", "Museo1", "local"),
    new User(8, "Christian", "lolmuseum", "Museo2", "local"),
    new User(9, "Renan", "erre", "Erre12", "persona"),
    new User(10, "Danisa", "danisaf", "Danisa1", "persona"),
    new User(11, "Miguel", "miguelito", "Miguel1", "persona"),
    new User(12, "Florencia", "florque", "Flor12", "persona"),
    new User(13, "Marcela", "chela", "Marce1", "persona"),
    new User(14, "Antonela", "antito", "Anto12", "persona"),
]
function getAutoIncrementId(array){
    return array.length + 1;
}


class Local {
    constructor(id, localName,idUser, address, status, image, type, cupos) {
        this.id = id
        this.localName = localName;
        this.address = address;
        this.status = status;
        this.image = image;
        this.type = type;
        this.cupos = cupos;
        this.reservas = [];
        this.userOwned = idUser;
        this.cuposMax = 50;

    }
}

class Reserva {
    constructor(idUser, name, guests, localID) {
        this.idUser = idUser;
        this.name = name;
        this.guests = guests;
        this.localID = localID;
        this.status = "pendiente";
        this.rate = 0;
    }
}


// Creo local
const locales = [
    new Local(1, "pizzaNapoletana", 3, "Av. Brasil 0021", "available", "<img src='/img/foto3.jpg'", "Restaurant",50),
    new Local(2, "pepesBurger", 2, "Av. Brasil 1021", "available", "<img src='/img/foto1.jpg'", "Restaurant", 50),
    new Local(3, "elAsador",4, "Av. Brasil 2021", "available", "<img src='/img/foto4.jpg'", "Restaurant", 50),
    new Local(4, "falconMasters", 5, "Av. Brasil 3021", "available", "<img src='/img/foto5.jpg'", "Theatre", 50),
    new Local(5, "samusTheatres",6, "Av. Brasil 4021", "available", "<img src='/img/foto6.jpg'", "Theatre", 50),
    new Local(6, "grappArte",7, "Av. Brasil 5021", "available", "<img src='/img/foto2.jpg'", "Museum", 50),
    new Local(7, "lolMuseum",8, "Av. Brasil 6021", "available", "<img src='/img/foto7.jpg'", "Museum", 50),
]


// reservas pendientes y finalizadas obligatorias
const reservaMartin = new Reserva(1, "martin", 5, 3);
locales[2].reservas.push(reservaMartin);
locales[2].cupos = 45
const reservaErre = new Reserva(9, "Renan", 6, 6);
locales[5].reservas.push(reservaErre);
locales[5].cupos = 44
const reservaDanisa = new Reserva(10,"Danisa", 3, 1)
locales[0].reservas.push(reservaDanisa);
locales[0].cupos = 47
const reservaMiguel = new Reserva(11,"Miguel", 4, 2)
reservaMiguel.status= "finalizada"
locales[1].reservas.push(reservaMiguel);
const reservaMiguel2 = new Reserva(11,"Miguel", 4, 4)
locales[3].reservas.push(reservaMiguel2);
locales[3].cupos = 46
const reservaFlorencia = new Reserva(12,"Florencia", 2, 4)
reservaFlorencia.status= "finalizada";
locales[3].reservas.push(reservaFlorencia);
const reservaFlorencia2 = new Reserva(12,"Florencia", 3, 5)
locales[4].reservas.push(reservaFlorencia2);
locales[4].cupos = 47
class Contador {
    constructor(identificador, userName){
        this.identificador = identificador;
        this.contadorRes = 0;
        this.userName = userName;
    }
}

//precargo contadores
const contUno = new Contador(3,1,"martin");
users[0].contador.push(contUno) ;
const contDos=new Contador(6,1,"Renan");
users[1].contador.push(contDos) ;
const contTres=new Contador(1,1, "Danisa");
users[2].contador.push(contTres) ;
const contCuatro=new Contador(2,2,"Miguel");
users[3].contador.push(contCuatro) ;
const contOcho=new Contador(4,2,"Miguel");
users[3].contador.push(contOcho) ;
const contCinco=new Contador(4,1,"Florencia");
users[4].contador.push(contCinco) ;
const contSeis=new Contador(6,1);
users[5].contador.push(contSeis) ;
const contSiete = new Contador(7,0);
users[6].contador.push(contSiete) ;


