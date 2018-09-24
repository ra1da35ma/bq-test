const csv = require("fast-csv");
// const fetch = require("node-fetch");
const fs = require("fs");

/*
* async function to write data to a file
*
* @param path string
* @param data any
*
* @return Promise<null>
* */
function writeFileAsync(path, data) {
	return new Promise(function (resolve, reject) {
		fs.writeFile(path, data, function (error) {
			if (error) reject(error);
			resolve();
		});
	});
}

const doTask = () => {
	return new Promise((resolve, reject) => {
		csv.fromPath('file.csv')
				.transform(data => data.reverse())
				.on('data', response => {
					writeFileAsync("result.csv", response)
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

doTask();
// checkAbuse('https://radiumrasheed.tech');
