//🍔🍔step1-: functions to load all the products
document.addEventListener("DOMContentLoaded",()=>{
    //✈️✈️step2:- accessing all button elements as soon as browser is loaded
    let loggedusername=localStorage.getItem("user-name")
    console.log(loggedusername)
    let welcome=document.querySelector("#welcome")
    welcome.innerText=`welcome ${loggedusername}`
    let addtocartBtn=document.querySelectorAll(".add-to-cart")
    console.log("a-btn",addtocartBtn)
    let carticonbtn=document.querySelectorAll(".cart-btn")
    //🍳🍳step3:- accessing each button individually to apply functionalities
    addtocartBtn.forEach(button=>{
        console.log("atcbtn",button)
        //🎇🎇 step4:- adding the button functionalities and accessing the parent information
        button.addEventListener("click",(e)=>{
            console.log(e.target.parentElement.parentElement)
            let productinfo=e.target.parentElement.parentElement
            let pimgurl=productinfo.querySelector(".product-img").src
            let ptitle=productinfo.querySelector(".product-title").innerText
            let pdes=productinfo.querySelector(".product-description").innerText
            let pprice=productinfo.querySelector(".product-price").innerText
            // creating the object for selected products
            let product={
                imgUrl:pimgurl,
                title:ptitle,
                price:pprice,
                description:pdes,
                quantity:1
            }
            console.log("p-info",product)
            //passing an entire product information to addtocart function
            addtocart(product)
        })
    })
   carticonbtn.forEach(ele=>{
    ele.addEventListener("click",()=>{
        window.location.href="cart.html"
    })
   })
   showUI()
})
//cart value
let loggedusername=localStorage.getItem("user-name")
console.log(loggedusername)
let currentUser=loggedusername+"cart"
let currentUserValue=loggedusername+"value"
let cartItems=[]

//functions to add items to cart
function addtocart(product){
    let existingCartItems=cartItems.find(item=>item.title===product.title)
    if(existingCartItems){
        existingCartItems.quantity++
    }else{
        cartItems.push(product)
    }
    //adding items 
    localStorage.setItem(currentUser,JSON.stringify(cartItems))
    handleCartIconVal()
}
console.log(cartItems)
//functions to increment cart icon value

function handleCartIconVal(){
    let cartIcon=document.querySelectorAll("#cart-val")
    let cartVal=cartItems.reduce((total,ele)=>total+ele.quantity,0)
    //cartIcon.textContent=cartVal
    cartIcon.forEach(ele=>ele.textContent=cartVal)
    console.log(cartVal)
    localStorage.setItem(currentUserValue,cartVal)
}
//function to load the cart
function loadCart(){
    let localCartItems=localStorage.getItem(currentUser)
    //it loads the cart icon values when if items exist in db-storage and parse it
    if(localCartItems){
        cartItems=JSON.parse(localCartItems)
        handleCartIconVal()
    }
}
loadCart()
function showUI(){
    if(localStorage.getItem(currentUser)){
        cartItems=JSON.parse(localStorage.getItem(currentUser))
    }else{
        cartItems=[]
    }
}