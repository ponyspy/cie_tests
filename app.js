var fs = require('fs');
process.stdin.resume();
process.stdin.setEncoding('utf8');

var tests = ['/reading', '/writing', '/speaking', '/listening', '/grammar'];
var dirs = [];
fs.mkdir(__dirname + '/result');
// var numb = process.argv[2] || 1;
console.log('Число:');
process.stdin.on('data', function(numb) {
	numb = numb - 0 || 1;

	for(var i = 0; i < numb; i++) {
		fs.mkdir(__dirname + '/result/test' + (i + 1));
		dirs.push('/test' + (i + 1));
	}

	process.nextTick(function() {
		dirs.forEach(function(dir) {
			tests.forEach(function(test) {
				fs.readdir(__dirname + test, function(err, files) {

					var min = 1,
							max = files.length - 1;

					var rand = min - 0.5 + Math.random() * (max - min + 1);
							rand = Math.round(rand);

					fs.createReadStream(__dirname + test + '/' + files[rand]).pipe(fs.createWriteStream(__dirname + '/result' + dir + '/' + files[rand]));

				});
			});
		});
	});
	console.log('Нажмите Ctrl + C для выхода');
});
					// process.nextTick(function() {
					// 	process.exit();
					// });
