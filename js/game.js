var Game = function (scope) {
    this.Init(scope);
};

Game.prototype.Init = function(scope) {
    this.scope = scope;

    this.items = this.createItems();
    this.itemsAvailable = [];
    this.upgrades = this.createUpgrades();
    this.upgradesAvailable = [];
    this.upgradesPurchased = [];
    this.monsters = this.createMonsters();
    this.monstersAvailable = [];

    this.chimes = 0;
    this.chimesPerClick = 1;
    this.chimesPerMeep = CHIMES_PER_MEEP;
    this.chimesPerMeepFloor = CHIMES_PER_MEEP;
    this.chimesClickRate = 0;
    this.chimesRate = 0;

    this.meeps = 0;
    this.meepGold = 0; //1 / 1.2;
    this.meepDamage = 5; //1 / 1.2;

    this.gold = STARTING_GOLD;
    this.goldRate = 0;

    this.discovery = 0;
    this.discoveryBase = 0;
    this.discoveryBonus = 1.0;

    this.swiftness = 0;
    this.swiftnessBase = 0;
    this.swiftnessBonus = 1.0;

    this.power = 0;
    this.powerBase = 5;
    this.powerBonus = 1.0;

    this.agility = 0;
    this.agilityBase = 0;
    this.agilityBonus = 1.0;

    this.income = 0;
    this.incomeBase = 0;
    this.incomeBonus = 1.0;

    this.damage = 0;
    this.damageRate = 0;
    this.damagePerClick = 0;
    this.damageClickRate = 0;
    this.monster = null;
    this.monsterHealth = 0;

    this.level = 0;
    this.experience = 0;
    this.experienceRate = 0;
    this.experienceNeeded = EXPERIENCE_NEEDED;
    this.experiencePercent = 0;



};

Game.prototype.createItems = function() {
    var items = {};

    items[RELIC_SHIELD] = new Item(this, 250, 1,      1, 0, 0, 0, 1);
    items[ANCIENT_COIN] = new Item(this, 250, 1,      0, 0, 0, 0, 5);
    items[SPELLTHIEFS_EDGE] = new Item(this, 250, 1,  0, 0, 10, 0, 3);
    items[BOOTS_OF_SPEED] = new Item(this, 750, 2,    0, 1, 0, 0, 0);
    items[RUBY_CRYSTAL] = new Item(this, 750, 2,      5, 0, 0, 0, 0);
    items[AMPLIFYING_TOME] = new Item(this, 3000, 3,  0, 0, 100, 0, 0);
    items[DAGGER] = new Item(this, 3000, 3,           0, 0, 0, 1, 0);

    // TODO: Ward Item
    // items[] = new Item(this, GREEN_WARD, 100, 1, 0, 1, 0, 0, 0);

    return items;
};

