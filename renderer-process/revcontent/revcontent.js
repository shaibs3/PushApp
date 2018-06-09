const $ = require("jquery");
const shell = require('electron').shell;

// assuming $ is jQuery

function ShowRevContentAdds(data) {
    const paragraph = document.getElementById('revContentAdds');
    var url = "none"
    var image = "none"
    var img_index = 0
    var headline = "none"
    $("#revContentAddsList").empty();
    for (var i in data) {
        headline = data[i].headline;
        url = data[i].url;
        image = data[i].image;


        var node = document.createElement("LI");
        url_link = document.createElement('a');
        url_link.href = 'http://' + url.substring(2); // Insted of calling setAttribute 
        url_link.innerHTML = headline // <a>INNER_TEXT</a>
        node.appendChild(url_link); // Append the link to the div
        br1 = document.createElement('br');
        node.appendChild(br1);
        var img_str = 'http://' + image.substring(2)
        img_link = document.createElement('a');
        img_link.href = image.substring(2); // Insted of calling setAttribute 
        img_link.innerHTML = "Image" // <a>INNER_TEXT</a>
        //node.appendChild(img_link); // Append the link to the div
        img_index++;
        var img = $('<img />').attr({
            'id': 'myImage' + img_index,
            'src': img_str,
            'alt': 'JSFiddle logo',
            'title': 'JSFiddle logo',
            'width': 250
        }).appendTo(node);





        document.getElementById("revContentAddsList").appendChild(node);
    }

}
const myModule = require('../../script/revcontentApi');

const getRevContentAddsBtn = document.getElementById('getRevContentAdds')

getRevContentAddsBtn.addEventListener('click', (event) => {
    myModule.retriveRevcontentAds(ShowRevContentAdds);

})
