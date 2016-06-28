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
		var user = Accounts.find({_id: id});

		Meteor.users.remove(user._id);
		
		return id;
	},

	getUser: function(id) {
		return Meteor.users.findOne({_id: id});
	}
});