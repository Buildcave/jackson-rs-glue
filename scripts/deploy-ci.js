const fs = require('fs');
const archiver = require('archiver');
const rimraf = require('rimraf');

const cleanupOldDeployments = () => {
  const promise = new Promise((resolve, reject) => {
    rimraf('./dist/*.zip', (err) => {
      if (err) reject();
      resolve();
    });
  });
  return promise;
};

const createArtifactForDeployment = () => {
  const promise = new Promise((resolve, reject) => {
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });
    const output = fs.createWriteStream('./dist/release-candidate.zip');
    output.on('close', () => {
      resolve();
    });
    archive.on('error', (err) => {
      reject(new Error(err));
    });
    archive.pipe(output);

    archive.file('dist/index.js', { name: 'index.js' });
    archive.file('package.json');

    archive.directory('.ebextensions');
    archive.directory('node_modules');

    archive.finalize();
  });
  return promise;
};

const deployToEb = () => {
  const promise = new Promise((resolve) => {
    // TODO: automagically deploy to eb using aws cli
    resolve();
  });
  return promise;
};

cleanupOldDeployments()
  .then(createArtifactForDeployment)
  .then(deployToEb)
  .then(() => {
    console.log('Done dude');
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
