export let usersArray = [
  {
    id: 847362,
    name: "Emma Wilson",
    email: "emma.wilson12@gmail.com",
    password: "kL8#pQ2$zN",
  },
  {
    id: 592814,
    name: "Michael Brown",
    email: "michael.brown45@yahoo.com",
    password: "5T!vM9rX&w",
  },
  {
    id: 361927,
    name: "Sarah Johnson",
    email: "sarah.johnson78@outlook.com",
    password: "H@j3Kq9%fL",
  },
  {
    id: 724581,
    name: "David Garcia",
    email: "david.garcia23@hotmail.com",
    password: "b7Z$pY6#mR",
  },
  {
    id: 935246,
    name: "Lisa Rodriguez",
    email: "lisa.rodriguez89@example.com",
    password: "vN4&kP8!xQ",
  },
  {
    id: 482613,
    name: "James Smith",
    email: "james.smith34@gmail.com",
    password: "qW9@eR5*tY",
  },
  {
    id: 157839,
    name: "Robert Davis",
    email: "robert.davis67@yahoo.com",
    password: "3M#hJ6dF$n",
  },
  {
    id: 648291,
    name: "Emily Miller",
    email: "emily.miller56@outlook.com",
    password: "7X!zK2pL%v",
  },
  {
    id: 379465,
    name: "John Williams",
    email: "john.williams90@hotmail.com",
    password: "rT5$fN8#mB",
  },
  {
    id: 826173,
    name: "Jane Jones",
    email: "jane.jones01@example.com",
    password: "9L@pQ4!kHw",
  },
];
export default class User {
  constructor(name, email, password) {
    this.id = this.generateId();
    this.name = name;
    this.email = email;
    this.password = password;
  }
  generateId() {
    return "xxxxxxxx-xxxx-4xxx-yxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  saveUser() {
    let emailExistsError = document.getElementsByClassName("emailExists")[0];
    let checkEmail = usersArray.filter((item) => item.email == this.email);
    console.log(checkEmail)
    if (checkEmail.length == 0) {
        emailExistsError.style.display='none'
      usersArray.push(this);
      return true
    } else {
      emailExistsError.style.display = "block";
      return false
    }
  }
  static checkAuthentication(email, password) {
    let checkEmail = usersArray.filter((item) => item.email === email && item.password === password);
    if (checkEmail.length === 0) {
      return false;
    } else {
      return true;
    }
  }
}
