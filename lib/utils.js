
function direction (i) {
  if (i < direction.keys.length && i >= 0)
    return direction.keys[i];
  throw new Error("direction " + i  + " is invalid");
}

direction.enum = {
    NONE: 0,
    DoubleUp: 1,
    SingleUp: 2,
    FortyFiveUp: 3,
    Flat: 4,
    FortyFiveDown: 5,
    SingleDown: 6,
    DoubleDown: 7,
    NOT_COMPUTABLE: 8,
    RATE_OUT_OF_RANGE: 9
};
direction.keys = Object.keys(direction.enum);

function device (i) {
  if (i in device.enum)
    return device.enum[i];
  throw new Error("device " + i + " is invalid");
}

device.enum = {
  1: 'dexcom'
};

module.exports.direction = direction;
module.exports.device = device;
