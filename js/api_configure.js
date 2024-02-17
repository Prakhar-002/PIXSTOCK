
"use strict";

import { urlEncode } from "./utils/urlEncode.js";
import { apiKey } from "./apiKey.js";


// Made your api Key from pexels and paste it here in the place of (const API_KEY = "here";)
const API_KEY = apiKey;

// Function...
const headers = new Headers();
headers.append("Authorization", API_KEY);

//Object...
const requestOptions = { headers };

const fetchData = async function (url, successCallback) {
      const response = await fetch(url, requestOptions);

      if (response.ok) {
            const data = await response.json();
            successCallback(data);
      }
}


let requestUrl = "";

const root = {
      default: "https://api.pexels.com/v1/",
      videos : "https://api.pexels.com/videos/"
}

export const client = {

      photos : {

            // search photo...
            search(parameters, callback) {
                  requestUrl = `${root.default}search?${urlEncode(parameters)}`;
                  fetchData(requestUrl, callback)
            },

            // curated photo...
            curated(parameters, callback) {
                  fetchData(`${root.default}curated?${urlEncode(parameters)}`, callback);
            },

            // Detail of a photo...
            detail(id, callback) {
                  fetchData(`${root.default}/photos/${id}`, callback);
            }

      },

      videos : {

            // search videos...
            search(parameters, callback) {
                  requestUrl = `${root.videos}search?${urlEncode(parameters)}`;
                  fetchData(requestUrl, callback)
            },

            // Get Popular videos...
            popular(parameters, callback) {
                  fetchData(`${root.videos}popular?${urlEncode(parameters)}`, callback);
            },

            // Detail of a videos...
            detail(id, callback) {
                  fetchData(`${root.videos}/videos/${id}`, callback);
            }

      },

      collections : {

            // Featured collections...
            featured(parameters, callback) {
                  requestUrl = `${root.default}/collections/featured?${urlEncode(parameters)}`;
                  fetchData(requestUrl, callback);
            },

            // Get a Detail of a collections...
            detail(id, parameters, callback) {
                  requestUrl = `${root.default}/collections/${id}?${urlEncode(parameters)}`;
                  fetchData(requestUrl, callback);
            }

      },

}