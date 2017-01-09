function ApiDoctor(configFile) {

	this.isConfigValid = function(config) {
		return isArray(config) && !isEmpty(config) && hasValidProperties(config);
	};	

	this.getStatus = function(config, callBack) {
		if(!this.isConfigValid(config)) {
			throw new Error('Invalid config file');
		}
		else {
			checkAllStatuses(config, callBack);
		}
	};

	function checkAllStatuses(config, callBack) {
		let promises = [];
		
		for(let i = 0; i < config.length; i++) {
			let api = config[i];
			promises.push(checkStatus(api));
		}

		$.when.apply(null, promises).then(function() {
			callBack(config);
		});
	}

	function checkStatus(api) {
		let deferred = new $.Deferred();

		$.get(api.url)
			.done(function(data, statusText, xhr) {
				api.status = xhr.status;
				deferred.resolve();
			})
			.fail(function(data) {
				api.status = data.status;
				deferred.resolved();
			});
			
		return deferred;
	}

	function isArray(array) {
		return array && array instanceof Array;
	};

	function isEmpty(array) {
		return array.length == 0;
	};

	function hasValidProperties(config) {
		for(let i = 0; i < config.length; i++) {
			let api = config[i];
			if(!hasApiName(api) || !hasApiUrl(api)) {
				return false;
			}
		}
		return true;
	}

	function hasApiName(api) {
		return api.hasOwnProperty('name');
	};

	function hasApiUrl(api) {
		return api.hasOwnProperty('url');
	};
};