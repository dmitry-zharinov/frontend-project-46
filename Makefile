lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

test:
	npm test
test-watch:
	npx jest --watch