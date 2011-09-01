/**
Show a small action menu when text is entered into a single HTML input (search) field. 

Released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/


(function($){
	$.fn.filterlist = function(settings) {
		function evaluateActionList() {
			if (inputElement.val().length == 0) {
				baseList.remove();
			} else {
				baseList.empty();
				if (settings && settings.actions && settings.actions.length > 0) {
					$(settings.actions).each(function(id, opt) {
						if (opt.test != null) {
							if (inputElement.val().match(opt.test)) {
								baseList.append("<li>"+opt.title+"</li>")
							}
						} else {
							baseList.append("<li>"+opt.title+"</li>")
						}
					});
					inputElement.after(baseList);
				} else {
					baseList.html("");
				}	
			}
		}
		
		function addListener() {
			console.log("listener")
			inputElement.keydown(function(e) {
				// Bind keyboard navigation...	
				if (e.keyCode == 38 && baseList.children('li').length > 0) {
					if (baseList.children(".filterlist-active").length == 1) {
						if (baseList.children().length == 1) {
							$(baseList.children(":last-child")[0]).removeClass('filterlist-active');
						} else {
							marked = $(baseList.children(".filterlist-active")[0]);
							marked.prev().addClass('filterlist-active');
							marked.removeClass('filterlist-active');
						}
					} else {
						console.log("none selected");
						$(baseList.children(":last-child")[0]).addClass('filterlist-active');
					}
				} else if (e.keyCode == 40) {
					if (baseList.children(".filterlist-active").length == 1) {
						if (baseList.children().length == 1) {
							$(baseList.children(":first-child")[0]).removeClass('filterlist-active');
						} else {
							marked = $(baseList.children(".filterlist-active")[0]);
							marked.next().addClass('filterlist-active');
							marked.removeClass('filterlist-active');
						}
					} else {
						console.log("none selected");
						$(baseList.children(":first-child")[0]).addClass('filterlist-active');
					}
				} else {
					// Stop old timers on new keystroke...
					if (typeof(delayTimer) != "undefined") {
						clearTimeout(delayTimer);
					} 
					delayTimer = setTimeout( function() {
						evaluateActionList();
					}, settings.delay)
				}
			});
		}
		
		function init() {
			inputElement.attr('autocomplete', 'off');
			baseList.css('width', inputElement.width());
			addListener();
		}
		
		// TODO
		var defaults = {
			'delay' : 100,
		};
		var settings = $.extend(defaults, settings)
		
		var inputElement = $(this);
		var baseList = $("<ul id='filterlist'></ul>");
		
		init();
	};
})(jQuery);