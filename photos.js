var Flickr = require("flickrapi");
if (process.env.NODE_ENV !== "production") {
  var env = require("node-env-file");
  env(__dirname + "/.env");
}
let {
  flick_api_key: api_key,
  flick_user_id: user_id,
  flickr_secret: secret,
  flickr_access_token: access_token,
  flickr_access_token_secret: access_token_secret
} = process.env;
var flickrOptions = {
  api_key,
  secret,
  user_id,
  access_token,
  access_token_secret
};

let flickrApiObject;
var flickrObject = {
  api_key,
  user_id,
  page: 1,
  per_page: 20
};

Flickr.authenticate(flickrOptions, function(error, flickr) {
  if (error) {
    console.log("Error instiating flickr API object: ", error);
  }
  flickrApiObject = flickr;
});

function getAlbums() {
  let defer = new Promise((resolve, reject) => {
    flickrApiObject.photosets.getList(
      Object.assign({}, flickrObject, {
        primary_photo_extras: "url_s, url_m, url_o, url_t, url_h"
      }),
      function(err, result) {
        if (err) {
          let statusCode = err.message === "Photo not found" ? 404 : 500;
          reject({ statusCode, err });
        }
        resolve(result.photosets.photoset);
      }
    );
  });
  return defer;
}

function getAlbumDetails(albumid, page_num) {
  let defer = new Promise((resolve, reject) => {
    flickrApiObject.photosets.getPhotos(
      Object.assign({}, flickrObject, {
        photoset_id: albumid,
        extras: "url_m, url_o, url_t, url_h",
        privacy_filter: 2,
        page: page_num
      }),
      function(err, result) {
        if (err) {
          let statusCode = err.message === "Photoset not found" ? 404 : 500;
          reject({ statusCode, err });
        }
        if (!result) {
          resolve({});
          return;
        }
        resolve(result.photoset);
      }
    );
  });
  return defer;
}

function getPhoto(photoid) {
  let defer = new Promise((resolve, reject) => {
    flickrApiObject.photos.getSizes(
      Object.assign({}, flickrObject, {
        photo_id: photoid
      }),
      function(err, result) {
        if (err) {
          let statusCode = err.message === "Photo not found" ? 404 : 500;
          reject({ statusCode, err });
        }
        if (!result) {
          resolve({});
          return;
        }
        resolve(result);
      }
    );
  });
  return defer;
}
module.exports = {
  getAlbums,
  getAlbumDetails,
  getPhoto
};
