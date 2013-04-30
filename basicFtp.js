var fs = require("fs");
var Ftp = require("jsftp");
var config = JSON.parse( fs.readFileSync("ftpConfig.json") );

var ftp = new Ftp({
	host: config.host,
	user: config.username,
	pass: config.password
});


ftp.raw.cwd("/usr/lpp/pub/web/APPS/ADS/TST/SCRIPT", function(err, files){
    if (err){
    	return console.error(err);
    }else{
    	var dir;
    	ftp.raw.pwd(function(err, pwd){
    		console.log("\nPWD: " + pwd.text);
    		dir = pwd.text;
    	});

    	ftp.raw.type("I", function(err, type){
    		console.log("Type Mode: " + type.text);
    	});

    	ftp.raw.pasv(function(err, pasv){
    		console.log("Passive Mode: " + pasv.text);
    	});

    	
    	ftp.raw.site("SBD=(IBM-037,ISO8859-1)",function(err, type){
    		console.log("SITE SBD: " + type.text);
    	});

    	
    	ftp.ls("/",function(err, data){
    		if(err){
    			console.log(err);
    		}else{
    			var fileNames = data.map(function(file) {
              return file ? file.name : null;
          });
    		}
    	});
    }
});


/*
ftp.get("/usr/lpp/pub/web/APPS/ADS/TST/SCRIPT/adsCommon.js", function(err, data) {
	console.log(data.code);
    if (err){
    	return console.error(err);
    }else{
		fs.writeFile("file.js", data, function(err) {
		    if(err) {
		        console.log(err);
		    } else {
		        console.log("The file was saved!");
		    }
		}); 

    }
        
    ftp.raw.quit(function(err, res) {
        if (err)
            return console.error(err);

        console.log("FTP session finalized! See you soon!");
    });
});
*/