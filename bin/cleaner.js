#!/usr/bin/env node

const fs = require('fs').promises;
const colors = require('colors/safe');

const filesToRemove = ['./src/App.css', './src/index.css', './src/logo.svg', './public/logo192.png', './public/logo512.png'];
const filesToEdit = [{ name: 'app', path: './src/App.js' }, { name: 'index', path: './src/index.js' }, { name: 'readme', path: './README.md' }, { name: 'manifest', path: './public/manifest.json' }];
const newContent = {
    app:
        `import React from 'react';

        function App() {
          return (
            <div>
            </div>
          );
        }
        
    export default App;`,
    index:
        `import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';
    import * as serviceWorker from './serviceWorker';
    
    ReactDOM.render(<App />, document.getElementById('root'));
    
    serviceWorker.unregister();`,
    manifest:
        `
    {
        "short_name": "React App",
        "name": "Create React App Sample",
        "icons": [
          {
            "src": "favicon.ico",
            "sizes": "64x64 32x32 24x24 16x16",
            "type": "image/x-icon"
          }  
        ],
        "start_url": ".",
        "display": "standalone",
        "theme_color": "#000000",
        "background_color": "#ffffff"
      }`,
    readme:
        ``
};

const removeFiles = async (files) => {
    return await Promise.all(
        files.map(async (file) => {
            try {
                await fs.unlink(file)
                console.log(`File at ${file} removed.`)
            } catch (err) {
                console.log(`File at ${file} not found or removed.`)
                throw err
            }
        })
    )
};

const editFiles = async (files) => {
    return await Promise.all(files.map(async ({ name, path }) => {

        let data;

        try {
            data = await fs.readFile(path, 'utf-8');
        } catch (err) {
            console.log(`Could not find or read file at ${path}`)
            throw err
        }

        const editedContent = data.replace(/[\s\S]+/g, newContent[name]);

        try {
            await fs.writeFile(path, editedContent, 'utf-8');
            console.log(`${name} edited`);
        } catch (err) {
            console.log(`Could not edit file at ${path}`)
            throw err
        }
    }));
}

(async () => {
    await Promise.all(
        await removeFiles(filesToRemove)
            .then(() => console.log(colors.blue('Done removing')))
            .catch(() => console.log(colors.red('Removal was not fully succesful'))),
        await editFiles(filesToEdit)
            .then(() => console.log(colors.blue('Done editing')))
            .catch(() => console.log(colors.red('Editing was not fully succesful')))
    ).then(() => console.log(colors.green('Clean React was susccesfull')))
        .catch((err) => console.log(colors.red(err)))
})();



