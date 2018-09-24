const csv = require("fast-csv");
// const fetch = require("node-fetch");
const fs = require("fs");

/**
 * Async function to write data to a file
 *
 * @param parameters
 * @return Promise
 */
function writeFileAsync(parameters) {
	let {path, data} = parameters;
	return new Promise(function (resolve, reject) {
		fs.writeFile(path, data, function (error) {
			if (error) reject(error);
			return resolve();
		});
	});
}

const main = () => {
	return new Promise((resolve, reject) => {
		csv.fromPath('file.csv')
				.transform(data => data.reverse())
				.on('data', response => {
					writeFileAsync({path: "result.csv", data: response})
							.then(() => resolve('DONE!'))
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

main();
// checkAbuse('https://radiumrasheed.tech');
