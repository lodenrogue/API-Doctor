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

function doSomethingWithResponse(response) {
	for(let i = 0; i < response.length; i++) {
		let api = response[i];
		console.log(api.name, "status:", api.status);
	}
};

let apiDoc = new ApiDoctor();
apiDoc.getStatus(config, doSomethingWithResponse);

