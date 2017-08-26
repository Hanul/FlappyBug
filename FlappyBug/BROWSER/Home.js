FlappyBug.Home = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		TITLE('FlappyBug :: Home');
		
		let dom;
		let rootNode = SkyEngine.Node({
			dom : dom = DIV({
				style : {
					backgroundColor : '#73BE31',
					padding : 20,
					textAlign : 'center'
				},
				c : [
				
				// title
				H1({
					c : [IMG({
						src : FlappyBug.R('logo.png')
					}), BR(), 'Made with ', A({
						href : 'https://github.com/Hanul/SkyEngine',
						target : '_blank',
						style : {
							textDecoration : 'underline'
						},
						c : 'SkyEngine'
					})]
				}),
				
				// start button
				A({
					style : {
						display : 'block',
						marginTop : 10,
						padding : 10,
						backgroundColor : '#fff',
						color : '#666',
						borderRadius : 10,
						fontWeight : 'bold'
					},
					c : 'START GAME',
					on : {
						tap : () => {
							FlappyBug.GO('Game');
						}
					}
				}),
				
				// get source code button.
				DIV({
					style : {
						marginTop : 10,
						fontSize : 12
					},
					c : [A({
						href : 'https://github.com/Hanul/SkyEngine-Sample-FlappyBug',
						target : '_blank',
						style : {
							textDecoration : 'underline'
						},
						c : 'SOURCE CODE'
					}), ' · ', A({
						href : 'http://uppercase.io',
						target : '_blank',
						style : {
							textDecoration : 'underline'
						},
						c : 'UPPERCASE'
					})]
				})]
			})
		}).appendTo(SkyEngine.Screen);
		
		ANIMATE({
			node : dom,
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
		
		inner.on('close', () => {
			
			ANIMATE({
				node : dom,
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
				rootNode.remove();
			});
		});
	}
});
