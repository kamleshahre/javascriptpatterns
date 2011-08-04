var BallGame = function(config) {
	this.init(config);
}

BallGame.prototype.throwBall = function() {
	var moveXBy = this.mbWithBall.offsetLeft - this.greenBall.offsetLeft;
	var moveYBy = this.mbWithBall.offsetTop - this.greenBall.offsetTop;

	new Effect.Move(this.greenBall, {x: moveXBy, y: moveYBy, duration: 1});
}

BallGame.prototype.moveBeaverNBall = function(event) {
	var moveXBy = event.clientX - this.mbWithBall.offsetLeft;
	var moveYBy = event.clientY - this.mbWithBall.offsetTop;

	new Effect.Move(this.mbWithBall, {x: moveXBy, y: moveYBy, duration: 1});
	new Effect.Move(this.greenBall, {x: moveXBy, y: moveYBy, duration: 1});
}

BallGame.prototype.handleClick = function(event) {
	var eventElement = Event.element(event);

	if (eventElement.id === this.config.dancingId && this.mbWithBall.id !== this.config.dancingId) {
		this.mbWithBall = $(this.config.dancingId);
		this.throwBall();
		return;
	}

	if (eventElement.id === this.config.nonDancingId && this.mbWithBall.id !== this.config.nonDancingId) {
		this.mbWithBall = $(this.config.nonDancingId);
		this.throwBall();
		return;
	}

	this.moveBeaverNBall(event);
}

BallGame.prototype.init = function(config) {
	var self = this;

	this.config = config;
	this.mbWithBall = $(config.dancingId);
	this.greenBall = $(config.ballId);

	document.observe('click', function(event) {
		self.handleClick(event);
	});
}

document.observe('dom:loaded', function() {
	new BallGame({
		dancingId : 'dancingmoosenbeaver',
		nonDancingId : 'moosenbeaver',
		ballId : 'green-ball'
	});
});