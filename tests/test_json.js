'use strict';

var should = require('should');

describe('lib/json', function ( ) {
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

  var broken = {
    "sgv": "123",
    "device": "test",
    "direction": "",
    "dateString": "2014-07-14T18:19:01-0700"
  };

  var json = require('../').sync.json;
  it('should exist', function ( ) {
    json.should.be.ok;
    json.echo.should.be.ok;
  });

  it('echos records', function ( ) {
    var result = json( ).echo(fix);
    Object.keys(result).forEach(function (key) {
      result[key].should.equal(fix[key]);
    });

  });

  it('fixes records', function ( ) {
    var result = json( ).echo(fixable);
    Object.keys(result).forEach(function (key) {
      result[key].should.equal(fix[key]);
    });
  });

  it('has strict mode', function ( ) {
    (function ( ) {
      var result = json( ).echo(broken, {strict: true});
    }).should.throw( );


  });

});

