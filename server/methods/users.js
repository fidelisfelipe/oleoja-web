Meteor.methods({
	saveUser: function(data) {
		var id = Accounts.createUser({
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
		
		var iugu = IugiApi.create_customer({
			'email': data.user.email,
		    'name': data.user.name,
		    'cpf_cnpj': '',
		    'cc_emails': '',
			'notes': 'Rider'
		});

		if (iugu.id) {
			Meteor.users.update(id, {
				$set: {
					'services.iugu': iugu.id,
					'updatedAt': Date.now()
				}					
			});
		}
		
		return Meteor.users.findOne({_id: id});
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