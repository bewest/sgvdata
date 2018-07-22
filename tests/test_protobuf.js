'use strict';

var should = require('should');

describe('lib/protobuf', function ( ) {
  var fix = {
    "sgv": 123,
    "device": "dexcom",
    "direction": "",
    "dateString": "2014-07-14T18:19:01-0700",
    "date": 1405387141
  };
  var hex = '0a18323031342d30372d31355430313a31393a30312e3030305a107b18002001';
  var buf = new Buffer.from(hex, 'hex');
  var tab = '2014-07-14T18:19:01-0700\t1405387141\t123\t\ttest';
  var text = require('../').sync;
  var pb = require('../').sync.protobuf;
  it('should exist', function ( ) {
    pb.should.be.ok;
    pb( ).should.be.ok;
    pb.model( ).should.be.ok;
    pb.model(pb.model( )).should.be.ok;
    pb.format.should.be.ok;
    pb.parse.should.be.ok;
  });

  it('formats protobuffers', function ( ) {
    var result = pb.format(fix);
    result.toString('hex').should.equal(buf.toString('hex'));
  });

  it('parses protobuffers', function ( ) {
    var result = pb.parse(buf);
    ['sgv', 'device', 'date'].forEach(function (key) {
      result[key].should.equal(fix[key]);
    });
    result.dateString.should.equal('2014-07-15T01:19:01.000Z');
    result.direction.should.equal('NONE');

  });

it('should parse protobuffers', function () {
    // based on Nightscout tests/mqtt.test.js
    var pb = require('../').sync.protobuf;
    var payload = new Buffer('0a1108b70110d6d1fa6318f08df963200428011a1d323031352d30382d32335432323a35333a35352e3634392d30373a303020d7d1fa6328004a1508e0920b10c0850b18b20120d5d1fa6328ef8df963620a534d34313837393135306a053638393250', 'hex');
    var result = pb.parse(payload);
    result.direction.should.equal('NONE');
});

});

