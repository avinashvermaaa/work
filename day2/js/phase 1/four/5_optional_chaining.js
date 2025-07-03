const user ={
    name : "avinash",
    age : 23,
    address :{
        city : "Mohali",
        state : "punjab",
        country : "india"
    }
};

console.log(user?.address?.city); // "kharar"
console.log(user?.name)

console.log(user.contact?.phone); // undefined (no error) as contact is not defined
