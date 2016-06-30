Meteor.methods({
	saveUser: function(data) {
		var user = Accounts.createUser({
			'email': data.user.email,
			'password': data.user.password,
			'profile': 
			{
				'name': data.user.name,
				'phone': data.user.phone,
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
		check(id, String);

		Meteor.users.remove({
			_id: id
		});
	},

	getUser: function(id) {
		return Meteor.users.findOne({_id: id});
	}
});