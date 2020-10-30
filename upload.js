const products = [
    {
       "artnr":"GB-MARIOLAND","artnamn":"Super Mario Land","price":"599.00","text":"Super Mario Land[a]&#160;is a 1989&#160;side-scrolling&#160;platform video game&#160;developed and published by&#160;Nintendo&#160;as a&#160;launch title&#160;for their&#160;Game Boy&#160;handheld game console. It is the first&#160;Mario&#160;platform game ever to be released for a handheld console. In gameplay similar to that of the 1985&#160;Super Mario Bros., but resized for the smaller device's screen, the player advances&#160;Mario&#160;to the end of 12&#160;levels&#160;by moving to the right and jumping across platforms to avoid enemies and pitfalls.","Text_Kort_SV":"Super Mario Land[a] is a 1989 side-scrolling platform video game developed and published by Nintendo as a launch title for their Game Boy handheld game console."  },
    {
       "artnr":"GB-POKEBLUE","artnamn":"Pokémon Blue Version","price":"499.00","text":"","Text_Kort_SV":"Pok&#233;mon Red Version&#160;and&#160;Pok&#233;mon Blue Version&#160;are 1996&#160;role-playing video games&#160;developed by&#160;Game Freak&#160;and published by&#160;Nintendo&#160;for the&#160;Game Boy. They are the first installments of the&#160;Pok&#233;mon&#160;video game series."  },
    {
       "artnr":"GB-POKEGEN1","artnamn":"Pokémon","price":"fr. 469.00","text":"","Text_Kort_SV":"Pok&#233;mon Red Version&#160;and&#160;Pok&#233;mon Blue Version&#160;are 1996&#160;role-playing video games&#160;developed by&#160;Game Freak&#160;and published by&#160;Nintendo&#160;for the&#160;Game Boy. They are the first installments of the&#160;Pok&#233;mon&#160;video game series."  },
    {
       "artnr":"GB-POKERED","artnamn":"Pokémon Red Version","price":"469.00","text":"","Text_Kort_SV":"Pok&#233;mon Red Version&#160;and&#160;Pok&#233;mon Blue Version&#160;are 1996&#160;role-playing video games&#160;developed by&#160;Game Freak&#160;and published by&#160;Nintendo&#160;for the&#160;Game Boy. They are the first installments of the&#160;Pok&#233;mon&#160;video game series."  },
    {
       "artnr":"GB-TETRIS","artnamn":"Tetris","price":"299.00","text":"<span style=\"font-family: helvetica, arial, sans-serif;\">The Game Boy version of&#160;Tetris&#160;plays identically to versions on other platforms. A&#160;pseudorandom&#160;sequence of \"tetrominoes\" &#8211; shapes composed of four square blocks each &#8211; fall down the playing field, which is 10 blocks wide by 18 blocks high in the Game Boy version. The objective of the game is to manipulate these tetrads, by moving each one sideways and rotating it by 90-degree units, with the aim of creating a horizontal line of blocks without gaps.</span>","Text_Kort_SV":"Portable version of Alexey Pajitnov's original Tetris and it was bundled in the North American and European releases of the Game Boy itself."  },
    {
       "artnr":"N64-DK64","artnamn":"Donkey Kong 64","price":"449.00","text":"Donkey Kong 64 is a 3D platforming adventure game in which the player, as Donkey Kong and his friends, explores an island and collects items to progress through minigames and puzzles. The game follows a traditional storyline for the series: King K. Rool and his reptilian Kremlings invade the idyllic DK Isle and kidnap Donkey Kong's friends, planning to power up their Blast-O-Matic weapon and destroy the island. After a tutorial, the player embarks as Donkey Kong to rescue the others from their kidnappers and stop K. Rool's plan. While exploring the in-game world and completing puzzle minigames, the player collects two types of bananas: normal bananas, which are colored differently for each Kong character, award the player with banana medals and can be traded for access to each world's boss fight; and golden bananas, a certain number of which are required to unlock each new in-game world. The game features a total of 3,821 collectibles, though only 281 are required to complete it.","Text_Kort_SV":"<span style=\"font-family: helvetica, arial, sans-serif; font-size: 12pt;\">3D platforming adventure game in which the player, as Donkey Kong and his friends, explores an island and collects items to progress through minigames and puzzles.</span>"  },
    {
       "artnr":"N64-SWEP1RACER","artnamn":"Star Wars Episode I: Racer","price":"499.00","text":"<span style=\"font-family: helvetica, arial, sans-serif;\"><em>Star Wars Episode I: Racer</em>&#160;features a variety of tracks spanning several different planets. It also includes all of the racers featured in the movie as well as additional competitors exclusive to the game. The player character's&#160;podracer&#160;is equipped with a boost function that the player can activate. While activated the podracer's temperature will rise, and if the player boosts for too long, the engines will explode, destroying the podracer and costing the player several seconds as he/she&#160;respawns&#160;to continue racing. The podracer will also be destroyed if one or both engines sustain severe damage from colliding into too many walls or obstacles, requiring the player to steer carefully to avoid falling behind. The player can also actively repair the podracer while competing, however doing so results in a slower overall speed until repairs are either complete or stopped.</span>","Text_Kort_SV":"<span style=\"font-family: helvetica, arial, sans-serif;\"><em>Star Wars Episode I: Racer</em>&#160;features a variety of tracks spanning several different planets. It also includes all of the racers featured in the movie as well as additional competitors exclusive to the game. </span>"  },
    {
       "artnr":"PS-alone-in-the-dark-2-19","artnamn":"Alone in the Dark 2","price":"329.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-alone-in-the-dark-the-","artnamn":"Alone in the Dark: The New Nightmare","price":"439.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-BOND1","artnamn":"The World Is Not Enough","price":"399.00","text":"The World Is Not Enough&#160;is a&#160;first-person shooter&#160;based on&#160;MGM's 1999&#160;James Bond&#160;film of the same name, where the player assumes the role of&#160;James Bond&#160;through 11 different missions.","Text_Kort_SV":"<span style=\"font-family: helvetica, arial, sans-serif; font-size: 12pt;\">The World Is Not Enough&#160;is a&#160;first-person shooter&#160;based on&#160;MGM's 1999&#160;James Bond&#160;film of the same name, where the player assumes the role of&#160;James Bond&#160;through 11 different missions.</span>"  },
    {
       "artnr":"PS-broken-sword-ii-the-sm","artnamn":"Broken Sword 2 - the Smoking Mirror","price":"449.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-carmageddon","artnamn":"Carmageddon","price":"299.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-castlevania-sotn","artnamn":"Castlevania: Symphony of the Night","price":"229.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-chrono-trigger-1995","artnamn":"Chrono Trigger","price":"209.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-command-conquer-old","artnamn":"Command & Conquer","price":"259.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-command-conquer-red-al","artnamn":"Command & Conquer: Red Alert","price":"239.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-crash-bandicoot-2","artnamn":"Crash Bandicoot 2: Cortex Strikes Back","price":"289.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-crash-bandicoot-warped","artnamn":"Crash Bandicoot 3: Warped","price":"379.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-CRASH1","artnamn":"Crash Bandicoot","price":"449.00","text":"Crash Bandicoot&#160;is a 1996&#160;platform video game&#160;developed by&#160;Naughty Dog&#160;and published by&#160;Sony Computer Entertainment&#160;for the&#160;PlayStation. It is the first installment in the&#160;Crash Bandicoot&#160;series, chronicling the creation of the&#160;title character&#160;at the hands of series antagonist&#160;Doctor Neo Cortex&#160;and henchman&#160;Doctor Nitrus Brio. The story follows Crash as he aims to prevent Brio and Cortex's plans for world domination, and rescue his girlfriend&#160;Tawna, a female bandicoot also evolved by Brio and Cortex.","Text_Kort_SV":"Crash Bandicoot is a 1996 platform video game developed by Naughty Dog and published by Sony Computer Entertainment for the PlayStation."  },
    {
       "artnr":"PS-CRASHRACE","artnamn":"Crash Team Racing","price":"399.00","text":"It is the fourth installment in the&#160;Crash Bandicoot&#160;series. The game's story focuses on the efforts of&#160;Crash Bandicoot,&#160;Doctor Neo Cortex, and other ragtag team of characters in the&#160;Crash Bandicoot&#160;series, who must race against the egomaniacal&#160;Nitros Oxide&#160;to save the&#160;Earth&#160;from destruction. In the game, players can take control of one of fifteen&#160;Crash Bandicoot&#160;series characters, though only eight are available at first. During the races, offensive and speed boosting power ups can be used to gain an advantage.","Text_Kort_SV":"<span style=\"font-family: helvetica, arial, sans-serif;\">Crash Team Racing&#160;(stylized as&#160;CTR: Crash Team Racing) is a 1999&#160;kart racing video game&#160;developed by&#160;Naughty Dog&#160;and published by&#160;Sony Computer Entertainment&#160;for the&#160;PlayStation.</span>"  },
    {
       "artnr":"PS-crusader-no-remorse","artnamn":"Crusader: No Remorse","price":"219.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-darkstone","artnamn":"DARKSTONE","price":"349.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-deathtrap-dungeon","artnamn":"Deathtrap Dungeon","price":"329.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-diablo","artnamn":"Diablo","price":"439.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-dino-crisis","artnamn":"Dino Crisis","price":"289.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-dino-crisis-2-2000","artnamn":"Dino Crisis 2","price":"259.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-disneys-hercules","artnamn":"Disney's Hercules: The Action Game","price":"469.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-disneys-tarzan","artnamn":"Disney's Tarzan","price":"389.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-doom-2","artnamn":"Doom","price":"329.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-dracula-2-the-last-san","artnamn":"Dracula 2: The Last Sanctuary","price":"389.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-driver","artnamn":"Driver","price":"329.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-duke-nukem-3d","artnamn":"Duke Nukem 3D","price":"459.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-earthworm-jim-2","artnamn":"Earthworm Jim 2","price":"219.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-final-doom","artnamn":"Final DOOM","price":"369.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-final-fantasy","artnamn":"FINAL FANTASY","price":"339.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-final-fantasy-ix","artnamn":"Final Fantasy IX","price":"199.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-final-fantasy-v","artnamn":"FINAL FANTASY V","price":"279.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-final-fantasy-vi","artnamn":"FINAL FANTASY VI","price":"479.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-final-fantasy-vii","artnamn":"Final Fantasy VII","price":"299.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-final-fantasy-viii","artnamn":"FINAL FANTASY VIII","price":"479.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-gran-turismo","artnamn":"Gran Turismo","price":"399.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-gran-turismo-2","artnamn":"Gran Turismo 2","price":"449.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-grand-theft-auto-1998","artnamn":"Grand Theft Auto","price":"479.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-grand-theft-auto-2-199","artnamn":"Grand Theft Auto 2","price":"389.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-harry-potter-and-the-c","artnamn":"Harry Potter and the Chamber of Secrets","price":"369.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-harry-potter-and-the-p","artnamn":"Harry Potter and the Philosopher's Stone","price":"369.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-hexen-for-windows-95","artnamn":"HeXen: Beyond Heretic","price":"249.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-legacy-of-kain-soul-re","artnamn":"Legacy of Kain: Soul Reaver","price":"269.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-little-big-adventure-r","artnamn":"Little Big Adventure (Relentless: Twinsen's Adventure)","price":"369.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-mdk","artnamn":"MDK","price":"369.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-medal-of-honor-1999","artnamn":"Medal of Honor","price":"479.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-medievil","artnamn":"MediEvil","price":"339.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-metal-gear-solid-1","artnamn":"Metal Gear Solid","price":"229.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-metal-slug","artnamn":"METAL SLUG","price":"429.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-mortal-kombat-2","artnamn":"Mortal Kombat 2","price":"229.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-mortal-kombat-3","artnamn":"Mortal Kombat 3","price":"339.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-mortal-kombat-4","artnamn":"Mortal Kombat 4","price":"419.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-myst","artnamn":"Myst","price":"379.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-need-for-speed-2","artnamn":"Need for Speed 2","price":"229.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-need-for-speed-3-hot-p","artnamn":"Need for Speed 3: Hot Pursuit","price":"429.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-need-for-speed-high-st","artnamn":"Need for Speed: High Stakes","price":"199.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-need-for-speed-porsche","artnamn":"Need for Speed: Porsche Unleashed","price":"389.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-oddworld-abes-exoddus","artnamn":"Oddworld: Abe's Exoddus","price":"489.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-oddworld-abes-oddysee","artnamn":"Oddworld: Abe's Oddysee","price":"499.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-pandemonium","artnamn":"Pandemonium!","price":"209.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-parasite-eve","artnamn":"Parasite Eve","price":"209.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-point-blank","artnamn":"Point Blank","price":"289.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-populous-the-beginning","artnamn":"Populous: The Beginning","price":"219.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-quake-2","artnamn":"Quake II","price":"439.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-rayman","artnamn":"Rayman","price":"249.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-rayman-2-the-great-esc","artnamn":"Rayman 2: The Great Escape","price":"279.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-resident-evil","artnamn":"Resident Evil","price":"199.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-resident-evil-2","artnamn":"Resident Evil 2 (1998)","price":"359.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-resident-evil-3-nemesi","artnamn":"Resident Evil 3: Nemesis","price":"249.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-riven","artnamn":"Riven: The Sequel to Myst","price":"219.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-shadow-man","artnamn":"Shadow Man","price":"359.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-silent-hill","artnamn":"Silent Hill","price":"219.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-simcity-2000","artnamn":"SimCity 2000","price":"399.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-spider-man-2-enter-ele","artnamn":"Spider-Man 2: Enter Electro","price":"199.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-spider-man-2000","artnamn":"Spider-Man (2000)","price":"449.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-spyro-2-riptos-rage","artnamn":"Spyro 2: Ripto's Rage!","price":"369.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-spyro-the-dragon-2007","artnamn":"Spyro the Dragon","price":"389.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-spyro-year-of-the-drag","artnamn":"Spyro: Year of the Dragon","price":"349.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-SPYRO1","artnamn":"Spyro the Dragon","price":"259.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-star-wars-dark-forces-","artnamn":"STAR WARS - Dark Forces","price":"239.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-syphon-filter","artnamn":"Syphon Filter","price":"429.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-tekken-3","artnamn":"Tekken 3","price":"319.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-the-neverhood","artnamn":"The Neverhood","price":"219.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-theme-hospital","artnamn":"Theme Hospital","price":"469.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-theme-park","artnamn":"Theme Park","price":"489.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-tomb-raider-1996","artnamn":"Tomb Raider","price":"489.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-tomb-raider-3-adventur","artnamn":"Tomb Raider 3: Adventures of Lara Croft","price":"269.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-tomb-raider-chronicles","artnamn":"Tomb Raider Chronicles","price":"439.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-tomb-raider-ii","artnamn":"Tomb Raider II","price":"269.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-tomb-raider-iv-the-las","artnamn":"Tomb Raider IV: The Last Revelation","price":"409.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-tony-hawks-pro-skater","artnamn":"Tony Hawk's Pro Skater","price":"339.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-tony-hawks-pro-skater-","artnamn":"Tony Hawk's Pro Skater 4","price":"439.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-ufo-enemy-unknown","artnamn":"X-COM: UFO Defense","price":"249.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-urban-chaos","artnamn":"Urban Chaos","price":"309.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-warcraft-2-beyond-the-","artnamn":"Warcraft 2: Beyond the Dark Portal","price":"349.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-warcraft-ii-tides-of-d","artnamn":"Warcraft II: Tides of Darkness","price":"209.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-wing-commander-3-heart","artnamn":"Wing Commander 3 Heart of the Tiger","price":"469.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-worms","artnamn":"Worms","price":"479.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-worms-armageddon","artnamn":"Worms Armageddon","price":"479.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-worms-pinball","artnamn":"Worms Pinball","price":"479.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-x-com-terror-from-the-","artnamn":"X-COM: Terror From the Deep","price":"289.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-x-men-origins-wolverin","artnamn":"X-Men Origins: Wolverine","price":"359.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-z","artnamn":"Z: The Game","price":"429.00","text":"","Text_Kort_SV":""  },
    {
       "artnr":"PS-z-1996","artnamn":"Z (1996)","price":"369.00","text":"","Text_Kort_SV":""  }
  ]

const { SiteClient } = require('datocms-client')

const client = new SiteClient('7cb43e824fe1faf51e0931012e69dd')

async function upload() {

    for (let product of products) {
        try {
            const record = await client.items.create({
                itemType: "365743",
                productName: product.artnamn,
                description: product.text ? product.text : null,
                retailPrice: product.price,
                descriptionShort: product.Text_Kort_SV ? product.Text_Kort_SV : null,
                slug: null,
                discountPrice: null,
                coverImage: null
            })
            console.log(record)
        } catch (err) {
            console.error(err)
        }
    }
}

upload()