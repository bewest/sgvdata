'use strict';

var should = require('should');

describe('lib/text', function ( ) {
  var fix = {
    "sgv": "123",
    "device": "test",
    "direction": "",
    "dateString": "2014-07-14T18:19:01-0700",
    "date": 1405387141
  };
  var tab = '2014-07-14T18:19:01-0700\t1405387141\t123\t\ttest';
  var text = require('../').sync.text;
  it('should exist', function ( ) {
    text.should.be.ok;
    text.format.should.be.ok;
    text.parse.should.be.ok;
    text.opts.should.be.ok;
  });

  it('formats text', function ( ) {
    var result = text.format(fix);
    result.should.equal(tab);

  });

  it('parses text', function ( ) {
    var result = text.parse(tab);
    Object.keys(result).forEach(function (key) {
      result[key].should.equal(fix[key]);
    });

  });

});