Game.prototype.createUpgrades = function() {
    var upgrades = {};

    // Boots of Speed
    upgrades[BOOTS_OF_SWIFTNESS] = new Upgrade(this, BOOTS_OF_SPEED,        8000, 4, 0, 1, 0, 0, 0, {}, ITEM_UPGRADE);
    upgrades[BOOTS_OF_MOBILITY] = new Upgrade(this, BOOTS_OF_SPEED,         160000, 6, 0, 2, 0, 0, 0, {}, ITEM_UPGRADE);
    upgrades[IONIAN_BOOTS_OF_LUCIDITY] = new Upgrade(this, BOOTS_OF_SPEED,  20000000, 9, 0, 4, 0, 4, 0, {}, ITEM_UPGRADE);
    upgrades[MERCURYS_TREADS] = new Upgrade(this, BOOTS_OF_SPEED,           1200000000, 12, 50, 8, 0, 0, 0, {}, ITEM_UPGRADE);
    upgrades[SORCERERS_SHOES] = new Upgrade(this, BOOTS_OF_SPEED,           300000000000, 15, 0, 16, 100, 0, 0, {}, ITEM_UPGRADE);


    // Ancient Coin
    upgrades[NOMADS_MEDALLION] = new Upgrade(this, ANCIENT_COIN,            60000, 5, 0, 1, 0, 0, 5, {}, ITEM_UPGRADE);
    upgrades[TALISMAN_OF_ASCENSION] = new Upgrade(this, ANCIENT_COIN,       5000000, 8, 0, 2, 0, 0, 10, {}, ITEM_UPGRADE);


    // Spellthief's Edge
    upgrades[FROSTFANG] = new Upgrade(this, SPELLTHIEFS_EDGE,               30000, 5, 0, 0, 20, 0, 3, {}, ITEM_UPGRADE);
    upgrades[FROST_QUEENS_CLAIM] = new Upgrade(this, SPELLTHIEFS_EDGE,      3500000, 8, 0, 0, 40, 0, 4, {}, ITEM_UPGRADE);


    // Relic Shield
    upgrades[TARGONS_BRACE] = new Upgrade(this, RELIC_SHIELD,               30000, 5, 3, 0, 0, 0, 2, {}, ITEM_UPGRADE);
    upgrades[FACE_OF_THE_MOUNTAIN] = new Upgrade(this, RELIC_SHIELD,        3500000, 8, 6, 0, 0, 0, 3, {}, ITEM_UPGRADE);


    // Ruby Crystal
    upgrades[KINDLEGEM] = new Upgrade(this, RUBY_CRYSTAL,                   80000, 5, 5, 0, 0, 1, 0, {}, ITEM_UPGRADE);
    upgrades[LOCKET_OF_THE_IRON_SOLARI] = new Upgrade(this, RUBY_CRYSTAL,   500000000000, 15, 80, 0, 0, 10, 0, {}, ITEM_UPGRADE);

    upgrades[GIANTS_BELT] = new Upgrade(this, RUBY_CRYSTAL,                 25000000, 9, 20, 0, 0, 0, 0, {}, ITEM_UPGRADE);
    upgrades[WARMOGS_ARMOR] = new Upgrade(this, RUBY_CRYSTAL,               500000000, 11, 40, 0, 0, 0, 0, {}, ITEM_UPGRADE);
    upgrades[FROZEN_MALLET] = new Upgrade(this, RUBY_CRYSTAL,               12500000000000, 17, 120, 0, 250, 0, 0, {}, ITEM_UPGRADE);

    upgrades[CRYSTALLINE_BRACER] = new Upgrade(this, RUBY_CRYSTAL,          800000, 7, 10, 0, 0, 0, 0, {}, ITEM_UPGRADE);
    upgrades[RIGHTEOUS_GLORY] = new Upgrade(this, RUBY_CRYSTAL,             12000000000, 13, 60, 6, 0, 0, 0, {}, ITEM_UPGRADE);


    // Amplifying Tome
    upgrades[FIENDISH_CODEX] = new Upgrade(this, AMPLIFYING_TOME,           200000, 6, 0, 0, 100, 1, 0, {}, ITEM_UPGRADE);
    upgrades[TWIN_SHADOWS] = new Upgrade(this, AMPLIFYING_TOME,             6000000, 8, 0, 2, 120, 1, 0, {}, ITEM_UPGRADE);
    upgrades[MORELLONOMICON] = new Upgrade(this, AMPLIFYING_TOME,           2500000000, 12, 0, 0, 200, 4, 0, {}, ITEM_UPGRADE);

    upgrades[NEEDLESSLY_LARGE_ROD] = new Upgrade(this, AMPLIFYING_TOME,     100000000, 10, 0, 0, 200, 0, 0, {}, ITEM_UPGRADE);
    upgrades[LUDENS_ECHO] = new Upgrade(this, AMPLIFYING_TOME,              50000000000, 14, 0, 4, 240, 0, 0, {}, ITEM_UPGRADE);
    upgrades[ZHONYAS_HOURGLASS] = new Upgrade(this, AMPLIFYING_TOME,        1500000000000, 16, 80, 0, 300, 0, 0, {}, ITEM_UPGRADE);
    upgrades[RABADONS_DEATHCAP] = new Upgrade(this, AMPLIFYING_TOME,        30000000000000, 18, 0, 0, 900, 0, 0, {}, ITEM_UPGRADE);

    // Dagger
    upgrades[RECURVE_BOW] = new Upgrade(this, DAGGER,                       250000, 6, 0, 0, 0, 2, 0, {}, ITEM_UPGRADE);
    upgrades[RUNAANS_HURRICANE] = new Upgrade(this, DAGGER,                 7500000, 8, 0, 0, 20, 3, 0, {}, ITEM_UPGRADE);
    upgrades[WITS_END] = new Upgrade(this, DAGGER,                          5000000000, 12, 50, 0, 80, 6, 0, {}, ITEM_UPGRADE);

    upgrades[ZEAL] = new Upgrade(this, DAGGER,                              200000000, 10, 0, 3, 0, 4, 0, {}, ITEM_UPGRADE);
    upgrades[STATIKK_SHIV] = new Upgrade(this, DAGGER,                      100000000000, 14, 0, 3, 150, 6, 0, {}, ITEM_UPGRADE);
    upgrades[PHANTOM_DANCER] = new Upgrade(this, DAGGER,                    3000000000000, 16, 0, 4, 0, 8, 0, {}, ITEM_UPGRADE);
    upgrades[TRINITY_FORCE] = new Upgrade(this, DAGGER,                     75000000000000, 18, 100, 5, 150, 10, 0, {}, ITEM_UPGRADE);


    // TODO: Spell Upgrades
    // upgrades[FLASH] = new Upgrade(this, null, 1000, 5, 0, 1, 0, 0, 0, {}, SPELL_UPGRADE);
    // upgrades[GHOST] = new Upgrade(this, null, 1000, 5, 0, 1, 0, 0, 0, {}, SPELL_UPGRADE);
    // upgrades[BARRIER] = new Upgrade(this, null, 1000, 5, 0, 1, 0, 0, 0, {}, SPELL_UPGRADE);
    // upgrades[HEAL] = new Upgrade(this, null, 1000, 5, 0, 1, 0, 0, 0, {}, SPELL_UPGRADE);
    // upgrades[SMITE] = new Upgrade(this, null, 1000, 5, 0, 1, 0, 0, 0, {}, SPELL_UPGRADE);
    // upgrades[IGNITE] = new Upgrade(this, null, 1000, 5, 0, 1, 0, 0, 0, {}, SPELL_UPGRADE);
    // upgrades[EXHAUST] = new Upgrade(this, null, 1000, 5, 0, 1, 0, 0, 0, {}, SPELL_UPGRADE);
    // upgrades[CLEANSE] = new Upgrade(this, null, 1000, 5, 0, 1, 0, 0, 0, {}, SPELL_UPGRADE);
    // upgrades[TELEPORT] = new Upgrade(this, null, 1000, 5, 0, 1, 0, 0, 0, {}, SPELL_UPGRADE);

    return upgrades;
};

