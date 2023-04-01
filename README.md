# 5hell-for-Grey-Hack-the-Game
Shell emulator and multitool for the video game Grey Hack.
Now open source. (Sunsetting, developement has stopped.)
Very, very, very limited support available.
MIT license superscedes old 5hell license.

To build in Grey Hack:

rename all files without the .src extension

files with .5pk (dot fivepack) extensions should end in .5pk

rename blackjack3.5pk.src to blackjack.5pk

place all .5pk dependancies in /root/src

build all of the .5pk dependancies.

build 5hell.5pk LAST as it imports all others.

When building 5hell.5pk you have the option of making one or more dictionary files.

a.csv, b.csv, c.csv and so forth. Comment in lines for files you want to import.

Check 5hell.src for further instructions. 

Remember, this step is optional.


You can use cerebrum or jtr to generate a dictionary at runtime. or pwgen to generate a dictionary and print it to disk.
you can then use tools like chop and dfit, within 5hell, to build dictionary files and rebuild 5hell.5pk with those.

finally:
 set an authentication code in 5hell.src
build 5hell.5pk and 5hell.src into 5hell (5hell.src imports 5hell.5pk)

Once built you may rebuild using the makfit tool for a smaller binary size.
See makfit -h for details.
