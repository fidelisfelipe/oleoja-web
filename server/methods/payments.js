Meteor.methods({
	listPayments: function(customer) {
		return IugiApi.customers();
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
		
		return IugiApi.create_payment_method({
			customer_id: user.services.iugu,
			description: "Credit Card",
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
	}
});