"use strict"
const fs = require('fs')

const assert = require('chai').assert
const jsonPrettifier = require('./jsonPrettifier').jsonPrettifier

describe('jsonPrettifierTest', () => {
  it('Parse JSON', () => {
    assert.equal('{\n}', jsonPrettifier("{}"))
    //assert.equal('{\n\t"key1": "value1\n"}', jsonPrettifier('{"key1": "value1"}'))
  } )
})
