/**
Show a small action menu when text is entered into a single HTML input (search) field. 

Released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/

(function($){
	$.fn.filterlist = function(settings) {
		function appendHelp() {
			helpElement = $("<li class='filterlist-help'>Available shortcuts</li>");
			if (settings && settings.actions && settings.actions.length > 0) {
				helpList = $("<ul></ul>");
				helpElement.append(helpList);
				$(settings.actions).each(function(id, opt) {
					if (opt.test != null) {
						helpList.append("<li>"+opt.test+": "+opt.title+"</li>")
					} else {
						helpList.append("<li>"+opt.title+"</li>")
					}
				});
				baseList.append(helpElement);
			}
		}
		
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
					if (settings.help) {
						appendHelp();
					}
					inputElement.after(baseList);
				}
			}
		}
		
		function addListener() {
			inputElement.keydown(function(e) {
				// Bind keyboard navigation...
				if (e.keyCode == 38) {
					e.preventDefault();
					filteredList = baseList.children().not('.filterlist-help');
					if (filteredList.siblings(".filterlist-active").length == 1) {
						if (filteredList.length == 1) {
							filteredList.last().removeClass('filterlist-active');
						} else {
							marked = $(filteredList.siblings(".filterlist-active").not('.filterlist-help')[0]);
							marked.prev().addClass('filterlist-active');
							marked.removeClass('filterlist-active');
						}
					} else {
						$(filteredList.last()).addClass('filterlist-active');
					}
				} else if (e.keyCode == 40) {
					e.preventDefault();
					filteredList = baseList.children().not('.filterlist-help');
					if (filteredList.siblings(".filterlist-active").length == 1) {
						if (filteredList.length == 1) {
							filteredList.first().removeClass('filterlist-active');
						} else {
							marked = $(filteredList.siblings(".filterlist-active").not('.filterlist-help')[0]);
							marked.next(':not(.filterlist-help)').addClass('filterlist-active');
							marked.removeClass('filterlist-active');
						}
					} else {
						$(filteredList.first()).addClass('filterlist-active');
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
			'help'	: true
		};
		var settings = $.extend(defaults, settings)
		
		var inputElement = $(this);
		var baseList = $("<ul id='filterlist'></ul>");
		
		init();
	};
})(jQuery);