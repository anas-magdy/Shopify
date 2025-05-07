import User from './User.js'; 
let password=document.getElementsByClassName('password')[0]
let formInputs=document.forms[0].elements
let inputsArray = Array.from(formInputs);
inputsArray.forEach((input)=>{
    input.addEventListener('blur',function(){
    checkValidation(this)
    })
})
let isValideArr=[false,false,false,false]
function checkValidation(target){
    if(target.name== "user_name"){
        let nameRegex = /^[A-Za-z]{3,}(?:\s+[A-Za-z]{3,})+$/;
        isValideArr[0]=  nameRegex.test(target.value.trim())
        if(! isValideArr[0]){
            document.getElementsByClassName('nameError')[0].style.display='block'
            target.style.border='1px solid red '
        }else{
            document.getElementsByClassName('nameError')[0].style.display='none'
            target.style.border='1px solid green '
        }
    }
    if(target.name== "email"){
        const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        isValideArr[1]=  EmailRegex.test(target.value.trim())
        if(! isValideArr[1]){
            document.getElementsByClassName('emailError')[0].style.display='block'
            target.style.border='1px solid red '
        }else{
            document.getElementsByClassName('emailError')[0].style.display='none'
            target.style.border='1px solid green '
        }
    }
    if(target.name== "password"){
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        isValideArr[2]=  passRegex.test(target.value.trim())
        if(! isValideArr[2]){
            document.getElementsByClassName('passwordError')[0].style.display='block'
            target.style.border='1px solid red '
        }else{
            document.getElementsByClassName('passwordError')[0].style.display='none'
            target.style.border='1px solid green '
        }
    }
    if(target.name== "confirm_pasword"){
        isValideArr[3]=target.value == password.value
        if( isValideArr[3] &&  isValideArr[2] ){
            document.getElementsByClassName('confirmPasswordError')[0].style.display='none'
            target.style.border='1px solid green '
        }else{
            document.getElementsByClassName('confirmPasswordError')[0].style.display='block'
            target.style.border='1px solid red '
        }      
    }
} 
function switchToLogin(){
    const container = document.querySelector('.container');
                container.children[0].style.animation=' swapToLeft .5s ease-in-out forwards'
                container.children[1].style.animation=' swapToRight .5s ease-in-out  forwards'
                container.children[1].innerHTML=`<h2>Log In</h2>
            <form action="#">
                <input type="email" name="email" class="email" placeholder="Email"/>
                <input type="text" name="password" class="password" placeholder="Password">
                <span class="errorMessage authenticationError">Email or password dont match</span>
                <button type= "button" class="login-btn">Log In </button>
                <button type="button" class="to-signUp-btn">Regester</button>
            </form>`
            container.children[1].querySelector('.login-btn').addEventListener('click', ()=>{
                let email=container.children[1].querySelector('.email').value
                let password=container.children[1].querySelector('.password').value
                let error=container.children[1].querySelector('.authenticationError')
                checkAuthintication(email,password,error)
            });
}
function checkAuthintication(email,password,err){
    if (User.checkAuthentication(email, password)) {
        localStorage.setItem('email', JSON.stringify({email,password}))
    window.location.href = "http://127.0.0.1:5500/pages/home.html";
}else{
    err.style.display='block'
}
}
let regestationBtn=document.getElementsByClassName('signUp-btn')[0]
let toLoginBtn=document.getElementsByClassName('to-login-btn')[0]
toLoginBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    switchToLogin()
})
regestationBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    if(isValideArr.every((item)=>item===true)){
        console.log("test")
        document.getElementsByClassName('enterdata')[0].style.display='none'
        let user_name = document.getElementsByClassName('user_name')[0].value
        let email = document.getElementsByClassName('email')[0].value
        let password = document.getElementsByClassName('password')[0].value
        let u=new User(user_name,email,password)
        if(u.saveUser()){
            switchToLogin()
        }
    }else{
        document.getElementsByClassName('enterdata')[0].style.display='block'
    }
})






