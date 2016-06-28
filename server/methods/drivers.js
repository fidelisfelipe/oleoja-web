Meteor.methods({
	saveDriver: function(driver) {
		check(driver, {
			'name': String,
			'email': String,
			'latitude': String,
			'longitude': String
		});

		if (driver.id) {
			Drivers.update(driver.id, {
				$set: {
					'name': driver.name,
					'email': driver.email,
					'latitude': driver.latitude,
					'longitude': driver.longitude,
					'updatedAt': Date.now()
				}
			});
			var id = driver.id
		} else {
			var id = Drivers.insert({
				'name': driver.name,
				'email': driver.email,
				'latitude': driver.latitude,
				'longitude': driver.longitude,
				'createdAt': Date.now()
			});
		}

		return id;
	},

	removeDriver: function(id) {
		check(id, String);

		var driver = Drivers.remove({
			_id: id
		});
	},

	getDriver: function(id) {
		return Drivers.findOne({_id: id});
	}
});