# 5hell-for-Grey-Hack-the-Game
Shell emulator and multitool for the video game Grey Hack.
Now open source. (Sunsetting, developement has stopped.)
Very, very, very limited support available.
MIT license superscedes old 5hell license.

To build in Grey Hack:

build all of the .5pk dependancies.
build 5hell.5pk LAST as it imports all others.
in order to build 5hell.5pk you need to make one or more dictionary files.
a.csv, b.csv, c.csv and so forth. Comment out lines for files you don't want to import.
you don't actually need them, just set the variable: dict_a = ["a"]
and then use cerebrum to generate a dictionary at runtime. or pwgen to generate a dictionary and print it to disk.
you can then use tools like chop and dfit, within 5hell, to build dictionary files and rebuild 5hell.5pk with those.
build 5hell.5pk and 5hell.src into 5hell (5hell.src imports 5hell.5pk
