const fs = require('fs');
require('dotenv').config();

const inputFilePath = "portal/portal/config.js";
const outputFilePath = "portal/portal/config.js";

const inputConfigFilePath = "portal/portal/config.json";
const outputConfigFilePath = "portal/portal/config.json";


// Define the placeholders and their replacements
const replacements = {
    '{{AUTH_ENDPOINT}}': process.env.AUTH_ENDPOINT,
    '{{TOKEN_ENDPOINT}}': process.env.TOKEN_ENDPOINT,
    '{{CLIENT_ID}}': process.env.CLIENT_ID,
    '{{SCOPE}}': process.env.SCOPE,
    '{{REDIRECT_URI}}': process.env.REDIRECT_URI,
    '{{INTERCEPTOR_URL_REGEX}}': process.env.INTERCEPTOR_URL_REGEX,
};

// Read the input file
fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the input file:', err);
        return;
    }

    // Replace the placeholders
    let result = data;
    for (const [placeholder, replacement] of Object.entries(replacements)) {
        result = result.replace(new RegExp(placeholder, 'g'), replacement);
    }

    // Write the result to the output file
    fs.writeFile(outputFilePath, result, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to the output file:', err);
            return;
        }
        console.log('File processed successfully!');
    });
});

let rawdata = fs.readFileSync(inputConfigFilePath, 'utf8');
let config = JSON.parse(rawdata);
console.log(config.Portalconfig.menu.tools.children.dataNarrator.backendURL, process.env.BACKEND_URL);
config.Portalconfig.menu.tools.children.dataNarrator.backendURL = process.env.BACKEND_URL;

fs.writeFileSync(outputConfigFilePath, JSON.stringify(config));


