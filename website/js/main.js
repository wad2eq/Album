var container = document.getElementById("details");
// container.innerHTML = "";
window.onload = function () {
    var albumListTogler = 6;
    var link = document.querySelectorAll("a");
    var showMore = document.getElementById("show");
    //Add event for ajax requests
    link.forEach(element => {
        element.addEventListener('click', (a) => {
            a.preventDefault();
            loadData(element.getAttribute("href"));
        })
    });
    //Add event to show more items on the list
    showMore.addEventListener('click', (a)=>{
        a.preventDefault();
        workWithList(0);
    })
    
     workWithList(albumListTogler);
}
/**
 *  Metoda extends list of albums       
 * @param {Node list} albumListTogler 
 */
function workWithList(albumListTogler){
    let listItem = document.querySelectorAll(".collection-item");
    for(var i =0; i< listItem.length-albumListTogler; i++ ){
        listItem[i].classList.remove("hidden");
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
    container.innerHTML = 
        `<div class = "col s4" >${data["description"]} </div>
            <div class = "col s5" >
                <img src = "${data["image"]}" alt = "To są bitelsi" >
            </div> 
            <div class = "col s3" id = "ciekawostki" >
                <div>${generatePartialView(data.about)}</div>
            </div> 
        `;
}
/**
 * Object passed by Ajax
 * @param {Object} date Part of data from main object 
 */
function generatePartialView(date){
    let info = '';
    Object.keys(date).forEach(function(item){
        info += `<div>${item}:  ${date[item]}</div>`;
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