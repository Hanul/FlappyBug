FlappyBug('GameObject').Ground = CLASS({
	
	preset : () => {
		return SkyEngine.Background;
	},
	
	params : () => {
		
		return {
			y : (480 + 256) / 2,
			src : FlappyBug.R('ground.png'),
			isNotToRepeatY : true,
			collider : SkyEngine.Rect({
				speedX : 200,
				width : 256,
				height : 256
			})
		};
	}
});
