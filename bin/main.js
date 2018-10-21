#!/usr/bin/env node

var electron = require("electron");
var { exec } = require("child_process");
var { join } = require("path");

exec(`${electron} ${join(__dirname, "../app.js")}`);
