CP      = cp
RUNTEST = ./runtest.py
MAKE    = make
COVERAGE= coverage

TEMPLATES= templates

before_test:
	$(MAKE) config
	$(MAKE) clean_templates
	$(MAKE) templates

clean_templates: tests/Makefile
	$(MAKE) -C tests clean

config: wq8pw.ini

wq8pw.ini: wq8pw.ini.default
	$(CP) $< $@

templates: $(TEMPLATES)/Makefile
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
