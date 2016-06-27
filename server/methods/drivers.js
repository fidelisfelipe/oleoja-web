Meteor.methods({
	saveDriver: function(driver) {
		check(driver, {
			'name': String,
			'email': String,
			'latitude': String,
			'longitude': String
		});

		if (driver.id) {
			driver.updatedAt = Date.now();

			Drivers.update(driver.id, {
				$set: {
					'name': driver.name,
					'email': driver.email,
					'latitude': driver.latitude,
					'longitude': driver.longitude
				}
			});
			var id = driver.id
		} else {
			driver.createdAt = Date.now();

			var id = Drivers.insert(id, driver);
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