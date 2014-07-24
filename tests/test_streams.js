'use strict';

var should = require('should');
var es = require('event-stream');

describe('sgvdata', function ( ) {
  var fix = {
    "sgv": "123",
    "device": "test",
    "direction": "",
    "dateString": "2014-07-14T18:19:01-0700",
    "date": 1405387141
  };

  var fixable = {
    "sgv": 123,
    "device": "test",
    "direction": "",
    "dateString": "2014-07-14T18:19:01-0700",
    "date": "1405387141"
  };

  var tab = '2014-07-14T18:19:01-0700\t1405387141\t123\t\ttest';
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
});
