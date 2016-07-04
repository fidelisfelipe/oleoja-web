Meteor.methods({
	listPayments: function(customer) {
		return IugiApi.payment_methods(customer);
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
		
		try {
			var card = {
				number: data.number,
				verification_value: data.cvv,
				first_name: data.name.split(' ')[0],
				last_name: data.name.split(' ').splice(-1).join(' '),
				month: data.expiration.split('/')[0],
				year: data.expiration.split('/')[1]
			};
			
			return IugiApi.create_payment_method({
				customer_id: user.services.iugu,
				description: "Credit Card",
				data: card,
			    item_type: 'credit_card'
			});
		} catch (error) {
			return extractJSON(error.toString())
		}
	}
});