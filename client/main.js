Meteor.startup(function(){
	Payments = new Mongo.Collection('payments');
});