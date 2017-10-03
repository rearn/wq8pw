RUNTEST = ./runtest.py
MAKE    = make
COVERAGE= coverage

test: before_test
	$(RUNTEST)

test-v: before_test
	$(RUNTEST) verbose

test-q: before_test
	$(RUNTEST) quiet

coverage-test: before_test
	$(COVERAGE) run $(RUNTEST)

coverage-test-v: before_test
	$(COVERAGE) run $(RUNTEST) verbose

coverage-test-q: before_test
	$(COVERAGE) run $(RUNTEST) quiet
