"use strict"

const fs = require('fs')

function parseCurlyBraces(jsonString, index) {
  if (index >= jsonString.length)
    return ""

  //No change if nothing between curly braces
  if (jsonString.charAt(index) == '}')
    return "}"

  return makeJsonPrettifier(jsonString, index)
}

const makeJsonPrettifier = index => jsonString => {
  if (index >= jsonString.length)
    return ""

  const c = jsonString.charAt(index)
  switch (c) {
    case '{':
      return '{\n' + makeJsonPrettifier(index + 1)(jsonString)
    case '}':
      return '}' + makeJsonPrettifier(index + 1)(jsonString)
    default:
      return c + makeJsonPrettifier(index + 1)(jsonString)
  }
}

module.exports.jsonPrettifier = makeJsonPrettifier(0)
