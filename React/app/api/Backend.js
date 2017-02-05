import 'whatwg-fetch';
import _ from 'underscore';
import * as config from './config'
var baseUrl = config.baseUrl;

/*
* Save Facebook access token to Loopback server
* data: {
*   id: Facebook access token
*   ttl: time to live (expiry time of access token)
*   userId: ID of Facebook user
* }
* */
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

/*
 * Save Facebook profile to Loopback server
 * data: {
 *   userId: Facebook user ID
 *   email: user email
 *   username: Facebook username
 *   avatar_picture: Facebook avatar
 * }
 * */

export  async function saveProfileToServer(userID, data, accessToken) {
    return await this._fetch({
        method: 'PATCH',
        url: '/Members/' + userID + '?access_token=' + accessToken,
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

/*
 * Check user exist or not
 * id: Facebook userId
 * */

export  async function checkUserExist(id) {
    return await this._fetch({
        method: 'GET',
        url: '/Members/' + id + '/exists'
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

/*
 * Insert Facebook profile to Loopback server
 * data: {
 *   userId: Facebook user ID
 *   email: user email
 *   username: Facebook username
 *   avatar_picture: Facebook avatar
 *   password: first 12 characters of the access token
 * }
 * */

export  async function insertProfileToServer(data) {
    return await this._fetch({
        method: 'POST',
        url: '/Members',
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

/*
* Get GlobalFeed with 10 newest posts
* filter:
* {
*   limit: the number of posts
*   order: [created-time] sort the post's time
*   include: [user] the user who created the post
* }
* */

export  async function getPosts(accessToken, limit) {
    return await this._fetch({
        method: 'GET',
        url: '/Posts' + '?filter[limit]=' + limit +'&filter[order]=created_time%20DESC&filter[include]=user'
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

/*
* Get more detail of a post
* postId: the id of the post
* */

export  async function getDetailPost(postId) {
    return await this._fetch({
        method: 'GET',
        url: '/Posts/' + postId + '?filter[include]=user'
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

/*
 * Insert new post to Loopback server
 * data: {
 *   userId: Facebook user ID
 *   imgUrl: image url from Loopback server
 *   extension: type of the image
 *   size: size of an image (MB)
 *   caption: caption of a post
 * }
 * accessToken: Facebook access token, to validate from Loopback server
 * */

export  async function savePost(data, accessToken) {
    return await this._fetch({
        method: 'POST',
        url: '/Posts?access_token=' + accessToken,
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
            console.log(res)
            return res
        })
}