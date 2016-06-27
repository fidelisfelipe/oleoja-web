Session.setDefault('editing', false);

Controller('Brand', {
  rendered: function() {
    $('.form').validate();
  },

  created: function() {
  	var self = this;
	self.autorun(function(){
		self.subscribe('brands');
	})
  },

  helpers: {
    brands: function() {
		return Brands.find({});
	},
	editing: function() {
		return Session.get('editing');
	}
  },

  events: {
    'click .save': function(e, tmpl){
		var id = tmpl.find('#id').value;
		var name = tmpl.find('#name').value;

		var brand = {
			id: id,
			name: name,
		};

		Meteor.call('saveBrand', brand, function(error){
			if (error) {
				return throwError(error.reason);
			}
		});

		$('#id').val("");
		$('#name').val("");
	},

	'click .remove': function(e, tmpl) {
		Meteor.call('removeBrand', this._id, function(error){
			if (error) {
				return throwError(error.reason);
			}
		});
	},

	'click .edit': function(e, tmpl) {
		Meteor.call('getBrand', this._id, function(error, result){
			if (error) {
				return throwError(error.reason);
			}

			$('#id').val(result._id);
			$('#name').val(result.name);
		});

		Session.set('editing', true);
	}
  }
});