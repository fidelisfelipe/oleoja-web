Meteor.startup(function() {
	IugiApi = new Iugu.API('6468ca8d08128832f3db5944c734d214');
	
	extractJSON = function(str) {
	    var firstOpen, firstClose, candidate;
	    firstOpen = str.indexOf('{', firstOpen + 1);
	    do {
	    	firstClose = str.lastIndexOf('}');
	        if (firstClose <= firstOpen) { 
	        	return null;
	        }
	        do {
	        	candidate = str.substring(firstOpen, firstClose + 1);
	            try {
	            	var res = JSON.parse(candidate);
	                return res;
	            } catch (e) {
	                console.log(e);
	            }
	            firstClose = str.substr(0, firstClose).lastIndexOf('}');
	        } while(firstClose > firstOpen);
	        firstOpen = str.indexOf('{', firstOpen + 1);
	    } while(firstOpen != -1);
	}
});