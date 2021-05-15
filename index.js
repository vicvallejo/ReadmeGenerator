
const inquirer = require('inquirer');
const fs = require('fs');

function init() {}

init();

//  function that returns a license badge based on which license is passed in by the user
// If there is no license, return an empty string

function renderLicenseBadge(answers) {
  let licencia = ''
  if(answers.license === 'MIT') {
    licencia = `![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)`
  } else if (answers.license === 'APACHE') {
    licencia = `![APACHE license](https://img.shields.io/badge/License-APACHE-blue.svg)`
  } else if (answers.license === 'GPL') {
    licencia = `![GPL license](https://img.shields.io/badge/License-GPL-blue.svg)`
  } else {
    licencia = ''
  }
  return licencia;

};


// Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(answers) {
let licenlink = ''
  if(answers.license === 'None') {
    licenlink = ''
  } else {
    licenlink = ' \n * [License](#license)\n'
  }
 return licenlink
  };

// Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(answers) {
  let licenSection = ''
  if(answers.license === 'None') {
    licenSection = ''
  } else {
    licenSection = '## License\nThis project is licensed under the ' + answers.license + ' license.\n'
  }
 return licenSection
};  

// Creates the structure of the Readme File by insering the data obtained at inquirer

const generateReadme = (answers) =>

  `
  # ${answers.project}

  ${renderLicenseBadge(answers)}

  ## Description

  ${answers.description}

  ## Table of Contents

  * [Instalation](#instalation)

  * [Usage](#usage)
  ${renderLicenseLink(answers)}
  * [Contributing](#contributing)

  * [Tests](#tests)

  * [Questions](#questions)

  ## Instalation

  To install necessary dependencies, run the following comand:

  ${answers.install}

  ## Usage

  ${answers.usage}

  ${renderLicenseSection(answers)}
  
  ## Contributing

  ${answers.contributing}

  ## Tests

  To run the tests, run the following comands:

  ${answers.tests}

  ## Questions

  if you hace any questions about the repo, open an issue or conctact me directly at ${answers.email}
  or you can find more of my work at https://github.com/${answers.github}/
`;

// Using inquirer we ask the user for data to generate the README file

inquirer
  .prompt([
    {
      type: 'input',
      name: 'github',
      message: 'What is your github username?',
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your email?',
    },
    {
      type: 'input',
      name: 'project',
      message: 'What is your project name?',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Write a short description of your project',
    },
    {
      type: 'list',
      message: 'Does your project needs a license ?',
      name: 'license',
      choices: ['MIT', 'APACHE', 'GPL', 'None'],
    },
    {
      type: 'input',
      name: 'install',
      message: 'What command you should run for installing depensencies?',
      default: 'npm i'
    },  
    {
      type: 'input',
      name: 'tests',
      message: 'What command you should run for tests?',
      default: 'npm test'
    },   
    {
      type: 'input',
      name: 'usage',
      message: 'What the user should know about your project?',
    },   
    {
      type: 'input',
      name: 'contributing',
      message: 'What the user should know about your contribution to the project?',
    },   
  ])

// Run the function to create the Readme File and catch the error
  .then
   ((answers) => {
     const htmlPageContent = generateReadme(answers);
    fs.writeFile('README_G.md', htmlPageContent, (err) =>
      err ? console.log(err) : console.log('Successfully created Readme!')
   );
  });
