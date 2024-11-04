// games.5pk holds battleship, blackjack, and drugwars by Plu70

if DEBUG then print("<size=75%>loading games.5pk for 5hell v 3.9.4...(76.677kb)</size>)")

bat = function(s)
    // battleship by Plu70, aka ra'al, aka jhook777  2021
    // start with 10 x 10 grid
    // 24.905kb
    // valid launch params:
    //
    // -c -- all color lines are null
    // -d -- debug mode, no wait(1)'s and verbose
    // -dt - early terminate: spawn ships, print locations and end
    // -s -- self play: ai vs rng
    // -cd, -cd -s, -d -s, -c -s, also valid combinations
    //
    // order matters with launch params
    // ai is marginally better than random*
    ////////////////////////
    game_file = null  // single player for now
    DIFFICULTY = "hard" // lol jk, still need better ai algorithm. easy or medium available at runtime
    EARLYTERM = false
    self_play = false
    //if params.len >= 1 and (params[0] == "-s" or params [1] == "-s") then self_play = true
    //debug = globals.DEBUG
    disable_color = false
    
    /////////
    if s == "-s" then self_play = true
    ////////////////////////
    globals.MIN = 0 // minimum X/Y values for grid size
    globals.MAX = 9 // maximum X/Y values for grid size
    rng = range(MIN,MAX)
    rnd = range(MIN,MAX)
    rng.shuffle
    rnd.shuffle
    
    ///BEGIN GRAPHICS//////
    
    print_logo = function()
        print(colorRed+" _           _   _   _           _     _         "+CT)
        print(colorGreen+"| |         | | | | | |         | |   (_)       "+CT)
        print(colorGreen+"| |__   __ _| |_| |_| | ___  ___| |__  _ _ __   "+CT)
        print(colorGreen+"| '_ \ / _` | __| __| |/ _ \/ __| '_ \| | '_ \  "+CT)
        print(colorRed+"| |_) | (_| | |_| |_| |  __/\__ \ | | | | |_) | "+CT)
        print(colorGreen+"|_.__/ \__,_|\__|\__|_|\___||___/_| |_|_| .__/  "+CT)
        print(colorGreen+"                                       | |      "+CT)
        print(colorGreen+"                                       |_|      "+CT)
    
    end function
    
    display_ship_one = function()
    
        ship_one = ["                                                                       .",	"                                     # #  ( )                           ","                                  ___#_#___|__                          ",	"                              _  |____________|  _                      ",	"                       _=====| | |            | | |==== _               ",	"                 =====| |.---------------------------. | |====          ",	"   <--------------------'   .  .  .  .  .  .  .  .   '--------------/   ",	"     \                                                             /    ",	colorLightBlue+"  wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww "+CT,	colorLightBlue+"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"+CT,	colorLightBlue+"   wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww  "+CT]
        for ln in ship_one
            print(ln)
        end for
    end function
    
    display_ship_two = function()
    
        ship_two = ["                                                                               ","                                     |__                                       ",	"                                     |\/                                       ",	"                                     ---                                       ",	"                                     / | [                                     ",	"                              !      | |||                                     ",	"                            _/|     _/|-++'                                    ",	"                        +  +--|    |--|--|_ |-                                 ",	"                     { /|__|  |/\__|  |--- |||__/                              ",	"                    +---------------___[}-_===_.'____                 /\       ",	"                ____`-' ||___-{]_| _[}-  |     |_[___\==--            \/   _   ",	" __..._____--==/___]_|__|_____________________________[___\==--____,------' .7 ",	"|                                                                     BB-61/   ",	" \_________________________________________________________________________|   ",	colorLightBlue+"  Matthew Bacewwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"+CT,	colorLightBlue+"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"+CT	]
        for ln in ship_two
            print(ln)
        end for
    end function
    
    display_ship_three = function()
        // stub
    end function
    
    display_long_rule = function()
        print(colorGreen+"</b>[.0....1....2.....3....4.....5....6....7.....8....9.]</color>")  // adjust this to fit your terminal
    end function
    /////END GRAPHICS /////////
    
    /////// SANITY CHECK /////
    check_sanity = function(sobj) // ensure ships don't overlap
        if globals.DEBUG then print("Checking Sanity...")
        if globals.DEBUG then print(sobj.frigate)
        if globals.DEBUG then print(sobj.cruiser)
        if globals.DEBUG then print(sobj.battleship)
    
        bshipX = sobj.battleship.X
        bshipY = sobj.battleship.Y
        cshipX = sobj.cruiser.X
        cshipY = sobj.cruiser.Y
        fshipX = sobj.frigate.X
        fshipY = sobj.frigate.Y
    
        if globals.DEBUG then print( bshipX  )
    
        collision = 0
        static_ship = "battleship"
    
        for fx in fshipX
            if fx > globals.MAX then collision = "out_of_bounds"
            if cshipX.indexOf(fx) >= 0 then
                for fy in fshipY
                    if cshipY.indexOf(fy) >= 0 then
                        collision = "frigate"
                        static_ship = "cruiser"
                        if fy > globals.MAX then collision = "out_of_bounds"
                    end if
                end for
            end if
        end for
    
        for bx in bshipX
            if bx > globals.MAX then collision = "out_of_bounds"
            if globals.DEBUG then print("bx:"+bx)
            if globals.DEBUG then print("cruiser: index of bx: "+cshipX.indexOf(bx))
            if cshipX.indexOf(bx) >= 0 and cshipX.hasIndex(cshipX.indexOf(bx)) then
                for by in bshipY
                    if globals.DEBUG then print("by:"+by)
                    if cshipY.indexOf(by) >= 0 and cshipY.hasIndex(cshipY.indexOf(by)) then collision = "cruiser"
    
                end for
            end if
    
            if fshipX.indexOf(bx) >= 0 then
                for by in bshipY
                    if fshipY.indexOf(by) >= 0 then collision = "frigate"
                    if by > globals.MAX then collision = "out_of_bounds"
                end for
            end if
    
        end for
        for cx in cshipX
            if cx > globals.MAX then collision = "out_of_bounds"
        end for
        for cy in cshipY
            if cy > globals.MAX then collision = "out_of_bounds"
        end for
        if globals.DEBUG then print("coll:"+collision)
        if collision then
            if globals.DEBUG then print("Handling collision between "+static_ship+" and "+collision+"...")
            // this tactic is known as 'do something, even if it's wrong'
            nX = sobj[collision]["X"]
            nY = sobj[collision]["Y"]
            if nX.len > nY.len then
                if nY[0] <= 0 then nY[0] = 3
                if nY[0] >= 9 then nY[0] = 5
                if nY[0] == 2 or nY[0] == 4 or nY[0] == 6 then nY[0] = nY[0] + 1
                rr = range(-1,1)
                rr.shuffle
                nY[0] = nY[0] + rr.pop
                if nY[0] > globals.MAX then collision = "out_of_bounds"
            else
                if nX[0] <= 0 then nX[0] = 3
                if nX[0] >= 9 then nX[0] = 5
                if nX[0] == 2 or nX[0] == 4 or nX[0] == 6 then nX[0] = nX[0] + 1
                rr = range(-1,1)
                rr.shuffle
                nX[0] = nX[0] + rr.pop
                if nX[0] > globals.MAX then collision = "out_of_bounds"
            end if
        end if
        //////
        if globals.DEBUG then print("Handled. Back propagating...")
        if globals.DEBUG and not collision then print("Sanity check complete.")
        return collision// true for recursion or false if no collisions and sane
    end function
    //// END SANITY CHECK //////
    
    map = {}
    map.grid = []
    map.make = function()
        map.grid = range(globals.MIN,globals.MAX)
        for e in range(globals.MIN,globals.MAX)
            map.grid[e] = range(globals.MIN,globals.MAX)
            for c in map.grid[e]
                if globals.DEBUG then
                    map.grid[e][c] = e+","+c
                else
                    map.grid[e][c] = colorLightBlue+"www"+CT
                end if
            end for
        end for
    end function
    map.get_cell = function(x,y)
        return map["grid"][x][y]
    end function
    map.edit_cell = function(xy,beef,actor)
        split = xy.split(" ")
        if split.len < 2 then
            split.push("0")
            if split.len < 2 then
                split.push("0")
            end if
        end if
        x = split[0].val
        y = split[1].val
        edit = "www"
        if beef > 0 then // hit
            if actor == computa.label then
                edit = colorOrange+"***"+CT
            else
                edit = colorRed+"***"+CT
            end if
        else
            if beef == 0 then // miss
                if actor == computa.label then
                    edit = colorLightBlue+"###"+CT
                else
                    edit = colorWhite+"###"+CT
                    if map["grid"][x][y] == colorLightBlue+"###"+CT then edit = (colorWhite+"#"+CT+colorLightBlue+"#"+CT+colorWhite+"#"+CT)
                end if
            end if
        end if
        if globals.DEBUG then print("X:"+x+" Y:"+y+" edit:"+edit)
        if map["grid"][x][y] == (colorRed+"***"+CT) then
            if beef then
                edit = colorRed+"*"+CT+colorOrange+"*"+CT+colorRed+"*"+CT
            else
                return beef
            end if
        end if
        if beef and map["grid"][x][y] == colorOrange+"***"+CT then edit = colorRed+"*"+CT+colorOrange+"*"+CT+colorRed+"*"+CT
        if not beef and map["grid"][x][y] == colorOrange+"***"+CT then edit = (colorWhite+"#"+CT+colorOrange+"#"+CT+colorWhite+"#"+CT)
        if not beef and map["grid"][x][y] == (colorWhite+"###"+CT) then edit = (colorWhite+"#"+CT+colorLightBlue+"#"+CT+colorWhite+"#"+CT)
        map["grid"][x][y] = edit
        return beef
    end function
    map.display_grid = function()
        buf = ""
        y = globals.MAX
        while y >= globals.MIN
            for x in range(globals.MIN,globals.MAX)
                buf = buf + "." + map.get_cell(x,y) + "."
            end for
            buf = buf + colorGreen+"</b>.["+y+"]</color>"+ char(10)
            y = y - 1
        end while
        print(buf)
        display_long_rule
    end function
    map.make
    
    
    
    player = {}
    player.label = ""
    player.opponent = ""
    player.BUFFER = {}
    player.position = {}
    player.display_ship_coordinates = function()
        for c in self.position
            print(">"+c.value.label+":")
            print("[X: "+c.value.X+" Y:"+c.value.Y+"]")
        end for
    end function
    player.fire = function(coords)
        aim = coords.split(" ")
        print(colorOrange+self.label + " fires at " + aim[0] + ", " + aim[1] + " and... "+CT)
        wait(1)
        count = 0
        for ship_obj in self.opponent.position
            if globals.DEBUG then print(ship_obj)
            shipX = ship_obj.value.X
            shipY = ship_obj.value.Y
            count = count + 1
            for sx in shipX
                if aim[0].val == sx then
                    for sy in shipY
                        if aim[1].val == sy then
                            print(colorRed+"<b>HITS!</b>"+CT+char(10))
                            summary.accuracy.update(self.label, "hit", coords)
                            return count
                        end if
                    end for
                end if
            end for
        end for
        print("<b>MISSES!</b>"+char(10))
        summary.accuracy.update(self.label, "miss", coords)
        return 0
    end function
    player.spawn_ship = function(ship)
        top_edge = false
        bottom_edge = false
        left_edge = false
        right_edge = false
        i = 0
        if ship.hasIndex("frigate") then i = ship.frigate
        if ship.hasIndex("cruiser") then i = ship.cruiser
        if ship.hasIndex("battleship") then i = ship.battleship
        if globals.DEBUG then print("["+colorWhite+ship.label+CT+"]")
    
        transmform = function(sob)
            if sob.X[0] == globals.MIN then left_edge = true
            if sob.X[-1] == globals.MAX then right_edge = true
            if sob.Y[0] == globals.MIN then bottom_edge = true
            if sob.Y[-1] == globals.MAX then top_edge = true
            if sob.X.len > 1 then
                top_edge = true
                bottom_edge = true
            end if
            if sob.Y.len > 1 then
                left_edge = true
                right_edge = true
            end if
            vote_down = 1
            vote_up = 1
            vote_left = 1
            vote_right = 1
            if top_edge then vote_up = 0
            if bottom_edge then vote_down = 0
            if left_edge then vote_left = 0
            if right_edge then vote_right = 0
            rn = range(1,10) // do not set globals.MIN to zero
            rn.shuffle
            vote_up = (vote_up * rn.pop)
            if globals.DEBUG then print(vote_up+":up")
            rn.shuffle
            vote_down = (vote_down * rn.pop)
            if globals.DEBUG then print(vote_down+":down")
            rn.shuffle
            vote_right = (vote_right * rn.pop)
            if globals.DEBUG then print(vote_right+":right")
            rn.shuffle
            vote_left = (vote_left * rn.pop)
            if globals.DEBUG then print(vote_left+":left")
            tally = [vote_up,vote_down,vote_left,vote_right]
            tally.sort
            tally.reverse
            winner = tally[0]
            if globals.DEBUG then print(winner)
            if winner == 0 then return
            if winner == vote_up then //up
                sob.Y.push(sob.Y[-1]+1)
                sob.Y.sort
                return
            end if
            if winner == vote_down then //down
                sob.Y.push(sob.Y[0]-1)
                sob.Y.sort
                return
            end if
            if winner == vote_left then // left
                sob.X.push(sob.X[0]-1)
                sob.X.sort
                return
            end if
            if winner == vote_right then //right
                sob.X.push(sob.X[-1]+1)
                sob.X.sort
                return
            end if
        end function
    
        while i > 0
            transmform(ship)
            i = i - 1
        end while
    end function
    
    player1 = new player
    player1.label = "Player"
    player1.BUFFER = {}
    player1.position = {}
    player1.position.frigate = {"X":[0], "Y":[0], "frigate":1, "label":"frigate"}
    player1.position.cruiser = {"X":[0], "Y":[0], "cruiser":2, "label":"cruiser"}
    player1.position.battleship = {"X":[0], "Y":[0], "battleship":4, "label":"battleship"}  // position ship then spawn_ship
    player1.setup = function(x,y)
        self.position.frigate.X[0] = x[0]
        self.position.frigate.Y[0] = y[0]
        x.shuffle
        y.shuffle
        self.position.cruiser.X[0] = x[0]
        self.position.cruiser.Y[0] = y[0]
        x.shuffle
        y.shuffle
        self.position.battleship.X[0] = x[0]
        self.position.battleship.Y[0] = y[0]
        self.spawn_ship(self.position.frigate)
        self.spawn_ship(self.position.cruiser)
        self.spawn_ship(self.position.battleship)  // position ship then spawn_ship
        while check_sanity(self.position)
        end while
    end function
    player1.confirm = function(cmd)
        // cmd is user_input so respond only to correct input and drop all else
        if cmd == "" then cmd = "0 0"
        aim = cmd.split(" ")
        if aim.len < 2 then
            aim.push("0")
            if aim.len < 2 then
                aim.push("0")
            end if
        end if
        aim[0] = aim[0].val
        aim[1] = aim[1].val
        cmd = aim.join(" ")
        if player1.BUFFER.hasIndex(cmd) then
            print(colorOrange+"That would be a waste of ammunition!"+CT)
            return 0 // command denied
        else
            player1.BUFFER.push(cmd)
        end if
        aim = cmd.split(" ")
        if aim[0].val > globals.MAX or aim[1].val > globals.MAX or aim[0].val < globals.MIN or aim[1].val < globals.MIN then
            print(colorOrange+"</b>Target designation is out of bounds!</color>")
            return 0
        end if
        return cmd // confirmed command
    end function
    
    
    /// BEGIN Computa
    computa = new player
    computa.label = "Computa"
    computa.BUFFER = {}
    computa.position = {}
    computa.position.frigate = {"X":[0], "Y":[0], "frigate":1, "label":"frigate"} // x_array, y_array, label:# of transorms in spawn_ship
    computa.position.cruiser = {"X":[0], "Y":[0], "cruiser":2, "label":"cruiser"} // adjust check_score when adding new ship classes!
    computa.position.battleship = {"X":[0], "Y":[0], "battleship":4, "label":"battleship"} // position ship then spawn_ship
    computa.AI = {}
    computa.AI.ghost_ship = {}
    computa.AI.ghost_ship.frigate = {"X":[1], "Y":[1], "frigate":1, "label":"ghost_frigate"}
    computa.AI.ghost_ship.cruiser = {"X":[8], "Y":[8], "cruiser":2, "label":"ghost_cruiser"}
    computa.AI.ghost_ship.battleship = {"X":[5], "Y":[5], "battleship":4, "label":"ghost_battleship"}
    computa.AI.c_list = []
    computa.wake_AI = function()
        self.spawn_ship(self.AI.ghost_ship.battleship)
        self.spawn_ship(self.AI.ghost_ship.frigate)
        self.spawn_ship(self.AI.ghost_ship.cruiser)
        t_x = []
        t_y = []
        t_cmd = ""
        for s in self.AI.ghost_ship
            t_x = s.value.X
            t_y = s.value.Y
            t_cmd = t_x[0]+" "+t_y[0]
            self.AI.c_list.push(t_cmd)
        end for
    end function
    computa.setup = function(x,y)
        self.position.frigate.X[0] = x[0]
        self.position.frigate.Y[0] = y[0]
        x.shuffle
        y.shuffle
        self.position.cruiser.X[0] = x[0]
        self.position.cruiser.Y[0] = y[0]
        x.shuffle
        y.shuffle
        self.position.battleship.X[0] = x[0]
        self.position.battleship.Y[0] = y[0]
        self.spawn_ship(self.position.frigate)
        self.spawn_ship(self.position.cruiser)
        self.spawn_ship(self.position.battleship)  // position ship then spawn_ship
        while check_sanity(self.position)
        end while
    end function
    computa.AI.update_ghosts = function(new_X, new_Y, new_T)
        self.ghost_ship.frigate.X = new_X
        self.ghost_ship.frigate.Y = new_Y
        self.ghost_ship.cruiser.X = new_X
        self.ghost_ship.cruiser.Y = new_Y
        self.ghost_ship.battleship.X = new_X
        self.ghost_ship.battleship.Y = new_Y
        self.ghost_ship.frigate.frigate = new_T
        self.ghost_ship.cruiser.cruiser = new_T
        self.ghost_ship.battleship.battleship = new_T
        computa.spawn_ship(self.ghost_ship.frigate)
        computa.spawn_ship(self.ghost_ship.cruiser)
        computa.spawn_ship(self.ghost_ship.battleship)
    end function
    computa.AI.alpha = function()
        last_shot = summary.accuracy.Computa.hist[-2]
        if globals.DEBUG then print("last shot: "+last_shot)
        last_action = summary.accuracy.Computa.hist[-1]
        if self.c_list.len < 1  or last_action == "hit" then //c_list_empty = true
            new_C = last_shot.split(" ")
            if globals.DEBUG then print(new_C)
            new_x = [new_C[0].val]
            new_y = [new_C[1].val]
            new_t = 0
            if last_action == "miss" then
                new_t = 6
            else
                new_t = 2
            end if
            self.purge_ghosts
            self.update_ghosts(new_x,new_y, new_t)
            t_x = []
            t_y = []
            t_cmd = ""
            for s in self.ghost_ship
                t_x = s.value.X
                t_y = s.value.Y
                t_y.shuffle
                t_x.shuffle
                t_cmd = t_x[0]+" "+t_y[0]
                if globals.DEBUG then print("Pushing "+t_cmd+" to c_list...")
                if not self.c_list.hasIndex(t_cmd) then self.c_list.push(t_cmd)
            end for
        end if
        if self.c_list.len < 1 then // panic
            rng.shuffle
            rnd.shuffle
            t_cmd = [rng[0], rnd[0]]
            t_cmd = t_cmd.join(" ")
            self.c_list.push(t_cmd)
        end if
        self.c_list.shuffle
        return  self.c_list.pop // string of type "X Y" where X and Y are within outer.MIN, MAX
    end function
    computa.AI.panic_level = 4
    computa.AI.purge_ghosts = function()
        self.ghost_ship.frigate.X = []
        self.ghost_ship.frigate.Y = []
        self.ghost_ship.cruiser.X = []
        self.ghost_ship.cruiser.Y = []
        self.ghost_ship.battleship.X = []
        self.ghost_ship.battleship.Y = []
    end function
    computa.AI.omega = function() // when computa has found all three of Payer1's ships
        last_shot = summary.accuracy.Computa.hist[-2]
        hl = summary.accuracy.Computa.hit_list
        if globals.DEBUG then print("hit_list: "+hl)
        last_action = summary.accuracy.Computa.hist[-1]
        if self.c_list.len < 1  or last_action == "hit" then
            hl.shuffle
            new_C = hl[0].split(" ")
            if globals.DEBUG then print(new_C)
            new_x = [new_C[0].val]
            new_y = [new_C[1].val]
            new_t = 0
            if last_action == "miss" then
                new_t = 2
            else
                new_t = 1
            end if
            self.purge_ghosts
            self.update_ghosts(new_x,new_y, new_t)
            t_x = []
            t_y = []
            t_cmd = ""
            for s in self.ghost_ship
                t_x = s.value.X
                t_y = s.value.Y
                t_y.shuffle
                t_x.shuffle
                t_cmd = t_x[0]+" "+t_y[0]
                if globals.DEBUG then print("Pushing "+t_cmd+" to c_list...")
                if not self.c_list.hasIndex(t_cmd) then self.c_list.push(t_cmd)
            end for
        end if
        if self.c_list.len < 1 then // panic
            rng.shuffle
            rnd.shuffle
            t_cmd = [rng[0], rnd[0]]
            t_cmd = t_cmd.join(" ")
            self.c_list.push(t_cmd)
        end if
        self.c_list.shuffle
        return  self.c_list.pop // string of type "X Y" where X and Y are within outer.MIN, MAX
    end function
    computa.get_command = function() // obvious stub needs obvious improvement
        ccommand = ""
        if DIFFICULTY == "easy" then
            ccommand = [rng[0], rnd[0]]
            ccommand = ccommand.join(" ")
        else
            if computa.score[0] > 0 and computa.score[1] > 0  and computa.score[2] > 0 then
                // all ships found, prepare for gg
                ccommand = self.AI.omega
            else
                //if computa.score[0] > 0 or computa.score[1] > 0  or computa.score[2] > 0 then
                    //ccommand = [rng[0], rnd[0]]
                    //ccommand = ccommand.join(" ")
            //	else
                    ccommand = self.AI.alpha
                //end if
            end if
        end if
        if globals.DEBUG then print("sending: "+ccommand)
        rng.shuffle
        rnd.shuffle
        if self.BUFFER.hasIndex(ccommand) then
            if globals.DEBUG then print("!!Repeat detected!!")
            self.AI.panic_level = 8
            ccommand = false
            //return ccommand
        else
            self.BUFFER.push(ccommand)
            self.AI.panic_level = 4
            //return ccommand
        end if
        return ccommand
    end function
    //// END Computa
    
    
    if globals.DEBUG then print("Initializing players...")
    rng = range(MIN,MAX)
    rnd = range(MIN,MAX)
    
    rng.shuffle
    rnd.shuffle
    
    computa.setup(rng,rnd)
    computa.wake_AI
    
    rnd.shuffle
    rng.shuffle
    
    if globals.DEBUG then print("...readying player1...")
    player1.setup(rng,rnd)
    
    player1.opponent = computa
    computa.opponent = player1
    
    player1.score = [0,0,0] // [frigate,cruiser,battleship]
    computa.score = [0,0,0] // [2_tokill,3 tokill,5 tokill] (transorms + 1 to kill)
    check_score = function(bit,act)
        if globals.DEBUG then print("Scoring...")
        if globals.DEBUG then print(act+":"+bit)
        if act == player1.label then
            if not bit then return 1
            player1.score[bit-1] = player1.score[bit-1] + 1
            if player1.score.sum == 10 then return 0 // command BUFFER restricts repeat shots
            return 1
        else
            if not bit then return 1
            computa.score[bit-1] = computa.score[bit-1] + 1
            if computa.score.sum == 10 then return 0
            return 1
        end if
    end function
    
    DATASET = {}
    DATASET.accuracy = {}
    DATASET.accuracy.Computa = {}
    DATASET.accuracy.Player = {}
    summary = new DATASET
    summary.purge = function()
        if globals.DEBUG then print("purging...")
        self.accuracy.Computa.hist = []
        self.accuracy.Player.hist = []
    end function
    summary.accuracy.update = function(lbl, event, crds)
        //summary.purge
        if globals.DEBUG then print("updating..."+lbl)
        if lbl == self.Player.label and globals.DEBUG then print("player found!")
        summary["accuracy"][lbl]["hist"].push(crds)
        if globals.DEBUG then print(crds)
        if event == "hit" then // hit
            summary["accuracy"][lbl]["Hits"] = summary["accuracy"][lbl]["Hits"] + 1
            if globals.DEBUG then print("pushing "+crds+" to hit_list...")
            summary["accuracy"][lbl]["hit_list"].push(crds)
        else // miss
            summary["accuracy"][lbl]["Misses"] = summary["accuracy"][lbl]["Misses"] + 1
        end if
        summary["accuracy"][lbl]["hist"].push(event)
    end function
    summary.accuracy.report = function()
        if globals.DEBUG then print("reporting...")
        last_computer_shot = self.Computa.hist
        last_player_shot = self.Player.hist
        if last_computer_shot[-1] == "hit" then
            revent = (colorRed+"<b>HIT!</b>"+CT)
        else
            revent = "<b>MISSED!</b>"
        end if
        print(colorOrange+self.Computa.label+" fired at "+last_computer_shot[-2]+" and "+revent)
        if last_player_shot[-1] == "miss" then
            revent = "<b>MISSED!</b>"
        else
            revent = (colorRed+"<b>HIT!</b>"+CT)
        end if
        print(colorOrange+self.Player.label+" fired at "+last_player_shot[-2]+" and "+revent)
    end function
    summary.widget = function()
        l = self.accuracy.Player.label
        h = self.accuracy.Player.Hits
        m = self.accuracy.Player.Misses
        s = m+h
        print(colorWhite+"|"+l+" accuracy: "+ h +colorGreen+"/"+colorWhite+s+"|"+CT)
    end function
    summary.accuracy.init = function()
        self.Computa = {"label":"Computa", "Hits":0, "Misses":0, "hist":["nothing",0], "hit_list":[]}
        self.Player = {"label":"Player", "Hits":0, "Misses":0, "hist":["nothing",0], "hit_list":[]}
    end function
    summary.accuracy.init
    
    
    if globals.DEBUG then print("...init complete. Starting main...")
    ////// BEGIN MAIN /////////
    battleship = function()
        playing = true
        first_run = true
        if EARLYTERM then playing = false
        if globals.DEBUG and EARLYTERM then player1.display_ship_coordinates
        if globals.DEBUG and EARLYTERM then computa.display_ship_coordinates
        if user_input("Select a difficulty level:"+char(10)+"[EASY] - Commander Rander"+char(10)+"[MEDIUM] - Captain Chao "+char(10)+["||: "]).lower != "EASY" then
            print("MEDIUM difficulty selected. Good luck!")
            DIFFICULTY = "medium"
        else
            print("EASY difficulty selected. Good luck!")
            DIFFICULTY = "easy"
        end if
        ///// game starts here
        while playing
            if not globals.DEBUG then clear_screen
            if not first_run then print_logo
    
            player1.display_ship_coordinates
            if globals.DEBUG then computa.display_ship_coordinates
            if not first_run then summary.accuracy.report
            if globals.DEBUG then print(player1.score)
            if globals.DEBUG then print(computa.score)
            print(colorGreen+"</b>//////////////////////////////////////////////////////</color>")
    
            map.display_grid
            if not first_run then summary.widget
    
            first_run = false
            command = 0
            if self_play then
                rng.shuffle
                rnd.shuffle
                command = [rng[0], rnd[0]]
                command = command.join(" ")
                if not globals.DEBUG then wait(1)
            else
                print("q=quit")
                command = user_input("Enter coordinates [0-9] as [x y]: ")
                if command.lower == "q" then return "abandoning ship..."
            end if
            command = player1.confirm(command)
            if command == 0 then continue // belay that order!
            if not globals.DEBUG then clear_screen
            display_ship_one
            playing = check_score(map.edit_cell(command, player1.fire(command), player1.label), player1.label)
    
            if not playing then return("<b>You sunk all of computa's battleships! You Win!</b>")
    
            rng.shuffle // vestigial shuffle
            rnd.shuffle // vestigial shuffle
            wait(1)
            if not globals.DEBUG then clear_screen
    
            display_ship_two
            ai_turn = true
            while ai_turn
                command = computa.get_command
                if globals.DEBUG then print("...recieved: "+command)
                if command == false then continue
                playing = check_score(map.edit_cell(command, computa.fire(command), computa.label), computa.label)
                if not playing then return("<b>Computa sunk all of your battleships! You lose!</b>")
                ai_turn = false
                wait(1)
                if not globals.DEBUG then clear_screen
            end while
        end while
    end function
    
    print_logo
    return battleship
