var fs = require("fs");
var Ftp = require("jsftp");
var config = JSON.parse( fs.readFileSync("ftpConfig.json") );

var ftp = new Ftp({
	host: config.host,
	user: config.username,
	pass: config.password,
	port: config.port
});

fs.watch("FTP", function(event, filename){
	console.log("Event is " + event);

	if(filename){
		console.log("Filename is " + filename);
		if(filename == "SCRIPT"){
			var file = fs.readdir("FTP/" + filename, function(error, files){
				if(!error && files.length > 0){
					console.log("Transferring: " + files);
					var toUpload = "/usr/lpp/pub/web/APPS/ADS/TST/" + filename + "/" + files;

					console.log("Upload: " + toUpload);



					/* Storing a file in the FTP server, using streams
					var originalData = Fs.createReadStream());
					originalData.pause();

					ftp.getPutSocket("/remote_folder/sourceFileCopy.txt"), function(err, socket) {
					    if (err) return console.error(err);
					    originalData.pipe(socket); // Transfer from source to the remote file
					    originalData.resume();
					});
					*/


					fs.readFile("FTP/" + filename + "/" + files, "binary", function(error, data){
						var buffer = new Buffer(data, "binary");
						
						ftp.put( toUpload, buffer, function(err, res){
							console.log(res);
						});
						
					});
					//fs.unlinkSync("FTP/" + filename + "/" + files);
					console.log("Transfer Complete");
				}
			});
		}
	}else{
		console.log("No filename provided");
	}
});