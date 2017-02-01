import 'whatwg-fetch';
import _ from 'underscore';
import * as config from './config'
var baseUrl = config.baseUrl;

export default function photoSearch(keyword, page, callback){
    return fetch(`https://api.500px.com/v1/photos/search?term=${keyword}&page=${page}&rpp=20&image_size=440&sort=highest_rating&consumer_key=sPvXEpW2sFrch65rpyZQf01lBHuRGkEDDROTG1r4`)
        .then(response => response.json())
}

export  async function setFacebookTokenToServer(data) {
    return await this._fetch({
        method: 'POST',
        url: '/accessTokens/createToken',
        body: data
    })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                return res.json
            } else {
                throw (res.json)
            }
        })
        .catch((error) => {
            throw (error)
        })
}

export  async function saveProfileToServer(data, accessToken) {
    return await this._fetch({
        method: 'PUT',
        url: '/Members?access_token=' + accessToken,
        body: data
    })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                return res.json
            } else {
                throw (res.json)
            }
        })
        .catch((error) => {
            throw (error)
        })
}

export  async function getPosts(accessToken, limit) {
    return await this._fetch({
        method: 'GET',
        url: '/Posts' + '&limit=' + limit +'&filter[order]=created_time%20DESC?access_token=' + accessToken
    })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                return res.json
            } else {
                throw (res.json)
            }
        })
        .catch((error) => {
            throw (error)
        })
}

export async function _fetch (opts) {
    opts = _.extend({
        method: 'GET',
        url: null,
        body: null,
        callback: null
    }, opts);

    var reqOpts = {
        method: opts.method,
        headers: {
        }
    };

    if (opts.method === 'POST' || opts.method === 'PUT' || opts.method === 'PATCH') {
        reqOpts.headers['Accept'] = 'application/json';
        reqOpts.headers['Content-Type'] = 'application/json';
    }

    if (opts.body) {
        reqOpts.body = JSON.stringify(opts.body)
    }

    let url = baseUrl + opts.url;
    let res = {};
    console.log(url)

    let response = await fetch(url, reqOpts);


    res.status = response.status;
    res.code = response.code;

    return response.json()
        .then((json) => {
            res.json = json;
            return res
        })
}