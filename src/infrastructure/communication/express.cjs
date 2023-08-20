"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import express, { Request, Response } from 'express';
// commonjs style
var express = require("express");
var serializedHeadData = {
    title: 'My Awesome Website',
    description: 'This is a description of my awesome website.',
    keywords: ['awesome', 'website', 'keywords'],
    author: 'John Doe',
    locale: 'en_US',
    site_name: 'MySite',
    url: 'https://www.example.com',
};
var app = express();
var port = 3000;
app.get('/api/data', function (req, res) {
    res.json(serializedHeadData);
});
app.listen(port, function () {
    console.log("Server running at localhost:".concat(port));
});
