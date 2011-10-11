# FilterList
jQuery Plugin for search boxes to provide special actions. These actions are either shown when a regular expression matches, or always. 

You should specify the actions from most specific to least specific to get the most relevant actions on top.

## Requirements
* jQuery (http:/www.jquery.com)

# Sample Usage
	$('#search').filterlist({
		'actions':[{'test':null, 'title':'Search (default)', 'action':'TODO'},
					{'test':/^test/, 'title':'Checks for test at beginning', 'action':'TODO'}]
			});
			
# Options
	actions: [							// Actions to provide?
		{'test':[Regex or Null], 	
		'title':'Text to display',		// You use {0} to display the current search string.
		'help':'Help text',				// This setting is optional. If specified it is displayed instead of the test Regex. 
		'action':function(item, val)}	// Function to execute, the item parameter contains the list-item, 
										// the val parameter contains the input elements value
	], 
	delay: int, 						// Delay in milliseconds until the popup is shown.
	help: bool,							// Display help at the end of the box? default: true 
	strings: dict						// See "Localizable strings"
	markfrist: bool						// Automatically mark the first item in list?

## Localizable strings
List of localizable strings with default values...

	'default_text':'Always available: ', 
	'help':'Available shortcuts',
	'default_action':''

