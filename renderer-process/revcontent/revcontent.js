const $ = require("jquery");
const shell = require('electron').shell;

// assuming $ is jQuery


const myModule = require('../../script/revcontentApi');

const getRevContentAddsBtn = document.getElementById('getRevContentAdds')

getRevContentAddsBtn.addEventListener('click', (event) => {
    myModule.retriveRevcontentAds(ShowRevContentAds);

})
