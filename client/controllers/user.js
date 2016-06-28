Session.setDefault('editing', false);
Controller('User', {
  rendered: function() {
    $('.form').validate();
  },

  created: function() {
  	var self = this;
  	self.models = new ReactiveVar([]);
	self.autorun(function() {
		self.subscribe('users');
		self.subscribe('brands');
	})
  },

  helpers: {
    fuels: function() {
    	return [{name: 'Flex'}, {name: 'Gasolina'}, {name: 'Alcool'}, {name: 'Diesel'}, {name: 'GNV'}];
    },
	brands: function() {
		self.brands = Brands.find({})
		return self.brands;
	},
	models: function() {
		return Template.instance().models.get();
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
	  
    'click .save': function(e, tmpl){
		var name = tmpl.find('#name').value;
		var email = tmpl.find('#email').value;
		var latitude = tmpl.find('#latitude').value;
		var longitude = tmpl.find('#longitude').value;

		var user = {
			name: name,
			email: email,
			latitude: latitude,
			longitude: longitude
		};

		Meteor.call('saveUser', user, function(error){
			if(error) {
				return throwError(error.reason);
			}
		});

		$('#name').val("");
		$('#email').val("");
		$('#latitude').val("");
		$('#longitude').val("");
	},

	'click .remove': function(e, tmpl) {
		Meteor.call('removeUser', this._id, function(error){
			if (error) {
				return throwError(error.reason);
			}
		});
	}
  }
});