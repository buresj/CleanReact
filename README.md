## Installation

    npm i cleanreact -g

## Usage

    npx create-react-app newapp

    cd newapp

    clean-react

    npm start

## Specification

The script removes all React logos (leaves React favicon) and .css files, references to them are removed from relevant files (App.js, index.js, manifest.json). Finally, App.js is trimmed down to produce empty homepage. README.md is left empty too.
