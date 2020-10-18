
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is your project title?",
        },
        {
            type: "input",
            name: "description",
            message: "whiat is your project Description?",
        },
        {
            type: "input",
            name: "installation",
            message: "What are your project installation instructions?",
        },
        {
            type: "input",
            name: "usage",
            message: "what is your project Usage information?",
        },
        {
            type: "input",
            name: "contribution",
            message: "what are your project contribution guidelines?",
        },
        {
            type: "input",
            name: "test",
            message: "what are your prject test instructions?",
        },
        {
            type: "list",
            message: "Please choose a license.",
            name: "license",
            choices: ['MIT License',
                'GNU Lesser General Public License v3.0',
                'Mozilla Public 2.0',
                'GNU Affero General Public License v3.0',
                'The Unlicense',
                'Apache License 2.0',
                'GNU General Public License v3.0']
        },
        {
            type: "input",
            name: "github",
            message: "what is your GitHub username?",
        },
        {
            type: "input",
            name: "email",
            message: "what is your email address?",
        },
    ])
}

function generateReadMe(answers) {
    return `
#${answers.title}

![License: ${answers.license}](https://img.shields.io/badge/License-${answers.license.replace(/ /g, "%20")}-green.svg)

## Table of Contents
[Description](#description)
[Installation](#installation)
[Usage](#usage)
[Contributing](#contributing)
[Tests](#tests)
[License](#license)
[Questions](#questions)

<a name="description></a>
## Description

${answers.description}

<a name="installation"></a>
##{installation}

${answers.installation}

<a name="usage"></a>
## Usage

${answers.usage}

<a name="contribution"></a>
## Contribution

${answers.contribution}

<a name="test"></a>
## Tests

${answers.test}

<a name="license"></a>
## License

${answers.license}

<a name="questions"></a>
## Questions

[Link to my GitHub profile](http://${answers.github}.github.io)<br/>

[Send me an email](${answers.email})
    `
}

// function to initialize program
async function init() {
    try{
        const answers = await promptUser();
        const readMe = generateReadMe(answers);
        await writeFileAsync("README.md", readMe);

        console.log("Successfully wrote to README.md");
    } catch(err){
        console.log(err)
    }
}

// function call to initialize program
init();


