const csv = require("fast-csv");
// const fetch = require("node-fetch");
const fs = require("fs");

function writeFileAsync(parameters) {
	let {path, data} = parameters;
	return new Promise(function (resolve, reject) {
		fs.writeFile(path, data, function (error) {
			if (error) reject(error);
			return resolve();
		});
	});
}

/**
 * Function to read a csv file and write its reversed content to another csv file
 *
 * @param file_path string
 * @param result_path string
 *
 * @return Promise
 */
const main = (file_path, result_path = 'reversed.csv') => {
	return new Promise((resolve, reject) => {
		console.time('Completed in');
		csv.fromPath(file_path)
				.transform(data => data.reverse())
				.on('data', response => {
					writeFileAsync({path: result_path, data: response})
							.then(() => resolve(console.timeEnd('Completed in')))
							.catch(error => reject(error));
				})
				.on('error', error => reject(error))
	});
};

// test-2
/*const checkAbuse = (website = '') => {
	return new Promise((resolve, reject) => {
		fetch(website)
				.then(response => {
					// response = response.json()
					console.log(response);
					resolve()
				})
				.catch(err => {
					console.error(err.message);
					reject();
				});
	});
};*/

main('file.csv').catch(error => new Error(error.message || error));
// checkAbuse('https://radiumrasheed.tech');
