### My Experiments

- Code to my blog
  - Pulls in gist from github for journals
  - Pulls in repos for my projects
  - Pulls in photos from my flickr account
- In the future probably a playground for my projects. Instead of creating individual surge.sh pages, would put it here.

In some alternative reality, if someone wants something similar to this and doesn't want to start from strach,
clone and provide environment variables for github access tokens and flickr api. You should
pretty much have everything up and running.

Runs on,
 - [React](github.com/facebook/react/)
 - [Express](https://github.com/expressjs/express)
 - [flickrapi](https://github.com/Pomax/node-flickrapi)
 - es5+
 - [glamor](https://github.com/threepointone/glamor/)
 - [marksy](https://github.com/cerebral/marksy)

Only hack I am not too proud of,
- Github for some reason doesn't provide stars for a gist.
- So get the webpage, parse it (with cheerio) and get the stars from there in the server and serve it up to client.
- I know. I am a horrible person.

