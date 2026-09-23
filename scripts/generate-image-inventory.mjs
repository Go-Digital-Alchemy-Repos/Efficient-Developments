import { execFileSync } from 'node:child_process'
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { extname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const imageRoot = join(root, 'public/assets/images')
const sourceRoots = [join(root, 'src')]
const output = join(root, 'docs/qa/image-inventory-2026-09-22.csv')

function files(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? files(path) : [path]
  })
}

const source = sourceRoots.flatMap(files).map((path) => readFileSync(path, 'utf8')).join('\n')
const rows = [['path', 'format', 'bytes', 'width', 'height', 'source_reference', 'treatment']]

for (const path of files(imageRoot).filter((path) => !path.endsWith('README.md')).sort()) {
  const publicPath = `/${relative(join(root, 'public'), path)}`
  const metadata = execFileSync('/usr/bin/sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', path], { encoding: 'utf8' })
  const width = metadata.match(/pixelWidth: (\d+)/)?.[1] ?? ''
  const height = metadata.match(/pixelHeight: (\d+)/)?.[1] ?? ''
  const referenced = source.includes(publicPath) || source.includes(publicPath.replace(/\.[^.]+$/, ''))
  rows.push([
    publicPath,
    extname(path).slice(1).toLowerCase(),
    String(statSync(path).size),
    width,
    height,
    referenced ? 'yes' : 'no',
    referenced ? 'retained' : 'review',
  ])
}

writeFileSync(output, rows.map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(',')).join('\n') + '\n')
console.log(`Wrote ${rows.length - 1} image records to ${output}`)
