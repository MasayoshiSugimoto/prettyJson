"use strict"
const fs = require('fs')

const assert = require('chai').assert
const prettyJSON = require('./jsonPrettifier').prettyJSON

describe('jsonPrettifierTest', () => {
  it('Parse JSON', () => {
    assert.equal('{\n  \n}', prettyJSON("{}"))
  } )
})
