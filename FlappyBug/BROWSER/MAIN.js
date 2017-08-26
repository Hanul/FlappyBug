FlappyBug.MAIN = METHOD({

	run : () => {
		
		FlappyBug.MATCH_VIEW({
			uri : '',
			target : FlappyBug.Home
		});
		
		FlappyBug.MATCH_VIEW({
			uri : 'Game',
			target : FlappyBug.Game
		});
	}
});
