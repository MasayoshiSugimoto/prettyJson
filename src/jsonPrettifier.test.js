"use strict"
const fs = require('fs')

const assert = require('chai').assert
const prettyJSON = require('./jsonPrettifier').prettyJSON

describe('jsonPrettifierTest', () => {
  it('should parse empty blocks', () => {
    assert.equal('{\n  \n}', prettyJSON("{}"))
  } )

  it('should not format strings', () => {
    assert.equal(
        '{\n  "key": "do not format, string with commas"\n}',
        prettyJSON('{"key": "do not format, string with commas"}'))
  } )

  it('should insert a new line after ,', () => {
    assert.equal(
        '{\n  "key1": "value1",\n  "key2": "value2"\n}',
        prettyJSON('{"key1": "value1", "key2": "value2"}'))
  } )

  it('should indent lists', () => {
    assert.equal(
        '{\n  "key1": [\n    "hello",\n    "world"\n  ]\n}',
        prettyJSON('{"key1": ["hello", "world"]}'))
  } )

  it('should ignore extra spaces after {', () => {
    assert.equal(
        '{\n  "key1": {\n    \n  }\n}',
        prettyJSON('{    "key1":     {   }  }'))
  } )
})
