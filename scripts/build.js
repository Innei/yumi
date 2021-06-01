// @ts-check
const execa = require('execa')
const fs = require('fs')
const chalk = require('chalk')
const { resolve } = require('path')
const targets = (exports.targets = fs.readdirSync('packages').filter((f) => {
  if (!fs.statSync(`packages/${f}`).isDirectory()) {
    return false
  }
  const pkg = require(`../packages/${f}/package.json`)
  if (pkg.private && !pkg.scripts.build) {
    return false
  }
  return true
}))

async function buildAll(targets) {
  await runParallel(require('os').cpus().length, targets, build)
}

async function build(target) {
  const dir = resolve(__dirname, '..', 'packages', target)

  const pkg = require(resolve(dir, './package.json'))
  if (pkg.scripts.test) {
    console.log(chalk.green('start to test ' + target + '...'))
    await execa('yarn', ['workspace', pkg.name, 'test'], {
      cwd: dir,
      encoding: 'utf8',
      stdio: 'inherit',
    })
  }

  console.log(chalk.green('start to build ' + target + '...'))
  try {
    await execa('yarn', ['workspace', pkg.name, 'build'], {
      cwd: dir,
      encoding: 'utf8',
    })
  } catch (e) {
    console.error(e)
    process.exit(-1)
  }
}

/**
 *
 * @param {any} maxConcurrency
 * @param {any} source
 * @param {typeof build} iteratorFn
 * @returns
 */
async function runParallel(maxConcurrency, source, iteratorFn) {
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
}

async function run() {
  try {
    await buildAll(targets)
  } catch (e) {
    process.exit(-1)
  }
}

run()
