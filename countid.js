/*
 *  Project: Countid 1.0
 *  Description: jQuery Plugin to count up and count down numbers
 *  Author: miso25
 *  License: MIT
 */

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.

;(function ( $, window, document, undefined ) {

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

			if( self.config.start === 0 && self.config.end === 0 )
			self.config.end = 1 * self.$elem.text()
			//alert( self.id )
			
			//var text = 1 * self.$elem.text()
			//alert( typeof self.$elem.waypointa )
			
			if( typeof self.$elem.waypoint === 'function' )
			self.$elem.waypoint( function(){ self._countIt() }, { offset: '100%', triggerOnce: true });
			else
			self._countIt()
			
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
			
			
		_countIt: function ()
		{
			var self = this
			
			
			var start = self.config.start
			var end = self.config.end
			
			var steps = ( Math.abs( start - end ) /  self.config.tick  )  
			var dir = start > end ? -1 * self.config.tick : self.config.tick
			
			
			var start_s = start
			//var bigger = start > end ? start : end
			//var lower = start > end ? end : start
			
			//var start1 = start
			//alert(steps)
			//var start1 = 80
			//var end1 = 40

			
			var timer = setInterval( function(){
			
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
					
					//console.log( typeof start_pom )
					
					self.$elem.text( start_s )
					
					start += dir
					steps -= 1
				}
				else
				{
					//console.log( self.config.tick % 1 === 0 )
					//if( self.config.tick % 1 !== 0 )		// not integer - float
					{
						//var end2 = end
						if( typeof self.config.format === 'function')
						end = self.config.format( end )
					
						//var end2 = end.toFixed(1)
						//end2 = addCommas(end2)
						//end2 = end2.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
						self.$elem.text( end )
					}
					
					clearInterval( timer )
					
					if( typeof self.config.complete === 'function')
					self.config.complete( self.$elem )
				}
				//console.log( text )
			
			}, self.config.speed )
			
		},
		
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


