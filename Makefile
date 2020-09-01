install:
	npm install

publish:
	npm publish --dry-run

make lint:
	npx eslint .

test:
	npx -n --experimental-vm-modules jest --watch