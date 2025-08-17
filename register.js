//functions to load all the users
document.addEventListener("DOMContentLoaded",()=>{
    //getting all 4 elements for user registration
    let username=document.querySelector("#username")
    console.log(username)
    let useremail=document.querySelector("#usermail")
    console.log(useremail)
    let userpassword=document.querySelector("#userpwd")
    console.log(userpassword)
    let registerBtn=document.querySelector(".register-btn")
    console.log(registerBtn)
    //adding the button functionalities and accessing the parent information
    registerBtn.addEventListener("click",(e)=>{
        console.log(e.target.parentElement.parentElement)
        let userinfo=e.target.parentElement.parentElement
        let username=userinfo.querySelector("#username").value
        console.log(username)
        let useremail=userinfo.querySelector("#usermail").value
        console.log(useremail)
        let userpassword=userinfo.querySelector("#userpwd").value
        console.log(userpassword)
        let updatedpassword=useremail+userpassword
        console.log(updatedpassword)
        // creating the object for selected users
        let newUser={
            userName:username,
            userEmail:useremail,
            userPassword:updatedpassword
        }
        console.log("user-info",newUser)
        //passing an entire user info to registerUser function
        registerUser(newUser)
    })
})

//creating empty array for storing number of users
let users = JSON.parse(localStorage.getItem("user")) || [];
//required functions to register
//user registration function
function registerUser(newUser){
    let existingUser=users.find(user=>user.userName===newUser.userName)
    if(!existingUser){
        users.push(newUser)
        alert("user registered successfully")
        window.location.href="login.html"
        console.log("user registered successfully")
    }else{
        alert("user already exists")
        console.log("user already exists")
    }
    localStorage.setItem("user",JSON.stringify(users))
    console.log(existingUser)
}

console.log(users)