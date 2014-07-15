
# sgvdata

Some basic data modeling utilities for `SGV`:
**serum glucose value**s.

This module allows easily converting sgv records to and from plain
text (csv, tsv) and json.

Exposes streaming and synchronous interfaces for parsing and
formatting sgv records and text and json records.

## status
[![Build Status](https://travis-ci.org/bewest/sgvdata.svg)](https://travis-ci.org/bewest/sgvdata)
[![Coverage Status](https://img.shields.io/coveralls/bewest/sgvdata.svg)](https://coveralls.io/r/bewest/sgvdata)
[![Code Climate](https://codeclimate.com/github/bewest/sgvdata.png)](https://codeclimate.com/github/bewest/sgvdata)

## npm

Use in your project by including it from npm like so:
```
$ npm install --save sgvdata
```
## What's an SGV record?
Serum glucose value:
  * dateString - ISO8601
  * date - unix epoch
  * direction
  * sgv
  * device

## usage

### sync
Synchronous functions to manipulate a single record.

#### text
Handle text formats: csv, tsv.
##### format - `format(json) -> {tsv}`
Format a single json record as csv or tsv.

##### parse - `parse(text) -> {json}`
Parse a single textual record (csv or tsv) as a json record.

#### json
Synchronous functions for handling json records.
##### echo `echo(rec) -> linted_record`
Synchronously return linted json record.

### mapper - `mapper(sync, opts) -> <WritableStream>`
Quick wrapper utility around `es.map` to turn a synchronous function into a
stream.

### format - `format( ) - <WritableStream>`
Format all json elements in stream, emitting new elements formatted as text.

### parse - `parse( ) - <WritableStream>`
Parse all text elements in stream, emitting new json objects.

### lint - `lint(opts) - <WritableStream>`
Echo all sgv elements in stream, optionally throwing errors.
#### options

* `strict` - true - throw errors on invalid elements

EG: `{ strict: true }`
