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
    const res = await execa('yarn', ['test'], {
      cwd: dir,
      encoding: 'utf8',
      stdio: 'inherit',
    })

    if (res.exitCode != 0) {
      process.exit(-1)
      return
    }
  }

  console.log(chalk.green('start to build ' + target + '...'))
  await execa('yarn', ['build'], { cwd: dir, encoding: 'utf8' })
}

async function runParallel(maxConcurrency, source, iteratorFn) {
  const ret = []
  const executing = []
  for (const item of source) {
    const p = Promise.resolve().then(() => iteratorFn(item, source))
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
  await buildAll(targets)
}

run()
