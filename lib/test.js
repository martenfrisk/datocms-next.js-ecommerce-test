/* eslint-disable no-console */
const fs = require('fs')

const data = [
	{
		productName: 'Star Wars',
		subname: 'Episode I: Racer',
		description: "Star Wars Episode I: Racer features a variety of tracks spanning several different planets. It also includes all of the racers featured in the movie as well as additional competitors exclusive to the game. \n\nThe player character's podracer is equipped with a boost function that the player can activate. While activated the podracer's temperature will rise, and if the player boosts for too long, the engines will explode, destroying the podracer and costing the player several seconds as he/she respawns to continue racing. \n\nThe podracer will also be destroyed if one or both engines sustain severe damage from colliding into too many walls or obstacles, requiring the player to steer carefully to avoid falling behind. The player can also actively repair the podracer while competing, however doing so results in a slower overall speed until repairs are either complete or stopped.",
		descriptionShort: 'Climb on, strap in, and experience the pure adrenaline-pumping excitement of Podracing',
	},
	{
		productName: 'Super Mario Land',
		subname: '',
		description: "Super Mario Land is a 1989 side-scrolling platform video game developed and published by Nintendo as a launch title for their Game Boy handheld game console. It is the first Mario platform game ever to be released for a handheld console. In gameplay similar to that of the 1985 Super Mario Bros., but resized for the smaller device's screen, the player advances Mario to the end of 12 levels by moving to the right and jumping across platforms to avoid enemies and pitfalls.",
		descriptionShort: 'Get Ready for a New Spin on a Familiar Tail. Super Mario Land reinvents everything fans love about Mario gaming!',
	},
	{
		productName: 'Super Mario 64',
		subname: '',
		description: "Mario is super in a whole new way! Combining the finest 3-D graphics ever developed for a video game and an explosive sound track, Super Mario 64 becomes a new standard for games. It's packed with bruising battles, daunting obstacle courses and underwater adventures. Retrieve the Power Stars from their hidden locations and confront your arch nemesis - Bowser, King of the Koopas!",
		descriptionShort: 'Mario is super in a whole new way! Packed with bruising battles and daunting obstacle courses',
	},
	{
		productName: 'Donkey Kong 64',
		subname: '',
		description: "Donkey Kong 64 is a 3D platforming adventure game in which the player, as Donkey Kong and his friends, explores an island and collects items to progress through minigames and puzzles. The game follows a traditional storyline for the series: King K. Rool and his reptilian Kremlings invade the idyllic DK Isle and kidnap Donkey Kong's friends, planning to power up their Blast-O-Matic weapon and destroy the island. After a tutorial, the player embarks as Donkey Kong to rescue the others from their kidnappers and stop K. Rool's plan. While exploring the in-game world and completing puzzle minigames, the player collects two types of bananas: normal bananas, which are colored differently for each Kong character, award the player with banana medals and can be traded for access to each world's boss fight; and golden bananas, a certain number of which are required to unlock each new in-game world. The game features a total of 3,821 collectibles, though only 281 are required to complete it.",
		descriptionShort: 'Explores an island, as Donkey Kong and his friends, and collect items to progress through minigames and puzzles',
	},
	{
		productName: 'The Legend of Zelda',
		subname: 'Ocarina of Time',
		description: 'As a young boy, Link is tricked by Ganondorf, the King of the Gerudo Thieves. The evil human uses Link to gain access to the Sacred Realm, where he places his tainted hands on Triforce and transforms the beautiful Hyrulean landscape into a barren wasteland. Link is determined to fix the problems he helped to create, so with the help of Rauru he travels through time gathering the powers of the Seven Sages.',
		descriptionShort: 'Link travels through time gathering the powers of the Seven Sages to defeat Ganondorf.',
	},
	{
		productName: 'Theme Park',
		subname: '',
		description: "Think you can design and build the greatest amusement park in the world? You select the site, you layout the rides. In fact, you control every aspect of running a profitable amusement park; from hiring employees, to developing new rides, to maintaining an adequate supply of soft drinks. Any mistakes, and the bustling hordes of fun-seekers will let you know. Oh, and that Merry-Go-Round in flames is a clue too.\n\nThe player designs and operates an amusement park, with the goal of making money and creating theme parks worldwide. The game is the first instalment in Bullfrog's Theme series and their Designer Series.",
		descriptionShort: 'Think you can design and build the greatest amusement park in the world? You select the site, you layout the rides.',
	},
	{
		productName: 'Super Smash Bros.',
		subname: '',
		description: "Choose from an all-star cast of Nintendo characters in a frantic melee to prove who will be the ultimate brawler. Utilize the easy-to-learn, but hard-to-master, controls to battle it out in the single-player mode, earning point bonuses and unlocking hidden characters along the way, or enter VS Mode to take on up to three other players simultaneously. \n\nInflict damage using each character's unique set of special moves or familiar items and power-ups, eventually winning by knocking your opponents off the screen in one of the interactive stages, each with a Nintendo theme. Need a moment to catch your breath? Polish your skills in Training Mode or destroy targets in Bonus Stages specific to each character. Are you ready to test your mettle against all comers, including the powerful Master Hand?",
		descriptionShort: "The biggest, baddest brawlin' bash starring all your favourite Nintendo characters!",
	},
	{
		productName: 'GoldenEye 007',
		subname: '',
		description: "GoldenEye 007 brings the world's most famous secret agent, James Bond, to life on the Nintendo 64 - complete with license to kill. Using the full power of the Nintendo 64, GoldenEye 007 puts you right into 007's tux and bow tie in a first-person action spectacular. But there's more to it than just blowing away bad guys-- you will have to accomplish a variety of espionage objectives, like planting covert modems, copying top secret documents, and diverting the destructive course of the rogue GoldenEye satellite system.\n\nGoldenEye 007 puts would-be double \"O\" operatives through the paces in 20 challenging missions, each with three different difficulty levels. With each difficulty level, the intelligence of your opponents increases and the complexity and number of objectives grows. Following and expanding on the story line of the hit movie, GoldenEye 007's missions span the globe; from a secret base in arctic Russia to the a giant satellite antenna cradle suspended over the steaming jungles of Cuba.",
		descriptionShort: 'You are Bond. James Bond. You are assigned to covert operations connected with the GoldenEye weapons satellite',
	},
	{
		productName: 'Diddy Kong Racing',
		subname: '',
		description: "Diddy Kong Racing focuses on high-speed, entertaining racing action as well as a large dose of adventure and exploration. Diddy Kong and seven other characters will race through 20 beautiful 3-D courses on one of three vehicles: a cart, hovercraft or plane.\n\nDiddy Kong Racing also features Rare's proprietary Real-Time Dynamic Animation Technology (RDA). This programming technology allows the game to include large, colorful and highly textured characters in a massive environment. Real-Time Dynamic Animation Technology squeezes the most out of the Nintendo 64's hardware, allowing for environment mapping and specular highlighting whenever appropriate.",
		descriptionShort: "An epic racing adventure unlike anything you've ever experienced before!",
	},
	{
		productName: 'Worms',
		subname: 'Pinball',
		description: '',
		descriptionShort: "The Worms crew returns, and this time they've got balls!",
	},
	{
		productName: 'Worms',
		subname: '',
		description: '',
		descriptionShort: 'The worms are back in their most destructive game yet.',
	},
	{
		productName: 'Worms',
		subname: 'Armageddon',
		description: '',
		descriptionShort: 'Those intrepid invertebrates return with a vengeance',
	},
	{
		productName: 'Spyro the Dragon',
		subname: '',
		description: 'Spyro the Dragon is a 3D platform game; the player controls the titular character as he ventures across the realms of the Dragon World to defeat the Gnasty Gnorc, as well as rescue his fellow dragons and recover all of their stolen treasure. \n\nWorlds consist of six dragon "home worlds", each of which acts as a dedicated HUB, containing portals that serve as gateways to different levels. The player must progress from one Homeworld to the next by talking to a balloonist, who transports Spyro to the next world on a hot air balloon after the player has found the required collectibles in the current given world. In addition to regular platforming stages, each Homeworld contains a boss fight and a hidden flight stage that involves flying throughout an environment and destroying a number of objects.\n\n',
		descriptionShort: 'Control Spyro the Dragon as he ventures across the realms of the Dragon World to defeat the Gnasty Gnorc',
	},
	{
		productName: 'Tomb Raider Chronicles',
		subname: '',
		description: 'In Tomb Raider Chronicles, Lara Croft is still missing in Egypt and there is no word about her whereabouts. Fearing the worst, her closest friends arrange a service in her honor and to share their insights about some of Lara’s more mysterious exploits. Tomb Raider Chronicles offers new insights into the past adventures of Lara Croft along with a host of new weapons such as the grappling hook gun and a sniper rifle. If you feel creative and want to make your own adventures, the official Tomb Raider Level Editor is included with the game.\n',
		descriptionShort: 'Chronicles offers new insights into the past adventures of Lara Croft',
	},
	{
		productName: 'Z: The Game',
		subname: '',
		description: "Z is a real-time strategy game in which you fight for control of the sectors, some of which contains manufactories that can gain you additional units. Touch the \"flag\" in the sector and it's yours. Capture the sector before the new unit comes out of the manufactory and the new unit is yours. With six different robots (different armaments, armor, and speed), multiple vehicles (from jeeps to tanks) the robots can utilize, your ultimate objective is to destroy the opponent's base, and prevent him from doing the same to you.\n\nThe game differs from many other RTSs by emphasizing territorial control (and the manufactories) instead of getting kills and gathering a big army. You have to finely balance defense and offense. If you wait too long, the enemy will grab all the manufactories first. If you go too fast, you'll get hammered for stretching yourself too thin. You can hijack enemy vehicles by shooting the driver off. If you send a group of soldiers toward an objective and they find a vehicle, one of them will split off to grab the vehicle; you don't really need to micromanage each soldier.\n",
		descriptionShort: 'Under the command of General Zod, it is your job to take control of chain smoking, foul-mouthed, alcoholic robot-grunts',
	},
	{
		productName: 'Tomb Raider II',
		subname: '',
		description: "In the first game, Lara seeks a powerful artifact--the Scion--that seems to be the key to finding the mythical island of Atlantis. In the second game of the series our sexy archaeologist follows the trial of the mystical Dagger of Xian, which is a weapon used by the first Emperor of China, and it is said that by plunging the dagger into one's heart, the bearer turns into a dragon. The third part features non-linear gameplay, meaning you can choose not only the way in which you complete a level, but also your next destination in the story. Here, you fight against an evil corrupt corporation--RX Tech-- that has come into possession of a strange meteorite apparently imbued with unique properties.\n",
		descriptionShort: 'Lara Croft is a relic hunter who can kick butt and take names with the best of them',
	},
	{
		productName: 'Tetris',
		subname: '',
		description: 'The Game Boy version of&#160;Tetris&#160;plays identically to versions on other platforms. A&#160;pseudorandom&#160;sequence of "tetrominoes" &#8211; shapes composed of four square blocks each &#8211; fall down the playing field, which is 10 blocks wide by 18 blocks high in the Game Boy version. The objective of the game is to manipulate these tetrads, by moving each one sideways and rotating it by 90-degree units, with the aim of creating a horizontal line of blocks without gaps.',
		descriptionShort: "Portable version of Alexey Pajitnov's original Tetris",
	},
	{
		productName: 'Pokémon Red Version',
		subname: '',
		description: '',
		descriptionShort: 'Start your journey through Kanto and become a Master Trainer!',
	},
	{
		productName: 'Pokémon Red Version',
		subname: '',
		description: '',
		descriptionShort: 'Start your journey through Kanto and become a Master Trainer!',
	},
	{
		productName: 'Urban Chaos',
		subname: '',
		description: '',
		descriptionShort: 'The new millennium approaches - gangs, terrorists and violent cults lurk around every corner',
	},
]

const newData = []

data.forEach((x) => {
	let newsub = ''
	if (x.subname !== '') newsub = ` ${x.subname}`
	const name = x.productName + newsub
	const newx = {
		productName: name,
		description: x.description,
		descriptionShort: x.descriptionShort,
	}
	newData.push(newx)
	console.log(newx)
})

fs.writeFile('newdata.json', JSON.stringify(newData), (err) => {
	if (err) throw err
	console.log('File saved')
})