Game.prototype.createMonsters = function() {
    var monsters = {};

    for (var i = 0; i < MONSTERS.length; i++) {
        var monster = MONSTERS[i];
        var scale = Math.pow(SCALE_MONSTER_LEVEL, i);
        monsters[monster] = new Monster(this, i + 1, MONSTER_HEALTH * scale,
                                                 MONSTER_EXPERIENCE * scale,
                                                 MONSTER_REWARD * scale);
    }
    // TODO: Teemo Case

    // monsters[CASTER_MINION] = new Monster(this, 1,    400,              20,              25);
    // monsters[MELEE_MINION] = new Monster(this, 2,     2000,             90,              120);
    // monsters[RIFT_SCUTTLER] = new Monster(this, 3,    9000,             450,             600);
    // monsters[CANNON_MINION] = new Monster(this, 4,    45000,            2200,            3000);
    // monsters[RAZORBEAK] = new Monster(this, 5,        220000,           11000,           15000);
    // monsters[MURK_WOLF] = new Monster(this, 6,        1100000,          56000,           75000);
    // monsters[KRUG] = new Monster(this, 7,             5600000,          280000,          360000);
    // monsters[GROMP] = new Monster(this, 8,            28000000,         1400000,         1800000);
    // monsters[BLUE_SENTINEL] = new Monster(this, 9,    140000000,        7000000,         9000000);
    // monsters[RED_BRAMBLEBACK] = new Monster(this, 10, 700000000,        35000000,        45000000);
    // monsters[SUPER_MINION] = new Monster(this, 11,    3500000000,       180000000,       240000000);
    // monsters[TIBBERS] = new Monster(this, 12,         18000000000,      900000000,       1200000000);
    // monsters[DRAGON] = new Monster(this, 13,          90000000000,      4500000000,      6000000000);
    // monsters[VILEMAW] = new Monster(this, 14,         450000000000,     22000000000,     30000000000);
    // monsters[BARON_NASHOR] = new Monster(this, 15,    2200000000000,    110000000000,    150000000000);
    // monsters[CHO_GATH] = new Monster(this, 16,        11000000000000,   560000000000,    750000000000);
    // monsters[DR_MUNDO] = new Monster(this, 17,        56000000000000,   2800000000000,   3600000000000);
    // monsters[TEEMO] = new Monster(this, 18,           3000000000000000, 999990000000000, 180000000000000);

    return monsters;
};

