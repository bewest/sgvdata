
function parse (t) {
  var sep = configure.opts.parse || configure.opts.sep;
  var p = t.split(sep);
  
  if (p.length < 4) { return; } 
  var rec = {
    dateString: p[0]
  , date: parseInt(p[1])
  , sgv: p[2]
  , direction: p[3]
  , device: p[4] || ''
  };
  return rec;
}

function format (rec) {
  var sep = configure.opts.format || configure.opts.sep;
  var fields = [ rec.dateString
    , rec.date
    , rec.sgv
    , rec.direction || ''
    , rec.device  || ''];
  return fields.join(sep);
}

function configure (opts) {
  if (opts) { configure.opts = opts; }
  return configure;
}

var separate_text = /[\s,]/;
var separate_format = '\t';
configure.opts = { parse: separate_text, format: separate_format };
configure.parse = parse;
configure.format = format;

module.exports = configure;
