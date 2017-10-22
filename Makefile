CP      = cp
RUNTEST = ./runtest.py
MAKE    = make
COVERAGE= coverage

before_test: config templates_file

config: wq8pw.ini

wq8pw.ini: wq8pw.ini.default
	$(CP) $< $@

templates_file: templates/Makefile
	$(MAKE) -C templates all

test:
	$(RUNTEST)

test-v:
	$(RUNTEST) verbose

test-q:
	$(RUNTEST) quiet

coverage-test:
	$(COVERAGE) run $(RUNTEST)

coverage-test-v:
	$(COVERAGE) run $(RUNTEST) verbose

coverage-test-q:
	$(COVERAGE) run $(RUNTEST) quiet
