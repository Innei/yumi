// @ts-check
const execa = require('execa')
const chalk = require('chalk')
const { resolve } = require('path')

const { buildAll, targets } = require('./utils')

async function build(target) {
  const dir = resolve(__dirname, '..', 'packages', target)

  const pkg = require(resolve(dir, './package.json'))
  try {
    if (pkg.scripts.test) {
      console.log(chalk.green('start to test ' + target + '...'))
      await execa('yarn', ['workspace', pkg.name, 'test'], {
        cwd: dir,
        encoding: 'utf8',
        stdio: 'inherit',
      })
    }
    if (pkg.scripts['test:e2e']) {
      console.log(chalk.green('start to test:e2e ' + target + '...'))
      await execa('yarn', ['workspace', pkg.name, 'test:e2e'], {
        cwd: dir,
        encoding: 'utf8',
        stdio: 'inherit',
      })
    }
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
}

async function run() {
  await buildAll(targets, build)
}

run()
