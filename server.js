const express = require("express");
const path = require("path");
const finalhandler = require("finalhandler");
const request = require("request-promise");
const favicon = require("serve-favicon");
const photos = require("./photos");
const compression = require("compression");
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
app.use(compression());
app.use(favicon(path.join(__dirname, "favicon.ico")));

app.use("/dist", [
  express.static(`${staticPath}/dist`, {
    index: false,
    maxAge: "1y"
  }),
  (req, res) => {
    finalhandler(req, res)(false);
  }
]);

app.get("/api/journals", async (req, res) => {
  const pageNum = req.params.page_num;
  let response = await request({
    url: `${GITHUB_USER_API}/gists`,
    qs: {
      page: pageNum,
      per_page: 20
    },
    headers: headers(),
    json: true,
    resolveWithFullResponse: true
  });
  const modResponse = Object.assign(response, {
    body: response.body.filter(resp => resp.files["BLOG.md"])
  });
  res.send(modResponse);
});

app.get("/api/journals/:journalid", async (req, res) => {
  try {
    let response = await request({
      url: `${GITHUB_API}/gists/${req.params.journalid}`,
      headers: headers(),
      json: true,
      resolveWithFullResponse: true
    });
    res.send(response);
  } catch (err) {
    res.status(err.statusCode).send({ err: err, statusCode: err.statusCode });
  }
});

app.get("/api/journals/:journalid/comments", async (req, res) => {
  try {
    let response = await request({
      url: `${GITHUB_API}/gists/${req.params.journalid}/comments`,
      headers: headers(),
      json: true,
      resolveWithFullResponse: true
    });
    res.send(response);
  } catch (err) {
    res.status(err.statusCode).send({ err, statusCode: err.statusCode });
  }
});

app.get("/api/getghclientid", (req, res) => {
  res.send(GITHUB_CLIENT_ID);
});

app.get("/api/getghauthtoken", async (req, res) => {
  let { code } = req.query;
  if (!code) {
    res
      .status(403)
      .send({ err: "Access Forbidden to Github", statusCode: 403 });
    return;
  }
  try {
    let response = await request({
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
    });
    res.send(response);
  } catch (err) {
    res.status(500).send({ err, statusCode: 500 });
  }
});

app.get("/api/projects", async (req, res) => {
  const pageNum = req.params.page_num;
  try {
    let response = await request({
      url: `${GITHUB_USER_API}/repos`,
      qs: {
        sort: "DESC",
        page: pageNum,
        per_page: 50
      },
      headers: headers(),
      json: true,
      resolveWithFullResponse: true
    });
    res.send(response);
  } catch (err) {
    res.status(err.statusCode).send({ err, statusCode: err.statusCode });
  }
});

app.get("/api/projects/:projectid", async (req, res) => {
  const projectid = req.params.projectid;
  try {
    let response = await request({
      url: `${GITHUB_PROJECT_API}/${projectid}`,
      headers: headers(),
      json: true,
      resolveWithFullResponse: true
    });
    res.send(response);
  } catch (err) {
    res.status(err.statusCode).send({ err, statusCode: err.statusCode });
  }
});

app.get("/api/projects/:projectid/readme", async (req, res) => {
  const projectid = req.params.projectid;
  try {
    let response = await request({
      url: `${GITHUB_PROJECT_API}/${projectid}/contents`,
      headers: headers(),
      json: true,
      resolveWithFullResponse: true
    });
    const READMEFILE = response.body.find(
      fileObj => fileObj.name.toLowerCase().indexOf("readme") !== -1
    );
    if (READMEFILE) {
      const readmeResponse = await request({
        url: READMEFILE.download_url,
        headers: headers(),
        json: true,
        resolveWithFullResponse: true
      });
      res.send(readmeResponse);
    } else {
      res.send({ statusCode: 200, message: "No Read me found" });
    }
  } catch (err) {
    res.status(err.statusCode).send({ err, statusCode: err.statusCode });
  }
});

app.get("/api/albums", async (req, res) => {
  try {
    let albums = await photos.getAlbums();
    res.send({ statusCode: 200, body: albums });
  } catch ({ statusCode, err }) {
    res.status(statusCode).send({ err, statusCode });
  }
});

app.get("/api/albums/:albumid", async (req, res) => {
  let { albumid } = req.params;
  let { page_num } = req.query;
  try {
    let albumDetails = await photos.getAlbumDetails(albumid, page_num);
    res.send({ statusCode: 200, body: albumDetails });
  } catch ({ statusCode, err }) {
    res.status(statusCode).send({ err, statusCode });
  }
});

app.get("/api/photos/:photoid", async (req, res) => {
  let { photoid } = req.params;
  try {
    let photoDetails = await photos.getPhoto(photoid);
    res.send({ statusCode: 200, body: photoDetails });
  } catch ({ statusCode, err }) {
    res.status(statusCode).send({ err, statusCode });
  }
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.listen(PORT || 8000);

console.log(`Listening on port ${PORT || 8000}`);