end function
////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
///////////////////////////BLACKJACK/////////////////////////////
////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
g2 = function()
    // Jokers Wild Blackjack by Plu70 (aka raal, aka jhook777)
    // feel free to use the deck in your own games!
    //localhost = get_shell
    //localmachine = localhost.host_computer

  // START 3nigma DECK /////////////////////////////////
  RC = "<color=red>"
  BC = "<color=#606060>"
  GC = "<color=green><b>"
  OC = "<color=#FF8400FF>"
  CW = "<color=white>"
  CLB = "<color=#2382FFFF><b>"
  CC = "</color>"
  SU = ["V","^","+","&"] // ace: heart, spade, diamond, club; index: 1, 14, 27, 40
  //cards = params[0].split(",")
  //cards.pull
  //num_cards = cards.len - 1
  Deck = {}
  i = 1
  C = null
  Deck[0] = RC+" _____ "+CC+"::"+RC+"|@  .^|"+CC+"::"+BC+"| @ {)|"+CC+"::"+RC+"|   $$|"+CC+"::"+BC+"|  *__|"+CC+"::"+RC+"|__JJ[|"+CC
  for S in SU
    if S == "V" or S == "+" then C = RC
    if S == "^" or S == "&" then C = BC
    for N in range(1,13)
      if N == 1 and S == "V" then Deck[i] = C+" _____ "+CC+"::"+C+"|A_ _ |"+CC+"::"+C+"|( v )|"+CC+"::"+C+"| \ / |"+CC+"::"+C+"|  .  |"+CC+"::"+C+"|____V|"+CC
      if N == 1 and S == "^" then Deck[i] = C+" _____ "+CC+"::"+C+"|A .  |"+CC+"::"+C+"| /.\ |"+CC+"::"+C+"|(_._)|"+CC+"::"+C+"|  |  |"+CC+"::"+C+"|____V|"+CC
      if N == 1 and S == "+" then Deck[i] = C+" _____ "+CC+"::"+C+"|A ^  |"+CC+"::"+C+"| / \ |"+CC+"::"+C+"| \ / |"+CC+"::"+C+"|  .  |"+CC+"::"+C+"|____V|"+CC
      if N == 1 and S == "&" then Deck[i] = C+" _____ "+CC+"::"+C+"|A _  |"+CC+"::"+C+"| ( ) |"+CC+"::"+C+"|(_'_)|"+CC+"::"+C+"|  |  |"+CC+"::"+C+"|____V|"+CC
      if N == 2 then Deck[i] = C+" _____ "+CC+"::"+C+"|2    |"+CC+"::"+C+"|  "+S+"  |"+CC+"::"+C+"|     |"+CC+"::"+C+"|  "+S+"  |"+CC+"::"+C+"|____Z|"+CC
      if N == 3 then Deck[i] = C+" _____ "+CC+"::"+C+"|3    |"+CC+"::"+C+"| "+S+" "+S+" |"+CC+"::"+C+"|     |"+CC+"::"+C+"|  "+S+"  |"+CC+"::"+C+"|____E|"+CC
      if N == 4 then Deck[i] = C+" _____ "+CC+"::"+C+"|4    |"+CC+"::"+C+"| "+S+" "+S+" |"+CC+"::"+C+"|     |"+CC+"::"+C+"| "+S+" "+S+" |"+CC+"::"+C+"|____h|"+CC
      if N == 5 then Deck[i] = C+" _____ "+CC+"::"+C+"|5    |"+CC+"::"+C+"| "+S+" "+S+" |"+CC+"::"+C+"|  "+S+"  |"+CC+"::"+C+"| "+S+" "+S+" |"+CC+"::"+C+"|____S|"+CC
      if N == 6 then Deck[i] = C+" _____ "+CC+"::"+C+"|6    |"+CC+"::"+C+"| "+S+" "+S+" |"+CC+"::"+C+"| "+S+" "+S+" |"+CC+"::"+C+"| "+S+" "+S+" |"+CC+"::"+C+"|____9|"+CC
      if N == 7 then Deck[i] = C+" _____ "+CC+"::"+C+"|7    |"+CC+"::"+C+"| "+S+" "+S+" |"+CC+"::"+C+"|"+S+" "+S+" "+S+"|"+CC+"::"+C+"| "+S+" "+S+" |"+CC+"::"+C+"|____L|"+CC
      if N == 8 then Deck[i] = C+" _____ "+CC+"::"+C+"|8    |"+CC+"::"+C+"|"+S+" "+S+" "+S+"|"+CC+"::"+C+"| "+S+" "+S+" |"+CC+"::"+C+"|"+S+" "+S+" "+S+"|"+CC+"::"+C+"|____8|"+CC
      if N == 9 then Deck[i] = C+" _____ "+CC+"::"+C+"|9    |"+CC+"::"+C+"|"+S+" "+S+" "+S+"|"+CC+"::"+C+"|"+S+" "+S+" "+S+"|"+CC+"::"+C+"|"+S+" "+S+" "+S+"|"+CC+"::"+C+"|____6|"+CC
      if N == 10 then Deck[i] = C+" _____ "+CC+"::"+C+"|10 "+S+" |"+CC+"::"+C+"|"+S+" "+S+" "+S+"|"+CC+"::"+C+"|"+S+" "+S+" "+S+"|"+CC+"::"+C+"|"+S+" "+S+" "+S+"|"+CC+"::"+C+"|___0I|"+CC
      if N == 11 then Deck[i] = C+" _____ "+CC+"::"+C+"|J  ww|"+CC+"::"+C+"| "+S+" {)|"+CC+"::"+C+"|   % |"+CC+"::"+C+"|   % |"+CC+"::"+C+"|__%%[|"+CC
      if N == 12 then Deck[i] = C+" _____ "+CC+"::"+C+"|Q  ww|"+CC+"::"+C+"| "+S+" {(|"+CC+"::"+C+"|   %%|"+CC+"::"+C+"|  %%%|"+CC+"::"+C+"|_%%%O|"+CC
      if N == 13 then Deck[i] = C+" _____ "+CC+"::"+C+"|K  WW|"+CC+"::"+C+"| "+S+" {)|"+CC+"::"+C+"|   %%|"+CC+"::"+C+"|  %%%|"+CC+"::"+C+"|_%%%>|"+CC
      i = i+1
    end for
  end for
  // END 3nigma DECK  ////////////////

  // START display ///
  send_display = function(cards)
    cards = cards.split(",")
    cards.pull
    line = range(0,5)
    display = range(0,5)
    for e in line
      for card in cards
        //if card == "0" then continue
        cardf = Deck[card.val].split("::")
        if display[e] == e then
          display[e] = cardf[e]
        else
          display[e] = display[e] + " " + cardf[e]
        end if
      end for
    end for
    for l in display
      print(l)
    end for
  end function
  // END display ////

  // END client services ///  split here!

  // START server ///
  // START DECK ////////////////////////
  deck = {}
  suits = ["hearts","spades","diamonds","clubs"]
  trumps = ["jack","queen","king"]
  deck[0] = {"joker":"joker"}
  i = 1
  for s in suits
    if i == 1 or i == 14 or i == 27 or i == 40 then
      deck[i] = {"ace":s}
      i =  i + 1
    end if
    for r in range(2,10)
      deck[i] = {r:s}
      i = i + 1
    end for
    for t in trumps
      deck[i] = {t:s}
      i = i + 1
    end for
  end for
  //END DECK ////////////////////////


  //for c in deck
  //	print(c.value)
  //end for
  print("Shuffling...")
  deck.shuffle
  //for c in deck
  //	print(c.value)
  //end for
  print("Shuffling...")
  deck.shuffle
  //for c in deck
  //	print(c.value)
  //end for

  player = {}
  player.balance = 100
  player.bet = 0
  player.hand = []
  player.total = 0
  player.has_ace = 0

  player.purge = function ()
    flush = self.hand.len
    for c in range(0, flush)
      self.hand.pop
    end for
    self.has_ace = 0
    self.total = 0
  end function

  player.calculate = function()
    //print(dealer.hand)
    total = 0
    player.has_ace = 0
    hand = player.hand
    for card in hand
      card = card.indexes
      card = card.pull
      //print(card)
      if card == "joker" then
        //player.hand.pull
        //player.hand.pull
        return 21
      end if
      if card == "ace" then
        total = total + 11
        player.has_ace = player.has_ace + 1
      else
        if card == "jack" or card == "queen" or card == "king" then
          total = total + 10
        else
          total = total + card
        end if
        //print(total)
      end if
    end for
    //print(total)
    if total < 1 then return("Stack error!")
    return total
  end function

  player.hit = function()
    if player.total == 21 then return false
    if player.total > 21 then
      if player.has_ace then
        while player.has_ace
          player.total = player.total - 10
          player.has_ace = player.has_ace - 1
        end while
        print("total: " + player.total + " (ace used)")
      else
        print(CLB+"player busts at: "+C+player.total)
        return false
      end if
    end if
    if player.total >= 21 then return false
    hit = user_input("[hit/stay/double]:> ")
    if hit == "hit" then
      return true
    end if
    if hit == "stay" or hit == "0" then
      print(CLB+"player stays at: "+C+player.total)
      wait(.5)
      return false
    end if
    if hit == "double" then
      player.bet = player.bet + player.bet
      return 2
    end if
    return true
  end function

  player.show_hand = function()
    hnd = player.hand
    c2 = "0"
    for c in hnd
      v = c.indexes
      v = v.pull
      s = c.values
      s = s.pull
      if v == "ace" then v = 1
      if v == "jack" then v = 11
      if v == "queen" then v = 12
      if v == "king" then v = 13
      if v > 0 then v = v
      //print(s)
      if s == "hearts" then s = 0
      if s == "spades" then s = 13
      if s == "diamonds" then s = 26
      if s == "clubs" then s = 39
      //print("v:"+v+" s:"+s)
      c1 = v + s
      c2 = c2 +","+ c1
    end for

    //print("debug: "+c2)
    //localhost.launch(localmachine.current_path+"/3deck", c2)
    send_display(c2)
    //player.hand.pull
    //player.hand.pull
  end function

  dealer = {}
  dealer.hand = []
  dealer.total = 0
  dealer.has_ace = 0

  dealer.purge = function ()
    flush = self.hand.len
    for c in range(0, flush)
      self.hand.pop
    end for
    self.has_ace = 0
    self.total = 0
  end function

  dealer.calculate = function()
    //print(dealer.hand)
    total = 0
    dealer.has_ace = 0
    hand = dealer.hand
    for card in hand
      card = card.indexes
      card = card.pull
      //print(card)
      if card == "joker" then
        //dealer.hand.pull
        //dealer.hand.pull
        return 21
      end if
      if card == "ace" then
        total = total + 11
        dealer.has_ace = dealer.has_ace + 1
      else
        if card == "jack" or card == "queen" or card == "king" then
          total = total + 10
        else
          total = total + card
        end if
        //print(total)
      end if
    end for
    //dealer.hand.pull
    //dealer.hand.pull
    //print(total)
    if total < 1 then return("Stack error!")
    return total
  end function

  dealer.hit = function()
    if dealer.total == 21 then return false
  //	if dealer.total > 21 then
  //		while dealer.has_ace
  //			dealer.total = dealer.total - 10
  //			dealer.has_ace = dealer.has_ace - 1
  //		end while
  //	end if
    if dealer.total >= 16 then
      while (dealer.has_ace and dealer.total >= 16)
        dealer.total = dealer.total - 10
        dealer.has_ace = dealer.has_ace - 1
      end while
      if dealer.total >= 16 then return false
    end if
    return true
  end function

  dealer.show_hand = function()
    hnd = dealer.hand
    c2 = "0"
    for c in hnd
      v = c.indexes
      v = v.pull
      s = c.values
      s = s.pull
      if v == "ace" then v = 1
      if v == "jack" then v = 11
      if v == "queen" then v = 12
      if v == "king" then v = 13
      if v > 0 then v = v
      //print(s)
      if s == "hearts" then s = 0
      if s == "spades" then s = 13
      if s == "diamonds" then s = 26
      if s == "clubs" then s = 39
      //print("v:"+v+" s:"+s)
      c1 = v + s
      c2 = c2 +","+ c1
    end for

      //print("debug: "+c2)
    //localhost.launch(localmachine.current_path+"/3deck", c2)
    send_display(c2)
  end function


  deal = function(pass_deck)
    i=1
    pd = pass_deck
    print("Shuffling...")
    pd.shuffle
    print("Dealing...")
    wait(.5)
    clear_screen
    dealer.hand.push(pd[i])
    dealer.hand.push(pd[i+1])
    dealer.show_hand
    dealer.total = dealer.calculate
    print(CW+"dealer: " +C+ dealer.total + " " + pd[i] + " | " + pd[i+1])
    i = i + 2
    print(GC+"-------------------------------------------"+C)
    player.hand.push(pd[i])
    player.hand.push(pd[i+1])
    player.total = player.calculate
    print(CLB+"player: " +C+ player.total + " " + pd[i] + " | " + pd[i+1])
    player.show_hand
    i = i + 2
    print
    if player.total == 21 then return 3
    hitting = true
    while hitting
      hitting = player.hit
      if hitting then
        if hitting == 2 then
          hitting = false
          print(CLB+"player doubles: "+C)
          wait(.5)
        else
          print(CLB+"player hits: "+C)
          wait(.5)
        end if
        player.hand.push(pd[i])
        player.total = player.calculate
        clear_screen
        dealer.show_hand
        print(CW+"dealer: " +C+ dealer.total)
        print(GC+"-------------------------------------------"+C)
        print(CLB+"player: " +C+ player.total)
        player.show_hand
        i = i + 1
      end if
    end while

    if player.total > 21 then return false
    print(GC+"-------------------------------------------"+C)
    hitting = true
    while hitting
      hitting = dealer.hit
      if hitting then
        dealer.hand.push(pd[i])
        dealer.total = dealer.calculate
        clear_screen
        print(CW+"dealer hits: "+C)
        dealer.show_hand
        print(CW+"dealer: " +C+ dealer.total)
        print(GC+"-------------------------------------------"+C)
        print(CLB+"player: " +C+ player.total)
        player.show_hand

        wait(.5)
        i = i + 1
      else
        print(char(10)+CW+"dealer stays at: " +C+ dealer.total)
        wait(.5)
      end if
    end while

    if dealer.total > 21 then
      print("dealer<b> busts</b>.")
      return true
    end if
    outcome = null
    if dealer.total > player.total then
      outcome = false
    else
      if dealer.total ==  player.total then
        outcome = 2
      else
        outcome = true
      end if
    end if
    return(outcome)
  end function

  blackjack = function(game_deck)
    d = game_deck
    playing = true  // this never gets set to false
    while playing
      d.shuffle
      if player.balance < 0 then
        print("Oh No! You owe the mob money! Run for your life!")
        wait(2)
        return("You didn't get away! Your legs are broken, encased in cement and you are tossed in the river.\nGame over!")
      end if
      if player.balance < 1 then return("You're broke! You have no more bucks to give.\nGame over!")  // exit condition 1
      print
      bet = user_input("Place yer bet! [balance: <b>" + player.balance + "</b>]\n  ")
      if bet == "q" or bet == "Q" or bet == "quit" or bet == "exit" then break  // exit condition 2
      if bet.val > 0 and bet.val <= player.balance then
        print("Bet of <b>"+bet.val+"</b> bucks placed.")
        player.bet = bet.val
        result = deal(d)
        dealer.purge
        player.purge
        if result then
          if result == 2 then
            print("<b>Push!</b>\n [balance unchanged]")
          else
            if result == 3 then
              print("Blackjack! Paying time-and-a-half. [<b>" + floor(player.bet * 1.5) + " </b>bucks credited to balance]")
              player.balance = player.balance + floor(player.bet * 1.5)
            else
              print("<b>You win!</b>\n [<b>" + player.bet + " </b>bucks credited to balance]")
              player.balance = player.balance + player.bet
            end if
          end if
        else
          print("<b>You lose!</b>\n [<b>" + player.bet + " </b>bucks debited from balance]")
          player.balance = player.balance - player.bet
        end if
      else
        print("Bet must be between 1 and "+player.balance+" or [q]uit.")
      end if
    end while
  end function

  return blackjack(deck)
