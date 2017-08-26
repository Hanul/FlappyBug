FlappyBug('GameObject').Pipe = CLASS({
	
	preset : () => {
		return SkyEngine.Node;
	},
	
	init : (inner, self) => {
		
		self.append(SkyEngine.Image({
			src : FlappyBug.R('upipe.png'),
			y : -250,
			collider : SkyEngine.Rect({
				width : 40,
				height : 400
			})
		}));
		
		self.append(SkyEngine.Image({
			src : FlappyBug.R('dpipe.png'),
			y : 250,
			collider : SkyEngine.Rect({
				width : 40,
				height : 400
			})
		}));
	}
});
