
var builder = require('./protobuf/');
var utils = require('./utils');

function json (p) {
  var rec = {
    dateString: p.timestamp
  , date: new Date(Date.parse(p.timestamp)).getTime( ) / 1000.0
  , sgv: p.sgv
  , direction: utils.direction(p.direction)
  , device: utils.device(p.device)
  };
  return rec;
}

function payload (p) {
  var date = p.date ? new Date(parseInt(p.date) * 1000)
           : Date.parse(p.dateString || p.timestamp)
           ;
  var rec = {

    timestamp: date.toISOString( )
  , sgv: p.sgv
  , direction: p.direction
  , device: p.device
  };
  return rec;
}

function configure (opts) {
  var Model = builder.Practical8601;

  function my ( ) {
    return my;
  }

  my.payload = opts && opts.payload || configure.payload;
  my.json = opts && opts.json || configure.json;

  my.model = function model (m) {
    if (m) {
      Model = m;
    }
    return Model;
  }

  my.parse = function parse (buf) {
    var i = Model.decode(buf);
    return my.json(i);
  }

  my.format = function format (rec) {
    var p = my.payload(rec);
    var i = new Model(p);
    return i.toBuffer( );
  }

  return my;
}

configure.json = json;
configure.payload = payload;

module.exports = configure;
