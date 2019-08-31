#!/usr/bin/env node


const fs = require('fs');
var colors = require('colors/safe');

const filesToRemove = ['./src/App.css', './src/index.css', './src/logo.svg', './public/logo192.png', './public/logo512.png'];

const filesToEdit = [{ app: './src/App.js' }, { index: './src/index.js' }, { readme: './README.md' }, { manifest: './public/manifest.json' }];

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
}

const removeFiles = async (files) => {
    files.forEach(async (file) => {
        await fs.unlink(file, (err) => {
            try {
                if (err) throw err;
                console.log(colors.orange(`${file} removed`));
            } catch (err) {
                console.log(`Could not find or remove file at ${file}`)
            }
        });
    });
}

const editFiles = async (files) => {
    files.map(async (file) => {
        await fs.readFile(Object.values(file)[0], 'utf-8', (err, data) => {
            if (err) throw (err);
            const editedContent = data.replace(/[\s\S]+/g, newContent[Object.keys(file)[0]]);
            fs.writeFile(Object.values(file)[0], editedContent, 'utf-8', (err) => {
                if (err) throw (err);
            });
        });
        console.log(colors.blue(`${Object.keys(file)[0]} edited`));
    });
}

(async () => {
    await Promise.all([
        removeFiles(filesToRemove),
        editFiles(filesToEdit),
        new Promise((resolve) => setTimeout(() => resolve(), 500))
    ]);
    console.log(colors.green(`Cleaning finished`))
})();

