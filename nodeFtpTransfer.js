var fs = require("fs");

fs.watch("FTP", function(event, filename){
	console.log("Event is " + event);

	if(filename){
		console.log("Filename is " + filename);
		if(filename == "SCRIPT"){
			var file = fs.readdir("FTP/" + filename, function(error, files){
				if(!error && files.length > 0){
					console.log("Transferring: " + files);
					fs.unlinkSync("FTP/" + filename + "/" + files);
					console.log("Transfer Complete");
				}
				
			});
		}
	}else{
		console.log("No filename provided");
	}
});