const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const buildTemplates = () => {
  const promise = new Promise((resolve, reject) => {
    const context = path.join(__dirname, '../src/templates');
    const entry = fs.readdirSync(path.join(context, 'src'))
      .filter(filename => /\.js$/.test(filename))
      .map((filename) => {
        const entryLocation = {};
        entryLocation[filename.replace('.js', '')] = path.join(context, 'src', filename);
        return entryLocation;
      })
      .reduce((finalObject, entryLocation) => Object.assign(finalObject, entryLocation), {});

    webpack({
      context,
      entry,
      module: {
        rules: [
          {
            test: /\.js$/,
            use: [
              {
                loader: 'babel-loader',
              },
            ],
          },
        ],
      },
      output: {
        path: path.join(context, 'dist'),
        filename: '[name].template',
      },
      plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
          test: /\.template$/,
          comments: false,
          compress: true,
          mangle: true,
          sourcemap: false,
          compressor: {
            warnings: false,
          },
        }),
      ],
    }, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
  return promise;
};

buildTemplates()
    .then(() => {
      console.log('Finished Building Templates Successfully');
    })
    .catch();
