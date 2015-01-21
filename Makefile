REPORTER = dot

TARGETS ?= unexpected.js

lint:
	@./node_modules/.bin/jshint lib/*.js test/*.js

.PHONY: lint

unexpected.js: lib/*
	(echo '/*!' && <LICENSE sed -e's/^/ * /' | sed -e's/\s+$$//' && echo ' */' && ./node_modules/.bin/browserify -p bundle-collapser/plugin -e lib -s weknowhow.expect) > $@

test-phantomjs: ${TARGETS}
	@$(eval QUERY=$(shell node -e "console.log(decodeURIComponent(process.argv.pop()))" "${grep}")) \
    ./node_modules/.bin/mocha-phantomjs test/tests.html?grep=${QUERY}

test: lint
	mocha

.PHONY: test

coverage: lib/*
	NODE_ENV=development ./node_modules/.bin/istanbul cover \
		-x unexpected.js \
		-x **/vendor/** \
	--include-all-sources ./node_modules/mocha/bin/_mocha -- --reporter dot

.PHONY: test-browser
test-browser: unexpected.js
	@./node_modules/.bin/serve .

travis: lint test coverage
	<coverage/lcov.info ./node_modules/coveralls/bin/coveralls.js

.PHONY: git-dirty-check
git-dirty-check:
ifneq ($(shell git describe --always --dirty | grep -- -dirty),)
	$(error Working tree is dirty, please commit or stash your changes, then try again)
endif

.PHONY: release-%
release-%: git-dirty-check lint ${TARGETS} test-phantomjs
	git add unexpected.js && git commit -m "Build unexpected.js"
	npm version $*
	@echo $* release ready to be publised to NPM
	@echo Remember to push tags

.PHONY: clean
clean:
	-rm -fr ${TARGETS} coverage
