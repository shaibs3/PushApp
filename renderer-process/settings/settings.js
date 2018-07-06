

const saveBtn = document.getElementById('save-btn')


saveBtn.addEventListener('click', (event) => {
    const Store = require('electron-store');
    const store = new Store();
    var lovemyleadsRevcontentApiKeyInput = document.getElementById('lovemyleads_revcontent_api_key_input').value
    var lovemyleadsPushEngageApiKeyInput = document.getElementById('lovemyleads_pushengage_api_key_input').value
    var monetizeRevcontentApiKeyInput = document.getElementById('monetize_revcontent_api_key_input').value                                        
    var monetizePushEngageApiKeyInput = document.getElementById('monetize_pushengage_api_key_input').value

    store.set('lovemyleads_revcontent_api_key', lovemyleadsRevcontentApiKeyInput);
    store.set('lovemyleads_pushengage_api_key', lovemyleadsPushEngageApiKeyInput);
    store.set('monetize_revcontent_api_key', monetizeRevcontentApiKeyInput);
    store.set('monetize_pushengage_api_key', monetizePushEngageApiKeyInput);
    

})

function initApiKeyVals() 
{
    const Store = require('electron-store');
    const store = new Store();

    // get current values from local data
    const lovemyleadsRevcontentApiKey = store.get('lovemyleads_revcontent_api_key', null);
    const lovemyleadsPushengageApiKey = store.get('lovemyleads_pushengage_api_key', null);
    const monetizeRevcontentApiKey = store.get('monetize_revcontent_api_key', null);
    
    const monetizePushEngageApiKey = store.get('monetize_pushengage_api_key', null);
    var $ = require("jquery");  
    // updatee values
    $("#lovemyleads_revcontent_api_key_input").val(lovemyleadsRevcontentApiKey);
    $("#lovemyleads_pushengage_api_key_input").val(lovemyleadsPushengageApiKey);
    $("#monetize_revcontent_api_key_input").val(monetizeRevcontentApiKey);
    $("#monetize_pushengage_api_key_input").val(monetizePushEngageApiKey);

}

initApiKeyVals()
