Meteor.methods({
	saveUser: function(data) {
		check(data.user, {
			'name': String,
			'email': String,
			'password': String
		});

		check(data.vehicle, {
			'brand': String,
			'model': String,
			'year': String,
			'fuel': String
		});

		var user = Accounts.createUser({
			'name': data.user.name,
			'email': data.user.email,
			'password': data.user.password,
			'profile': 
			{
				'createdAt': Date.now(),
				'vehicles': 
				[
					{
						'brand': data.vehicle.brand,
						'model': data.vehicle.model,
						'year': data.vehicle.year,
						'fuel': data.vehicle.fuel,
					}
				]
			}
		});

		return user;
	},

	removeUser: function(id) {
		var user = Accounts.find({_id: id});

		Meteor.users.remove(user._id);
		
		return id;
	}
});