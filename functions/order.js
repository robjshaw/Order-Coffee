
exports.handler = function(context, event, callback) {

    var Airtable = require('airtable');
    var base = new Airtable({apiKey: process.env.AIRTABLEKEY}).base(process.env.AIRTABLEBASE);
    
    let responseObject = {};
    
    base('orders').find(event.id, function(err, record) {
        responseObject.id = record.get('id');
        responseObject.eta = record.get('eta');

        var parameters = record.get('parameters');

        parameters = parameters.replace("delivery-pickup", "delivery");

        parameters = JSON.parse(parameters);

        responseObject.delivery = parameters.delivery;

        callback(null, responseObject);
        
    });


}