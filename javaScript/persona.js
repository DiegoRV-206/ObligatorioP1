




/*
    {
        id : 1, 
        name : "Mar",
        username : "martin.luz",
        password : "123",
        type : "persona",
    },

    {
        id : 2, 
        name : "Lea",
        username : "LeaMachine",
        password : "1234",
        type : "persona",
    },
*/


class User {
    constructor(id, name, username, pass, type) {
        this.id = id;
        this.name=name;
        this.username=username;
        this.password=pass;
        this.type=type;
    }
}

//precarga de usuarios
const idMartin = getAutoIncrementId
//const martin = new User(1, "Mar", "martin.luz", "123", "persona");
//users.push(martin);


function getAutoIncrementId(){
    return users.length + 1;
}