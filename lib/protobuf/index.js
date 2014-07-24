'use strict';

var ProtoBuf = require('protobufjs');

var builder = ProtoBuf.loadProtoFile(__dirname + "/SGV.proto");

function build (name) {
  var Model = builder.build(name);
  return Model;
}
var models = ['Practical8601'];
models.forEach(function (model) {
  build[model] = build(model);
});

module.exports = build;

