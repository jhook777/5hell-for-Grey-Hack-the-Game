# 5hell-for-Grey-Hack-the-Game
Shell emulator and multitool for the video game Grey Hack.
Now open source. 
Very, very, very limited support available.
MIT license superscedes old 5hell license.

To build in Grey Hack:

Copy kore.5pk.src to CodeEditor.exe in game
mark as importable
Build to /root/src/kore.5pk

Copy dtools.5pk.src to CodeEditor.exe in game
mark as importable
Build to /root/src/dtools.5pk

Copy battleship.5pk.src and blackjack.5pk.src and drugwars.5pk.src to code editor and build to
/root/src/blackjack.5pk and<br>
/root/src/battleship.5pk and <br>
/root/src/drugwars.5pk

be sure to mark as importable

copy 5phinx.5pk.src to code editor and build to
/root/src/5phinx.5pk<br>
remember to mark it as importable<br>

/root/src should now have the following built, importable files:

drugwars.5pk

battleship.5pk

blackjack.5pk

dtools.5pk

kore.5pk

5phinx.5pk


Now, copy 5hell.5pk.src to code editor, mark as importable and build to
/root/src/5hell.5pk
[5hell.5pk imports all previous .5pk files and is imported by 5hell.src]

Finally, copy 5hell.src to code editor
select a password or passwords in the security section of 5hell.src
Then build to 5hell (or a filename of your choice)
[5hell.src imports 5hell.5pk\
DO NOT MARK THE FINAL BUILD AS IMPORTABLE as this will compromise your password.
ALTERNATIVE! Delete the security section in 5hell.src and don't use a password

congrats, you just built 5hell.

ADVANCED BUILD:
You have the option of rebuilding 5hell using the makfit command.
launch 5hell and read: makfit -h
To use, run the following command in 5hell after building 5hell the first time as per above instructions.
Next, run: makfit [path to 5hell.src] 120000
(you can use any value above 100000 but 120k seems to have the most favorable time:size ratio)
This will build a new binary with a random file name and then rename the file back to 5hell.
File sizes are based on file name so makfit generates random names until the name produces a binary of the desired size.

Once 5hell is built you do not need the build files anymore unless you plan on rebuilding.

To start using 5hell:
You can use it right away out of the box but more benefits come from the following:
<br> |> indicates the prompt, don't type |> for the commands) <br>
<code>
create your rootkit folder:
|> mkdir /root/rkit
populate the folder:
|> kore -r
-- this will copy /lib/crypto.so, /lib/metaxploit.so and 5hell to /root/rkit
5hell's exploit database is also written to:
/root/rkit/database.csv
The rootkit may also contain:
/root/rkit/dig.bat
-- this file is used by the dig command
-- commands written to this file are executed by 5hell after dig uploads and launches 5hell on a target.
-- write this file the same as a 'do' batch file, ie: write 5hell commands to be executed on each line (piping supported)

|> pwgen | pwgen hash
-- this will write a password table and a hash=password table to /root/tables/tp and /root/tables/t5 respectively
-- these tables are used by: cerebrum -i, brutus, herme5, and hashim for password cracking
-- in public this takes 20 minutes, in nightly it takes about 5
-- you only have to do it once then you can upload the table to other servers (or back it up somewhere)

You may also use:
|> cerebrum
-- to generate a password table at runtime (takes about a minute)

Important Notes:

Beginners should type 
|> help
--For basic help info and a command list.
|> help -s
--To see info on all commands at once
|> help -s [keyword]
--To search all of the help info for that keyword (to find commands easier)
|> help guide
--To get a quick start guide

Beginners should also use 5phinx (sphinx) as this automates most hacking.

Results from 5phinx (or command line hacking) are sent to the BUFFER in memory alpha
type
|> malp
--to access memory alpha, then press 5 to access the buffer.

If you've built the rkit correctly, you can also simply type
|> dig [ip] [opt: port]
and 5hell will do all the heavy lifting for you.
Type exit once dig is done to return to the 5hell session that launched the dig.
Alternatively, edit dig.bat and put 
exit dig_complete
on the last line to autoexit and echo completion
<code>
