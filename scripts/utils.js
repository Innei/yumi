// @ts-check

const fs = require('fs')
/**
 *
 * @param {string[]} targets
 */
exports.buildAll = async function buildAll(targets, build) {
  await runParallel(require('os').cpus().length, targets, build)
}

/**
 *
 * @param {any} maxConcurrency
 * @param {any} source
 * @param {Function} iteratorFn
 * @returns
 */
const runParallel = (exports.runParallel = async function runParallel(
  maxConcurrency,
  source,
  iteratorFn,
) {
  const ret = []
  const executing = []
  for (const item of source) {
    const p = Promise.resolve().then(() =>
      iteratorFn(item).catch((err) => {
        throw err
      }),
    )
    ret.push(p)

    if (maxConcurrency <= source.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1))
      executing.push(e)
      if (executing.length >= maxConcurrency) {
        await Promise.race(executing)
      }
    }
  }
  return Promise.all(ret)
})
exports.targets = fs.readdirSync('packages').filter((f) => {
  if (!fs.statSync(`packages/${f}`).isDirectory()) {
    return false
  }
  try {
    require(`../packages/${f}/package.json`)
  } catch {
    return false
  }

  return true
})
