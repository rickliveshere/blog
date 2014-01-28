// Namespaces
// http://elegantcode.com/2011/01/26/basic-javascript-part-8-namespaces/
// By Jan Van Ryswyck
function namespace(namespaceString) {
    var parts = namespaceString.split('.'),
        parent = window,
        currentPart = '';    
        
    for(var i = 0, length = parts.length; i < length; i++) {
        currentPart = parts[i];
        parent[currentPart] = parent[currentPart] || {};
        parent = parent[currentPart];
    }
    
    return parent;
}

// Data
var data = namespace('RR.data');

data.session = {
	get: function(key)
    {
        var returnedData;
    
        if (window.sessionStorage)
        {
            var returnedData = window.sessionStorage.getItem(key);
            
            if (returnedData)
                returnedData = JSON.parse(returnedData);
        }
        
        return returnedData;
    },
	set: function(key, data)
    {
        if (window.sessionStorage)
            window.sessionStorage.setItem(key,JSON.stringify(data));
    }
}