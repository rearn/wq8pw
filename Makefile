CP      = cp
RUNTEST = ./runtest.py
MAKE    = make
COVERAGE= coverage

TEMPLATES= templates

before_test: config $(TEMPLATES)

config: wq8pw.ini

wq8pw.ini: wq8pw.ini.default
	$(CP) $< $@

$(TEMPLATES): $(TEMPLATES)/Makefile
	$(MAKE) -C $(TEMPLATES) all

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
