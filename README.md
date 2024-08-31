# 5hell-for-Grey-Hack-the-Game

Join us on Discord!
https://discord.gg/AFqsGaCDfS

**Shell emulator and multitool for the video game Grey Hack.**

Now open source.
Very, very, very limited support available.
MIT license superscedes old 5hell license.

### To build in Grey Hack:


First make the directory /root/src as root (its important otherwise that action will get denied) inside your Game

**Tip: to escalate to root use this command:**

<pre>
sudo -s
</pre>

Copy the following .src files into the CodeEditor inside the Game:

***Make sure that the tickbox that says: "Importable" is ticked for each file!***

<pre>
 kore.5pk.src         -->  kore.5pk

 dtools.5pk.src       -->  dtools.5pk

 battleship.5pk.src   -->  battleship.5pk

 blackjack.5pk.src    -->  blackjack.5pk

 drugwars.5pk.src     -->  drugwars.5pk

 5phinx.5pk.src       -->  5phinx.5pk
</pre>

Each file goes to /root/src

-------------------------------------------------

**/root/src should now have the following built, importable files:**

<pre>
drugwars.5pk

battleship.5pk

blackjack.5pk

dtools.5pk

kore.5pk

5phinx.5pk
</pre>



## Final step for build

**Now, copy 5hell.5pk.src to code editor, mark as importable and build to /root/src/5hell.5pk**

<pre>
5hell.5pk imports all previous .5pk files and is imported by 5hell.src
</pre>

**Finally, copy 5hell.src to code editor**

select a password or passwords in the security section of 5hell.src



<pre>
access_codes = {"Alpha":"your_access_code_here", "Beta":"your_other_access_code_here"}
</pre>
**You can delete the "Beta" section if you want to use one password only.**


Then build to 5hell (or a filename of your choice)


***DO NOT MARK THE FINAL BUILD AS IMPORTABLE as this will compromise your password.***



***ALTERNATIVE! Delete the security section in 5hell.src and don't use a password (not recommended for Multiplayer)***

**YAY! Congrats, you just built 5hell. ;)**

---------------------------------------------------

### ADVANCED BUILD:

<pre>
For the example here make sure you point to the .src saved as textfile!
</pre>

You have the option of rebuilding 5hell using the makfit command.

<pre>
launch 5hell and read: makfit -h
</pre>

To use, run the following command in 5hell after building 5hell the first time as per above instructions.

<pre>
Next, run: makfit [path to 5hell.src] 120000
</pre>

(you can use any value above 100000 but 120k seems to have the most favorable time:size ratio)
This will build a new binary with a random file name and then rename the file back to 5hell.

File sizes are based on file name so makfit generates random names until the name produces a binary of the desired size.

Once 5hell is built you do not need the build files anymore unless you plan on rebuilding.

--------------------------------------------------------

### To start using 5hell:

You can use it right away out of the box but more benefits come from the following:

<pre>
|> indicates the prompt, don't type |> for the commands)
</pre>

### create your rootkit folder:

<pre>
|> mkdir /root/rkit
</pre>

populate the folder:

<pre>
|> kore -r
</pre>

-- this will copy /lib/crypto.so, /lib/metaxploit.so and 5hell to /root/rkit

5hell's exploit database is also written to:

<pre>
/root/rkit/database.csv
</pre>

The rootkit may also contain:

<pre>
/root/rkit/dig.bat
</pre>

-- this file is used by the dig command

-- commands written to this file are executed by 5hell after dig uploads and launches 5hell on a target.

-- write this file the same as a 'do' batch file, ie: write 5hell commands to be executed on each line (piping supported)

<pre>
|> pwgen | pwgen hash
</pre>

-- this will write a password table and a hash=password table to /root/tables/tp and /root/tables/t5 respectively

-- these tables are used by: cerebrum -i, brutus, herme5, and hashim for password cracking

-- in public this takes 20 minutes, in nightly it takes about 5

-- you only have to do it once then you can upload the table to other servers (or back it up somewhere)

You may also use:

<pre>
|> cerebrum
</pre>

-- to generate a password table at runtime (takes about a minute)



## Important Notes:


 Beginners should type

<pre>
|> help
</pre>
--For basic help info and a command list.
<pre>
|> help -s
</pre>
--To see info on all commands at once
<pre>
|> help -s [keyword]
</pre>
--To search all of the help info for that keyword (to find commands easier)
<pre>
|> help guide
</pre>
--To get a quick start guide

Beginners should also use 5phinx (sphinx) as this automates most hacking.

Results from 5phinx (or command line hacking) are sent to the BUFFER in memory alpha
type

<pre>
|> malp
</pre>

--to access memory alpha, then press 5 to access the buffer.

If you've built the rkit correctly, you can also simply type:

<pre>
|> dig [ip] [opt: port]
</pre>

and 5hell will do all the heavy lifting for you.

Type exit once dig is done to return to the 5hell session that launched the dig.

Alternatively, edit dig.bat and put
exit dig_complete
on the last line to autoexit and echo completion



# Additional Information and misc


**This section explains a few things about the 5hell in a more detailed manner.**
<pre>
This information is also shown inside the 5hell via the help -s command, 
but for better readability it is placed here as well as the very bottom.
</pre>


### The BUFFER

The BUFFER stores objects. Anything may be stored in the BUFFER.
<pre>
You access the BUFFER with the malp command >> option [5]
</pre>

When an exploit is run, the result is stored in the BUFFER. You
may interact with these objects in a number of ways by selecting them
from the list and using their context menu (if the object has one).
One way to fetch an object from the BUFFER for use elswhere is to use the clipboard:
<pre>
|> clipb @B [index]-- where index == BUFFER[index]
</pre>

-- then pipe the value to another function
<pre>
You may pipe anything into the buffer with |> [command_returning_input] | malp
</pre>

---

### Easy Clip!
 <pre>
You may reference the clipboards with the @ symbol:
clipa, clipb, and clipc are all clipboard spaces
</pre>
<pre>
You may use @a, @b, and @c to reference their values
e.g. echo hello world | clipa |  | poke hello.txt @a
*** tbuf, home, do ***
e.g. gopher @tbuf, e.g. rshell @home, e.g scribus @do
</pre>

---

### Custom Object

The Custom Object is a way for scripts to share information between
nested launches. This means you can launch 5hell with 5hell and pass objects back and forth.
You interact with the custom_object via the various cob commands
Namely: cob get and cob set.

For ease of use: cob get and cob set have been aliased to:
<pre>
-- get and set in 5hell.src
-- |> cob set bob burger is equivalent to |> set bob burger
-- |> cob get bob is quivalent to |> get bob
</pre>

An example would be cerebrum which loads the dictionary to the custom object:
<pre>
-- once loaded, you may run 5hell through nested launches and the dictionary will persist.
-- This also allows you to import/export metaLib's and metaxploitLib's between machines!
</pre>

---

## CONVENTIONS

**While a great deal of 5hell is discordant, there are some conventions:**

**You may toggle the full prompt and minimal prompt by typing:** 
<pre>
prompt 
</pre>
**at the command line**
 
### Input: 

arguments and quote blocks and piping oh my!

***5hell uses a 4 argument system. This means all commands take at most 4 arguments***

*this might sound limiting but it isn't at all in practice. Each of the 4 arguments may be overloaded.*

**Some input methods are:***

<pre>
simply typing input: |> ping 1.1.1.1
</pre>

up to four typed arguments

<pre>
remember that |> is the prompt, you don't type that part
</pre>

using single quotes to wrap text: 
<pre>
|> echo " this is a text block "  
</pre>
would return: **this is a text block**

note that: 
<pre>
|> echo "this is a text block" 
</pre>
would return: **""this is a text** 

this allows you to overload each argument with more than one "word"

easy clip and piping and objects(mostly) are preserved inside of text blocks

use do to run a batch of commands from a file or from memory using an editor

<pre>
|> do -- without arguments do will prompt for number of iterations then open the editor
</pre>
<pre>
|> do 1 -- would bring up an editor commands typed here will be executed in order
</pre>
<pre>
|> do 1 ping 1.1.1.1 -- would result in pinging 1.1.1.1 once
</pre>
<pre>
|> do 5 " rnip 1 | dig " -- would run dig on a random ip 5 times
</pre>
<pre>
|> do 1 -f /foo.bar -- execute the batch of commands in the file foo.bar
</pre>

you may launch 5hell from the game's command line with do parameters

the format is the same as if typing commands on the command line

newlines in the script are considered to be new command line entries

you may use piping, easy clip, and even calls for do to execute further scripts

you may use text blocks for complex commands in place of files or the editor if you wish

<pre>
|> do 3 " rnip 1 | dig |  | cob get metx | meta -i | db -m | zap " | poke test.txt " 
</pre>

this is a bunch of text going into a file 

it is possible to almost completely automate every aspect of 5hell via do and dig

for ease of use do 1 -f has been aliased to bat in 5hell.src:
<pre>
|> bat /foo.bar is equivalent to |> do 1 -f foo.bar
</pre>

**please see do -h and dig -h for more information on automation**

piping input: 
<pre>
|> grep -f ^syst | file -p | cp /etc/passwd
</pre>
would result in copying /etc/passwd over top of system.log (if permissions allowed it)

piping allows you to transfer the output of one command to the [last open parameter] of another command

in the above example the output of grep [args...] is the input of file -p [input]

and the output of file -p [args] is the input of cp /etc/passwd [input]

**please see pipe -h for more**

***if malp is the backbone of 5hell, pipes are the circulatory system of 5hell***

### Prompts: 

**|> , :> , ||:**

<pre>
|>  --  this is the standard Command Line Interface prompt
</pre>
by default there will be information printed before this

toggle to a minimalist prompt with: 
<pre>
prompt
</pre>

-- fires CLI commands

<pre>
|>   --  by default, the GLASSPOOL prompt turns the |> blue
</pre>

this means commands execute on the remote object controlled by glasspool

**see glaspool -h for more**

<pre>
:>   --  this is a liminal prompt, it expects a string or empty return
</pre>

this is used to gather user input within a command

<pre>
||:  --  this is an 'any key' prompt
</pre>
it takes a single keypress

this is used in 'button' driven menus

### Decision Pompts: [ N/Y/X ] [n/y/x]

-- Multiple choice prompts have a default

-- the default is always Capitolized and sometimes highlighted

-- the default is chosen if  is pressed without input

-- unless otherwise noted, default is chosen if input doesn't match a choice
<pre>
E.G: |> psudo
Open shell? [c/y/N]
||:
</pre>

in this example, the choices are [c], [y], and [N]
<pre>
[c] -- enter credentials

[y] -- open shell

[n] or anything else -- no; return/abort
</pre>
this is because **N** is the default

### Prompt: advanced

by default the prompt will display the public and local ip of the active shell

