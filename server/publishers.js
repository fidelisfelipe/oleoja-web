Meteor.publish('users', function(){
	return Meteor.users.find({});
});

Meteor.publish('drivers', function(){
	return Drivers.find({});
});

Meteor.publish('brands', function(){
	return Brands.find({});
});

Meteor.publish('requests', function(){
	return Requests.find({status: 'opened'});
});