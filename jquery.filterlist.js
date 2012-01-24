/**
Show a small action menu when text is entered into a single HTML input (search) field. 

Released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/
(function ($){
    $.fn.filterlist = function(settings) {
        var defaults = {
            'delay' : 100,
            'help'    : true,
            'markfirst':true,
            'strings': {
                'default_text':'Always available: ',
                'help':'Available shortcuts',
                'default_action':''
            }
        };
        settings = $.extend(defaults, settings);
        
        var delayTimer = null;
        var inputElement = $(this);
        var baseList = $("<ul id='filterlist'></ul>");
        function format(string, value) {
            var regexp = new RegExp('\\{0\\}', 'gi');
            return string.replace(regexp, value);
        }
        function triggerAction(item, filterId) {
            if (settings.actions[filterId]) {
                return settings.actions[filterId].action(item, inputElement.val());
            }
            return true;
        }
        function appendHelp() {
            var helpElement = $("<li class='filterlist-help'>"+settings.strings.help+"</li>");
            if (settings && settings.actions && settings.actions.length > 0) {
                var helpList = $("<ul></ul>");
                helpElement.append(helpList);
                $(settings.actions).each(function(id, opt) {
                    if (opt.help) {
                        helpList.append("<li>"+opt.help+": "+opt.title+"</li>");
                    } else if (opt.test != null) {
                        helpList.append("<li>"+opt.test+": "+opt.title+"</li>");
                    } else {
                        helpList.append("<li>"+settings.strings.default_text+opt.title+"</li>");
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
                    var hits = 0;
                    $(settings.actions).each(function(id, opt) {
                        var op = $("<li class='filterlist-item' id='filter-action-"+id+"'>"+format(opt.title, inputElement.val())+"</li>");
                        op.hover(
                            function() {
                                $(this).addClass('filterlist-active');
                            },
                            function() {
                                $(this).removeClass('filterlist-active');
                            }
                        );
                        op.click(function(e) {
                            return triggerAction($(e.currentTarget), id);
                        });
                        if (opt.test != null) {
                            if (inputElement.val().trim().match(opt.test)) {
                                op.data('filterId', id);
                                baseList.append(op);
                                hits++;
                                if (hits == 1) {
                                    op.addClass('filterlist-default');
                                    op.html(op.html() + settings.strings.default_action);
                                }
                            }
                        } else {
                            op.data('filterId', id);
                            baseList.append(op);
                            hits++;
                            if (hits == 1) {
                                op.addClass('filterlist-default');
                                op.html(op.html() + settings.strings.default_action);
                            }
                        }
                    });
                    if (settings.help) {
                        appendHelp();
                    }
                    inputElement.after(baseList);
                }
            }
            // mark first
            if (settings.markfirst) {
                var marked = baseList.children(".filterlist-active");
                if (marked.length == 0) {
                    var filteredList = baseList.children().not('.filterlist-help');
                    if (filteredList.length > 0) {
                        $(filteredList.first()).addClass('filterlist-active');
                    }
                }
            }
        }
        function addListener() {
            inputElement.keydown(function(e) {
                // Bind keyboard navigation...
                var filteredList = [], marked = null;
                if (e.keyCode == 38) {
                    e.preventDefault();
                    filteredList = baseList.children().not('.filterlist-help');
                    if (filteredList.filter(".filterlist-active").length == 1) {
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
                    return false;
                } else if (e.keyCode == 40) {
                    e.preventDefault();
                    filteredList = baseList.children().not('.filterlist-help');
                    if (filteredList.filter(".filterlist-active").length == 1) {
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
                    return false;
                } else if (e.keyCode == 13) {
                    e.preventDefault();
                    marked = baseList.children(".filterlist-active");
                    var filterId = null;
                    if (marked.length > 0) {
                        // Execute selected action
                        filterId = $(marked[0]).data('filterId');
                    } else {
                        // Execute the first in list.
                        filterId = baseList.children().filter(':first').data('filterId');
                    }
                    triggerAction(baseList.children().filter(':first'), filterId); // return...?
                    return false;
                } else {
                    // Stop old timers on new keystroke...
                    if (delayTimer) {
                        clearTimeout(delayTimer);
                    }
                    delayTimer = setTimeout(function() {
                        evaluateActionList();
                    }, settings.delay);
                    return true;
                }
            });
            // Also handle pasting...
            inputElement.bind('paste change', function(e) {
            	if (delayTimer) {
                    clearTimeout(delayTimer);
                }
                delayTimer = setTimeout(function() {
                    evaluateActionList();
                }, settings.delay);
                return true;
            });
        }
        function init() {
            // if (window.console) { console.log("jquery.filterlist.js -> initializing"); }
            inputElement.attr('autocomplete', 'off');
            baseList.css('width', inputElement.width());
            addListener();
        }
        init();
    };
}(jQuery));