or computer if using glasspool on a computer object

by default the prompt will display computer name and working directory

by default the prompt indicates user privileges (root,user,guest) with:

under the ip information there will be a:

a red line for root, green line for user , and white line for guest

please note that user permissions are determined by access level and not by 'actual' user

you may customize the prompt to your liking in 5hell.src

---

### The dreaded System.log

***Actions that generate an entry in system.log:***

- establishing a net_session on a server (not a router)

- connecting via Browser.exe to a server

- connection established on port ##

- obtaining a shell (server/router)

- shell obtained on port ##

- deleting a file

- file deleted [ip]

- routing a connection with:

- connect_service or file_explorer

- connection routed [ip]

- shell disconnect

- i.e. exiting from start_terminal

- connection closed [ip]

---
Active Traces will start when shell.start_terminal is used
on an npc machine with an active admin of sufficient knowledge and give-a-damn.
Generally, if there is a root: dsession active, using start_terminal will trigger
an active trace. Active traces are stopped by disconnecting (exiting) that terminal instance.

When using 5hell you should NOT ever open a terminal (on a target) unless you are doing an Academic or
Police record mission. OR if you absolutely need to open the browser to edit firewall or port rules
on a target. Otherwise, use glasspool and run to leverage shell object manipulation instead.

However! You should start_terminal on your end point attack proxy. In fact, do it twice:

-- use prox to tunnel to your end point proxy then launch 5hell and type psudo and then select [y]

-- this will start_terminal on top of your start_terminal, effectively looping your connection on that machine

-- this will ensure your end point proxy's ip is left in logs. Without this, you risk exposing ip's behind the proxy.

***note: this means you'll have to 'exit' twice from that proxy to return home
Passive Traces can/will start when certain actions have been left unaddressed:***

- ***Deleting a file and not removing the log entry***
- ***Leaving a connection closed log without a corresponding connection established log***
- ***Leaving a shell connected log at all***
- ***I think connection routed logs trigger traces, too. Not sure though.***

We all leave logs, sometimes. To clean them up, here are a few methods:
<pre>
Silentclean -- local log corruption using a text file
</pre>
creates a file used to corrupt logs

**has nuke option (see: silentclean -h)**

<pre>
Rclean -- remote (or local) log corruption using objects
</pre>
uses a file already on system to corrupt logs

accepts and works on piped objects see: 
<pre>
rclean -h
</pre>

### MV 

yep, just the mv command

<pre>
poke haha | mv haha /var/system.log
</pre>

Wiping the log with one of these methods using a reverse shell is best
but not necessary. 

You may run: 
<pre>
silentclean, exit 5hell, exit the terminal, and you will not leave a disconnect log.
</pre>
***be aware that taking any log-creating action after running sc, except exiting, may regenerate the log.***



## Main tools

<pre>
probe -- whois and portmap a target
</pre>
<pre>
db -- scan target and database results
</pre>
<pre>
meta -- metaLib and metaxploitLib fine control
</pre>
<pre>
zap -- select and fire exploits one at a time (does not database)
</pre>
<pre>
roil -- fire all exploits at once (does not database)
</pre>
<pre>
malp -- Memory Alpha: BUFFER management
-- exploit results and other objects go here
-- this is arguably the backbone of 5hell
</pre>
<pre>
scpm -- menu and/or cli driven scp
</pre>
<pre>
kraken -- proxy management
</pre>
<pre>
scribus -- simple text editor
</pre>
<pre>
cerebrum -- add 325k+ passwords to custom_object.dictionary
</pre>
<pre>
brutus -- use custom_object.dictionary to get root on any (unmodified) npc machine
</pre>

**See: [command] [-h|help] for more help on these and other commands**


## Aliases

**Aliases || Shortcuts || Macros || or is it Macro's ? || User Defined Behavior**

5hell can be very simple to use, or very, very complicated, depending on your goals.
It isn't necessary to learn 100% of 5hell. Nor is it necessary to suffer through some of it's
more complex chains of commands. You can define your own behavior in a number of ways:

Aliases: 
 You may define aliases in the aliases section of 5hell.src
the default ones supplied are all prompt replacements. There are also 'easy clip' defenitions
that replace arguments in the user input with, for instance, the contents of a clipboard or
your @home server ip. These hard coded aliases may be more complicated than a simple
word or string replacement. You may, for instance, have a simple two word alias fire
a whole series of commands. This might be considered a macro at that point, but also
might not quite qualify.

Here is a list of the currently defined default aliases in 5hell.src:

