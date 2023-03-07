const getStableDiffusionImageBySearchText = require('./stableDiffusionService')
const axios = require('axios')

jest.mock('axios')

async function readFileAsBinary(filename) {
    var reader = new FileReader();
    reader.onload = function(e) {
        // binary data
        console.log(e.target.result);
    };
    reader.onerror = function(e) {
        // error occurred
        console.log('Error : ' + e.type);
    };
    reader.readAsBinaryString(filename);
}

it('should return stable diffusion image', async() => {
    const mockResponse = await readFileAsBinary('./testBlob.js');
    console.log(mockResponse);
});