Game.prototype.start = function() {
    this.levelUp();
};


// Increment functions
Game.prototype.step = function(step) {
    this.addChimes(this.chimesPerClick * this.chimesClickRate * step);
    this.addDamage(this.damagePerClick * this.damageClickRate * step);
    this.addGold(this.goldRate * step);
    this.addExperience(this.experienceRate * step);

    this.updateView();
};

Game.prototype.addChimes = function(chimes) {
    this.chimes += chimes;
    this.addExperience(chimes);
    while (this.chimes >= this.chimesPerMeepFloor) {
        this.chimes -= this.chimesPerMeepFloor;
        this.addMeeps(1);
    }
};

Game.prototype.addDamage = function(damage) {
    this.damage += damage;
    while (this.damage >= this.monsters[this.monster].health) {
        this.damage -= this.monsters[this.monster].health;
        this.killMonster();
    }
    this.monsterHealth = this.monsters[this.monster].health - this.damage;
};

Game.prototype.addGold = function(gold) {
    this.gold += gold;
};

Game.prototype.addExperience = function(experience) {
    this.experience += experience;
    while (this.experience >= this.experienceNeeded) {
        this.experience -= this.experienceNeeded;
        this.levelUp();
    }
    this.experiencePercent = 100 * this.experience / this.experienceNeeded;
};

Game.prototype.addMeeps = function(meeps) {
    this.meeps += meeps;
    this.chimesPerMeep += Math.log2(this.meeps);
    this.chimesPerMeepFloor = Math.floor(this.chimesPerMeep);

    this.updateStats();
};

// Update Functions
Game.prototype.updateStats = function() {
    this.chimesPerClick = 1 + this.discoveryBase * this.discoveryBonus;
    this.chimesClickRate = this.swiftnessBase * this.swiftnessBonus;
    this.chimesRate = this.chimesPerClick * this.chimesClickRate;

    this.damagePerClick = (this.meeps * this.meepDamage) + (this.powerBase * this.powerBonus);
    this.damageClickRate = this.agilityBase * this.agilityBonus;
    this.damageRate = this.damagePerClick * this.damageClickRate;

    this.goldRate = (this.meeps * this.meepGold) + (this.incomeBase * this.incomeBonus);
};

Game.prototype.updateView = function() {
    this.scope.$applyAsync(function(scope) {updateButtons();});
};

Game.prototype.updateItems = function() {
    for (var item in this.items) {
        if (this.items.hasOwnProperty(item)) {
            if (this.level == this.items[item].level) {
                this.itemsAvailable.push(item);
            }
        }
    }
};

Game.prototype.updateUpgrades = function() {
    for (var upgrade in this.upgrades) {
        if (this.upgrades.hasOwnProperty(upgrade)) {
            if (this.level == this.upgrades[upgrade].level) {
                this.upgradesAvailable.push(upgrade);
            }
        }
    }
};

Game.prototype.updateMonsters = function() {
    for (var monster in this.monsters) {
        if (this.monsters.hasOwnProperty(monster)) {
            if (this.level == this.monsters[monster].level) {
                this.monstersAvailable.push(monster);
                this.monster = monster;
                this.monsterHealth = this.monsters[monster].health;
            }
        }
    }
};

// Action Functions
Game.prototype.chimesClick = function() {
    this.addChimes(this.chimesPerClick);
    this.updateView();
};

Game.prototype.damageClick = function() {
    this.addDamage(this.damagePerClick);
    this.updateView();
};

Game.prototype.buyItem = function(name) {
    var item = this.items[name];

    // control + click buys 5
    // shift + click buys 10
    // control + shift + click buys 50
    var ctrl = window.event.ctrlKey ? 5 : 1;
    var shift = window.event.shiftKey ? 10 : 1;
    for (var i = 0; i < ctrl * shift; i++) {
        if (this.gold >= item.cost) {
            this.gold -= item.cost;
            item.count += 1;
            item.cost += item.startCost * SCALE_ITEM_COST * Math.ceil(Math.log2(item.count));

            this.discoveryBase += item.discovery;
            this.swiftnessBase += item.swiftness;
            this.powerBase += item.power;
            this.agilityBase += item.agility;
            this.incomeBase += item.income;

            this.updateStats();
            this.updateView();
        }
        else {
            break;
        }
    }
};

