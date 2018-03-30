const expres = require('express');
const fs = require('fs');
//Grab data
const db = fs.readFileSync('./db/albums.json');
const data = JSON.parse(db);
//Hold veriables
let year;
//Data for home page
function returnDefault() {
    let defaultData = {};
    let list = Object.keys(data);
    year = list[list.length - 1];
    defaultData.year = list[list.length - 1];
    defaultData.albumData = data[list[list.length - 1]];
    defaultData.bandList = generataListofBands(list);
    console.log(defaultData);
    return defaultData;
}
//Data to generate list of albums
function generataListofBands(list) {
    let bands = [];
    list.forEach(function (item) {
        data[item].forEach(function (obj) {
            bands.push({year: item, band:obj["band"], id:obj["id"]});
        });
    })
    return bands;
}
//
let app = expres();
app.use(expres.static('website'))
app.set('view engine', 'ejs');
//Response for home
app.get('', sentHome);

function sentHome(request, response) {
    response.render('album', returnDefault());
}
//Response for year
app.get('/:year', sentAlbums);

function sentAlbums(request, response) {
    //zmienna przechowujaca rok podany w adresie
    
    year = request.params.year;
    request.params.year;
    if (data[year]) {
        response.render('album', {
            year: year,
            albumData: data[year],
            bandList: generataListofBands(Object.keys(data))
                })
    } else {
        response.render('404');
    }
}
app.get('/:api/:id', rest);

function rest(request, response) {
    //zmienna przechowujaca rok podany w adresie  
    let req = request.params;
    response.send(data[req.api][req.id - 1]);
}
//Response for the rest
app.get('*', sentError);

function sentError(request, response) {
    response.send({
        request
    });
}
app.listen(3000, function () {
    console.log("server działa localhost:3000");
});