var exec = require('child_process').exec;
var CMD = '/usr/bin/eject';

var open = exports.open = function(){
    exec([CMD, '-r'].join(' '))
}

var close = exports.close = function(){
    exec([CMD, '-t'].join(' '))
}

