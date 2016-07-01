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

	savePayment: function(data) {
		var user = Meteor.users.findOne({_id: data.user});
		
		if (!user.services.iugu) {
			var iugu = IugiApi.create_customer({
				'email': user.emails[0].address,
			    'name': user.profile.name,
			    'cpf_cnpj': '',
			    'cc_emails': '',
			    'notes': 'Rider'
			});
			
			if (iugu.id) {
				Meteor.users.update(user._id, {
					$set: {
						'services.iugu': iugu.id,
						'updatedAt': Date.now()
					}
				});
				user.tokens.iugu = iugu.id;
			}
		}
		
		var card = IugiApi.create_payment_method({
			customer_id: user.tokens.iugu,
			description: "Credit card",
			data: {
				number: data.number,
				verification_value: data.cvv,
				first_name: data.name,
				last_name: data.name,
				month: data.expiration,
				year: data.expiration
			},
		    item_type: 'credit_card'
		});
		
		console.log(card);
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