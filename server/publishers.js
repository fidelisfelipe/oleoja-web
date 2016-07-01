Meteor.publish('users', function(){
	return Meteor.users.find({});
});

Meteor.publish('userPayments', function(customerId){
	var self = this;
	var customers = IugiApi.customers();
	var payments = [];
	
	_.each(customers, function(customer) {
		payments.push(customer);
    }, this);
	
    Payments.find().forEach(function(payment) {
    	Payments.remove({id: payment.id, custumer: customerId});
    });

    _.each(payments, function(payment) {
    	Payments.upsert(payment.id, payment);
    }, this);
	
    return Payments.find({});
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