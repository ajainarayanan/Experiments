const express = require("express");
const path = require("path");
const finalhandler = require("finalhandler");
const request = require("request-promise");
const favicon = require("serve-favicon");
const photos = require("./photos");
if (process.env.NODE_ENV !== "production") {
  // Load environment files from local directory in dev mode.
  var env = require("node-env-file");
  env(__dirname + "/.env");
}

const staticPath = path.normalize(__dirname);
const app = express();
const PORT = process.env.PORT;

const GITHUB_API = "https://api.github.com";
const GITHUB_USER_API = `${GITHUB_API}/users/ajainarayanan`;
const GITHUB_PROJECT_API = `${GITHUB_API}/repos/ajainarayanan`;
const GITHUB_ACCESS_TOKEN_URL = `https://github.com/login/oauth/access_token`;

const GITHUB_AUTH_TOKENS = process.env.tokens
  ? process.env.tokens.split(" ")
  : console.log("No Github Auth Token supplied. Rate limit will be 60");
const GITHUB_CLIENT_ID = process.env.github_client_id;
const GITHUB_CLIENT_SECRET = process.env.github_client_secret;

const tokenIndex = 0;

const getAuthHeader = () => {
  if (!GITHUB_AUTH_TOKENS) {
    return {};
  }
  return {
    Authorization: `token ${GITHUB_AUTH_TOKENS[tokenIndex]}`
  };
};

const headers = () =>
  Object.assign(
    {
      "User-Agent": "ajainarayanan"
    },
    getAuthHeader()
  );

app.all("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});

app.use(favicon(path.join(__dirname, "favicon.ico")));

app.use("/dist", [
  express.static(`${staticPath}/dist`, {
    index: false
  }),
  (req, res) => {
    finalhandler(req, res)(false);
  }
]);

app.get("/api/journals", (req, res) => {
  const pageNum = req.params.page_num;
  request({
    url: `${GITHUB_USER_API}/gists`,
    qs: {
      page: pageNum,
      per_page: 20
    },
    headers: headers(),
    json: true,
    resolveWithFullResponse: true
  }).then(response => {
    const modResponse = Object.assign(response, {
      body: response.body.filter(resp => resp.files["BLOG.md"])
    });
    res.send(modResponse);
  });
});

app.get("/api/journals/:journalid", (req, res) => {
  request({
    url: `${GITHUB_API}/gists/${req.params.journalid}`,
    headers: headers(),
    json: true,
    resolveWithFullResponse: true
  }).then(
    response => {
      res.send(response);
    },
    err => {
      res.status(err.statusCode).send(err);
    }
  );
});

app.get("/api/journals/:journalid/comments", (req, res) => {
  request({
    url: `${GITHUB_API}/gists/${req.params.journalid}/comments`,
    headers: headers(),
    json: true,
    resolveWithFullResponse: true
  }).then(
    response => res.send(response),
    err => res.status(err.statusCode).send(err)
  );
});

app.get("/api/getghclientid", (req, res) => {
  res.send(GITHUB_CLIENT_ID);
});

app.get("/api/getghauthtoken", (req, res) => {
  let { code } = req.query;
  if (!code) {
    res.status(403).send("Access Forbidden to Github");
    return;
  }
  request({
    url: GITHUB_ACCESS_TOKEN_URL,
    type: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    json: {
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code
    }
  }).then(response => res.send(response), err => res.status(500).send(err));
});

app.get("/api/projects", (req, res) => {
  const pageNum = req.params.page_num;
  request({
    url: `${GITHUB_USER_API}/repos`,
    qs: {
      sort: "DESC",
      page: pageNum,
      per_page: 50
    },
    headers: headers(),
    json: true,
    resolveWithFullResponse: true
  }).then(response => {
    res.send(response);
  });
});

app.get("/api/projects/:projectid", (req, res) => {
  const projectid = req.params.projectid;
  request({
    url: `${GITHUB_PROJECT_API}/${projectid}`,
    headers: headers(),
    json: true,
    resolveWithFullResponse: true
  }).then(response => res.send(response));
});

app.get("/api/projects/:projectid/readme", (req, res) => {
  const projectid = req.params.projectid;
  request({
    url: `${GITHUB_PROJECT_API}/${projectid}/contents`,
    headers: headers(),
    json: true,
    resolveWithFullResponse: true
  })
    .then(response => {
      const READMEFILE = response.body.find(
        fileObj => fileObj.name.toLowerCase().indexOf("readme") !== -1
      );
      if (!READMEFILE) {
        return new Promise(resolve => {
          resolve(false);
        });
      }
      return request({
        url: READMEFILE.download_url,
        headers: headers(),
        json: true,
        resolveWithFullResponse: true
      });
    })
    .then(response => res.send(response));
});

app.get("/api/albums", (req, res) => {
  photos
    .getAlbums()
    .then(result => res.send(result))
    .catch(({ statusCode, err }) =>
      res.status(statusCode).send({ err, statusCode })
    );
});

app.get("/api/albums/:albumid", (req, res) => {
  let { albumid } = req.params;
  let { page_num } = req.query;
  photos
    .getAlbumDetails(albumid, page_num)
    .then(results => res.send(results))
    .catch(({ statusCode, err }) =>
      res.status(statusCode).send({ err, statusCode })
    );
});

app.get("/api/photos/:photoid", (req, res) => {
  let { photoid } = req.params;
  photos
    .getPhoto(photoid)
    .then(result => res.send(result))
    .catch(({ statusCode, err }) =>
      res.status(statusCode).send({ err, statusCode })
    );
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.listen(PORT);

console.log(`Listening on port ${PORT}`);