end function
///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
///////////////////////////////////////DRUGWARS//////////////
////////////////////////////////////////////////////////////
g3 = function()
    // drug wars v 0.2 by Plu70
    //
    //
    //

    // game time constants
    globals.TIMELIMIT = 31
    globals.GAMETIME  =  0
    globals.GOAL = "1337331"
    
    // class player
    PLAYER = {} 
    PLAYER.location=""
    PLAYER.inventory_size=100
    //PLAYER.inventory_contents=[]
    PLAYER.heat=0
    PLAYER.event_status=""
    
    //////////////// GRAPHICS /////////////////
    
    colorCyan = "<color=#00FFFF><b>"
    CT = "</b></color>"
    
    logo = ["D","R","U","G","W","A","R","S"]
    
    officerHardassSprite = "
                          _______________
                          \      __      /         __
                           \_____()_____/         /  )
                           '============`        /  /
                            #---\  /---#        /  /
                           (# @\| |/@  #)      /  /
                            \   (_)   /       /  /
                            |\ '---` /|      /  /
                    _______/ \\_____// \____/ o_|
                   /       \  /     \  /   / o_|
                  /|           o|        / o_| \
                 / |  _____     |       / /   \ \
                /  |  |===|    o|      / /\    \ \
               |   |   \@/      |     / /  \    \ \
               |   |___________o|__/----)   \    \/
               |   '              ||  --)    \     |
               |__________________||  --)     \    /
                   |           o|   ''''   |   \__/
                   |            |          |
                     ""Officer Hardass"" Img by Rosebud"
    
    
                                            
    deaSprite = "
       Art by Joan G. Stark
               _.---._
            .-' ((O)) '-.
             \ _.\_/._ /
              /..___..\
              ;-.___.-;
             (| e ) e |)     .;.
              \  /_   /      ||||
              _\__-__/_    (\|'-|
            /` / \V/ \ `\   \ )/
           /   \  Y  /   \  /=/
          /  |  \ | / {}  \/ /
         /  /|   `|'   |\   /
         \  \|    |.   | \_/
          \ /\    |.   |
           \_/\   |.   |
           /)_/   |    |
          // ',__.'.__,'
         //   |   |   |
        //    |   |   |
       (/     |   |   |
              |   |   |
              | _ | _ |
              |   |   |
              |   |   |
              |   |   |
        jgs   |___|___|
              /  J L  \
             (__/   \__)"
    
    
                    fbiSprite = "
                    FBI
                            _ _.-'`-._ _
                            ;.'________'.;
                _________n.[____________].n_________
                |''_''_''_''||==||==||==||''_''_''_'']
                |'''''''''''||..||..||..||'''''''''''|
                |LI LI LI LI||LI||LI||LI||LI LI LI LI|
                |.. .. .. ..||..||..||..||.. .. .. ..|
                |LI LI LI LI||LI||LI||LI||LI LI LI LI|
            ,,;;,;;;,;;;,;;;,;;;,;;;,;;;,;;,;;;,;;;,;;,,
            ;;jgs;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
                    "
    
    
    
                    elGuapoSprite = "
                    .------\ /------.
                    |       -       |
                    |               |
                    |               |
                    |               |
                 _______________________
                 ===========.===========
                   / ~~~~~     ~~~~~ \
                  /|     |     |\
                  W   ---  / \  ---   W
                  \.      |o o|      ./
                   |                 |
                   \    #########    /
                    \  ## ----- ##  /
                     \##         ##/
                      \_____v_____/"
    
    
            rabbitSprite = "
                     ____...                                  
              .-'--''''.__    `.                                
             |            `    |                                
    (         `._....------.._.:          
    )         .()''        ``().                                
    '          () .=='  `===  `-.         
    . )       (         g)                                
    )         )     /        J          
    (          |.   /      . (                                  
    $$         (.  (_'.   , )|`                                 
    ||         |\`-....--'/  ' \                                
    /||.         \\ | | | /  /   \.                              
    //||(\         \`-===-'  '     \o.                            
    .//7' |)         `. --   / (     OObaaaad888b.                 
    (<<. / |     .a888b`.__.'d\     OO888888888888a.               
    \  Y' |    .8888888aaaa88POOOOOO888888888888888.              
    \  \ |   .888888888888888888888888888888888888b              
    |   |  .d88888P88888888888888888888888b8888888.             
    b.--d .d88888P8888888888888888a:f888888|888888b             
    88888b 888888|8888888888888888888888888\8888888"
    
    
    
    downTownSprite = "
            __   __                     ___      _
           |  | |  |      /|           |   |   _/ \_
           |  | |  |  _  | |__         |   |_-/     \-_     _
         __|  | |  |_| | | |  |/\_     |   |  \     /  |___|
        |  |  | |  | | __| |  |   |_   |   |   |___|   |   |
        |  |  |^|  | ||  | |  |   | |__|   |   |   |   |   |
        |  |  |||  | ||  | |  |   | /\ |   |   |   |   |   |
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~/  \~~~~~~~~~~~~~~~~~~~~~~~
       ~ ~~  ~ ~~ ~~~ ~ ~ ~~ ~~ ~~ \   \__   ~  ~  ~~~~ ~~~ ~~
     ~~ ~ ~ ~~~ ~~  ~~ ~~~~~~~~~~ ~ \   \o\  ~~ ~ ~~~~ ~ ~ ~~~
       ~ ~~~~~~~~ ~ ~ ~~ ~ ~ ~ ~ ~~~ \   \o\=   ~~ ~~  ~~ ~ ~~
    ~ ~ ~ ~~~~~~~ ~  ~~ ~~ ~ ~~ ~ ~ ~~ ~ ~ ~~ ~~~ ~ ~ ~ ~ ~~~~"
    
    
    villaSprite = "
                           X_x
                          / \\\
                          |n| |
                        )(|_|-'X
                       /  \\Y// \
                       |A | | |A|
                       |  | | |_|
                )(__X,,|__|MEB;;;-,)(,
               /  \\\;;;;;;;;;;;;/    \
               |A | |            | U  |
             )_|  | |____)-----( |    |
            ///|__|-'////       \|___)=(__X
           /////////////         \///   \/ \
           |           |  U    U |//     \u|
           |   )_,-,___|_)=(     | |  U  |_|_X
           |  ///   \\|//   \    | |  __ |/// \
         )_')(//     \Y/     >---)=( /  \|  | |-----------------..,
        //// ,\ u   u |   u /////   \|  ||__|A|----------------.., \,
       |  | .. |      |    ///// ,-, \__||--------------------.., \, \,
    ---'--'_::_|______'----| u | | | |-----------------------.., \, \, \,
                           |___|_|_|_|----------------------.., \, \, \, \,
    -------------------------------------------------------.., \, \, \, \, \
                                                                      \Valkyrie"
    
    
    gcccSprite = "
                                                              |>>>
                       _                      _                |
        ____________ .' '.    _____/----/-\ .' './========\   / \
       //// ////// /V_.-._\  |.-.-.|===| _ |-----| u    u |  /___\
      // /// // ///==\ u |.  || | ||===||||| |T| |   ||   | .| u |_ _ _ _ _ _
     ///////-\////====\==|:::::::::::::::::::::::::::::::::::|u u| U U U U U
     |----/\u |--|++++|..|'''''''''''::::::::::::::''''''''''|+++|+-+-+-+-+-+
     |u u|u | |u ||||||..|              '::::::::'           |===|>=== _ _ ==
     |===|  |u|==|++++|==|              .::::::::.           | T |....| V |..
     |u u|u | |u ||HH||         \|/    .::::::::::.
     |===|_.|u|_.|+HH+|_              .::::::::::::.              _
                    __(_)___         .::::::::::::::.         ___(_)__
    ---------------/  / \  /|       .:::::;;;:::;;:::.       |\  / \  \-------
    ______________/_______/ |      .::::::;;:::::;;:::.      | \_______\________
    |       |     [===  =] /|     .:::::;;;::::::;;;:::.     |\ [==  = ]   |
    |_______|_____[ = == ]/ |    .:::::;;;:::::::;;;::::.    | \[ ===  ]___|____
         |       |[  === ] /|   .:::::;;;::::::::;;;:::::.   |\ [=  ===] |
    _____|_______|[== = =]/ |  .:::::;;;::::::::::;;;:::::.  | \[ ==  =]_|______
     |       |    [ == = ] /| .::::::;;:::::::::::;;;::::::. |\ [== == ]      |
    _|_______|____[=  == ]/ |.::::::;;:::::::::::::;;;::::::.| \[  === ]______|_
       |       |  [ === =] /.::::::;;::::::::::::::;;;:::::::.\ [===  =]   |
    ___|_______|__[ == ==]/.::::::;;;:::::::::::::::;;;:::::::.\[=  == ]___|_____"
    
    shabbyTownSprite = "
                  )
                 (      _[]_         (
         __[]___[]___[]/____\_[]_    )
        /______________|[][]|____\  (
        |[][]|[][]|[][]|[][]|[][]|__[]_
        |  /\|/\  |  /\|  /\|/\  |_____\
        |[]|||||[]|[]|||[]|||||[]|[_]|||
      ===================================
      -  -  -  -  -  -  -  -  -  -  -  -  -
    =========================================   Tom Harvey"
    
    districtSprite = "
                      \  |  /         ___________
       ____________  \ \_# /         |  ___      |       _________
      |            |  \  #/          | |   |     |      | = = = = |
      | |   |   |  |   \\#           | |`v'|     |      |         |
      |            |    \#  //       |  --- ___  |      | |  || | |
      | |   |   |  |     #_//        |     |   | |      |         |
      |            |  \\ #_/_______  |     |   | |      | |  || | |
      | |   |   |  |   \\# /_____/ \ |      ---  |      |         |
      |            |    \# |+ ++|  | |  |~~~~~~| |      | |  || | |
      |            |    \# |+ ++|  | |  |~~~~~~| |      | |  || | |
    ~~|    (~~~~~) |~~~~~#~| H  |_ |~|  | |||| | |~~~~~~|         |
      |    ( ||| ) |     # ~~~~~~    |  | |||| | |      | ||||||| |
      ~~~~~~~~~~~~~________/  /_____ |  | |||| | |      | ||||||| |
                                     ~~~~~~~~~~~~~      | ||||||| |"
    
    
    shadyAcresSprite = "
      ~         ~~          __
           _T      .,,.    ~--~ ^^
     ^^   // \                    ~
          ][O]    ^^      ,-~ ~
       /''-I_I         _II____
    __/_  /   \ ______/ ''   /'\_,__
      | II--'''' \,--:--..,_/,.-{ },
    ; '/__\,.--';|   |[] .-.| O{ _ }
    :' |  | []  -|   ''--:.;[,.'\,/
    '  |[]|,.--'' '',   ''-,.    |
      ..    ..-''    ;       ''. '  Steven Maddison"
    
    lasGreygasSprite = "
                                     .''.
           .''.             *''*    :_\/_:     . 
          :_\/_:   .    .:.*_\/_*   : /\ :  .'.:.'.
      .''.: /\ : _\(/_  ':'* /\ *  : '..'.  -=:o:=-
     :_\/_:'.:::. /)\*''*  .|.* '.\'/.'_\(/_'.':'.'
     : /\ : :::::  '*_\/_* | |  -= o =- /)\    '  *
      '..'  ':::'   * /\ * |'|  .'/.\'.  '._____
          *        __*..* |  |     :      |.   |' .---'|
           _*   .-'   '-. |  |     .--'|  ||   | _|    |
        .-'|  _.|  |    ||   '-__  |   |  |    ||      |
        |' | |.    |    ||       | |   |  |    ||      |
     ___|  '-'     '    ''      '-'   '-.'    '`      |____
    jgs~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    "
    capitolSprite = "
                                 ^
                    _______     ^^^
                   |xxxxxxx|  _^^^^^_
                   |xxxxxxx| | [][]  |
                ______xxxxx| |[][][] |
               |++++++|xxxx| | [][][]|      
               |++++++|xxxx| |[][][] |
               |++++++|_________ [][]|
               |++++++|=|=|=|=|=| [] |
               |++++++|=|=|=|=|=|[][]|
    ___________|++HH++|  _HHHH__|   _________   _________  _________
             _______________   ______________      ______________
    __________________  ___________    __________________    ____________"
    
    
    
    
    /////////////////////////////////////////////
    
    ////// DRUGS /////////
    drug = {}
    drug.price=0
    drug.size=0
    drug.event_status=""
    drug.availability=1
    drug.held=0
    drug.buy = function(amount)  // handles moving inventory. does not handle payment. takes player object, integer
        if typeof(amount) != "number" or amount < 1 or amount > self.availability then return 0
        if player.cash < self.cost * amount then return 0
        if self.size * amount <= player.inventory_size then self.held = self.held + amount else return 0
        player.debit( (self.cost * amount) )
        player.update_inventory( "in", (self.size * amount) )
        self.availability = self.availability - amount
        return 1
    end function 
    drug.sell = function(amount) // handles moving inventroy. does not handle payment. takes player object, integer
        if typeof(amount) != "number" or amount < 1 then return 0
        if self.held >= amount then self.held = self.held - amount else return 0
        player.credit( (self.cost * amount) )
        player.update_inventory("out", self.size * amount)
        self.availability = self.availability + amount
        return 1
    end function
    
    //
    
    cannabis = new drug
    cannabis.name = "cannabis"
    cannabis.price = 100
    cannabis.size = 4
    cannabis.cost = 100
    cannabis.icon = "<color=green><b>_\||/_</b></color>"
    
    mushrooms = new drug
    mushrooms.name = "mushrooms"
    mushrooms.price = 50
    mushrooms.size = 2
    mushrooms.cost = 50
    mushrooms.icon = "<color=white><b>.<color=red>`<color=white>||</color>`</color>.</b></color>"
    
    molly = new drug
    molly.name = "molly"
    molly.price = 20
    molly.size = 1
    molly.cost = 20
    molly.icon = "<color=orange><b>..(o).</b></color>"
    
    cocaine = new drug
    cocaine.name = "cocaine"
    cocaine.price = 500
    cocaine.size = 10
    cocaine.cost = 500
    cocaine.icon = "<color=white><b>.[==].</b></color>"
    
    heroin = new drug
    heroin.name = "heroin"
    heroin.price = 1000
    heroin.size = 20
    heroin.cost = 1000
    heroin.icon = "<color=#272626ff><b>.====.</b></color>"
    
    lean = new drug
    lean.name = "lean"
    lean.price = 300
    lean.size = 4
    lean.cost = 300
    lean.icon = "<color=purple><b>.<u>|~~|</u>.</b></color>"
    
    crack = new drug
    crack.name = "crack"
    crack.price = 200
    crack.size = 5
    crack.cost = 200
    crack.icon = "<b><color=white>.<*<*></b></color>"
    
    acid = new drug
    acid.name = "acid"
    acid.price = 400
    acid.size = 3
    acid.cost = 400
    acid.icon = "<b><color=blue>.{#}..</b></color>"
    _drogas = [cannabis,mushrooms,molly,cocaine,heroin,lean,crack,acid]
    
    //////// END DRUGS /////////
    
    //////// NEIGHBORHOODS /////////
    
    neighborhood = {}
    neighborhood.name=""
    neighborhood.wealth=""
    neighborhood.population=""
    neighborhood.drug_modifiers=""
    neighborhood.event_status=""
    
    downtown = new neighborhood
    downtown.name = "Downtown"
    downtown.wealth = 1000
    downtown.population = 100
    downtown.drug_modifiers =    {"cannabis":"medium","mushrooms":"medium","molly":"medium","cocaine":"high","heroin":"high","lean":"medium","crack":"medium","acid":"medium"}
    downtown.sprite = downTownSprite
    
    villa = new neighborhood
    villa.name = "Greyton's Villa"
    villa.wealth = 5000
    villa.population = 10
    villa.drug_modifiers =      {"cannabis":"low","mushrooms":"low","molly":"low","cocaine":"high","heroin":"high","lean":"medium","crack":"low","acid":"medium"}
    villa.sprite = villaSprite
    
    gccc = new neighborhood
    gccc.name = "Grey County Community College"
    gccc.wealth = 500
    gccc.population = 300
    gccc.drug_modifiers =       {"cannabis":"high","mushrooms":"high","molly":"medium","cocaine":"medium","heroin":"medium","lean":"medium","crack":"medium","acid":"low"}
    gccc.sprite = gcccSprite
    
    shabbytown = new neighborhood
    shabbytown.name = "Shabbytown"
    shabbytown.wealth = 200
    shabbytown.population = 100
    shabbytown.drug_modifiers = {"cannabis":"medium","mushrooms":"medium","molly":"medium","cocaine":"low","heroin":"medium","lean":"high","crack":"high","acid":"medium"}
    shabbytown.sprite = shabbyTownSprite
    
    district = new neighborhood
    district.name = "District 108"
    district.wealth = 350
    district.population = 50
    district.drug_modifiers =  {"cannabis":"low","mushrooms":"medium","molly":"low","cocaine":"medium","heroin":"high","lean":"high","crack":"high","acid":"medium"}
    district.sprite = districtSprite
    
    shady = new neighborhood
    shady.name = "Shady Acres"
    shady.wealth = 800
    shady.population = 75
    shady.drug_modifiers =    {"cannabis":"high","mushrooms":"low","molly":"high","cocaine":"medium","heroin":"low","lean":"medium","crack":"medium","acid":"medium"}
    shady.sprite = shadyAcresSprite
    
    greygas = new neighborhood
    greygas.name = "Las Greygas"
    greygas.wealth = 1000
    greygas.population = 300
    greygas.drug_modifiers =  {"cannabis":"low","mushrooms":"high","molly":"high","cocaine":"high","heroin":"low","lean":"low","crack":"medium","acid":"high"}
    greygas.sprite = lasGreygasSprite
    
    capitol = new neighborhood
    capitol.name = "Capitol Heights"
    capitol.wealth = 1000
    capitol.population = 150
    capitol.drug_modifiers =  {"cannabis":"medium","mushrooms":"medium","molly":"medium","cocaine":"high","heroin":"medium","lean":"low","crack":"medium","acid":"low"}
    capitol.sprite = capitolSprite
    
    _hoods = [ downtown, villa, gccc, shabbytown, district, shady, greygas, capitol ]
    if DEBUG then
        for h in _hoods
            print h.name // debug
        end for
    end if
    /////// END NEIGHBORHOODS ///////
    
    /////// EVENTS ///////////////
    event = {}
    event.names=["Officer_Hardass","The_DEA","The_FBI","El_Guapo","Rabbit"]
    //event.affects = ["player", "drug", "neighborhood"]
    //event.effect = ["price", "availability", "heat","shop"]
    event.Rabbit = function()
        print
        print rabbitSprite
        print
        print "A shadow fellow pulls you into an alley and offers you a deal."
        print "<color=yellow>Wanna buy a trenchcoat for an extra 20 inventory? $1000 cash, bub."
        print
        choice = user_input("[1] or Yes (anything else for no):> ")
        if choice == "1" or choice.lower == "yes" then 
            if player.cash >= 1000 then 
                print
                print "<color=yellow>Here you go. Hmm, looks good on you."
                player.cash = player.cash - 1000
                player.inventory_size = player.inventory_size + 20
                player.event_status = "none"
            else 
                print
                print "<color=yellow>You don't have the cash, bub!"
            end if
        else 
            print
            print "<color=yellow>A'ight, cool. I know someone else that wants it."
        end if
        return null
    end function 
    event.El_Guapo = function()
        print 
        print elGuapoSprite
        print
        print "El Guapo's narco sub has made berth. "
        print "The market has been flooded with cheap drugs!"
        print "Deals like these won't last long!"
        player.event_status = "none"
        return user_input("press <<b>enter</b>> to continue"+char(10))
    end function 
    event.The_FBI = function()
        print 
        print fbiSprite
        print
        print "The FBI opened an investigation into you! "
        print "They are demanding $"+ceil(player.cash / 10)+" in bribes to avoid jail time!"
        print "You fill a duffel bag with the money and head to the FBI field office."
        print "When you arrive you dump the cash on their doorstep."
        print "You decide to keep the duffelbag. "
        print "Your inventory space has increased by 10!"
        player.cash = ceil(player.cash / 10)
        player.inventory_size = player.inventory_size + 10
        player.event_status = "none"
        return user_input("press <<b>enter</b>> to continue"+char(10))
    end function 
    event.The_DEA = function()
        print 
        print deaSprite
        print
        print "The DEA made a major bust! \nDrug availability has temporarily gone down! \nPrices have permanently gone up!"
        player.event_status = "none"
    
        return user_input("press <<b>enter</b>> to continue"+char(10))
    end function 
    event.Officer_Hardass = function()
    
        print 
        print officerHardassSprite
        print
        print "Officer Hardass caught you slinging dope and beat your ass! "+char(10)+"He took all your drugs and you had to bribe him with $"+ceil(player.cash / 10)+" to avoid jail time."
        print "Barely able to stand, you wonder if you will survive another day."
        player.cash = player.cash - ceil(player.cash / 10)
        for d in _drogas 
            a = d.held
            d.sell(a)
            player.debit(d.cost * a)
        end for
        player.event_status = "none"
        return user_input("press <<b>enter</b>> to continue"+char(10))
    end function 
    ////// END EVENTS //////////
    
    // win condition
    _score = function()
        if player.cash >= GOAL.to_int then return("You win! :]") else return("You lose. :[")
        return null
    end function
    
    // each time the player moves we tick the clock up one.
    _game_time_update = function()
        globals.GAMETIME = GAMETIME + 1
        status = null
        if GAMETIME >= TIMELIMIT then status = (_score)
        if DEBUG then print "debug: tick"
        if DEBUG then print "debug: gametime: "+GAMETIME
        player.event_status = "none"
        if event.names.len > 0 then
            ev = range(0,9)
            ev.shuffle 
            e = ev.pop 
            event.names.shuffle   
            if DEBUG then 
                player.event_status = event.names.pop 
            else 
                if e == 9 then player.event_status = event.names.pop
            end if
        end if 
        return status
    end function 
    
    // drug price and availability based on popularity and population
    _update_drug_prices = function(locale)
        price = {}
        price.low = [1,1.5,2,2.5,3]
        price.medium = [3.5,4,5,6,4]
        price.high = [6.5,7,8,9,2]
    
        for d in _drogas 
            // modify prices
            r = [0,1,2,3,4]
            r.shuffle 
            if DEBUG then print "debug: "+d.name+char(10)+"debug: "+locale.name
            mod = price[locale.drug_modifiers[d.name]][r[0]]
            d.cost = d.price * mod
            d.availability = ceil(locale.population / mod)
            if player.event_status == "El_Guapo" then 
                d.availability = d.availability * 2
                d.cost = ceil(d.cost / 1.5)
            end if
            if player.event_status == "The_DEA" then 
                d.price = d.price + (d.price / 10)
                d.availability = ceil(d.availability / 2)
                d.cost = ceil(d.cost * 1.5)
            end if 
            if DEBUG then print "debug: cost: "+ d.cost
            if DEBUG then print "debug: avail: "+ d.availability
        end for 
    end function
    
    ///////////////////////////////////////
    //////// PLAYER ONE /////////
    
    player = new PLAYER 
    player.location = downtown // player starts here
    player.inventory_size=100
    //player.inventory_contents=[]
    player.heat=0
    player.event_status="none"
    player.cash = 100
    //
    player.update_location = function(moveto) // expects neighborhood object
        if DEBUG then print "debug: moveto: "+moveto.name // debug
        if self.location != moveto then self.location = moveto else return 0
        stat = _game_time_update
        _update_drug_prices(self.location)
        if player.event_status != "none" then event[player.event_status]
        return 1
    end function
    //
    player.debit = function( amount )
        if typeof(amount) != "number" or amount > player.cash or amount < 1 then return 0
        self.cash = self.cash - amount 
        return 1
    end function 
    player.credit = function( amount )
        if typeof(amount) != "number" or amount < 1 then return 0
        self.cash = self.cash + amount 
        return 1
    end function
    //
    player.update_inventory = function( direction, amount )
        if direction == "in" then self.inventory_size = self.inventory_size - amount
        if direction == "out" then self.inventory_size = self.inventory_size + amount 
        return null
    end function
    //player.property = ["none"]
    //player.net worth = 100
    //////////////////////////////////////
    
    move_menu = function(pr)
        print "current location: "+pr.location.name
        for h in _hoods
            //print h
            print "[<b>"+_hoods.indexOf(h)+"</b>] - "+h.name
        end for 
        choice = user_input("Move to :> ").to_int// int
        if choice == "" then return pr.location
        if DEBUG then print "debug: choice: "+choice
        if typeof(choice) == "number" and choice >= 0 and choice < _hoods.len then return _hoods[choice] else return pr.location // if we didn't move, return current location
    end function 
    
    drug_menu = function()
        print // something
        buf = []
        for d in _drogas
            buf.push("[<b>"+_drogas.indexOf(d)+"</b>] - "+d.name+" $"+d.cost+" "+d.availability+" units available, "+d.held+"/"+ ( floor( player.inventory_size / d.size ) + d.held ) + " units held "+d.icon )
        end for 
        print format_columns(buf.join(char(10)))
        choice = user_input(":> ")
        if choice == "" then return 
        if typeof(choice.to_int) == "number" and choice.to_int >= 0 and choice.to_int < _drogas.len and _drogas.hasIndex(choice.to_int) then return _drogas[choice.to_int] else print "Invalid selection."
        return 0
    end function 
    
    
    playing = true
    
    // game loop
    while playing == true
        if not DEBUG then clear_screen
        print    
        print player.location.sprite
        print
        // show location
        print "<u><color=#40865bff>Location: <b>"+player.location.name+"</b></u> <u>Days Left: <b>"+ (31 - GAMETIME)
        // show inventory
        print "<u><color=#40865bff>Inventory: <b>"+player.inventory_size+"</b> pocket space available."
        d_b = []
        print "- - - - - - - - - - - - - - - - - - - -"
        for d in _drogas
            d_b.push(  "<u><color=#40865bff>"+d.name.upper+" |"+colorCyan+d.held+CT+"|</u> <color=red>"+logo.pull+"</color> ["+d.icon+"]" )
        end for
        print format_columns(d_b.join(char(10)))
    
        // show cash
        print 
        print "<color=#40865bff>Cash: <color=yellow><b>$"+player.cash+"</color> Goal: >= <color=yellow>"+GOAL
        print
    
        // show prompt
        if player.event_status != "none" then print "[<color=yellow>E</color>] - "+player.event_status
        print "[<color=white>1</color>] - Buy [<color=white>2</color>] - Sell [<color=white>3</color>] - Move [<color=white>q</color>] - quit"
    
        // handle choices
        choice = user_input(":> ")
    
        // quit
        if choice == "q" then return "goodbye"
    
        // handle [rabbit] event
        if choice.lower == "e" and player.event_status != "none" then 
            event[player.event_status]
            user_input("press <<b>enter</b>> to continue")
            continue
        end if
    
        // -- buy drugs
        if choice == "1" then 
            drug_to_buy = drug_menu
            if drug_to_buy then print "Buying "+drug_to_buy.name else continue
            if drug_to_buy.buy(user_input("Amount :> ").to_int) then print "Success." else print "Failed."
            user_input("press <<b>enter</b>> to continue")
            continue
        end if
    
        // -- sell drugs
        if choice == "2" then 
            drug_to_sell = drug_menu
            if drug_to_sell then print "Selling "+drug_to_sell.name else continue
            if drug_to_sell.sell(user_input("Amount :> ").to_int) then print "Success." else print "Failed."
            user_input("press <<b>enter</b>> to continue")
            continue
        end if
    
        // -- move location // update prices, availability and location
        if choice == "3" then
            move = player.update_location(move_menu(player))
            if move == 1 then print "Travelling..." 
            if move == 0 then print "Staying put."
            if typeof(move) == "string" then return move // game over win/lose
            user_input("press <<b>enter</b>> to continue")
            continue
        end if
    
        // repeat until timelimit
        // exit with score
    end while
end function

///////////////////////////////////////start here///////////////////////////
print("[0] Battleship")
print("[1] Battleship - AI vs AI")
print("[2] Blackjack  - jokers wild")
print("[3] Drugawars")
print("[4] Back")
pick = user_input("||: ",0,1)
//if pick > 2 then return
if pick == "0" then return bat("")
if pick == "1" then return bat("-s")
if pick == "2" then return g2
if pick == "3" then return g3
