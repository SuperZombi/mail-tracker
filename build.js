const fs = require('fs');
const path = require('path');
const glob = require('glob');
const esbuild = require('esbuild');

const files = glob.sync('src/**/*.jsx');
const tempEntry = 'temp_combined.jsx';
const combinedCode = files
	.map(file => fs.readFileSync(file, 'utf8'))
	.join('\n\n');
fs.writeFileSync(tempEntry, combinedCode);

esbuild.build({
	entryPoints: [tempEntry],
	bundle: true,
	outfile: 'dist/main.js',
	loader: { '.jsx': 'jsx' },
	platform: 'browser',
	format: 'iife',
	globalName: 'AppBundle',
	minify: true
}).then(() => {
	fs.unlinkSync(tempEntry);
	console.log('✅ Build Done');
}).catch((err) => {
	console.error('❌ Build Error:', err.message);
	process.exit(1);
});

const destDir = path.resolve('dist');
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

fs.copyFileSync(path.resolve('index.html'), path.join(destDir, 'index.html'));
fs.cpSync(path.resolve("src/img"), path.join(destDir, "img"), { recursive: true });
