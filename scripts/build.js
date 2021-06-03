// @ts-check
const execa = require('execa')
const chalk = require('chalk')
const { resolve } = require('path')

const { buildAll, targets } = require('./utils')

async function build(target) {
  const dir = resolve(__dirname, '..', 'packages', target)

  const pkg = require(resolve(dir, './package.json'))

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

async function run() {
  await buildAll(targets, build)
}

run()
