

const saveBtn = document.getElementById('save-btn')


saveBtn.addEventListener('click', (event) => {
    const Store = require('electron-store');
    const store = new Store();
    var revcontentApiKeyInput = document.getElementById('revcontent_api_key_input').value
    var pushEngageApiKeyInput = document.getElementById('pushengage_api_key_input').value
    var monetizeApiKeyInput = document.getElementById('monetize_api_key_input').value
    var monetizePushEngageApiKeyInput = document.getElementById('monetize_pushengage_api_key_input').value

    store.set('revcontent_api_key', revcontentApiKeyInput);
    store.set('pushengage_api_key', pushEngageApiKeyInput);
    store.set('monetize_api_key', monetizeApiKeyInput);
    store.set('monetize_pushengage_api_key', monetizePushEngageApiKeyInput);
    

})

function initApiKeyVals() 
{
    const Store = require('electron-store');
    const store = new Store();

    // get current values from local data
    const revcontentApiKey = store.get('revcontent_api_key', null);
    const pushengageApiKey = store.get('pushengage_api_key', null);
    const monetizeApiKey = store.get('monetize_api_key', null);
    const monetizePushEngageApiKey = store.get('monetize_pushengage_api_key', null);
    var $ = require("jquery");  
    // updatee values
    $("#revcontent_api_key_input").val(revcontentApiKey);
    $("#pushengage_api_key_input").val(pushengageApiKey);
    $("#monetize_api_key_input").val(monetizeApiKey);
    $("#monetize_pushengage_api_key_input").val(monetizePushEngageApiKey);

}

initApiKeyVals()
