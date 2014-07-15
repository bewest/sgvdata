

var es = require('event-stream');

var sync = {
  text : require('./lib/text')( )
, json : require('./lib/json')( )
};

function mapper(fn, strict) {
  function map (item, next) {
    var res = fn(item, strict);
    next(null, res);
  }
  return es.map(map);
}

function format ( ) {
  return es.pipeline(mapper(sync.text.format), es.join('\n'));
}

function parse ( ) {
  return es.pipeline(es.split('\n'), mapper(sync.text.parse), mapper(sync.json.echo));
}

function lint (opts) {
  return mapper(sync.json.echo, {strict: opts ? opts.strict : true});
}

module.exports.sync = sync;
module.exports.mapper = mapper;
module.exports.format = format;
module.exports.parse = parse;
module.exports.lint = lint;
