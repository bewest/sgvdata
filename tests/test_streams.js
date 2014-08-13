'use strict';

var should = require('should');
var es = require('event-stream');

describe('sgvdata', function ( ) {
  var fix = {
    "sgv": "123",
    "device": "dexcom",
    "direction": "",
    "dateString": "2014-07-14T18:19:01-0700",
    "date": 1405387141
  };

  var fixable = {
    "sgv": 123,
    "device": "dexcom",
    "direction": "",
    "dateString": "2014-07-14T18:19:01-0700",
    "date": "1405387141"
  };

  var tab = '2014-07-14T18:19:01-0700\t1405387141\t123\t\tdexcom';
  var sgvdata = require('../');


  it('should exist', function ( ) {
    sgvdata.should.be.ok;
    sgvdata.sync.should.be.ok;
    sgvdata.lint.should.be.ok;
    sgvdata.format.should.be.ok;
    sgvdata.parse.should.be.ok;
  });

  function prove_known(result, fix) {
    Object.keys(result).forEach(function (key) {
      result[key].should.equal(fix[key]);
    });
  }

  it('should stream text to json', function (done) {
    var input = es.readArray([tab]);
    var proc = sgvdata.parse( )
    function finish (err, results) {
      results.length.should.equal(1);
      prove_known(results[0], fix);
      done( );
    }
    es.pipeline(input, proc, es.writeArray(finish));
  });

  it('should stream json to text', function (done) {
    var input = es.readArray([fix]);
    var proc = sgvdata.format( )
    function finish (err, results) {
      results[0].should.equal(tab);
      done( );
    }
    es.pipeline(input, proc, es.writeArray(finish));
  });

  it('should stream valid json', function (done) {
    var input = es.readArray([fixable]);
    var proc = sgvdata.lint( )
    function finish (err, results) {
      prove_known(results[0], fix);
      done( );
    }
    es.pipeline(input, proc, es.writeArray(finish));
  });

  it('should stream protobufs', function (done) {
    var input = es.readArray([fix]);
    var proc = sgvdata.fmt_protobuf( );
    var hex = '0a18323031342d30372d31355430313a31393a30312e3030305a107b18002001';

    function iter (item, next) {
      item.toString('hex').should.equal(hex);
      return next(null, item);
    }
    var back = sgvdata.parse_protobuf( );

    function finish (err, results) {
      results[0].device.should.equal('dexcom');
      results[0].direction.should.equal('NONE');
      results[0].dateString.should.equal('2014-07-15T01:19:01.000Z');
      results[0].date.should.equal(fix.date);
      results[0].sgv.toString( ).should.equal(fix.sgv);
      done( );
    }
    es.pipeline(input, proc, es.map(iter), back, es.writeArray(finish));
  });
});
