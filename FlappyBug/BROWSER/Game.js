FlappyBug.Game = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		TITLE('FlappyBug :: Game');
		
		let bgm = SOUND({
			mp3 : FlappyBug.R('bgm.mp3'),
			ogg : FlappyBug.R('bgm.ogg'),
			isLoop : true
		}).play();
		
		let passSound = SOUND({
			mp3 : FlappyBug.R('pass.mp3'),
			ogg : FlappyBug.R('pass.ogg')
		});
		
		let scoreStore = FlappyBug.STORE('score');
		let score = 0;
		
		let startPanel;
		
		let limit;
		let bug;
		let pipeZone;
		
		let rootNode = SkyEngine.Node({
			c : [
			SkyEngine.Background({
				speedX : 190,
				src : FlappyBug.R('sky.jpg'),
				isNotToRepeatY : true
			}),
			
			// 점프 한계
			limit = SkyEngine.Node({
				y : -500,
				speedX : 200,
				collider : SkyEngine.Rect({
					width : 256,
					height : 256
				})
			}),
			
			pipeZone = SkyEngine.Node(),
			
			FlappyBug.GameObject.Ground(),
			
			bug = FlappyBug.GameObject.Bug()
			],
			dom : startPanel = DIV({
				style : {
					width : 200,
					backgroundColor : '#73BE31',
					border : '5px solid #666',
					padding : 10
				},
				c : [P({
					c : 'BEST SCORE: ' + (scoreStore.get('best') === undefined ? 0 : scoreStore.get('best'))
				}), P({
					style : {
						fontSize : 12
					},
					c : 'TOUCH or SPACE KEY to START'
				})]
			})
		}).appendTo(SkyEngine.Screen);
		
		ANIMATE({
			node : startPanel,
			keyframes : {
				from : {
					transform : 'scaleY(0)'
				},
				to : {
					transform : 'scaleY(1)'
				}
			},
			duration : 0.2,
			timingFunction : 'ease-out'
		});
		
		let scorePanel = DIV({
			style : {
				position : 'fixed',
				left : 0,
				top : 0,
				textAlign : 'center',
				width : '100%',
				fontSize : 20,
				marginTop : 10
			},
			c : 0
		}).appendTo(BODY);
		
		let isStarted;
		
		bug.onMeet(limit, () => {
			bug.setY(bug.getY() + 10);
			bug.setSpeedY(0);
		});
		
		bug.on('die', () => {
			
			// save best score.
			if (scoreStore.get('best') === undefined || parseInt(scoreStore.get('best'), 10) < score) {
				scoreStore.save({
					name : 'best',
					value : score
				});
			}
			
			bgm.stop();
			
			pipeZone.empty();
			
			startPanel = DIV({
				style : {
					width : 200,
					margin : 'auto',
					backgroundColor : '#73BE31',
					border : '5px solid #666',
					padding : 10
				},
				c : [
				
				P({
					c : 'SCORE: ' + score
				}), P({
					c : 'BEST SCORE: ' + scoreStore.get('best')
				}),
				
				P({
					style : {
						marginTop : 10,
						fontSize : 12
					},
					c : 'TOUCH or SPACE KEY to RESTART'
				})]
			});
			
			rootNode.addDom(startPanel);

			ANIMATE({
				node : startPanel,
				keyframes : {
					from : {
						transform : 'scaleY(0)'
					},
					to : {
						transform : 'scaleY(1)'
					}
				},
				duration : 0.2,
				timingFunction : 'ease-out'
			});
			
			if (createPipeInterval !== undefined) {
				createPipeInterval.remove();
				createPipeInterval = undefined;
			}
			
			isStarted = false;
		});
		
		let createPipeInterval;
		let startGame = () => {
			
			score = 0;
			scorePanel.empty();
			scorePanel.append(score);
			
			// 최초 플레이 시에는 BGM 켜져 있음
			if (isStarted !== undefined) {
				bgm.play();
			}
			
			bug.revive();
			
			ANIMATE({
				node : startPanel,
				keyframes : {
					from : {
						transform : 'scaleY(1)'
					},
					to : {
						transform : 'scaleY(0)'
					}
				},
				duration : 0.2,
				timingFunction : 'ease-in'
			}, () => {
				startPanel.remove();
			});
			
			createPipeInterval = INTERVAL(2, RAR(() => {
				
				let pipe = FlappyBug.GameObject.Pipe({
					x : bug.getX() + 1000,
					y : RANDOM({
						min : -100,
						max : 100
					}),
					on : {
						offscreen : (e) => {
							if (pipe.getX() < bug.getX()) {
								pipe.remove();
							}
						}
					}
				}).appendTo(pipeZone);
				
				let pipePassZone = SkyEngine.Rect({
					x : bug.getX() + 1000 + 40,
					width : 40,
					height : 800,
					collider : SkyEngine.Rect({
						width : 40,
						height : 800
					}),
					on : {
						offscreen : (e) => {
							if (pipePassZone.getX() < bug.getX()) {
								pipePassZone.remove();
							}
						}
					}
				}).appendTo(pipeZone);
				
				pipePassZone.onMeet(bug, () => {
					
					score += 1;
					scorePanel.empty();
					scorePanel.append(score);
					
					passSound.play();
				});
			}));
			
			isStarted = true;
		};
		
		let keydownEvent = EVENT('keydown', (e) => {
			
			if (e.getKey() === ' ') {
				
				if (isStarted !== true) {
					startGame();
				}
				
				bug.jump();
				
				e.stop();
			}
		});
		
		let touchstartEvent = EVENT('touchstart', (e) => {
			
			if (isStarted !== true) {
				startGame();
			}
			
			bug.jump();
			
			e.stop();
		});
		
		inner.on('close', () => {
			
			bgm.stop();
			bgm = undefined;
			
			rootNode.remove();
			scorePanel.remove();
			
			keydownEvent.remove();
			touchstartEvent.remove();
			
			if (createPipeInterval !== undefined) {
				createPipeInterval.remove();
				createPipeInterval = undefined;
			}
		});
	}
});
