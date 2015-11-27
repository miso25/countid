/*
 *  Project: Countid 1.0
 *  Description: jQuery Plugin to count up and count down numbers
 *  Author: miso25
 *  License: MIT
 */

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.

;(function ( $, window, document, undefined ) {

	
	window.cancelRequestAnimFrame = ( function() {
			return window.cancelAnimationFrame          ||
				window.webkitCancelRequestAnimationFrame    ||
				window.mozCancelRequestAnimationFrame       ||
				window.oCancelRequestAnimationFrame     ||
				window.msCancelRequestAnimationFrame        ||
				clearTimeout
		} )();

	
	window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame       || 
			window.webkitRequestAnimationFrame || 
				window.mozRequestAnimationFrame    || 
				window.oRequestAnimationFrame      || 
				window.msRequestAnimationFrame     || 
				function(/* function */ callback, /* DOMElement */ element){
					return window.setTimeout(callback, 1000 / 60);
				};
		})();
			
    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window is passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = 'countid',
        defaults = {
            propertyName: "value"
        };

    // The actual plugin constructor
    function countidPlugin( element, options ) {
        //this.element = element;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        
		this.elem = element;
		this.$elem = $(element);
		this.$elem_original = this.$elem
		this.options = options;
		
		
		// This next line takes advantage of HTML5 data attributes
		// to support customization of the plugin on a per-element
		// basis. For example,
		// <div class=item' data-plugin-options='{"message":"Goodbye World!"}'></div>
		//this.metadata = this.$elem.data( 'plugin-options' );
		this.metadata = this.$elem.data( );
		
		this._init();
		
    }

	
	//Plugin.prototype = 
	countidPlugin.prototype = 
	{
	
		defaults: { 
			
			start : 0,
			end : 0,
			speed : 10,
			tick : 10,
			
			format: false,
			complete : false
		},
		
		
		lang: {
			textSelectAll: function () { return "Select all"; }
		},
		
		_init: function() {
			// Introduce defaults that can be extended either 
			// globally or using an object literal. 
			this.config = $.extend({}, this.defaults, this.options, 
			this.metadata);
			//alert( JSON.stringify( this.lang.textSearching() ) )


			var self = this
			
			self.id = self._getRandomInt(999,99999)
			
			self.timer = {}
			self.isPaused = false
			//alert(typeof self.config.end)
			
			if( self.config.start === 0 && self.config.end === 0 )
			self.config.end = 1 * self.$elem.text()
			//alert( self.id )
			
			self.request = 0
			self.paused = false
			//var text = 1 * self.$elem.text()
			//alert( typeof self.$elem.waypointa )
			
			
			
			//self.steps = 1 * ( Math.abs( self.current - self.end ) /  self.config.tick  )  
			//self.dir = self.current > self.end ? -1 * self.config.tick : 1 * self.config.tick;
			self._setSteps( self.config.start, self.config.end )
			
			
			if( typeof self.$elem.waypoint === 'function' )
			self.$elem.waypoint( function(){ self._loop() }, { offset: '100%', triggerOnce: true });
			else
			self._loop()
			
			//self.$elem.appear();
			
			//$(document).on('appear',  self.$elem, function(e, $affected) {
			  //self.$elem.on('appear', function(e, $affected) {
				//$affected.each(function() {
				//	if($(this).hasClass('countid-appeared')) return;
					
				//	self.$elem.addClass('countid-appeared')
					
				//	self._countIt()
					
					
				//})
			//  });
			

			

			//alert(text)
			
		},
		
		
		_setSteps: function ( start, end )
		{
			var self = this
			//if( start === undefined ) start =  self.config.start
			//if( end === undefined ) end =  self.config.end
			
			self.start = 1 * start
			self.end = 1 * end
			self.current = self.start
			
			self.step = 1 * ( Math.abs( self.current - self.end ) /  self.config.tick  )  
			self.dir = self.current > self.end ? -1 : 1;
			self.tick = self.dir * self.config.tick;
		},
		
		_rep: function ()
		{
			var self = this
			
			 //console.log( Date.now() )
			// console.log( self.steps )
			 
			 //var start_s = start
			 
			if( self.step >= 0 )
					{
						var start_s = self.current
						//if( start_pom % 1 !== 0 )		// not integer - float
						if( typeof self.config.format === 'function')
						start_s = self.config.format( start_s )
						//start_pom =  start_pom.toString();
						//start_pom = addCommas(start_pom)
						//start_pom = start_pom.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
						//start_pom = start_pom.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						// 
						
						//self.config.speed = self.config.speed + 100
						
						
						
						self.$elem.text( start_s )
						
						self.current += self.tick
						self.step -= 1
						
					}
					else
					{
						// cancelAnimationFrame(globalID);
						cancelRequestAnimFrame(self.request);
						 
						 var end = self.end
						if( typeof self.config.format === 'function')
						end = self.config.format( end )
					
						//var end2 = end.toFixed(1)
						//end2 = addCommas(end2)
						//end2 = end2.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
						self.$elem.text( end )
						//}
						
						//clearInterval( self.timer )
						
						if( typeof self.config.complete === 'function')
						self.config.complete( self.$elem )
					}
		
				
		},
		
		
		_loop: function ( start, end )
		{
			var self = this
			
			
			
			var fps,fpsInterval,startTime,now,then,delta;
			fps = self.config.speed	// highest number = highest speed
			
			
			fpsInterval = 1000 / fps;
			//fpsInterval=1;
			then=Date.now();
			startTime=then;
				
			self.frames = 0

			
			
			//self.request = 0
			
				// usage:
				// instead of setInterval(render, 16) ....
			
			//var globalID;

			//function repeatThis() {
			  //$("<div />").appendTo("body");
			//  globalID = requestAnimationFrame(repeatThis);
			 
				
			//	}
	
			
			//return;
			
			  
			  //console.log( self.config.speed )
			//if( self.frames % self.config.speed  !== 0 )
			// return
			
			//self.config.speed = self.config.speed + 5
			//if(self.config.speed <= 0)
			//self.config.speed = 1
			//else
			//self.config.speed = 1
			
			
			   
				
			

			
			
			//$("#start").on("click", function() {
			//globalID = requestAnimationFrame(repeatThis);
			//});
			 

			
			//self.request = 0
		

			// to store the request
			//var request;

			// start and run the animloop
			


			function animloop(){
			  //render();
			  
				self.request = requestAnimFrame( animloop );
			 
				//console.log(self.request)
			  
				self.frames ++ 
			  
			  
				now = Date.now();
				delta = now - then;

				
				// if enough time has elapsed, draw the next frame
				if (delta > fpsInterval) {
				//if (elapsed > fpsInterval) {
				
				//if(fpsInterval > 50)
				//fpsInterval = fpsInterval + steps
				
					// Get ready for next frame by setting then=now, but also adjust for your
					// specified fpsInterval not being a multiple of RAF's interval (16.7ms)
					then = now - (delta % fpsInterval);

					//if(!self.paused)
					self._rep()
				}

				
					// Put your drawing code here
					//console.log( Date.now() )
				

				
				
			}
			//})();
			animloop()
			
			//})();

			// cancelRequestAnimFrame to stop the loop in 1 second
			//setTimeout(function(){
				//cancelRequestAnimFrame(request);                
			//}, 10000)

			
				
		},		
			
			
			
			
		/*	
		_countIt: function ()
		{
			var self = this
			
			
			var start = 1 * self.config.start
			var end = 1 * self.config.end
			
			var steps = 1 * ( Math.abs( start - end ) /  self.config.tick  )  
			var dir = start > end ? -1 * self.config.tick : 1 * self.config.tick
			
			
			var start_s = start
			//var bigger = start > end ? start : end
			//var lower = start > end ? end : start
			
			//var start1 = start
			//alert(steps)
			//var start1 = 80
			//var end1 = 40

			
	

			//return;
			
			// self.timer = setInterval( function(){
			
				if( steps >= 0 )
				{
					start_s = start
					//if( start_pom % 1 !== 0 )		// not integer - float
					if( typeof self.config.format === 'function')
					start_s = self.config.format( start_s )
					//start_pom =  start_pom.toString();
					//start_pom = addCommas(start_pom)
					//start_pom = start_pom.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
					//start_pom = start_pom.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
					// 
					
					self.config.speed = self.config.speed + 100
					
					//console.log( 1 )
					
					self.$elem.text( start_s )
					
					start += dir
					steps -= 1
				}
				else
				{
					//console.log( self.config.tick % 1 === 0 )
					//if( self.config.tick % 1 !== 0 )		// not integer - float
					//{
					//var end2 = end
					if( typeof self.config.format === 'function')
					end = self.config.format( end )
				
					//var end2 = end.toFixed(1)
					//end2 = addCommas(end2)
					//end2 = end2.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
					self.$elem.text( end )
					//}
					
					clearInterval( self.timer )
					
					if( typeof self.config.complete === 'function')
					self.config.complete( self.$elem )
				}
				//console.log( text )
			
			// }, self.config.speed )
			
		},
		*/
		
		
		
		/**
		 * Returns a random integer between min (inclusive) and max (inclusive)
		 * Using Math.round() will give you a non-uniform distribution!
		 */
		 _getRandomInt: function(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},	
	
		
		_eventCallback : function( event ) {
			var self = this
			
			if(typeof self.config[ event ] === 'function')
			{
				//google.maps.event.addListener( mapObj, event, function(e) {
				//alert(1)
				//obj[event](e,mapObj) 
				//var data = self.serialize()
				//self.config[ event ] (data)
				
				//});
			}
				
		},
		
		_initEvents : function(){
		},

		
		setCurrent : function( val ){
		
			var self = this
			
			val = 1*val
			
			//if(self.start > val || self.end > val)
			if( ( self.dir == 1 && ( self.start > val || self.end < val ) )
				|| 
				( self.dir == -1 && ( self.start < val || self.end > val ) )
				)
			{
			//console.log('incorrect value');
			return;
			}
			//alert( self.dir )
			
			self.current = val
			self.$elem.text( self.current )
			self._setSteps( self.current, self.config.end )
			
			cancelRequestAnimFrame(self.request);
			//self.start = 1 * self.config.start
			//self.end = 1 * self.config.end
			//self.current = self.start
			//self._setSteps(  )
			self._loop()
		
		},
		
		
		toggleDir : function(){
		
			var self = this
			cancelRequestAnimFrame( self.request );
			
			//alert(self.start)
			self._setSteps( self.end, self.start )
			self._loop( )
		},

		togglePause : function(){
		
			var self = this
			//cancelRequestAnimFrame(self.request);
			if(self.isPaused)
			self.unpause()
			else
			self.pause()
			
		},

		
		pause : function(){
		
			var self = this
			cancelRequestAnimFrame(self.request);
			self.isPaused = true
		},

		unpause : function(){
			var self = this
			//self._loopRefresh()
			self.isPaused = false
			cancelRequestAnimFrame( self.request );
			self._loop( )
		},
		
		refresh : function(){
			var self = this
			cancelRequestAnimFrame( self.request );
				
			//self.steps = 1 * ( Math.abs( self.start - self.end ) /  self.config.tick  )  
			//self.dir = self.start > self.end ? -1 * self.config.tick : 1 * self.config.tick
			//self.actual = self.start
			self._setSteps( self.config.start, self.config.end )
			//alert(self.start - self.end)
			//cancelRequestAnimFrame( self.request );
			//self.request = 0
			self._loop()
				
		}

		
		

		
	}
	
    // You don't need to change something below:
    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations and allowing any
    // public function (ie. a function whose name doesn't start
    // with an underscore) to be called via the jQuery plugin,
    // e.g. $(element).defaultPluginName('functionName', arg1, arg2)
    $.fn[pluginName] = function ( options ) {
        var args = arguments;

        // Is the first parameter an object (options), or was omitted,
        // instantiate a new instance of the plugin.
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {

                // Only allow the plugin to be instantiated once,
                // so we check that the element has no plugin instantiation yet
                if (!$.data(this, 'plugin_' + pluginName)) {
					
                    // if it has no instance, create a new one,
                    // pass options to our plugin constructor,
                    // and store the plugin instance
                    // in the elements jQuery data object.
                    $.data(this, 'plugin_' + pluginName, new countidPlugin( this, options ));
                }
            });

        // If the first parameter is a string and it doesn't start
        // with an underscore or "contains" the `init`-function,
        // treat this as a call to a public method.
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
			
            // Cache the method call
            // to make it possible
            // to return a value
            var returns;

            this.each(function () {
                var instance = $.data(this, 'plugin_' + pluginName);

                // Tests that there's already a plugin-instance
                // and checks that the requested public method exists
                if (instance instanceof countidPlugin && typeof instance[options] === 'function') {
					//alert( options )
                    // Call the method of our plugin instance,
                    // and pass it the supplied arguments.
                    returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }

                // Allow instances to be destroyed via the 'destroy' method
                if (options === 'destroy') {
                  $.data(this, 'plugin_' + pluginName, null);
                }
            });

            // If the earlier cached method
            // gives a value back return the value,
            // otherwise return this to preserve chainability.
            return returns !== undefined ? returns : this;
        }
    };

}(jQuery, window, document));


