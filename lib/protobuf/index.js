'use strict';

var ProtoBuf = require('protobufjs');

var builder = ProtoBuf.loadProtoFile(__dirname + "/SGV.proto");
var downloads = ProtoBuf.loadProtoFile(__dirname + "/Download.proto");

function build (name) {
  var Model = builder.build(name);
  return Model;
}
var models = ['Practical8601'];
models.forEach(function (model) {
  build[model] = build(model);
});

downloads.models = ['Download', 'CookieMonsterSGVG4' ];
downloads.models.forEach(function (model) {
  build[model] = downloads.build(model);
});

module.exports = build;

