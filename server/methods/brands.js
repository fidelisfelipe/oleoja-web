Meteor.methods({
	saveBrand: function(brand) {
		check(brand, {
			'id': String,
			'name': String
		});

		if (brand.id) {
			Brands.update(brand.id, {
				$set: {
					'name': brand.name,
					'updatedAt': Date.now()
				}
			});
			var id = brand.id
		} else {
			var id = Brands.insert({
				'name': brand.name,
				'createdAt': Date.now()
			});
		}

		return id;
	},

	addModel: function(model) {
		check(model, {
			'brandId': String,
			'name': String
		});

		Brands.update(model.brandId, {
			$pushAll: {
				'models': [{'name': model.name}]
			}
		}, true);
	},

	removeBrand: function(id) {
		check(id, String);

		var brand = Brands.remove({
			_id: id
		});
	},

	getBrand: function(id) {
		return Brands.findOne({_id: id});
	}
});