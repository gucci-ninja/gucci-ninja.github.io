var o = {
	init: function(){
		this.diagram();	
	},
	random: function(l, u){
		return Math.floor((Math.random()*(u-l+1))+l); //generate some random numbers
	},
	diagram: function(){
		var r = Raphael('diagram', 600, 600), //size of diagram
			rad = 73;

		r.circle(300, 300, 85).attr({ stroke: 'none', fill: '#262673' }); //inner circle

		var title = r.text(300, 300, 'Skills').attr({ //inner circle text
			font: '20px Arial',
			fill: '#fff'
		}).toFront();

		r.customAttributes.arc = function(value, color, rad){
			var v = 3.6*value,
				alpha = v == 360 ? 359.99 : v,
				random = o.random(91, 240),
				a = (random-alpha) * Math.PI/180,
				b = random * Math.PI/180,
				sx = 300 + rad * Math.cos(b),
				sy = 300 - rad * Math.sin(b),
				x = 300 + rad * Math.cos(a),
				y = 300 - rad * Math.sin(a),
				path = [['M', sx, sy], ['A', rad, rad, 0, +(alpha > 180), 1, x, y]];
			return { path: path, stroke: color }
		}

		$('.get').find('.arc').each(function(i){
			var t = $(this), 
				color = t.find('.color').val(),
				value = t.find('.percent').val(),
				text = t.find('.text').text();

			rad += 30;	
			var z = r.path().attr({ arc: [value, color, rad], 'stroke-width': 26 });

			z.mouseover(function(){ //hover over action
                this.animate({ 'stroke-width': 50, opacity: .75 }, 1000, 'elastic');
			
                if(Raphael.type != 'VML') //solves IE problem
					this.toFront();
					
				//    title = r.text(300, 300, "").attr({ //inner circle text
				//	font: '20px Arial',
				//	fill: '#fff',
				//	text: text + '\n' + value + '%'
					
				//});
				
				title.animate({ opacity: 0 }, 10, '>', function(){
					this.attr({ text: text + '\n' + value + '%' }).animate({ opacity: 1 }, 10, '<');
				});
            }).mouseout(function(){
				this.animate({ 'stroke-width': 26, opacity: 1 }, 1000, 'elastic');
            });
		});
	}
}
$(function(){ o.init(); });