/* eslint-disable @typescript-eslint/no-require-imports */
const { compile } = require('@tailwindcss/node');
const { Scanner } = require('@tailwindcss/oxide');
const path = require('path');

module.exports = function tailwindV4Plugin() {
  return {
    postcssPlugin: '@tailwindcss/postcss',
    async Once(root, { result, parse }) {
      const from = root.source?.input?.file;
      const rawCss = root.source?.input?.css;
      if (!from || !rawCss || !rawCss.includes('tailwindcss')) {
        return;
      }

      const base = path.dirname(from);
      const compiler = await compile(rawCss, {
        from,
        base,
        onDependency: (file) => {
          result.messages.push({ type: 'dependency', file, parent: from });
        },
        shouldRewriteUrls: true,
      });

      const scanner = new Scanner({
        sources: [{ base: process.cwd(), pattern: '**/*', negated: false }],
      });
      const candidates = scanner.scan();
      for (const file of scanner.files) {
        result.messages.push({ type: 'dependency', file: path.resolve(file), parent: from });
      }

      const built = compiler.build(candidates);
      const newRoot = parse(built, { from });
      root.removeAll();
      root.append(newRoot.nodes);
    },
  };
};
module.exports.postcss = true;
