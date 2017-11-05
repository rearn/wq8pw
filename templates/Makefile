CP      = cp
RM      = rm -f

TEMPLATES = root.ja.html post.ja.html antenna.ja.html

all: $(TEMPLATES)

root.ja.html: root.ja.html.default
	$(CP) $< $@

post.ja.html: post.ja.html.default
	$(CP) $< $@

antenna.ja.html: antenna.ja.html.default
	$(CP) $< $@

robots.txt: robots.txt.default
	$(CP) $< $@
