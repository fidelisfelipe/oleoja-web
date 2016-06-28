Router.configure({
    layoutTemplate: 'mainLayout',
    notFoundTemplate: 'notFound'

});

Router.route('/users', function () {
    this.render('User');
});

Router.route('/drivers', function () {
    this.render('Driver');
});

Router.route('/brands', function () {
    this.render('Brand');
});

Router.route('/models', function () {
    this.render('Model');
});

Router.route('/', function () {
	this.render('Driver');
});