const ghpages = require('gh-pages');
const path = require('path');

ghpages.publish(
  path.join(process.cwd(), 'build'),
  {
    add: true,
    silent: true,
    maxBuffer: 50 * 1024 * 1024, // Increase buffer size to 50MB
    message: 'Auto-deploy update [ci skip]'
  },
  (err) => {
    if (err) {
      console.error('Deployment error:', err);
      process.exit(1);
    } else {
      console.log('Deployed successfully!');
    }
  }
);