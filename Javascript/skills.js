var o = {
	init: function(){
		this.diagram();	
	},
	random: function(l, u){
		return Math.floor((Math.random()*(u-l+1))+l); //generate some random numbers
	},
	diagram: function(){
		var r = Raphael('diagram', 600*0.75, 600*0.75), //size of diagram
			rad = 73*0.75;

		r.circle(300*0.75, 300*0.75, 85*0.75).attr({ stroke: 'none', fill: '#262673' }); //inner circle

		var title = r.text(300*0.75, 300*0.75, 'Skills').attr({ //inner circle text
			font: '20px Arial',
			fill: '#fff'
		}).toFront();

		r.customAttributes.arc = function(value, color, rad){
			var v = 3.6*0.75*value,
				alpha = v == 360 ? 359.99 : v,
				random = o.random(91*0.75, 240*0.75),
				a = (random-alpha) * Math.PI/180,
				b = random * Math.PI/180,
				sx = 300*0.75 + rad * Math.cos(b),
				sy = 300*0.75 - rad * Math.sin(b),
				x = 300*0.75 + rad * Math.cos(a),
				y = 300*0.75 - rad * Math.sin(a),
				path = [['M', sx, sy], ['A', rad, rad, 0, +(alpha > 180), 1, x, y]];
			return { path: path, stroke: color }
		}

		$('.get').find('.arc').each(function(i){
			var t = $(this), 
				color = t.find('.color').val(),
				value = t.find('.percent').val(),
				text = t.find('.text').text();

			rad += 30*0.75;	
			var z = r.path().attr({ arc: [value, color, rad], 'stroke-width': 26*0.75 });

			z.mouseover(function(){ //hover over action
                this.animate({ 'stroke-width': 50*0.75, opacity: .75 }, 1000*0.75, 'elastic');
			
                if(Raphael.type != 'VML') //solves IE problem
					this.toFront();
					
				//    title = r.text(300, 300, "").attr({ //inner circle text
				//	font: '20px Arial',
				//	fill: '#fff',
				//	text: text + '\n' + value + '%'
					
				//});
				
				title.animate({ opacity: 0 }, 10*0.75, '>', function(){
					this.attr({ text: text + '\n' + value + '%' }).animate({ opacity: 1 }, 10*0.75, '<');
				});
            }).mouseout(function(){
				this.animate({ 'stroke-width': 26*0.75, opacity: 1 }, 1000*0.75, 'elastic');
            });
		});
	}
}
$(function(){ o.init(); });