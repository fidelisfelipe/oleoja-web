Session.setDefault('editing', false);

Controller('Model', {
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
		var brand = tmpl.find('#brand').value;
		var name = tmpl.find('#name').value;

		var model = {
			brandId: brand,
			name: name,
		};

		Meteor.call('addModel', model, function(error){
			if (error) {
				return throwError(error.reason);
			}
		});

		$('#name').val("");
		$('#brand').val("");
	},

	'click .remove': function(e, tmpl) {
		console.dir(this);
		Meteor.call('removeModel', this._id, function(error){
			if (error) {
				return throwError(error.reason);
			}
		});
	},

	'click .edit': function(e, tmpl) {
		var id = this._id;

		Meteor.call('getModel', id, function(error, result){
			if (error) {
				return throwError(error.reason);
			}

			$('#id').val(result._id);
			$('#name').val(result.name);
			$('#brand').val(result.brand);
		});

		Session.set('editing', true);
	}
  }
});