<pre>
Alias           | Definition
bat [path]      | do 1 -f [path]
set [key] [val] | cob set [key] [val]
get [key]       | cob get [key]
lock            | perms lock all
exit            | quit
sc [opt]        | silentclean [opt]
gp [#]          | glasspool [#]
prompt          | -this will toggle the full_prompt on/off-

Easy Clip       | Replacement
@a              | clipa -- globals.clip_board_alpha
@b              | clipb -- globals.clip_board_beta
@c              | clipc -- globals.clip_board_gamma
@tbuf           | transmission buffer -- globals.T_BUF
-- this is      | where hashes go when the tree command finds them
@home           | HOME_SERVER ip address defined in 5hell.src
</pre>

***Please note: several commands have their own references for editing the clipboards***

-- these commands will use @clipa, @clipb, @clipc instead of @a, @b, @c
Further, the clipa, clipb, and clipc will use @B to reference the BUFFER:

-- e.g: 
<pre>
|> clipa @B 1 -- copy the object at index 1 in the BUFFER to clipa
</pre>
-- that object may then be used by other commands that accept piped objects as input

-- there are other ways to pipe objects around besides the clipboards, explore to learn more.

---






# Documentation
<pre>
This is the same documentation the command 'help -s' would show inside 5hell
</pre>

### air

<pre>
air: aircrack menu. Saves cracked .cap files to current path and reads those files from current path. 
Advanced: air [-f|false] -- same as command.iwlist, prints wifi nets in range and exits.
Advanced: air -c [/path_to_file.cap] -- uses aircrack to return passkey from file.cap
Advanced: select option [h] within air to activate detection of hidden wifi signals.
-- You must be within range (on the same network) to detect and connect to these non-broadcasting signals.
-- This allows bypassing firewalls in many instances.
</pre>

---

### append
<pre>
Usage: append [path_to_file] [text] (works best with pipe) --  add text to end of file.
Usage: append [file_object] [text] -- append text to file object
-- pipe file object to clipa/b/c and use @a/b/c to reference
-- eg: clipb @B 1 -- where BUFFER[1] is a file, then: append @b [text]
Usage: append @clipa|b|c [text] -- append to the end of a clip space.
N.B. @clipa and @clipc will append text directly with no new line. 
 -- @clipb will add a new line and then append text.
</pre>

---

### aptm
<pre>
Apt-Get Menu
Usage: aptm -- apt-get menu: 
-- manage apt functions
-- add/remove/search repositories.
Usage: aptm [piped_aptclientLib] -- change scope of aptm to supplied lib
-- eg: bios -a | cob set apt | exit
-- when used on a remote 'silent launch' of 5hell
---- pipes aptclientLib to the custom object then exits back to original 5hell
-- cob get apt | aptm
---- pipes aptclientLib to aptm and changes scope of aptm to remote
Advanced: press [7] hot_swap_libs in aptm 
-- reloads meta/crypto/apt to use latest versions after updating
</pre>

---

### bios
<pre>
OBJECT | MEMORY | BIOS | CERBIOS
Usage: bios -- system info
Advanced:copy the following to 5hell's command line:
mkdir /virt | poke /virt/hdd.io dev_sda:SIZE 
-- replace SIZE with the maximum size of your hdd in bytes. 
-- this lets bios report the remaining hdd space
Usage: bios -a -- return the currently loaded aptclientlib object
Usage: bios -m -- return the currently linked metaLib object
Usage: bios -x -- return the currently loaded metaxploitLib object
Usage: bios -c -- return the currently loaded crypto object
Usage: bios -n -- return the currently linked netsession object
Usage: bios -p -- return the currently loaded port_map object as a string
Usage: bios -H -- return the currently linked herme5 meta.mail object
-- returns null if not logged in to a mail account
Usage: bios -s -- return the currently loaded meta_scan information as a string
Usage: bios -P -- return the currently loaded port_map object as a map
Usage: bios -X -- return the currently loaded XPLOITS as a list
Usage: bios -M -- return the current MEMORY object or null
Usage: bios -B -- return the global BUFFER as a list
Usage: bios -r [opt: ip] -- return the local router object [opt:ip]
Usage: bios -i [path] -- runs include_lib on path and returns result
-- init.so, net.so, kernel_module.so cannot be imported as they lack an API
-- prompts for path if path not supplied
---- e.g.|> bios -i /lib/blockchain.so | malp 
---- returns the blockchainLib object and pipes it to malp (to the BUFFER)
---- note: cannot include_lib net.so, init.so, kernel_module.so
------ only libs with API's may use include_lib
------ use meta link to load those with the metaxploitLib
</pre>

---

### brutus
<pre>
Brutus: dictionary attack psudo brute force type tool
Usage: brutus -- attempt to gain root pass and shell using onboard dict_a 
(Default onboard dict_a: [1] passwords)
-- on success sends shell to BUFFER and password to clipa
Usage: brutus -i [/path|object] -- import dictionary (may be csv or newline separated values)
-- 5hell will attempt to determine the type. Please ensure valid inputs.
-- accepts: path to file or folder, or piped file/folder object
-- See dfit for making a.csv from newline separated dictionary file.
-- See cerebrum for altering onboard dict_a
Advanced: brutus -s [shell_object] [ip] -- use shell_object to initiate ssh + brutus attack against ip 
(equal to command.ssh root@-brutus [ip] but uses the given shell instead of active shell)
cad
cad: cloak and dagger protocol.
Usage: cad [optional: ip ] -- or enter rshell-server ip at prompt
Creates ps.src in current path. 
Review ps.src and build with make or makfit into /bin
Remove .src, run /bin/ps once with metaxploit.so present then remove metaxploit.so
The result is a hidden backdoor on the target. Use with care.
</pre>

---

### calc
<pre>
calc [arg1] [arg2: + - * / (or: add, sub, mul, div)] [arg3] 
calc (a)sin/(a)cos/(a)tan/ [arg]
calc pwr/abs/sqrt [arg]
calc [min] rnd [max] |or| calc rnd [max]   (min=0)
calc [arg1] pwr [arg2]
calc [arg1] == [arg2] (check if equal.)
Use pi to indicate pi. eg: calc pi || calc pi / 2 || calc cos pi || etc
N.B. If an input is a function it will be evaluated
-- EXCEPT when using the equals function (ie x == y)
-- in this case function pointers will be compared.
You may use @a or @clipa, @b or @clipb, @c or @clipc to reference the clipboards.
-- ie calc @a + @b
Returns: evaluation as string.
calc [n] base [p] -- retruns the [p].adic representation of the number to evaluate.
e.g. 42 base 2 -> 101010
</pre>

---

### cat
<pre>
File Contents || cat || what's in that file
Usage: cat [path_to_text_file|file_object] -- returns contents of text file or null if read denied
Usage: cat [file_object] -- returns contents of piped file object
-- e.g: grep -f passwd | cat 
Usage: cat [-n|--noparse] [path|object] -- return contents of text with richtext tags escaped
cc
: carbon copy: command buffer.
Usage: cc -- select command from history.
Usage: cc [#] -- where # corresponds to the command you wish to run from the command buffer.
-- will return the output of the commands as if they were run normally.
-- you may use cc inside of pipe chains.
---- e.g: cc 22 | echo | cc 10 | poke file.txt
cd
Usage: cd [path] -- change current working directory to path.
Usage: cd .. -- go back to parent directory.
Usage: cd -- return to home directory.
Returns: 0 on success or string on failure.
</pre>

---

### cerebrum
<pre>
Magnum Cerebrum || Big Brain || dictionary || word list || rockme
Usage: cerebrum -- Expand dict_a to 300k+ passwords and store in custom_object.dictionary
-- Use pwgen instead to save passwords locally to file.
Advanced: cerebrum -i [/path/to/file|file_object|list] -- import a custom dictionary
-- file may be csv or nsv: ',' or char(10) 
-- may be file, directory, piped object, or list
Usage: cerebrum --purge -- purge the onboard dictionary (to save memory).
Advanced: cerebrum -p -- load only common player passwords (wip)
Advanced: cerebrum -i @home -- import dictionary file or folder from @home server
-- searches /root/tables/tp on @home server
-- see help @home for more information about the @home server.
</pre>

---

### chop
<pre>
CHOP || DELIMITER || FILE TOOLS || clipboard tools
Usage: chop [path_to_file|@clipa|b|c] [index] [delimiter] [output_filename] -- chop a file
param: path_to_file -- file to chop
-- if path_to_file is @clipa, @clipb, or @clipc it will chop the clipboard instead
-- clipboard contents must be a string
param: index -- keep column of elements at index of split
-- default: 0
param: delimiter -- split each line at this pattern
-- default: char(32) aka a sapce
param: output_filename -- name for outfile
</pre>

---

### clear
<pre>
Clear Screen || Terminal Wipe || clearscreen
Usage: clear -- clears the terminal of all text
clipa
clipboard alpha || clipa || clipspace
Usage:
 clipa: pipe outputs to clipa with: command | clipa
 clipa [optional:arg|string|list|map|@tbuf|@cc|@B {opt:-m|#}]
-- add any of the above to clipa
clipa -- Returns contents of clipa if no arguments.
scribus @clipa -- edit clipa directly with the text editor.
</pre>

---

### clipb
<pre>
clipboard beta || clipb || clipspace
Usage:
 clipb: pipe outputs to clipb with: command | clipb
 clipb [optional:arg|string|list|map|@tbuf|@cc|@B {opt:-m|#}|function]
-- add any of the above to clipb
clipb -- Returns contents of clipb if no arguments.
scribus @clipb -- edit clipb directly with the text editor.
N.B. please be awake that command.append works a bit differently with clipb than with clipa or clipc.
-- see append -h for more info.
</pre>

---

### clipc
<pre>
clipboard gamma || clipc || clipspace
Usage:
 clipc: pipe outputs to clipc with: command | clipc
 clipc [optional:arg|string|list|map|@tbuf|@cc|@B {opt:-m|#}]
-- add any of the above to clipc
clipc -- Returns contents of clipc if no arguments.
scribus @clipc -- edit clipc directly with the text editor.
</pre>

---

### cob
<pre>
Cobble || custom object || cob || meta buffer
Usage: cob set [key] [val] -- set custom object key to val.
-- returns string on success or error
Usage: cob get [key] -- get value of custom object key.
-- returns value at key or null
-- returns @reference (pointer) if value is a function
Usage: cob return -- returns the raw custom object
-- pipe to command.code to decompile the object.
-- ie: cob return | code
Usage: cob inspect -- returns key/value pair information of custom object
-- returns a string pairing each key with its [trucated] value
-- values are truncated to make the object easier to inspect
-- please use cob return | code if you want the raw output
Usage: cob indexes -- return custom object indexes as a LIST
-- pipe to the string command to stringify
Usage: cob search [val] --  search for index of val.
-- returns string; key or failure message.
Inactive: cob sign -- future ability to sign custom object.
-- currently returns 0 (zero).
Usage: cob del [key] -- delete key and its value from custom object.
-- returns string on success or failure.
Usage: cob purge -- purge the custom object
Usage: cob install [key] -- install a function residing in the custom object at [key]
-- this will add the function as a 5hell command (it will show up in help)
-- functions must still follow the standard template to avoid errors
-- the funciton will not persist after 5hell is closed
-- please compile your custom function into 5hell.src for persistent functions
Advanced: the cerebrum command loads the dictionary to the custom object
-- it is loaded to custom_object.dictionary and can be removed by passing the 'purge' param to cerebrum
-- this is allows you to use the dictionary between nested shell.launches with only a single run of cerebrum.

N.B. -- since version 3.8.3 5hell.src contains aliases for cob set and cob get:
Usage: set [key] [value] -- same as cob set [key] [value]
Usage: get [key] -- same as cob get [key]
</pre>

---

### code
<pre>
character code || cipher || encryption || || decryption || decompiler
CODE encode and decode utility
Supports standard Caesar cipher and 5hell's MuninCipher for encryption.
May also return ascii character codes, decompile objects, and execute functions.
Usage: code [char] -- returns ascii code for char
Usage: code -c [int] -- returns ascii char(int)
Usage: code [any_function|any_object] -- sends object to decompiler to view object map.
-- will evaluate piped functions.
Advanced: code [-d|-e] [word] -- decode|encode a word using standard caesar cypher
Advanced: code [-a|-b] [opt:input] -- encode|decode using MuninCipher(tm)
-- prompts for input if not supplied
-- enter text to encrypt|decrypt on a single line up to 40,000 chars
-- if input is more than one word use without params for prompt
-- or use piping or an input file (see -f options)
Advanced: code [-f|-fa|-fb] [/file/path|file_object] -- encode|decode contents of file
-- option [-f] [path] -- prompts for enc/dec
-- option [-fa|-af] [path] -- encode contents of path with MuninCipher
-- option [-fb|-bf] [path] -- decode contents of path with MuninCipher
N.B. MuninCipher is tamper resistant! Attempting to copy/paste the cipher text can/will corrupt it!
</pre>

---

### cp
<pre>
COPY || copy files || CP
Usage: cp [/old_path] [/new_path] -- copy file or folder to new_path 
Usage: cp [/old_path] [@] -- copy old path to current path and use original file name
Usage: cp [/old/path] [/newpath/newname] -- make a copy of a file with a new name/path
Usage Example:
-- cp /root/file.txt @ 
---- copies file.txt to the current directory with name: file.txt
Usage Example:
-- poke /root/haha |  | poke /root/heehee |  | cp /root/haha /root/heehee
---- creates files haha and heehee then copies haha over heehee, overwriting heehee
Usage Example:
-- poke haha |  | grep -p syst / | cp haha
---- create file haha, grep for (system.log) and return file_path, overwrite /var/system.log with haha
credits
credits
</pre>

---

### db
<pre>
DB || dbaser || Databaser
Automated remote port and local lib scanning and databasing.
Results are sent to the BUFFER.
Database is saved to ~/rkit/database.csv
Logs: logs will be left by db when:
-- a net_session is obtained on a server (not a router):
-- connection established port ##
-- a shell object is obtained on any machine:
-- shell obtained on port ##
Note: logs may be left in other ways. See: help logs for more.

Note: targetIP and targetPort are set with probe and/or target

Usage: db [-r] [opt:ip] [opt:port] [bool:inject]
-- scans given port and databases results
-- uses targetIP and targetPort if not supplied
-- supplying [1] for inject boolean results in a prompt
---- enter a lan_ip or password for the inject value at the prompt
Usage: db -r [ip] * -- db all ports at given ip
Usage: db -r * -- db all ports of targetIP

Usage: db [-l] [opt:lib_name] [bool:inject]
-- scan a local lib and database resutls
-- brings up menu if lib_name not supplied
-- supplying [1] for inject boolean results in a prompt
---- enter a lan_ip or password for the inject value at the prompt
Usage: db -l * -- db all local libs

Usage: db [-m] -- scan currently linked metaLib
-- unlike other modes, this mode will not link a new metaLib
-- instead, it scans the already linked metaLib
---- use meta link [piped_metaLib] to choose a metaLib to scan
---- use meta -i [pipe_metaxploitLib] to choose the scanning metaxploitLib
---- see meta help for more

Note: Use meta link and meta scan to scan without databasing
Note: It is not possible exploit/database libs that are not in the /lib folder
</pre>

---

### dfit
<pre>
Usage: dfit [path_to_file]
Takes text file and splits contents by newline, joins by comma and outputs to a.csv by default.
As the name suggests, this is for making dictionary files. Output is a csv (comma separated values) file.
</pre>

---

### diff
<pre>
DIFF || DIFFERENCES || FILE COMPARE || TEXT COMPARE
Usage: diff [input_1] [input_2] -- standard diff tool
Usage: diff [file_1_path|file_1_object|text_block_1] [file_2_path|file_2_object|text_block_2]
-- compares text of input_1 to input_2 and prints output
-- prints differences when encountered
-- input_1 text is prepended with the - character
-- input_2 text is prepended with the + character

Input notes:
:: if input_1 or input_2 are single words they are processed as paths to a file
:: if input_2 or input_2 are more than one word (ie piped text) they are processed as strings
:: does not process binary files or lists
:: -- for lists pipe the output of string [yourlist]
</pre>

---

### dig
<pre>
DIG v 2.1 Netcrawler || Autohacking || Automation
Usage: dig [-s|ip|port] [port|ip] [opt:--edit] -- auto-infiltrate a target
-- runs db on target [ip] and [port]
-- infiltrates via shell if found
-- uploads rkit and runs 5hell on the target
-- gains root and wipes the log
-- performs other taskes as defined by the user in dig.bat
-- dig.bat may contain docalls (do # -f your.file) to daisy chain digs
Note: dig may take port and ip in any order
-- not supplying a port defaults to port 0 aka the rouer
Usage: dig -s -- will scan the internet for a suitable target
-- uses database.csv to choose targets with known kernel_router versions
-- if the matched router has a shell exploit, dig will auto infiltrate as normal
-- susses out random ips until a match is found
-- sussing routers does not leave a log if no shell is found
Note: edit /root/rkit/dig.bat to customize behavior
-- by default you will be prompted to exit 5hell when dig completes
-- type 'y' to exit and return to the script that launched dig
-- or add quit dig_complete to exit automatically with an echo
Note: supplying --edit as argument three will open dig.bat in scribus
-- dig will continue as normal after editing is complete
-- you may add/remove commands to be executed by dig here
Note: supplying --edit as agrgument one will open dig.bat in scribus
-- dig will then exit after editing the batch file.
Usage example:|> rnip 1 | dig 
Usage example:|> dig 1.1.1.1 22 --edit
Usage example:|> do 20 | dig -s
</pre>

---

### do
<pre>
DO || SCRIPTING || AUTOMATION || NOT BASH || BATCH COMMANDS
The scheduling or automation service for 5hell. You write a set of
commands for 5hell to do. Commands may be entered in-line on the
command line, entered into a text editor buffer, or read from a text file.
see also: do help extra -- for some example do scripts
-- see also: help prompt, dig -h, scribus -h
Do may be launched in a number of ways, depending on your goals:

Usage: do [int] [command] [arg1] [arg2]-- perform [command] [int] times
-- passes arg1 and arg2 to the command
-- use text blocks to pass complex arguments and/or complex commands
-- eg: |> do 3 " rnip 1 | probe | db -r | zap " 
-- eg: |> do 1 poke test.txt " this is a bunch of text " 
---- note: in practice the above line can be done without the do 1
---- it's just an example of how you would supply complex parameters to do
- - - - - - - - - - - 
Usage: do -- without arguments will prompt for iterations then open the editor
Usage: do [#] -- supplying iteration without a command opens the editor immediately
-- enter commands into the editor and enter @ on a newline to begin execution
-- the commands in the editor remain until changed and therefore may be rerun/reused
-- you may use scribus @do to edit the do buffer without firing the script

Usage: do [int] -f [/path] -- perform commands in [/path] [int] times
-- the preferred method of firing a 'batch' of commands
-- many examples may use a .bat extension but the .bat extension is not enforced at all
-- it is just a convention, you may name them whatever you wish except:
---- dig.bat must be named dig.bat in order for dig to use it (see dig -h)
-- nested calls to the do command within these files are valid and encouraged
---- dig.bat: cerebrum | brutus | run /home/guest/rkit/5hell " do 1 -f file2.bat | exit done " 
---- file2.bat: rshell @home | sc -d | exit rshell_placed
-- by placing these two files in your rkit folder and running dig [ip] you are able to:
---- automate: infiltrating and placing a root rshell on the target
----- removing your rkit
----- and cleaning the log
Alias: do 1 -f [path] has been aliased to bat [path] in 5hell.src

You may launch 5hell from the game's command line with a 'do' instruction:
-- instead of launching 5hell simply by typing '5hell' you may launch with:
----# 5hell do [#] [opt:-f] [command|path]
-- and 5hell will launch and immediately begin running the given commands
-- 5hell will then drop to the exit prompt;
---- press 'y' if you wish to exit, press enter or any other key to continue running
This allows 5hell to launch 5hell with instructions to launch 5hell with instructions to...
-- keep in mind there is a game limit of 15 nested uses of shell.launch
-- but no limit to the number of uses of shell.launch; meaning do 1000 dig -s is completely valid
</pre>

---

### echo
<pre>
ECHO || echo || Echo || echO
Usage: echo [up] [to] [four] [params] -- returns concatonated params to the terminal

General usage is to echo text back to the terminal during batch script/macro execution.
However, it may also be used to feed input to another command or concatonate outputs
of multiple commands. You may use floating quotes (single quotes not touching another
character) to wrap complex input parameters. Examples:
|> echo bob burger  --  output: bob burger
|> echo " Eat at Joe's Diner. " Because " it's the best. " 
-- output: Eat at Joe's diner. Because it's the best.
|> echo three four | echo one two -- output: one two three four
Here's a fairly useless example, lol:
|> cat file.txt | echo | poke file2.txt | cat | echo | poke file3.txt
</pre>

---

### enum
<pre>
enumeration || ENUM || enum buffer
Use this to put things in a list.
Usage: enum [opt|/path|file_object|array|#]
Usage: enum [list|string] -- enumerates a list or a newline separated string
-- if the string is a single word it will be interpreted as a path
-- multiple words on a single line (piped) will be interpreted as a single entry
Usage: enum [path|file_object]
-- enumerate file contents as a list of strings
-- useful for 5hell scripting (see the 'do' command).
-- e.g: enum file.txt | enum 1
---- enumerate file.txt then return index [1] from the list
Usage: enum -l  -- return the length of enum buffer.
Usage: enum -s  -- show the enum buffer and return the length
Usage: enum -d  -- enumerate the onboard dictionary (depricated)
Usage: enum [#] -- return the element at index # in the enum buffer
Usage: enum -i [index] [element] -- insert element at index 
Usage: enum -e -- return the enum buffer as a list
-- shifts everything below it down
Usage: enum -a [element] -- append element to end of enum buffer
-- unlike enum [string] you may use enum -a [string] to append a single word to the enum buffer
fakepass
Usage: fakepass [opt:ip] [opt:pass] -- create passwd.src in current_path. Check src and build to /bin/passwd. PW capture malware.
felix
Usage: felix -- file explorer v 0.2, (wip). Use arrow keys to navigate. Press / to manually type a path.
Advanced: felix [shell|computer|file] -- run felix on filesys of piped object.
e.g. clipb @B 1 | felix -- where BUFFER[1] contained a file, shell or computer.
</pre>

---

### file
<pre>
File || File Properties || Inspect File
================================
Usage: file [opt:-l|-c|-b|-r|-n|-p] [/path|file_object] [opt:shell|computer|file]
 File shows the properties information for the given file 
and takes path or file_object and returns file information as a stirng.

Usage: file [opt] [/path] -- return information about the file at /path
UsagE: file [opt] [object] -- return onformation about the file object
Usage: file [opt] [/path] [object] -- return file info for file at path on object
-- computer and shell objects: relative paths use present working directory
-- file objects: must use absolute path
-- file objects: will be searched from  the / directory
Advanced: file [opt] [f_object] [object] -- will still return info of f_object; object is ignored
Usage: 
-- file [-l] [path|object] [opt:object] -- return number of lines in the file as a string
-- file [-c] [path|object] [opt:object] -- return number of chars in the file as a string
-- file [-b] [path|object] [opt:object] -- send file to BUFFER (and display file info)
---- also returns the file as an object
---- eg: grep -f *#.log$ /var | file -b
-- file [-r] [path|object] [opt:object] -- return the file as an object
-- file [-n] [path|object] [opt:object] -- return the name of file 
-- file [-p] [path|object] [opt:object] -- return the path of file
- - - - - - - - - - - - - - - - - -
---- eg: clipb @B [#] | file -p -- return the path of the piped file object
---- eg: file [opt] [path|file] [shell|computer] -- run file on the remote object instead of locally
</pre>

---

### fwr
<pre>
Usage: fwr [ip] -- returns firewall rules for ip. returns local rules if no ip given.
</pre>

---

### games
<pre>
games: battleship and blackjack !
</pre>

---

### glasspool
<pre>
Glasspool sshfs shell/computer mirroring || GP || glassp
Switches scope of commands to a supplied object
Usage: glasspool [object: shell|computer] -- switch scope to piped object
Usage: glasspool [#] -- switch scope to the shell or computer at BUFFER index #
Usage: glasspool -r [#] -- switch scope to reverse shell at rsi index #
-- n.b. rshell index starts at 1 not 0 !!
Usage: glasspool [-m|menu] -- display BUFFER and RSI menu and switch scope to selection
Usage: gp [option] -- abreviation for glasspool, for qol
N.B. -- glasspool is the glassp option in rsi and malp
N.B. -- commands that are local only will not translate through glasspool
N.B. -- the term 'glass puddle' refers to glasspool in computer object mode
</pre>

---

### gopher
<pre>
Gopher: decipher tool
Usage: gopher [/path/to/file|file_object|hash_string|hash_list|@tbuf] -- decipher hashes using onboard dictionary or crypto.decipher.
-- outputs to /current_path/dump.txt
-- see cerebrum for dictionary options.
-- gopher [/path] -- decipher contents of path
-- gopher [object] -- decipher piped file object
-- gopher [list] -- decipher piped list of strings
-- gopher [string] -- decipher hash string (with or without preceding user: )
-- gopher @tbuf -- deciphers contents of @tbuf
-- tbuf is set when tree encounters a user:hash pair in /home or /etc/passwd
-- eg: gopher user:ee11cbb19052e40b07aac0ca060c23ee or gopher ee11cbb19052e40b07aac0ca060c23ee
N.B. function takes string, file_object, list. function writes to dump.txt. function returns string.
Advanced: gopher runs recursively on each line therefore each line of a file or list or string may:
-- be a user:hash string
-- be a hash string
-- be a path to a file
-- contain a list of the aforementioned types
</pre>

---

### grep
<pre>
GREP || get regular expression || regex
Usage: grep [opt:-f|-n|-p] [pattern] [opt: search_path (default: / ) | object] 
-- supports partial matches and limited regular expressions.

Usage: grep [pattern] [search_path|object] -- grep for text in files and folders
-- searches for text matching a given pattern
-- returns all matching text, with line numbers and positions, found in search_path
-- search_path may be a file, or folder, or object
-- descends folders and files from search_path
-- descends from / on object if search_path is a shell or computer object
-- descends from path of file if search_path is a file object

Usage: grep [-f] [pattern] [search_path|object] -- grep for file
-- searches search_path or piped object for a file with name matching pattern 
-- piped computer and shell objects will be searched from the / directory.
-- piped file objects will be searched from the path of the file.
-- returns a file object for the first match in the file tree
---- what coutns as a first match is still a w.i.p....

Usage: grep [-n|-fn] [pattern] [search_path|object] -- grep for file name
-- searches search_path for file with name matching pattern
-- returns the file name as a string
-- uses the same search method as -f
-- the -fn option is equivalent to the -n option

Usage: grep [-p|-fp] [pattern] [search_path|object] -- grep for file path
-- searches search_path for file with name matching pattern
-- returns the file path as a string
-- uses same search method as -f
-- -fp option is equivalent to -p option

current regex tokens (more planned):
c   matches any literal character 'c'
-- bob matches bob anywhere in the text.
^   match pattern from beginning of word
-- ^ber matches bertha  does not match robert
$   match end of line (goes at end of pattern)
-- .txt$ matches file.txt does not match file.txt.src
#   matches one or more of preceding character
-- c# matches c, cc, ccc, cccc 
*   matches any unicode char (wildcard)
-- *#:*#  matches root:password, email@domain.com:password, xyz:1234
- - - - - - - - - - - - - - - - - - - - - - - - - 
Important! Runtime depends on length of pattern and size of text to check. 
Since grep will recurse any folders in a given path, this command could result in very long run times. 
It is up to you to limit the scope of your searches accordingly.
</pre>

---

### grp
<pre>
GROUP || ADD GROUP || CHGRP
Usage: grp [optional: -r -- recursive] [new_group] [path] 
Usage: grp [add|del] [group] [user] -- add or remove group to|from user.
Usage: grp -u [user] -- returns groups associated with user
Usage: grp -f [path] -- returns group associated with file at path
-- Do not name group add or del for #reasons.
-- It is good practice to run:
|> usr -r root / | grp -r root / | rm /etc/passwd | lock 
for optimal security.
</pre>

---

### hashim
<pre>
hashim: hash daemon
Usage: hashim [-d|-f] [path] -- listen on [path] and decipher contents using tables/t5
-- default path is /root/pass
-- -f == run once on specified path
-- -d == run as daemon on specified path
N.B. Please run  pwgen hash  to setup resources for hashim.
n.b.b This command requires root access and it is recommended to use, along with pwgen, on a dedicated server due to the number of files involved. ie try not to spam hashim servers. a single one works wonders.
Extra: hashim [-h|help] [extra] -- extra help page with extra help info.
</pre>

---

### ifconfig
<pre>
Usage: ifconfig [option:-l|local -p|public] --  returns ip and gateway information
Usage: ifconfig [-c|connect] [lan_ip] [gateway] -- connect via ethernet to gateway and request lan_ip.
Usage: ifconfig -d -- list network devices
</pre>

---

### ipfit
<pre>
Usage: ipfit -- menu to specify a way to generate ips. (wip)
Recommendation: pipe the output to a file or to the clipboard.
e.g ipfit | clipb , or ipfit | poke iplist
</pre>

---

### iwlist
<pre>
Usage: iwlist -- returns wifi networks in range. (uses command.air false)
</pre>

---

### jtr
<pre>
John The Ripper password generator
Usage: jtr [word_length(1-15)] [set_size] [opt:aAns] [opt:1]
a - lowercase alpha
A - uppercase alpha
n - numbers
s - special characters
note: at least ONE option must be selected
1 -- optional only first letter is upper case (any value here is considered 1/true), leave blank for false.
</pre>

---

### kill
<pre>
KILL || END PROCESS || TERMINATE SCRIPT
Usage: kill [PID] [opt: shell|computer] -- terminate PID
-- PID should be process number or ALL
-- see the ps command for process ID's
-- kill ALL will attempt to close all programs.
n.b. if kill ALL kills the terminal that launched the program,
---- it might not complete its task.

Usage: kill [process_name] [opt: shell|computer] --
-- kill processes by process name instead of PID
-- NOTE: kills ALL processes of that name

Note: piping a shell or computer object runs kill on the object instead of locally
Note: running kill while glasspool is active runs kill on the active object
</pre>

---

### kore
<pre>
KORE 3.0 || AUTOMATION || HELPER || GODDESS of the DEAD and GRAIN

Usage: kore [-r|--rkit] -- automatic rkit generation
-- copies metaxploit.so, crypto.so, and 5hell to home_dir/rkit

Usage: kore [-s|--secure] -- automatic secure system:
-- runs: usr -r root / | grp -r root / | rm /etc/passwd
----     grep -f Bank | rm |  | grep -f Mail | rm | lock

Usage: kore [--hdd] -- prompts for hdd size in bytes
-- writes size to /virt/hdd.io
-- bios uses this to report remaining hdd space
</pre>

---

### kraken
<pre>
Usage: kraken [optional: upload_path] propagate file or folder to all proxies, chlock, delete /etc/passwd using Config/Map.conf
shortcuts: kraken connect == prox
shortcuts: kraken scrub == scrub
Usage: kraken [/path|prox|scrub|-l|buffer] -- shells will be sent to BUFFER.
New: kraken [command] [-s] -- run silentclean locally on each proxy after command. (if silentclean is installed on that system)
Advanced: kraken [add|del|show] [opt:ip] [opt:pass] -- add|remove items to|from Map.conf or display current map.
Usage: kraken show -p -- show proxy list with passwords.
New: kraken -l  -- download logs from proxies (and then scrub)
Usage: kraken -- launch kraken menu
NEW: kraken will no longer scrub logs by default! 
-- please use kraken scrub or the shortcut scrub to clean corrupt proxy logs.
Logs are still scrubbed by default when running:
-- kraken -l, kraken connect, prox (shorcut for kraken connect)
-- kraken scrub, scrub (shorcut for kraken scrub)
Kraken will not autoscrub for:
-- kraken [path] and/or  kraken buffer
</pre>

---

### lanpro
<pre>
Usage: lanpro [ip] -- full lan scan. returns only lan addresses.
Does not autoset ip or portmap for 5phinx. Use probe -f instead.
</pre>

---

### liber
<pre>
Usage: liber [/path/lib_file] -- returns library name and version
--e.g: liber /usr/cache/libhttp.so -- get name and version 
Usage: liber -l [libname] -- returns above for libname located in /lib/
--e.g: liber -l libssh.so -- get info for /lib/libssh.so
Usage: liber -l -- print version info for all shell objects in /lib
Usage: liber [/folder] -- print version info for all shell objects in folder
Usage: liber -i [/path/lib_file] -- returns an imported lib object from path
--e.g: liber -i [/lib/blockchain.so] | malp -- imports lib and pipes to malp (BUFFER)
-----: liber is limited to the scope of the metaxploit object in use.
-----: This means it is meant for local use. Not suitable for remote or glasspool use.
</pre>

---

### linkdb
<pre>
Link Database
Uasage: linkdb [target_lib] [optional:path_to_database] -- link a lib in the database that matches target_lib
-- eg: linkdb 1.0.1 -- prompts to link any entry that contains 1.0.1
Usage: linkdb [target_lib] @home -- uses connect_service to access remote database for linking
-- set ip, port and pw with launch params or the target command.
-- eg: linkdb kernel @home -- connects to machine at target ip and prompts to link any entry that matches 'kernel'
</pre>

---

### ls
<pre>
List Files | List Folders | File Details
Usage: ls [opt: -l|-a|-la] [opt: /path] -- list files in path
OPT: -l -- list file details
OPT: -a -- list all files (including hidden .files)
-- deprecated shall all flag is now implicit (always on)
-- -a and -A are now equivalent
OPT: -A|-a -- list files alphabetically 
-- by default files and folders are listed from first created to last created 
Note: option flags may be combined. ie: -la
</pre>

---

### mail
<pre>
Mail || metaMail || herme5 || hermes || mail client
herme5 mail client: its the mail (wip) -- its good enough but you may want to write your own;
-- name your function command.mail  to overwrite this one.
-- see 5hell.src, template.5pk.src for instructions.
Note: You may overwrite any command this way.

- - - - - - - - - - - - - - - - - - - - - - - - - - - -
Usage: mail -- opens the herme5 mail menu
Extra: when prompted for a password you may enter: -brutus
-- this will invoke brutus and attempt to crack the email password.
-- the password will be saved to the custom object as:
-- key == password and value == public_ip:local_ip
---- this will change once i work out a better storage system bc this is not ideal
Extra: when viewing your inbox you may type spool to dump all mail to a file (up to 160kb)
</pre>

---

### make
<pre>
Make || Build
Usage: make [/path/file.src] [/destination/folder] [bool_importable: true/false | 1/0]
-- build the .src file and ouput to destination folder.
-- final file name will be input file name with .src stripped.
-- e.g. make /root/src/5hell.src /bin 
-- build 5hell.src into a binary and output to: /bin/5hell
-- n.b. make requires the source file to have the .src extension.
-- importable code can be imported by other sources when building.
-- this allows you to build programs with more than 160 characters by importing multiple source files.
</pre>

---

### makfit
<pre>
File Compression || File Size || MAKFIT
Make it fit file compression tool by Plu70
File sizes are (mostly) determined by name. This tool will
-- build files with different names until at or below the desired size.
-- if the -n option is used, no input file is used
---- instead a dummy file is used and saved as the discovered name

Usage: makfit [/path.src] [target_size_in_bytes] [opt: -A --include uppercase]
-- target size in bytes determines ceiling for acceptable file size
---- min 120000, max unlimited however it is unlikely to see > 10MB
-- will change the file's name back to the name of the .src when done
-- builds to size and outputs to parent path of .src file.
Extra: makfit [-n] [target_size_in_bytes] [opt:-A] -- do not use a source file 
-- final filename may be used when compiling any script
-- this allows you to find a filename without supplying a source file.
Note: when successful makfit will return the compressed file as an object.
Usage Example:
|> poke my.src | scribus | makfit my.src 150000 | run
</pre>

---

### malp
<pre>
malp: Memory Alpha - buffer, object and database management menu. 
Usage: malp -- Access all BUFFER objects from here.
Advanced: malp [piped_object] -- adds ANY piped object to the BUFFER.
-- May be of any type: string, list, map, shell, file, computer, et al.
</pre>

---

### md5
<pre>
MD5SUM || md5 sum || password hash decipher || encode
Usage: md5 [string] -- returns the md5sum of a string
Usage: md5 -d [32_char_hash] -- checks hash against onboard dictionary then attempts decipher
-- defaults to crypto.so if cerebrum is not loaded
-- one of three main ways to decipher password hash combo's
-- see also: gopher, hashim, brutus
</pre>

---

### memdump
<pre>
memdump: dump MEMORY, XPLOITS, PORT_MAP, clipboards,  to current_path+/memdump.mx
n.b. ignores glasspool. main purpose is generating reports for clients.
</pre>

---

### merge
<pre>
Usage: merge file_path_1 file_path_2 --  combine files. file_1 will have file_2 appended to it.
</pre>

---

### meta
<pre>
Metaxploit || MetaxploitLib || exploits || XPLOITS || MetaLib || Hack
Important note: 
A metaxploitLib is the object obtained from include_lib(metaxploit.so)
A metaLib is the object obtained from metaxploit.load() or net_session.dump_lib
A net_session object will dump a metaLib object
A metaLib gets scanned, a metaxploitLib does the scanning.
- - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - - - - - - 
The meta command is used for fine control over metaLib and metaxploitLib processes
Usage: meta -- print the currently linked metaLib name and version if any.
Usage: meta link -- links a remote netsession using targetIP and TargetPort
Usage: meta link [opt] [opt]-- links a remote or local metaLib
-- this is equivalent to the 5phinx [+] or [=] buttons
Usage: meta link [metaLib] -- directly link a piped metaLib object
Usage: meta link -l [opt:lib_name] -- link a local metaLib
-- passing a lib name will link that lib if it is in /lib
-- not passing a lib name will bring up the menu
----- the menu will display libs in the localhost's /lib folder
----- if using an imported metaxploitLib  the list will be wrong
----- selecting a lib from the list that is present on the target will still work
----- the metaxploitLib  object looks at the lib folder of it's native machine
----- use the ls command to get the correct contents of /lib 
----- or run the db -m command with a glasspool shell/computer on the target
Usage: meta link -r -- link a remote net_session using targetIP and targetPort
-- skips confirmation
Usage: meta scan -- scans the linked metaLib and loads vulns to memory
-- does NOT update the database
-- equivalent to 5phinx [1]
-- use db -r or db -l or db -m for databasing
-- use zap or roil or 5phinx [A] or [2] after scanning to fire the exploits
Usage: meta -i [path|metaxploitLib] -- import a new metaxploitLib 
-- imports from a path or from a piped object
- - - - - - - - - - - - - - - - - - - - -  - - - - - - - - - - - - - - -

Next: once a metaLib or net_session is linked:
-- scan the imported object with meta scan or db -m
-- if not using db use roil to send all attacks at once (does not database results)
-- use db -m to force databasing the linked metaLib 
-- n.b: running db without -m will cause db to look for a new lib to link and overwrite the linked metaLib)

Note: importing a metaxploitLib from your server to a remote target allows using your hardware to scan the targets local libs.
--Likewise, exporting a remote metaLib back to your server allows you to use your hardware to scan the remote libs.
-- use bios> along with cob get and cob set to import/export objects
</pre>

---

### mkdir
<pre>
Usage: mkdir [/path/new_folder] -- create a new folder in path. path must exist.
</pre>

---

### mv
<pre>
Usage: mv [/source_path] [/destination_path] -- move file or folder to new path.
-- if destination is folder uses original filename, else renames.
Advanced: mv [/source/path] [@] -- move source to current path and use original file name.
n.b. this command is also used to rename a file.
e.g. mv bob /burger -- moves bob to / dir and renames to burger.
</pre>

---

### nsl
<pre>
nsl || nslookup
Usage: nsl [www.webAdress.com] -- uses nslookup on address and returns ip as a string
Example: nsl www.burger.org | probe  -- gets the ip of burger.org and pipes to probe.
Experimental: nsl will attempt to append www. to a domain if it is omitted.
</pre>

---

### outmon
<pre>
outmon: monitor an output file
Usage: outmon [path] [opt:interval]
path -- path to file. default /virt/out.spc
interval -- refresh rate. default 2 seconds, range(.1, 300)
-- prints changes to a text file every [interval] seconds
</pre>

### passwd
<pre>
Password || Change Password || passwd
Usage: passwd [opt: user] [opt: password] -- change password for user
- will prompt for missing options
</pre>

---

### pause
<pre>
Pause || Wait || Hang || Sleep
Usage: pause [seconds(float)] -- pauses script execution
-- Minumum time: .01 seconds
-- Maximum time: 300 seconds
-- useful for putting a delay in 'do' scripts.
-- useful for putting a delay in a chain of commands
-- this command uses the general function: wait(time)
</pre>

---

### perms
<pre>
CHMOD || PERMISSIONS || PERMS || SECURITY
Usage: perms [opt:-r] [userstring{+|-}permission] [path]
-- opt: -r -- run recursively on all files and folders under [path]
-- userstring -- o = other, g = group, u = user/owner
-- toggle -- [+] = add permission, [-] = remove permission
-- permission -- r = read, w = write, x = execute
E.G: perms -r o-rwx /  -- remove rwx permissions from 'others' for all files
E.G: perms -r g+x /bin -- add group execute permissions to all files in /bin
Usage: perms lock all -- remove all permissions from all files (alias: lock)
-- includes anti-brick technology: checks for home pc and relaxes certain permissions:
---- checks for user_email_address: if found, determines we are at home
---- if at home add g+x to: sudo, ssh, Terminal.exe, Chat.exe, Mail.exe
Usage: perms lock down -- force locking down, bypassing anti-brick technology
Usage: perms unlock all -- add o+rwx to all files
Shortcut: lock -- alias for perms lock all
-- it is good practice to run:
|> usr -r root / | grp -r root / | rm /etc/passwd | lock 
--for optimal security.
-- you may type: kore -s to have this action performed for you
</pre>

### ping
<pre>
Usage: ping [ip address]
Example: ping 192.168.0.1
Note: returns a string.
</pre>

### pipe
<pre>
pipe usage: place | between sets of commands to pipe output of command on left of | to command on right.
Max string size is 1 million characters.
Examples: 
lanpro | enum
ls -la /root | clipb | enum | poke file.txt | lock |  | clipb | append file.txt
chain commands and use two empty spaces between the | to drop piped output while continuing the chain.
-- eg: command1 |  | command2 -- output from command1 is NOT passed to command 2
-- remember: it is two spaces between the bars.
</pre>

### poke
<pre>
touch || poke || makefile || overwrite
Usage: poke [/path/to/file] [opt: string] -- create file in path and optionally set contents to string.
Usage: poke test.txt -- creates text.txt in the current path
poke test.txt hello -- creates test.txt and sets content to hello
Advanced: ls -la /virt | poke test.txt -- creates test.txt and pipes the output of ls -la /virt into it
N.B. if file already exists then contents will be overwritten if string supplied.
n.b.b. if string is more than one word use piping to supply string.
Advanced: poke -f [path_to_existing_file] [content] -- will skip the overwrite prompt
Advanced: poke -n [path] -- create path and/or set content to null.
-- overwrites file content with a null character.
</pre>

### porter
<pre>
Usage: porter [port] [comma,or,newline,separated,ip,list] --  print lib version of service on port, if any, for given ip address(es)
</pre>

### probe
<pre>
Probe || nMap || portscan
Usage: probe [optional: ip] [optional: port] -- standard whois and portmap
probe -f [opt:ip] [opt:port] -- full scan. Takes longer. Gets all reachable, non-firewalled machines on subnet.
Usage: probe [-s|show] -- display currently loaded portmap.
-- when local on a network, probe each router by LAN ip to probe that subnet
Quick: probe -q [opt:ip] [opt:port] -- quick scan, gets only surface level machines on subnet.
Note: in all cases probe will set target ip and target port.
</pre>

### prox
<pre>
prox: use kraken to route through proxy net and open terminal at end.
</pre>

### ps
<pre>
Show Processes || PS || show procs || not actually top or htop
Usage: ps -- show processess running on the active host_computer
-- when glasspool is active:
-- the active shell/computer is the active host_computer
Usage: ps [shell|computer] -- show processes running on the piped object
</pre>

### psudo
<pre>
Usage: psudo -- shell session management; without args prompts user for input:
-- 'y' to open current active shell, 'c' to enter credentials (ie escalate privileges)
Usage: psudo -s [opt:password] -- get root a shell and send it to BUFFER (prompts for password if not supplied)
Usage: [shell_returned_by_function] | psudo -- open piped shell
Example: ssh root@pass 1.1.1.1 | psudo  -- to be prompted to open terminal immediately instead of sending shell to buffer.
N.B. psudo may be used to 'go live' from glasspool (ie open the shell) but running a binary via glasspool
i.e. glasspool >> run 5hell
(shell.launch(5hell))... running psudo will end the shell.launch session and return you to the glasspool session.
This is not something I can control.
Advanced: psudo -- answer 'y' at prompt. Pipes current session, useful for hiding the ip of your previous connection.
</pre>

### purge
<pre>
Usage: purge [-b] -- clear object BUFFER 
Usage: purge [-t] -- clear transmit buffer 
Usage: purge [-d] -- clear mx_database buffer 
Usage: purge [-c] -- clear CC command buffer 
Usage: purge [-e] -- clear enum buffer
Usage: purge [-s] -- clear tagged4scp bufer
Usage: purge [-r] -- purge the RSI buffer (remove all rshells)
Usage: purge [-o] -- purge custom object
Advanced: purge [opt] [y] -- skip confirmation 
Advanced: purge -b [#] -- remove BUFFER entry at #
</pre>

### pwd
<pre>
pwd: returns current path
</pre>

### pwgen
<pre>
pwgen: generate a friggin lot of passwords with hashes.
Usage: pwgen -- generate tables/tp/ and files with one password per line
Usage: pwgen hash -- generate tables/t5 and files with hash=pw one per line
Use cerebrum to expand onboard dictionary.
</pre>

### quit
<pre>
QUIT || EXIT || RETURN
Usage: quit [opt:state] -- exits the program.
-- if no optional state then prompts before exit
-- if state supplied then skips confirmation and exits with state
Usage: exit [opt:state] -- also exits the program with optional state
Usage: return -- used to return from glasspool. Will exit 5hell if glasspool is inactive.
</pre>

### rclean
<pre>
Remote Clean || log scrubber || system.log cleaner
Copy a file over the system.log to corrupt it
Usage: rclean [opt: int ] -- select an object from buffer to atttempt a remote log wipe.
Usage: rclean [file|shell|computer] -- remote wipe piped object
-- e.g. clipb @B 1 | rclean -- where BUFFER[1] was a file|shell|computer
-- rclean with no params will display a menu 
-- rclean is intended for remote scrubbing using BUFFER objects.
-- However you may use silentclean or rclean for local log scrubbing
-- if rclean detects a file named silentclean it will use that file to scrub the log
-- for this reason it is a good idea to include an empty file named silentclean in the rkit
Usage: rclean -d [#|shell|file|computer] -- run rclean as above and delete rkit and/or 5hell, if present
Usage: rclean -n [#|shell|file|computer] -- run rclean as above and delete the contents of /boot, if present
</pre>

### rm
<pre>
Remove File || RM || Delete 
Usage: rm [opt:-r] [path|file_object] [opt:shell|computer]
Usage: rm [path|file_object] - deletes a file
Usage: rm -r [path|file_object] - deletes a folder (and all contents)
Usage: rm [opt:-r] [/absolute/path] [shell_object|computer_object]
-- uses supplied shell or computer to delete file or folder at path

N.B. The system.log delete entry will be from the originating IP
-- NOT the ip of the remote shell or computer
-- be sure to clean the log when remote deleting
</pre>

### rnip
<pre>
Usage: rnip [iter] [optional: delimiter] -- produce [iter] random ip addressses and
return as a string with optional [delimiter] (default newline)
e.g. rnip 100 ,  -- returns a string of 100 ips seperated by a comma
</pre>

### roil
<pre>
Usage: roil [opt: inject]-- launches hail mary attack with optional inject value (lan_ip or password).
Equivalent to option [2] in 5phinx
returns zero. sends all objects to BUFFER.
rshell
rshell [rshell_server_ip] [stealthy_process_name] [opt:port default:1222] 
[ip] is the ip of your rshell server.
process_name cannot be dsession, Xorg or kernel_task as these are protected.
supply a port number after process name if different than 1222
e.g. rshell 123.4.5.06 ps 1337 -- while on the victim computer and ip is your rshell server with port 1337 forwarded.
Extra: rshell [-h|help] extra -- display extra help page for general rshell information.
</pre>

### rsi
<pre>
Reverse Shell Interface || RSI Daemon || Install rshell server
Usage: rsi [opt: -d|-i|install|start|stop] [opt: -r|# ] [opt: #]
Usage: rsi -- open rshell_interface: listen for connections on port 1222
-- Runs once then exits
Usage: rsi -d -- daemon mode, continues to listen for connections until an rshell connects.
Advanced: rsi [-i|install] -- installs the reverse shell server if librshell.so is in /lib
Advanced: rsi [start|stop] -- start or stop the installed rshell server
Usage: rsi -r [#] -- return the shell object at rshell index #
Usage: rsi [#1] [#2] -- access the rshell at index #1 and auto select option [#2]
Usage: rsi -p [opt:y] -- purge all rshells. supplying 'y' will skip confirmation
-- please note, rshell indexes start at 1 not 0
---- eg: rsi -r #  -- returns the rshell at index # as an object
---- eg: rsi #  -- auto-selects the rshell at index and opens context menu
---- eg: rsi -d -r 1 -- wait in daemon mode on an empty rshell buffer and return the first connection as an object
</pre>

### run
<pre>
run [file|path_to_file] [opt:parameters|shell] [opt:shell|parameters -- launch a script binary at path (gui's not supported)
-- piped file objects are launched from the objects path
-- max 14 nested launches before stack call error.
-- providing a shell object will launch a binary using that shell object
-- you must pipe launch params if more than one word
-- use echo and easy clip for best results (@a,@b,@c)
---- eg: echo do 1 -f pwn.bat | clipa | clipb @B 1 | run /home/guest/rkit/5hell @b @a
---- eg: echo rshell 1.1.1.1 | clipa | brutus | run /root/rkit/5hell @a
Note: run supports pshells with the launch function however p_objects are not currently in game
</pre>

### scpm
<pre>
SCPM: 5hell.SCP Menu
Usage: scpm -- from menu select target shell (active shell is shown with an '*'). 
-- input source path and then destination path at prompts.
-- select upload or download. Note the printed trajectories.
-- (these can change when glasspool is involved).
-- if uploading indicate if editing permissions
-- if editing permissions press enter for defaults
-- default is o+rwx before uploading and then o-rwx after uploading.
Always mind permissions! Type lock constantly to feel secure.
Advanced: scpm [string_path|piped_file] -- open scpm menu with path or file.path tagged for scp
Advanced: scpm [piped_shell] -- skip menu and scp to/from piped shell
E.G. - clipb @B 1 | scpm -- use the shell object from buffer[1] with .scp

New: scpm [opt:-u|-d] [opt:copy_from|file_object_from] [opt:copy_to|file_object_to] [opt:shell_object]
-- -u will force upload and skip permissions prompt
-- -d will force download
-- supplying path_from will skip copy_from prompt
-- supplying path_to (must be after path_from) will skip destination prompt
-- supply a shell will skip shell prompt
-- supplying all will skip all prompts
-- parameters may be in any order except path_from must precede path_to
---- eg: clipb @B 1 | scpm /root/rkit /home/guest | run /home/guest/rkit/5hell 
---- eg: clipb @B 1 |  | scpm /root/rkit @b
---- eg: zap [mem] [vuln] | scpm -d /var/system.log /root
</pre>

### scribus
<pre>
Scribus Terminal Text Editor by Plu70
scribus [path_to_file] -- open terminal text editor on file at path
Advanced: scribus @clipa|@clipb|@clipc -- This edits the clipboard directly.
Advanced: scribus @cc -- edit the command buffer.
Advanced: scribus [file_object] -- text only, open contents of piped object.
Advanced: scribus @do -- edit the do buffer (to write / edit do scripts without launching them)
-- see do -h for more info
Note: you may press @h on a new line to get additional command info within the editor.
</pre>

### scrub
<pre>
scrub: wipe proxy net logs using kraken and optional silentclean
Usage: scrub [optional: -s] -- force run silentclean locally on each proxy (requires silentclean installed on proxy)
</pre>

### silentclean
<pre>
Usage: silentclean [opt:-d|-n] -- wipe local system.log
 options:
 -d: log wipe + auto-self-delete rkit and/or 5hell
 -n: nuke system + auto-self-delete
 no params: local log wipe without self delete

Alias: you may use sc in place of silentclean
-- e.g: |> silentclean -d is the same as:
--------|> sc -d
-- this is defined in 5hell.src >> aliases section
N.B. run sc as root since /var is usually write protected.
Important: silentclean does not support piped objects
-- use rclean [-d|-n] [piped object] instead
-- or open the object with glasspool and run sc [-d|-n]
</pre>

### smtp
<pre>
SMTP || MAIL USER LIST
Usage: smtp [ip] [port] -- return mail user list if ip/port is running smtp mail server
-- user target ip and target port if not supplied
</pre>

### sniff
<pre>
Usage: sniff -- listen to network traffic. Prints a string if connections detected.
-- runs in daemon mode. exits on first sniffed connection (or ctrl+c).
</pre>

### sphinx
<pre>
5phinx: network penetration test tool
Press F1 or ? within 5phinx for further help.
Usage: sphinx -- launch 5phinx
Usage: sphinx [ip] [port]
-- preset targetIp and targetPort with
-- port 0 == router port
-- port 8080 == router http port!!
Hint: to attack a router within the netwrok target the LAN IP of the router first. 
-- then target port 8080 and exploit it
-- this is done on the same network as the router
Hint: Use the arrow keys to access additional windows in 5phinx
-- Up goes to a useless bank grabber
-- Right goes to a useful quick menu, right again goes to malp
-- Down takes you to herme5
-- Left takes you to malp
-- return to the main screen by pressing the opposite arrow key
Note: as usual, all results are sent to malp
</pre>

### ssh
<pre>
Secure Shell Protocol
Usage: ssh [user@pass] [ip] [optional:pt (default 22)]
ssh_usage: ssh [user@-brutus] [ip] [opt:pt] --  remote brute force attack
e.g. ssh root@1234 1.1.1.1 
e.g. ssh root@-brutus 1.2.3.4 21 ftp
Sends shells to BUFFER or you may open immediately.
</pre>

### string
<pre>
String | To String | List | Join | replace
String and List functions (more to be added over time).
-- I didn't want to make a string command AND a list command so both are here.
Lists: Stringifying lists:
Usage: string [opt] [list] -- converts a list to a string and returns it
-- use the clipboards and @a|@b|@c or piping to supply the list
Usage: string [lista] [listb] -- will return lista concatenated with listb
-- returns a LIST
-- pipe the resulting list back into string to stringify
-- e.g.: string @a @b | string -n | poke new.txt
-- I justify this as 'stringing two lists together' 

Option: -n -- join list with char(10)
Option: -c -- join list with commas
Option: -C -- join list with colons
Option: -s -- join list with semicolons
Option: -S -- join list with spaces
Note: the default join delimiter is char(10)
-- i.e: string [list] is the same as string [-n] [list]

Strings: Stringify strings:
Usage: string [-r] [target_text] [replacement_text] [string_to_parse]
-- replace all instances of target_text with replacement_text within string_to_parse
-- use piping, easy clip, and " text blocks " to supply strings
-- all params should be strings and the function returns the modified string
Numbers: Stringify numbers
Usage: string [number] -- returns str(number) as a string
-- please note that numbers are passed as numbers, not strings, when piped
Note: maps are not yet supported
</pre>

### target
<pre>
Target || Target IP || Target Port
Usage: target -- return current target ip and port
Usage: target ip -- returns current target ip
Usage: target pt -- return current target port
Usage: target [ip] -- set target ip address (ip must be a valid ip)
Usage: target -p [port] -- set target port (returns target port if not supplied)
Usage: target [ip] [port] -- set targt ip and port in a single command

Note: target ip and port are used by 5phinx, transmit, meta, db, probe, and others.
tdump
Transmission Buffer Dump
Usage: tdump [opt: path] -- dump tbuf (transmission buffer) to file
-- writes to specified path or default path of home_directory+/pass
</pre>

### time
<pre>
Usage: time -- returns current game time.
Usage: time [-d|date] -- returns current game time and date.
Usage: time [-t] -- returns time in seconds since script launch.
transmit
Transmit -- t_buf transmission protocol
Usage: transmit [opt: 1|0] --  transmit @t_buf to your @home server. 
-- set @home credentials in 5hell.src before building 5hell
-- options: 1 == wait for reply, 0 (or blank) == don't wait for reply
-- use with hashim running on the @home server
</pre>

### tree
<pre>
tree || list files || file grep
Usage: tree -- view filesystem tree (from / if no argument)
Usage: tree [path|object] -- view filesystem from path down
Usage: tree [opt: path(string)|object(object)] [opt: grep_target(string)] [quiet: 1|0] [opt: r|y|n]
-- [path] - path to descend
-- [object] - shell or computer: descends from / on object
-- [object] - file: descends from path of file object on said object
-- [grep_target] - search for target file by name
---- matches exact name (no regex)
---- returns the file as an object if found
-- [1|0] -  1 = quiet, supress output
-- [1|0] -  0 = verbose, print output
-- [r|n|y] - r = send to t_buf, n = ignore, y = decipher (default is r)
---- this option determines where bank.txt, mail.txt, passwd, and others are stored when encountered
---- see command.clipa|b|c for more (ie clipb -h)
-- e.g: tree / database.csv 1 N | file -b 
---- find database.csv on filesystem, display properties, pipe to BUFFER
N.B. You may use @a, @b, @c or @clipa, @clipb, @clipc to reference [object]
-- -- -- -- -- --
New: tree -f [path|object] [object|path] [opt: 1|0 ] - tree a directory or object and enumerate all files 
-- omitting path|object (and opt) defaults to the / path
-- [opt: 1] - quiet mode. suppress output.
-- [opt: 0] - print output. default
---- omitting this option will print output
-- enumerates to the enum buffer. see enum -h for instructions on how to use it
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
Usage: tree -f [path] -- tree from path, enumerate to enum, print output
Usage: tree -f [object] -- tree from object's / directory, enumerate, print output
Usage: tree -f [object|path] [1|0]-- performs as above but does not print output
</pre>

### usr
<pre>
USR || ADD USER || CHOWN
Usage: usr [optional: -r -- recursive] [new_owner] [path] 
Usage: usr [add|del] [opt:user] -- add | remove users from system.
Usage: usr [path] -- return owner of file at path
-- Do not a name user add or del, for #reasons.
-- It is good practice to run:
|> usr -r root / | grp -r root / | rm /etc/passwd | lock 
for optimal security.
</pre>

### whois
<pre>
Usage: whois [ip] --  returns whois information.
Usage: whois -- returns local whois information if no params.
</pre>

### zap
<pre>
Usage: zap -- select attack. Equivalent to 5phinx [A]
Usage: zap [memory_address] [unsec_value] [opt:pass|ip] -- manual attack.
</pre>

### shell
<pre>
Usage: shell -- outputs instance_name, num_commands and dictionary_size.
</pre>

---

## Additional Information and misc

<pre>
The BUFFER
The BUFFER stores objects. Anything may be stored in the BUFFER.
You access the BUFFER with the malp command >> option [5]
When an exploit is run, the result is stored in the BUFFER. You
may interact with these objects in a number of ways by selecting them
from the list and using their context menu (if the object has one).
One way to fetch an object from the BUFFER for use elswhere is to use the clipboard:
|> clipb @B [index]-- where index == BUFFER[index]
-- then pipe the value to another function
You may pipe anything into the buffer with |> [command_returning_input] | malp

Easy Clip! You may reference the clipboards with the @ symbol:
***  clipa, clipb, and clipc are all clipboard spaces  ***
You may use @a, @b, and @c to reference their values
e.g. echo hello world | clipa |  | poke hello.txt @a
*** tbuf, home, do ***
e.g. gopher @tbuf, e.g. rshell @home, e.g scribus @do

The CUSTOM_OBJECT is a way for scripts to share information between
nested launches. This means you can launch 5hell with 5hell and pass objects back and forth.
You interact with the custom_object via the various cob commands
Namely: cob get and cob set.
For ease of use: cob get and cob set have been aliased to:
-- get and set in 5hell.src
-- |> cob set bob burger is equivalent to |> set bob burger
-- |> cob get bob is quivalent to |> get bob
An example would be cerebrum which loads the dictionary to the custom object:
-- once loaded, you may run 5hell through nested launches and the dictionary will persist.
-- This also allows you to import/export metaLib's and metaxploitLib's between machines!

CONVENTIONS
While a great deal of 5hell is discordant, there are some conventions:

You may toggle the full prompt and minimal promt by typing: 
prompt at the command line
- - - - - - - - - - 
Input: arguments and quote blocks and piping oh my!
-- 5hell uses a 4 argument system. This means all commands take at most 4 arguments
-- this might sound limiting but it isn't at all in practice. Each of the 4 arguments may be overloaded.
Some input methods are:
----* simply typing input: |> ping 1.1.1.1
------ up to four typed arguments
------ remember that |> is the prompt, you don't type that part
----* using single quotes to wrap text: |> echo " this is a text block " 
------ would return: this is a text block
------ note that: |> echo "this is a text block" 
------ would return: ""this is a text 
------ this allows you to overload each argument with more than one "word"
------ easy clip and piping and objects(mostly) are preserved inside of text blocks
----* use do to run a batch of commands from a file or from memory using an editor
------ |> do -- without arguments do will prompt for number of iterations then open the editor
------ |> do 1 -- would bring up an editor commands typed here will be executed in order
------ |> do 1 ping 1.1.1.1 -- would result in pinging 1.1.1.1 once
------ |> do 5 " rnip 1 | dig " -- would run dig on a random ip 5 times
------ |> do 1 -f /foo.bar -- execute the batch of commands in the file foo.bar
-------- you may launch 5hell from the game's command line with do parameters
-------- the format is the same as if typing commands on the command line
-------- newlines in the script are considered to be new command line entries
-------- you may use piping, easy clip, and even calls for do to execute further scripts
-------- you may use text blocks for complex commands in place of files or the editor if you wish
---------- |> do 3 " rnip 1 | dig |  | cob get metx | meta -i | db -m | zap " | poke test.txt " this is a bunch of text going into a file "
****** it is possible to almost completely automate every aspect of 5hell via do and dig
------ for ease of use do 1 -f has been aliased to bat in 5hell.src:
-------- |> bat /foo.bar is equivalent to |> do 1 -f foo.bar
------ please see do -h and dig -h for more information on automation
----* piping input: |> grep -f ^syst | file -p | cp /etc/passwd
------ would result in copying /etc/passwd over top of system.log (if permissions allowed it)
------ piping allows you to transfer the output of one command to the [last open parameter] of another command
------ in the above example the output of grep [args...] is the input of file -p [input]
------ and the output of file -p [args] is the input of cp /etc/passwd [input]
------ please see pipe -h for more
------ if malp is the backbone of 5hell, pipes are the circulatory system of 5hell

Prompts: |> , :> , ||: 
|>  --  this is the standard Command Line Interface prompt
-- by default there will be information printed before this
-- toggle to a minimalist prompt with: prompt
-- fires CLI commands
|>   --  by default, the GLASSPOOL prompt turns the |> blue
-- this means commands execute on the remote object controlled by glasspool
-- see glaspool -h for more
:>   --  this is a liminal prompt, it expects a string or empty return
-- this is used to gather user input within a command
||:  --  this is an 'any key' prompt
-- it takes a single keypress
-- this is used in 'button' driven menus

Decision Pompts: [ N/Y/X ] [n/y/x]
-- Multiple choice prompts have a default
-- the default is always Capitolized and sometimes highlighted
-- the default is chosen if  is pressed without input
-- unless otherwise noted, default is chosen if input doesn't match a choice
E.G: |> psudo
Open shell? [c/y/N]
||:
-- in this example, the choices are [c], [y], and [N]
---- [c] -- enter credentials
---- [y] -- open shell
---- [n] or anything else -- no; return/abort
------ this is because N is the default

Prompt: advanced:
-- by default the prompt will display the public and local ip of the active shell
---- or computer if using glasspool on a computer object
-- by default the prompt will display computer name and working directory
-- by default the prompt indicates user privileges (root,user,guest) with:
---- under the ip information there will be a:
------ a red line for root, green line for user , and white line for guest
---- please note that user permissions are determined by access level and not by 'actual' user
-- you may customize the prompt to your liking in 5hell.src

The dreaded System.log
Actions that generate an entry in system.log: 
-- establishing a net_session on a server (not a router)
-- connecting via Browser.exe to a server
---- connection established on port ##
-- obtaining a shell (server/router)
---- shell obtained on port ##
-- deleting a file
---- file deleted [ip]
-- routing a connection with:
-- connect_service or file_explorer
---- connection routed [ip]
-- shell disconnect
-- i.e. exiting from start_terminal
---- connection closed [ip]

Active Traces will start when shell.start_terminal is used
on an npc machine with an active admin of sufficient knowledge and give-a-damn.
Generally, if there is a root: dsession active, using start_terminal will trigger
an active trace. Active traces are stopped by disconnecting (exiting) that terminal instance.

When using 5hell you should NOT ever open a terminal (on a target) unless you are doing an Academic or
Police record mission. OR if you absolutely need to open the browser to edit firewall or port rules
on a target. Otherwise, use glasspool and run to leverage shell object manipulation instead.

However! You should start_terminal on your end point attack proxy. In fact, do it twice:
-- use prox to tunnel to your end point proxy then launch 5hell and type psudo and then select [y]
-- this will start_terminal on top of your start_terminal, effectively looping your connection on that machine
-- this will ensure your end point proxy's ip is left in logs. Without this, you risk exposing ip's behind the proxy.
-- note: this means you'll have to 'exit' twice from that proxy to return home
Passive Traces can/will start when certain actions have been left unaddressed:
- Deleting a file and not removing the log entry
- Leaving a connection closed log without a corresponding connection established log
- Leaving a shell connected log at all
- I think connection routed logs trigger traces, too. Not sure though.

We all leave logs, sometimes. To clean them up, here are a few methods:
Silentclean -- local log corruption using a text file
-- creates a file used to corrupt logs
-- has nuke option (see: silentclean -h)
Rclean -- remote (or local) log corruption using objects
-- uses a file already on system to corrupt logs
-- accepts and works on piped objects (see: rclean -h)
MV 
-- yep, just the mv command
-- poke haha | mv haha /var/system.log
Wiping the log with one of these methods using a reverse shell is best
but not necessary. You may run silentclean, exit 5hell, exit the terminal, and you will not leave a disconnect log.
-- be aware that taking any log-creating action after running sc, except exiting, may regenerate the log.

Main tools:
probe -- whois and portmap a target
db -- scan target and database results
meta -- metaLib and metaxploitLib fine control
zap -- select and fire exploits one at a time (does not database)
roil -- fire all exploits at once (does not database)
malp -- Memory Alpha: BUFFER management
-- exploit results and other objects go here
-- this is arguably the backbone of 5hell
scpm -- menu and/or cli driven scp
kraken -- proxy management
scribus -- simple text editor
cerebrum -- add 325k+ passwords to custom_object.dictionary
brutus -- use custom_object.dictionary to get root on any (unmodified) npc machine
See: [command] [-h|help] for more help on these and other commands

Aliases || Shortcuts || Macros || or is it Macro's ? || User Defined Behavior
5hell can be very simple to use, or very, very complicated, depending on your goals.
It isn't necessary to learn 100% of 5hell. Nor is it necessary to suffer through some of it's
more complex chains of commands. You can define your own behavior in a number of ways:

Aliases: 
 You may define aliases in the aliases section of 5hell.src
the default ones supplied are all prompt replacements. There are also 'easy clip' defenitions
that replace arguments in the user input with, for instance, the contents of a clipboard or
your @home server ip. These hard coded aliases may be more complicated than a simple
word or string replacement. You may, for instance, have a simple two word alias fire
a whole series of commands. This might be considered a macro at that point, but also
might not quite qualify.

Here is a list of the currently defined default aliases in 5hell.src:
Alias           | Definition
bat [path]      | do 1 -f [path]
set [key] [val] | cob set [key] [val]
get [key]       | cob get [key]
lock            | perms lock all
exit            | quit
sc [opt]        | silentclean [opt]
gp [#]          | glasspool [#]
prompt          | -this will toggle the full_prompt on/off-

Easy Clip       | Replacement
@a              | clipa -- globals.clip_board_alpha
@b              | clipb -- globals.clip_board_beta
@c              | clipc -- globals.clip_board_gamma
@tbuf           | transmission buffer -- globals.T_BUF
-- this is                | where hashes go when the tree command finds them
@home           | HOME_SERVER ip address defined in 5hell.src

Please note: several commands have their own references for editing the clipboards
-- these commands will use @clipa, @clipb, @clipc instead of @a, @b, @c
Further, the clipa, clipb, and clipc will use @B to reference the BUFFER:
-- e.g: |> clipa @B 1 -- copy the object at index 1 in the BUFFER to clipa
-- that object may then be used by other commands that accept piped objects as input
-- there are other ways to pipe objects around besides the clipboards, explore to learn more.
file
</pre>
