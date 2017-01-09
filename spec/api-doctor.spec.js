describe('Api Doctor', function() {

	const CONFIG_FILE_NAME = 'config.json';
	let apiDoc = new ApiDoctor();
	let config;

	beforeEach(function(done){
		$.getJSON(CONFIG_FILE_NAME, function(json) {
			config = json;
			done();
		});
	});

	describe('when validating config', function() {

		it('should return false when config is empty', function() {
			let isValid = apiDoc.isConfigValid([]);
			expect(isValid).toBe(false);
		});

		it('should return false when config is not an array', function() {
			let isValid = apiDoc.isConfigValid(100);
			expect(isValid).toBe(false);
		});

		it('should return false when config has objects missing name property', function() {
			let isValid = apiDoc.isConfigValid([{ url: 'testUrl' }, { url: 'testUrl' }]);
			expect(isValid).toBe(false);
		});

		it('should return false when config has objects missing url property', function() {
			let isValid = apiDoc.isConfigValid([{ name: 'testName' }, { name: 'testName' }]);
			expect(isValid).toBe(false);
		});

		it('should return true when config is valid', function() {
				let isValid = apiDoc.isConfigValid(config);
				expect(isValid).toBe(true);
		});
	});

	describe('when getting status', function() {
		
		let response;

		beforeEach(function(done) {
			apiDoc.getStatus(config, function(resp) {
				response = resp;
				done();
			});
		})

		it('should throw an exception when given an invalid config', function() {
			expect(apiDoc.getStatus.bind(null, null)).toThrow();
		});

		it('should return an array', function() {
			expect(response instanceof Array).toBe(true);
		});

		it('should return an array of the same size as config', function() {
			expect(response.length).toBe(config.length);
		});

		it('should return an array with objects that have a name', function() {
			for(let i = 0; i < response.length; i++) {
				expect(response[i].name).not.toBeUndefined();
			}
		});

		it('should return an array with objects that have a url', function() {
			for(let i = 0; i < response.length; i++) {
				expect(response[i].url).not.toBeUndefined();
			}
		});

		it('should return an array with objects that have a status', function() {
			for(let i = 0; i < response.length; i++) {
				expect(response[i].status).not.toBeUndefined();
			}
		});
	});
});