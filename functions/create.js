exports.handler = function(context, event, callback) {

    var Airtable = require('airtable');
    var base = new Airtable({apiKey: process.env.AIRTABLEKEY}).base(process.env.AIRTABLEBASE);

    let responseObject = {};

    base('orders').create([
        {
          "fields": {
            "id": event.id,
            "phonenumber": event.phonenumber,
            "status": 'call-created',
            "callsid" : event.callsid
          }
        }
      ], {typecast: true}, function(err, records) {
        if (err) {
            callback(null, err);
        }

        records.forEach(function (record) {
            responseObject.id = record.getId();
        });
        
        callback(null, responseObject);
    });

}