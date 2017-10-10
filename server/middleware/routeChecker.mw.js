let path = require('path');
let express = require('express');

let clientPath = path.join(__dirname, '../../client');

exports.isAsset = function(req, res, next) {
    if (isAsset(req.url)) {
        return next();
    }
    else {
        res.sendFile(path.join(clientPath, 'index.html'));
    }
}

function isAsset(path) {
    var pieces = path.split('/');
    if (pieces.length === 0) {
        return false 
    }
    var last = pieces[pieces.length - 1];
    if (path.indexOf('/api') !== -1 || path.indexOf('/?') !== -1) {
        return true;
    }else if (last.indexOf('.') !== -1) {
        return true;
    }else {
        return false;
    }
}