document.addEventListener("DOMContentLoaded",()=>{
    let useremail=document.querySelector("#userloginmail")
    console.log(useremail)
    let userpassword=document.querySelector("#userloginpwd")
    console.log(userpassword)
    let loginBtn=document.querySelector(".login-btn")
    console.log(loginBtn)
    loginBtn.addEventListener("click",(e)=>{
        let userInfo=e.target.parentElement.parentElement
        console.log(userInfo)
        let useremail=userInfo.querySelector("#userloginmail").value
        console.log(useremail)
        let userpassword=userInfo.querySelector("#userloginpwd").value
        console.log(userpassword)
        let updatedpassword=useremail+userpassword
        console.log(updatedpassword)
        let checkUser={
            userEmail:useremail,
            userPassword:updatedpassword
        }
        console.log("user-info",checkUser)
        loginUser(checkUser)
    })
})
let users = JSON.parse(localStorage.getItem("user")) || [];
console.log(users)
function loginUser(checkUser){
    let existingUser=users.find(user=>user.userEmail===checkUser.userEmail && user.userPassword==checkUser.userPassword)
    console.log(existingUser)
    if(existingUser){
        console.log("welcome",existingUser.userName)
        localStorage.setItem("user-name",existingUser.userName)
        window.location.href="index.html"
    }else{
        console.log("user not exists")
        alert("emal or password entered incorrect")
    }
}
console.log(users)
