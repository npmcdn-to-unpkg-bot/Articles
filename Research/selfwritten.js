var App = (function() {
	
	var counter = 0;

	return {
		addTen: function () {
			return counter += 10;
		},

		removeOne: function () {
			return counter -= 1;
		},

		resetCounter: function () {
			console.log('resetted counter from: ' + counter);
			counter = 0;
		}
	}
})();

App.addTen();
App.removeOne();
App.resetCounter();