var container = document.getElementById("details");
// container.innerHTML = "";
window.onload = function () {
    var albumListTogler = 6;
    var link = document.querySelectorAll("a");
    var showMore = document.getElementById("show");
    link.forEach(element => {
        element.addEventListener('click', (a) => {
            a.preventDefault();
            loadData(element.getAttribute("href"));
        })
    });
    showMore.addEventListener('click', (a)=>{
        a.preventDefault();
        workWithList(0);
    })
    
     workWithList(albumListTogler);
}

function workWithList(albumListTogler){
    let listItem = document.querySelectorAll(".collection-item");
    for(var i =0; i< listItem.length-albumListTogler; i++ ){
        listItem[i].classList.remove("hidden");
    }
}

function handleSuccess() {
    const parseData = JSON.parse(this.responseText);
    generateView(parseData);
}

function handleErrors() {
    console.log("ups");
}

function loadData(adress) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', adress, true);
    xhr.onload = handleSuccess;
    xhr.onerror = handleErrors;
    xhr.send();
}

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
function generatePartialView(date){
    let info = '';
    Object.keys(date).forEach(function(item){
        info += `<div>${item}:  ${date[item]}</div>`;
    });
    return info;
}