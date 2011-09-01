# FilterList
jQuery Plugin for search boxes to provide special actions. These actions are either shown when a regular expression matches, or always. 

**If only one action is specified this is the default action**

## Requirements
* jQuery (http:/www.jquery.com)

# Sample Usage
	$('#search').filterlist({
		'actions':[{'test':null, 'title':'Search (default)', 'action':'TODO'},
					{'test':/^test/, 'title':'Checks for test at beginning', 'action':'TODO'}]
			});
			
# Options
	actions: [						// Actions to provide?
		{'test':[Regex or Null], 
		'title':'Text to display', 
		'action':'NYI'}
	], 
	delay: int, 					// Delay in milliseconds until the popup is shown.
	help: bool,						// Display help at the end of the box? default: true 
	showdefault: bool,				// Display the default action? default: true (NYI)
	rank: bool,						// Display the best filter match on top? default: true (NYI)