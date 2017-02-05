// This is where we make circles

var o = {
    init: function(){
        this.diagram();
    },
    random: function(l, u) {
        return Math.floor((Math.random()*(u-l+1))+1);
    },
    diagram: function(){
        var r = Raphael('diagram', 600, 600),
            rad = 73;

        r.circle(300, 300, 85).attr({ stroke: 'none', fill: '#193340' });

        var title = r.text(300, 300, 'Skills').attr({
            font: '20px Arial',
            fill: '#fff'
        }).toFront();

        r.customAttributes.arc = function(value, color, rad) {
            var v = 3.6*value,
                alpha = v == 360 ? 359.99 : v,
                random = o.random(91, 240),
                a = (random-alpha) * Math.Pi/180,
                b = random * Math.PI/180,
                sx = 300 + rad * Math.cos(b),
                sy = 300 - rad * Math.sin(b),
                x = 300 + rad * Math.cos(a),
                y = 300 - rad * Math.sin(a),
                path =  [['M', sx, sy], ['A', rad, rad, 0, +(alpha > 180), 1, x, y]];
            return { path: path, stroke: color }
        }

        $('.get').find('.arc').each(function(i){
			var t = $(this), 
				color = t.find('.color').val(),
				value = t.find('.percent').val(),
				text = t.find('.text').text();

			rad += 30;	
			var z = r.path().attr({ arc: [value, color, rad], 'stroke-width': 26 });

            z.mouseover(function(){
                this.animate({ 'stroke-width': 50, opacity: .75 }, 1000, 'elastic');
                if(Raphael.typle != 'VML') // solves IE problem
            this.toFront();
        title
            })

    }
}