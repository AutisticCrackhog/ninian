module.exports = {
	execute(a) {
		const mainArray = [
			"Mario","Donkey Kong","Link","Samus","Dark Samus","Yoshi","Kirby","Fox","Pikachu","Luigi","Ness","Captain Falcon","Jigglypuff","Peach","Daisy","Bowser","Ice Climbers","Sheik","Zelda","Dr. Mario","Pichu","Falco","Marth","Lucina","Young Link","Ganondorf","Mewtwo","Roy","Chrom","Mr. Game & Watch","Meta Knight","Pit","Dark Pit","Zero Suit Samus","Wario","Snake","Ike","Pokémon Trainer","Diddy Kong","Lucas","Sonic","King Dedede","Olimar","Lucario","R.O.B","Toon Link","Wolf","Villager","Mega Man","Wii Fit Trainer","Rosalina & Luma","Little Mac","Greninja","Mii Brawlerr","Mii Swordfighter","Mii Gunner","Palutena","Pac-Man","Robin","Shulk","Bowser Jr.","Duck Hunt","Ryu","Ken","Cloud","Corrin","Bayonetta","Inkling","Ridley","Simon","Richter","King K. Rool","Isabelle","Incineroar","Piranha Plant","Random","Joker", "Hero", "Terry", "Byleth", "Min Min"
		];
		a.message.channel.send(`Dein neuer Main wird ${mainArray[ Math.floor( Math.random()*mainArray.length ) ]} sein!`);
	},

	info: {
		name: "newmain",
		description: "Sucht dir einen neuen Main aus",
    category: "smash",
    alias: ["nm"]
	}
};
