# API-Doctor
API Health Test Tool

## How To Use
The library lets you check on the status of any number of APIs. All it requires is a config array and a callback function to hand you the results.

Example:

	config = [
    	{
    		name: 'Google',
    		url: 'http://google.com'
    	},
    	{
    		name: 'Example',
    		url: 'http://example.com'
    	}
    ];
    
    function callback(response) {
    	for(let i = 0; i < response.length; i++) {
    		let api = response[i];
    		console.log(api.name, "status:", api.status);
    	}
    };
    
    let apiDoc = new ApiDoctor();
    apiDoc.getStatus(config, callback);
