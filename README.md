# FilterList
jQuery Plugin for search boxes to provide special actions. These actions are either shown when a regular expression matches, or always. 

# Sample Usage
$('#search').filterlist({
		'actions':[{'test':null, 'title':'Search (default)', 'action':'TODO'},
					{'test':/^test/, 'title':'Checks for test at beginning', 'action':'TODO'}]
			});