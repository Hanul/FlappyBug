FlappyBug('GameObject').Bug = CLASS({
	
	preset : () => {
		return SkyEngine.Sprite;
	},
	
	params : () => {
		
		return {
			speedX : 200,
			src : FlappyBug.R('bug.png'),
			spriteWidth : 40,
			fps : 10,
			collider : SkyEngine.Circle({
				x : 2,
				width : 30,
				height : 20
			})
		};
	},
	
	init : (inner, self) => {
		
		let jumpSound = SOUND({
			mp3 : FlappyBug.R('jump.mp3'),
			ogg : FlappyBug.R('jump.ogg')
		});

		let dieSound = SOUND({
			mp3 : FlappyBug.R('die.mp3'),
			ogg : FlappyBug.R('die.ogg')
		});
		
		let isDead;
		
		SkyEngine.Screen.followX({
			target : self,
			x : -200
		});
		
		self.onMeet(FlappyBug.GameObject.Ground, () => {
			
			isDead = true;

			dieSound.play();
			
			self.hide();
			
			self.fireEvent('die');
		});
		
		self.onMeet(FlappyBug.GameObject.Pipe, () => {
			
			isDead = true;

			dieSound.play();
			
			self.hide();
			
			self.fireEvent('die');
		});
		
		let revive = self.revive = () => {
			
			self.setY(0);
			self.setSpeedY(0);
			self.setAccelY(0);
			self.setAngle(0);
			self.setRotationSpeed(0);
			
			isDead = false;
			
			self.show();
		};
		
		let jump = self.jump = () => {

			if (isDead !== true) {

				self.setSpeedY(-500);
				self.setAccelY(1000);
				
				self.setAngle(315);
				
				self.rotateTo({
					toAngle : 90,
					speed : 100
				});

				jumpSound.play();
			}
		};
	}
});
