install:
	npm install

publish:
	npm publish --dry-run

install-deps:
	npm ci

make lint:
	npx eslint .

test:
	npx -n --experimental-vm-modules jest --watch
	
test-coverage:
	npm test -- --coverage --coverageProvider=v8
	
.PHONY: test
