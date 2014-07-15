
function echo (record, opts) {
  if ('sgv' in record && 'date' in record) {
    var res = {
      sgv: record.sgv.toString( )
    , dateString: record.dateString || ''
    , date: parseInt(record.date)
    , device: record.device || ''
    , direction: record.direction || ''
    };
    if (res.sgv && isFinite(res.date)) {
      return res;
    }
  }
  if (opts && opts.strict) { throw new Error(record); }
}


function configure ( ) {
  return configure;
}

configure.echo = echo;
module.exports = configure;