Game.prototype.buyUpgrade = function(name) {
    var upgrade = this.upgrades[name];
    if (this.gold >= upgrade.cost) {
        this.gold -= upgrade.cost;
        upgrade.count += 1;

        if (upgrade.type == ITEM_UPGRADE) {

            // Upgrade all future items
            var item = this.items[upgrade.item];
            item.upgrades.push(name);
            item.discovery += upgrade.discovery;
            item.swiftness += upgrade.swiftness;
            item.power += upgrade.power;
            item.agility += upgrade.agility;
            item.income += upgrade.income;

            // Upgrade all previously bought items
            var count = item.count;
            this.discoveryBase += count * upgrade.discovery;
            this.swiftnessBase += count * upgrade.swiftness;
            this.powerBase += count * upgrade.power;
            this.agilityBase += count * upgrade.agility;
            this.incomeBase += count * upgrade.income;

            this.upgradesAvailable.splice(this.upgradesAvailable.indexOf(name), 1);
            this.upgradesPurchased.push(name);
        }

        this.updateStats();
        this.updateView();
    }
};

Game.prototype.selectMonster = function(direction) {
  var index = this.monstersAvailable.indexOf(this.monster);
  var length = this.monstersAvailable.length;
  direction == 'left' ? index -= 1 : index += 1;

  if (index == -1 || index == length)
    return;

  this.monster = this.monstersAvailable[index];
  this.monsterHealth = this.monsters[this.monster].health;
};

// Threshold functions
Game.prototype.killMonster = function() {
    var monster = this.monsters[this.monster];
    var exp = monster.experience;
    var gold = monster.gold;

    monster.health += monster.startHealth * SCALE_MONSTER_DIFFICULTY;
    monster.experience += monster.startExperience * SCALE_MONSTER_REWARD;
    monster.gold += monster.startGold * SCALE_MONSTER_REWARD;

    this.addExperience(exp);
    this.addGold(gold);


};

Game.prototype.levelUp = function(levels) {
    var count = 0;
    levels = levels ? levels : 1;
    while (count < levels) {
        if (this.level == 18)
            this.win();

        this.level += 1;
        this.experienceNeeded *= SCALE_EXPERIENCE_NEEDED;

        // Increase meep damage and gold generation
        this.meepGold *= SCALE_MEEP_STRENGTH;
        this.meepDamage *= SCALE_MEEP_STRENGTH;

        this.updateStats();
        this.updateItems();
        this.updateUpgrades();
        this.updateMonsters();

        count++;
    };
};

Game.prototype.win = function() {
  console.log('You Win!');
};

// Utility Functions
Game.prototype.getImageUrl = function(name, folder) {
    return "images/" + folder + "/" + name.split(" ").join("_").split("'").join("").split(".").join("") + ".png";
};

Game.prototype.getItemImageUrl = function(name) {
    return this.getImageUrl(name, 'items');
};

Game.prototype.getMonsterImageUrl = function(name) {
    return this.getImageUrl(name, 'monsters');
};

Game.prototype.getSpellImageUrl = function(name) {
    return this.getImageUrl(name, 'spells');
};

Game.prototype.prettyInt = function(num, fixed) {
    return prettyIntBig(num, fixed);
};

Game.prototype.prettyIntCompact = function(num, fixed) {
    return prettyIntBigCompact(num, fixed);
};

Game.prototype.isPlural = function(num, name) {
    return (num == 1 || $.inArray(name, IGNORE_PLURALS) > -1) ? '' : ($.inArray(name, SPECIAL_PLURALS) > -1 ? 'es': 's');
};

Game.prototype.getMeepProgressPercent = function() {
    return 100 * this.chimes / this.chimesPerMeepFloor;
};

Game.prototype.getMonsterHealthPercent = function() {
    return 100 * this.monsterHealth / this.monsters[this.monster].health;
};

Game.prototype.isFirstMonster = function() {
  var index = this.monstersAvailable.indexOf(this.monster);
  return index == 0 ? 'first' : '';
};

Game.prototype.isLastMonster = function() {
  var index = this.monstersAvailable.indexOf(this.monster);
  return index == this.monstersAvailable.length - 1 ? 'last' : '';
};
