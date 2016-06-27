Session.setDefault('editing', false);

Controller('Driver', {
  rendered: function() {
    $('.form').validate();
  },

  created: function() {
  	var self = this;
	self.autorun(function(){
		self.subscribe('drivers');
	})
  },

  helpers: {
    drivers: function() {
		return Drivers.find({});
	},
	editing: function() {
		return Session.get('editing');
	}
  },

  events: {
    'click .save': function(e, tmpl){
		var name = tmpl.find('#name').value;
		var email = tmpl.find('#email').value;
		var latitude = tmpl.find('#latitude').value;
		var longitude = tmpl.find('#longitude').value;

		var driver = {
			name: name,
			email: email,
			latitude: latitude,
			longitude: longitude
		};

		Meteor.call('saveDriver', driver, function(error){
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
		Meteor.call('removeDriver', this._id, function(error){
			if (error) {
				return throwError(error.reason);
			}
		});
	}
  }
});