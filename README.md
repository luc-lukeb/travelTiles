travelTiles
===========

Try it!
-------------
http://traveltiles.herokuapp.com/

1). Click on image to go full-screen.
2). Click on >Travel! button in the top-right corner to find a hotels nearby
3). Click on a hotel image to get the details

Installation
-------------

1). Get node.js
https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager
or http://nodejs.org/download/

2). Fetch dependencies (npm install)

3). Create apiKeys.js file:
module.exports = {
Expedia : "",
Flickr : "",
}

4). Run it! 
node travelTilesServer.js
open in browser localhost:8080