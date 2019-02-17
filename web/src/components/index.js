// This file automatically exports default components as named components if
// they follow a `./<Button>/<Button>.js` convention.
//
// usage:
// import { Button } from 'src/components'

const requires = require.context('./', true, /\.js$/);

const components = requires
  .keys()
  .map(path => {
    const cleanPath = path.replace('./', '').replace('.js', '');
    const [folderName, fileName] = cleanPath.split('/');
    return {
      path,
      folderName,
      fileName,
    };
  })
  .filter(({ folderName, fileName }) => folderName === fileName)
  .map(({ fileName, path }) => ({ componentName: fileName, path }));

module.exports = components.reduce((acc, { componentName, path }) => {
  const defaultComponent = requires(path).default;
  return { ...acc, [componentName]: defaultComponent };
}, {});
