'use strict';
var build = require('../lib/protobuf/');

if (!module.parent) {
  var r = {
    "sgv": '123',
    "dateString": "2014-07-16T14:54:13-0700",
    "date": 1405547674,
    "direction": "UP",
    "device": "xxx-test",
  };

  function exec (name, test, inst) {
    var Model = build(name);
    test(name, Model, inst || r);
  }

  function report (name, Model, input) {
    var inst = new Model(input);
    console.log([inst.toBuffer( ).length, "PBUF", name].join('\t'));

  }

  function contrast (obj, name) {
    console.log([JSON.stringify(obj).length, "JSON", name].join('\t'));
    exec(name, report, obj);
  }

  contrast({
    "sgv": '123',
    "dateString": "2014-07-16T14:54:13-0700",
    "date": 1405547674,
    "direction": "UP",
    "device": "xxx-test",
  }, 'SGVUsed');

  contrast({
    "sgv": 123,
    "dateString": "2014-07-16T14:54:13-0700",
    "date": 1405547674,
    "direction": "UP",
    "device": "xxx-test",
  }, 'SGVUsed_sgv_int');

  contrast({
    "sgv": '123',
    "dateString": "2014-07-16T14:54:13-0700",
    "direction": "UP",
    "device": "xxx-test"

  }, 'propose_1');

  contrast({
    "sgv": 123,
    "timestamp": "2014-07-16T14:54:13-0700",
    "direction": "UP",
    "device": "xxx-test"

  }, 'propose_2_timestamp');

  contrast({
    "sgv": 123,
    "timestamp": "2014-07-16T14:54:13-0700",
    "direction": 3,
    "device": "xxx-test"

  }, 'propose_2_timestamp_direction');


  contrast({
    "sgv": '123',
    "dateString": "2014-07-16T14:54:13-0700",
    "direction": 'FortyFiveDown',
    "device": "xxx-test",
  }, 'propose_direction_enum');

  contrast({
    "sgv": 123,
    "dateString": "2014-07-16T14:54:13-0700",
    "direction": "FortyFiveDown",
    "device": "xxx-test",
  }, 'propose_sgv_int');

  contrast({
    "sgv": 123,
    "dateString": "2014-07-16T14:54:13-0700",
    "direction": 7,
    "device": "xxx-test",
  }, 'propose_direction_sgv');

  contrast({
    "sgv": 123,
    "timestamp": "2014-07-16T14:54:13-0700",
    "direction": 'FortyFiveDown',
    "device": 'dexcom',
  }, 'Practical8601');


  var d = new Date( );
  contrast({
    "sgv": 123,
    "timestamp": d.getTime( ),
    "offset": d.getTimezoneOffset( ),
    "direction": 0,
    "device": "xxx-test",
  }, 'propose_direction_sgv_time_offset');

  var ser = new Buffer("xxx-test");
  contrast({
    "sgv": 123,
    "timestamp": d.getTime( ),
    "offset": d.getTimezoneOffset( ),
    "direction": 0,
    "devhead": ser.readUInt32BE(0),
    "devtail": ser.readUInt32BE(4),
  }, 'propose_direction_sgv_time_offset_device');


  contrast({
    "sgv": 123,
    "timestamp": d.getTime( ),
    "offset": d.getTimezoneOffset( ),
    "direction": 0,
    "device": ser,
  }, 'propose_direction_sgv_time_offset_device_b');


}
