import { snakeCase } from 'change-case'

function isObjectWithPrototype(obj) {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    Object.prototype.toString.call(obj) === '[object Object]'
  )
}

export default function toJSON(
  data: any,
  projection: { [key: string]: false | ((input: any) => any) } = {},
): any {
  const obj = Object.keys(data)
    .filter((key) => projection[key] !== false)
    .reduce<any>((prev, key) => {
      const child = data[key]
      let result = child
      const p = projection[key]
      if (typeof p === 'function') {
        result = p(child)
      } else if (isObjectWithPrototype(child)) {
        if (typeof child['toJSON'] === 'function') {
          result = (child as any).toJSON()
        } else {
          result = toJSON(child as Record<string, unknown>)
        }
      } else if (child instanceof Array) {
        result = child.map((item) => {
          if (isObjectWithPrototype(item)) {
            return toJSON(item)
          }
          return item
        })
      }
      const newKey = snakeCase(key)
      prev[newKey] = typeof data[key] === 'undefined' ? null : result
      return prev
    }, {})
  return obj
}
