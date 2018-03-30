

var album = document.querySelectorAll(".album");
let listItem = document.querySelectorAll(".collection-item");
//Hide elements of Album list
var albumListTogler = 6;
var link = document.querySelectorAll("a");
var showMore = document.getElementById("show");
//Add event for ajax requests
let d = true;
album.forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.classList.add = 'wad';
        console.log("swa");
    })
});
var container = document.getElementById("details");
// container.innerHTML = "";
window.onload = function () {


    link.forEach(element => {
        element.addEventListener('click', (a) => {
            a.preventDefault();
            loadData(element.getAttribute("href"));
        })
    });
    //Add event to show more items on the list
    showMore.addEventListener('click', (a)=>{
        a.preventDefault();
            a.target.classList.add("play");
            if(d){
                albumListTogler = 0;
            }else{
                albumListTogler = 6;
            }
            swowAllList();
            d=!d;
    })
    
    swowAllList();
}
/**
 *  Metoda shows full list of albums       
 * @param {Object} albumListTogler Array of nodes <li> 
 */
function swowAllList(){ 
    console.log(albumListTogler + " --- " + d);
    if(d){
        for(var i =0; i< listItem.length-albumListTogler; i++ ){
            listItem[i].classList.remove("hidden");
            listItem[i].classList.add("play");
        }
    }else{
        for(var i =albumListTogler; i< listItem.length; i++ ){
            listItem[i].classList.add("hidden");
            listItem[i].classList.add("play");
        }
    }  
}
/**
 * Ajax succes
 * Method handle of response from ajax
 */
function handleSuccess() {
    const parseData = JSON.parse(this.responseText);
    generateView(parseData);
}
/**
 * Object recived from Http
 * @param {Object} data Object passed  
 */
function generateView(data) {
    console.log(data);
    if(data){
        container.innerHTML = 
            `<div class = "col s12 m5 r-m-l play" >
                <p>${data["description"]} </p></div>
                <div class = "col s12 m7 offset-l1 offset-s0" >
                    <img src = "${data["image"]}" alt = "${data["band"]} + ${data["title"]}" >
                </div> 
                <div class = "col s12 m3 l4" id = "ciekawostki" >
                <strong>Ciekawostki</strong>
                    <div>${generatePartialView(data.about)}</div>
                </div> 
            `;
    }else{
        container.innerHTML = `<div>Nie ma takich danych</div>`
    }   
}
/**
 * Object passed by Ajax
 * @param {Object} date Part of data from main object 
 */
function generatePartialView(date){
    let info = '';
    Object.keys(date).forEach(function(item){
        info += `<div>${item}: <strong> ${date[item]}</strong></div>`;
    });
    return info;
}
/**
 * Ajax eror
 */
function handleErrors() {
    console.log("ups");
}
/**
 * Ajax
 * @param {Adres URL} adress Adress pased by links
 */
function loadData(adress) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', adress, true);
    xhr.onload = handleSuccess;
    xhr.onerror = handleErrors;
    xhr.send();
}