Session.setDefault('editing', false);

Controller('User', {
  rendered: function() {
    $('.form').validate();
  },

  created: function() {
  	var self = this;
  	self.user = new ReactiveVar({});
  	self.payments = new ReactiveVar({});
  	self.models = new ReactiveVar([]);
	self.autorun(function() {
		self.subscribe('users');
		self.subscribe('brands');
	})
  },

  helpers: {
  	users: function() {
		return Meteor.users.find({});
	},
    fuels: function() {
    	return [{name: 'Flex'}, {name: 'Gasolina'}, {name: 'Alcool'}, {name: 'Diesel'}, {name: 'GNV'}];
    },
	brands: function() {
		return Brands.find({});
	},
	models: function() {
		return Template.instance().models.get();
	},
  	user: function() {
		return Template.instance().user.get();
	},
	payments: function() {
		return Template.instence().payments.get();
	},
	editing: function() {
		return Session.get('editing');
	}
  },

  events: {
    'change .brand': function(e, tmpl) {
    	var brands = self.brands.fetch();
    	for (var i in brands) {
    		if (brands[i].name == tmpl.find('#brand').value) {
    			tmpl.models.set(brands[i].models)
    		}
    	}
	},

    'click .save': function(e, tmpl) {
		var name = tmpl.find('#name').value;
		var email = tmpl.find('#email').value;
		var phone = tmpl.find('#phone').value;
		var password = tmpl.find('#password').value;

		var brand = tmpl.find('#brand').value;
		var model = tmpl.find('#model').value;
		var year = tmpl.find('#year').value;
		var fuel = tmpl.find('#fuel').value;

		var data = {
			'user': {
				'name': name,
				'email': email,
				'phone': phone,
				'password': password
			},
			'vehicle': {
				'brand': brand,
				'model': model,
				'year': year,
				'fuel': fuel
			}
		};

		Meteor.call('saveUser', data, function(error){
			if(error) {
				return throwError(error.reason);
			}
		});

		$('#name').val("");
		$('#email').val("");
		$('#phone').val("");
		$('#password').val("");

		$('#brand').val("");
		$('#model').val("");
		$('#year').val("");
		$('#fuel').val("");
	},

	'click .payment': function(e, tmpl) {
		var name = tmpl.find('#card_name').value;
		var credit_card = tmpl.find('#credit_card').value;
		var expiration = tmpl.find('#expiration').value;
		var cvv = tmpl.find('#cvv').value;
		var user = tmpl.user.get();
		
		var data = {
			'name': name,
			'number': credit_card,
			'expiration': expiration,
			'cvv': cvv,
			'user': user._id
		};

		Meteor.call('savePayment', data, function(error) {
			if(error) {
				return throwError(error.reason);
			}
		});
	},

	'click .remove': function(e, tmpl) {
		Meteor.call('removeUser', this._id, function(error){
			if (error) {
				return throwError(error.reason);
			}
		});
	},

	'click .changed': function(e, tmpl) {
		var user = Meteor.users.findOne({_id: this._id});
		
		Meteor.subscribe('userPayments', user.services.iugu)
		
		var payments = Payments.find({}).fetch();
		
		tmpl.user.set(user);
		tmpl.payments.set(payments);
		
		console.log('payments')
		console.log(payments)
	}
  }
});