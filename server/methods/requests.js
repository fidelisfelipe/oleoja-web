Meteor.methods({
	makeRequest: function(request) {
		check(request, {
			'userId': String,
			'type': String,
			'latitude': String,
			'longitude': String
		});

		request.status = 'opened';
		request.createdAt = Date.now();

		var id = Requests.insert(request);
	},

	acceptRequest: function(request) {
		check(request, {
			'id': String,
			'driverId': String,
		});

		var request = Drivers.update(request.id, {
			$set: {
				'driverId': request.driverId,
				'acceptedAt': Date.now(),
				'status': 'accepted'
			}
		});
	}
});