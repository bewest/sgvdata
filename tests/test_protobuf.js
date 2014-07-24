
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
  var buf = new Buffer(hex, 'hex');
  var tab = '2014-07-14T18:19:01-0700\t1405387141\t123\t\ttest';
  var text = require('../').sync;
  var pb = require('../').sync.protobuf;
  it('should exist', function ( ) {
    pb.should.be.ok;
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

});

