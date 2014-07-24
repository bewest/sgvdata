'use strict';
var should = require('should');

describe("utils", function ( ) {
  var utils = require('../lib/utils');
  it('should be a module', function ( ) {
    utils.should.be.ok;
  });

  it('direction', function ( ) {
    utils.direction.should.be.ok;
    utils.direction(0).should.equal("NONE");
    try {
      utils.direction(-1);
    } catch (e) {
      e.should.be.ok;
    }
    (function ( ) {
      utils.direction(-1);
    }).should.throw( );
    (function ( ) {
      utils.direction(25);
    }).should.throw( );

    
  });

  it('device', function ( ) {
    utils.device.should.be.ok;
    utils.device(1).should.equal('dexcom');
    try {
      utils.device(0);
    } catch (e) {
      e.should.be.ok;
    }
    (function ( ) {
      utils.device(0);
    }).should.throw( );
    (function ( ) {
      utils.device(-1);
    }).should.throw( );
  });

});

