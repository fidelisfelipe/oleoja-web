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

	savePayment: function(data) {
		console.log(data)
		console.log(data.user.emails[0])
		if (!data.user.profile.tokens || !data.user.profile.tokens.iugu) {
			var customer = {
				'email': 'teste@teste.com', //data.user.emails[0].address,
			    'name': data.user.profile.name,
			    'cpf_cnpj': '',
			    'cc_emails': '',
			    'notes': 'Rider'
			}

			var result = IugiApi.create_customer(customer);
			
			console.log(result);

			Meteor.users.update(data.user._id, {
				$set: {
					'profile': {
						'tokens': {
							'iugu': result.id
						},
						'updatedAt': Date.now()
					}					
				}
			});

			console.log(result);
		}

		console.log(data)
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