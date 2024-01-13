
var siteNameInput =document.getElementById('siteName')
var Url = document.getElementById('siteUrl')
var tableRow = document.getElementById('tableRow')
var btn = document.getElementById('btn')


var array = []

    if(localStorage.getItem('webInfo')){
        array = JSON.parse(localStorage.getItem('webInfo'))
        display(array)
       
}

function addWebsite(event){
    event.preventDefault();

    
    var site={
    siteName : siteNameInput.value,
    siteUrl : Url.value

    }
    var isValidName = nameRwgx(site.siteNameInput);

    if (!isValidName) {
        
        document.getElementById("siteName").classList.remove("is-valid");
        document.getElementById("siteName").classList.add("is-invalid");
        return;
    } else {
       
        document.getElementById("siteName").classList.remove("is-invalid");
        document.getElementById("siteName").classList.add("is-valid");
    }

       var isValidurl = urlRegx(site.Url);

    if (!isValidurl) {
       
        document.getElementById("siteUrl").classList.remove("is-valid");
        document.getElementById("siteUrl").classList.add("is-invalid");
        return;
    } else {
       
        document.getElementById("siteUrl").classList.remove("is-invalid");
        document.getElementById("siteUrl").classList.add("is-valid");
    }
    array.push(site)
    localStorage.setItem('webInfo',JSON.stringify(array))
    display(array)

}


function display(array){
 
   
    var box ='';
    for (var i = 0 ; i < array.length; i++){
     box +=`
    <tr>
    <td>${i + 1}</td>
    <td>${array[i].siteName}</td>
    
     <td><button class="btn  btn-info" data-index="${i}" onclick="visit('${array[i].siteUrl}')"'><i class="fa-solid fa-eye"></i>visit</button></td> 
    <td><button class="btn btn-danger" onclick='deletIndex(${i})'><i class="fa-solid fa-trash-can"></i> Delete</button></td>
    
    </tr>`
    }
    tableRow.innerHTML = box

  }

 
function clear(){

    siteNameInput.value =''
    Url.value =''
   
}


function visit(loc){
open(loc,'_blank')

}
function deletIndex(index) {
    array.splice(index, 1);
    localStorage.setItem('webInfo', JSON.stringify(array));
    display(array);
    
}

function urlRegx(){
    var regx = /^(ftp|http|https):\/\/[^ "]+$/
    return regx.test(Url.value)
}
function nameRwgx(){
    var regx =/^[A-Za-z0-9_]{3,10}/g
    return regx.test(siteNameInput.value)
}
