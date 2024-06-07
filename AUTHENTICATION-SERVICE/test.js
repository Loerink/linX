
function authentication_middleware(){
 const first_this = this; 
 let second_this = null; 
 let third_this = null 
 function test1 (){
    second_this = this; 
 }
 const test2 = ()=>{
    
    third_this = this; 
 }
test1()
test2()

 console.log(first_this == second_this)
 console.log(first_this == third_this)
}

authentication_middleware()
