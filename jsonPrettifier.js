"use strict"

const fs = require('fs')

const prettyJSON = jsonString => {

  const pretty = (index, indentLevel) => {

    const ignoreSpace = (index) => {
      if (jsonString.charAt(index) == ' ' || jsonString.charAt(index) == '\t')
        return ignoreSpace(index + 1)
      return index
    }
    const indent = indentLevel => '  '.repeat(indentLevel)
    const newLine = indentLevel => '\n' + indent(indentLevel)    
    const openScope = (character) => character
        + newLine(indentLevel + 1)
        + pretty(ignoreSpace(index + 1), indentLevel + 1)
    const closeScope = (character) => newLine(indentLevel - 1)
        + character  
        + pretty(index + 1, indentLevel - 1)
    const parseString = index => {
      if (jsonString.charAt(index) == '"')
        return index + 1
      return parseString(index + 1)
    }
    

    if (index >= jsonString.length)
    return ""

    switch (jsonString.charAt(index)) {
      case '{':
        return openScope('{')
      case '}':
        return closeScope('}')
      case '[':
        return openScope('[')
      case ']':
        return closeScope(']')
      case '"':
        const endString = parseString(index + 1)
        return jsonString.substr(index, endString - index)
            + pretty(endString, indentLevel) 
      case ',':
        return ','
            + newLine(indentLevel)
            + pretty(ignoreSpace(index + 1), indentLevel)
      default:
        return jsonString.charAt(index) + pretty(index + 1, indentLevel)
    }
  }
  return pretty(0, 0)
}

const stackProfiler = () => {
  const startTime = process.hrtime()[0]
  return () => process.hrtime()[0] - startTime
}

const Nothing = {
  map: f => Nothing,
  foreach: f => {}
}

const Maybe = x => {
  if (x == null)
    return Nothing

  const map = f => Maybe(f(x))
  const foreach = f => f(x)
  const get = () => x

  return {map, foreach, get}
}

const Try = (f) => {
  let error = Nothing
  let result = Nothing
  try {
    result = Maybe(f())
  } catch (e) {
    result = Nothing
    error = Maybe(e)
  }

  const t = {map, foreach, get, onFailure}

  function map(f) { result.map(f) }
  function foreach(f) { result.foreach(f) }
  function get() { result.get() }
  function onFailure(f) {
    error.foreach(f)
    return t
  }

  return t
}

module.exports.jsonPrettifier = prettyJSON

fs.readFile('flatJsonExample.json','utf8', (err,text) => {
  if (err) {
    return console.log(err)
  }
  // const endProfiler = stackProfiler()
  // for (let i = 0; i < 1000000; i++) { prettyJSON(text) }
  // console.log(`Finished in ${endProfiler()} seconds`)
  Try( () => prettyJSON(text) )
      .onFailure( e => console.log(e) )
      .foreach( text => console.log(text) )

  //console.log(prettyJSON(text))
})