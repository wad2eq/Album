//Hide elements of Album list
let listItem, link, showMore, showListMobile, windowWitdh, listItemContainer
var albumListTogler = 6;
let d = true;
//Add event for ajax requests
window.onload = function () {
    listItem = document.querySelectorAll(".collection-item");
    link = document.querySelectorAll("a");
    showMore = document.getElementById("show");
    showListMobile = document.getElementById("showMobile");
    console.log(listItemContainer);
    windowWitdh = window.innerWidth;
    loadAlbum();
    //Add event to show more items on the list
    if (windowWitdh > 600) {
        showAlbumLinks(albumListTogler);
        showHideList();
    } else if (windowWitdh <= 600) {
        d = !d;
        showListMobile.classList.remove('hidden');
        showHideList();
        showAlbumLinks(albumListTogler - albumListTogler);
        showListMobile.addEventListener('click', () => {
            d = !d;
            console.log(d);
            showAlbumLinks(albumListTogler - albumListTogler);
        })
    }

}
/**
 * Metoda - wczytuje treść do strony - Wybrany album.
 * Nadaje linkom zdarzenie wywołujące obiekt XHR
 * @param {NODE} link Element drzewa DOM - link
 */
function loadAlbum() {
    link.forEach(element => {
        element.addEventListener('click', (a) => {
            a.preventDefault();
            console.log("to jest target");
            console.dir(a.target);
            if (windowWitdh <= 600 && a.target.className !== "but") {
                d = !d;
                showAlbumLinks(0);
            }
            loadData(element.getAttribute("href"));
        })
    });
}
/**
 * Metoda przełącza widok listy albumów niepełna/pełna
 */
function showHideList() {
    showMore.addEventListener('click', (a) => {
        a.preventDefault();
        console.log("show list");
        a.target.classList.add("play");
        if (d || windowWitdh <= 600) {
            albumListTogler = 0;
        } else {
            albumListTogler = 6;

        }
        showAlbumLinks(albumListTogler);
        d = !d;
    })
}

/**
 *  Metoda pokazuje/chowa listę albumów w panelu bocznym
 * @param {Object} Number Array of nodes <li> 
 */
function showAlbumLinks(toHiede) {
    console.log(toHiede + " --- " + d);
    if (d) {
        for (var i = 0; i < listItem.length - toHiede; i++) {
            listItem[i].classList.remove("hidden");
            listItem[i].classList.add("play");
        }
    } else if (!d || windowWitdh <= 600) {
        for (var i = toHiede; i < listItem.length; i++) {
            listItem[i].classList.add("play");
            listItem[i].classList.add("hidden");
        }
    }
}
//Detekcja wielkości okna

window.addEventListener('resize', resizeResponse);
/**
 * Metoda kontroluje szerokość okna przeglądarki
 */
function resizeResponse() {
    windowWitdh = window.innerWidth;
    window.location.reload('true');
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

/**
 * GENEROWANIE WIDOKÓW
 */
/**
 * Object recived from Http
 * @param {Object} data Object passed  
 */
function generateView(data) {
    var container = document.getElementById("details");
    console.log(data);
    if (data) {
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
    } else {
        container.innerHTML = `<div>Nie ma takich danych</div>`
    }
}
/**
 * Object passed by Ajax
 * @param {Object} date Part of data from main object 
 */
function generatePartialView(date) {
    let info = '';
    Object.keys(date).forEach(function (item) {
        info += `<div>${item}: <strong> ${date[item]}</strong></div>`;
    });
    return info;
}