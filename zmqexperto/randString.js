module.exports = {
	randString: function() { 
		var len = 10, charSet = '0123456789abcdef' , result = [];
		for(var i=0;i<len;++i){ 
			result.push(charSet[Math.floor(Math.random() * charSet.length)]);
		}
		result.splice(len / 2, 0, ['-']); return result.join('');
	}
}
