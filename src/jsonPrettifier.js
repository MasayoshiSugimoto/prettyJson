"use strict"

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
        + pretty(ignoreSpace(index + 1), indentLevel - 1)
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
      case ',':
        return ','
            + newLine(indentLevel)
            + pretty(ignoreSpace(index + 1), indentLevel)
      case '[':
        return openScope('[')
      case ']':
        return closeScope(']')
      case ':':
        return ': ' + pretty(ignoreSpace(index + 1), indentLevel) 
      case '"':
        const endString = parseString(index + 1)
        return jsonString.substr(index, endString - index)
            + pretty(endString, indentLevel) 
      default:
        return jsonString.charAt(index) + pretty(index + 1, indentLevel)
    }

  }
  return pretty(0, 0)
}

module.exports.prettyJSON = prettyJSON
