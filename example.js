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
	console.log(response);
};

let apiDoc = new ApiDoctor();
apiDoc.getStatus(config, doSomethingWithResponse);

