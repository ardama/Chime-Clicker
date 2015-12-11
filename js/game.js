var Game = function (scope, difficulty) {
  this.Init(scope, difficulty);
};

Game.prototype.Init = function(scope, difficulty) {
  this.scope = scope;

  this.fps = 30;
  this.stepSize = 1 / this.fps;
  this.steps = 0;

  this.scaleMonsterLevelHealth = SCALE_MONSTER_LEVEL_HEALTH[difficulty];

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
  this.meepGold = 0;
  this.meepDamage = MEEPS_DAMAGE[difficulty];

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

  this.level = 0;
  this.experience = 0;
  this.experienceRate = 0;
  this.experienceNeeded = EXPERIENCE_NEEDED;

  // spell variables
  this.favorBonus = .0;
  this.spoilsOfWarBonus = .0;
  this.tributeBonus = 0;

  this.smiteBonus = .0;
  this.ghostBonus = 1.0;
  this.flashBonus = 1.05;
  this.exhaustBonus = 1.0;
  this.igniteDamageRate = 0;



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

  // TODO: replace with requirements function

  // Boots of Speed
  upgrades[BOOTS_OF_SWIFTNESS] = new Upgrade(this, BOOTS_OF_SPEED,        8000, 4, 0, 1, 0, 0, 0, []);
  upgrades[BOOTS_OF_MOBILITY] = new Upgrade(this, BOOTS_OF_SPEED,         160000, 6, 0, 3, 0, 0, 0, [BOOTS_OF_SWIFTNESS]);
  upgrades[IONIAN_BOOTS_OF_LUCIDITY] = new Upgrade(this, BOOTS_OF_SPEED,  20000000, 9, 0, 4, 0, 5, 0, [BOOTS_OF_MOBILITY]);
  upgrades[MERCURYS_TREADS] = new Upgrade(this, BOOTS_OF_SPEED,           1200000000, 12, 60, 6, 0, 0, 0, [IONIAN_BOOTS_OF_LUCIDITY]);
  upgrades[SORCERERS_SHOES] = new Upgrade(this, BOOTS_OF_SPEED,           300000000000, 15, 0, 15, 120, 0, 0, [MERCURYS_TREADS]);


  // Ancient Coin
  upgrades[NOMADS_MEDALLION] = new Upgrade(this, ANCIENT_COIN,            60000, 5, 0, 2, 0, 0, 25, []);
  upgrades[TALISMAN_OF_ASCENSION] = new Upgrade(this, ANCIENT_COIN,       5000000, 8, 0, 3, 0, 2, 170, [NOMADS_MEDALLION]);


  // Spellthief's Edge
  upgrades[FROSTFANG] = new Upgrade(this, SPELLTHIEFS_EDGE,               30000, 5, 0, 0, 20, 0, 12, []);
  upgrades[FROST_QUEENS_CLAIM] = new Upgrade(this, SPELLTHIEFS_EDGE,      3500000, 8, 0, 0, 90, 2, 85, [FROSTFANG]);


  // Relic Shield
  upgrades[TARGONS_BRACE] = new Upgrade(this, RELIC_SHIELD,               30000, 5, 3, 0, 0, 0, 9, []);
  upgrades[FACE_OF_THE_MOUNTAIN] = new Upgrade(this, RELIC_SHIELD,        3500000, 8, 6, 0, 0, 2, 70, [TARGONS_BRACE]);


  // Ruby Crystal
  upgrades[KINDLEGEM] = new Upgrade(this, RUBY_CRYSTAL,                   80000, 5, 5, 0, 0, 1, 0, []);
  upgrades[LOCKET_OF_THE_IRON_SOLARI] = new Upgrade(this, RUBY_CRYSTAL,   500000000000, 15, 80, 0, 0, 4, 0, [KINDLEGEM]);

  upgrades[GIANTS_BELT] = new Upgrade(this, RUBY_CRYSTAL,                 25000000, 9, 20, 0, 0, 0, 0, []);
  upgrades[WARMOGS_ARMOR] = new Upgrade(this, RUBY_CRYSTAL,               500000000, 11, 40, 0, 0, 0, 0, [GIANTS_BELT]);
  upgrades[FROZEN_MALLET] = new Upgrade(this, RUBY_CRYSTAL,               12500000000000, 17, 130, 0, 250, 0, 0, [GIANTS_BELT]);

  upgrades[CRYSTALLINE_BRACER] = new Upgrade(this, RUBY_CRYSTAL,          800000, 7, 10, 0, 0, 0, 0, []);
  upgrades[RIGHTEOUS_GLORY] = new Upgrade(this, RUBY_CRYSTAL,             12000000000, 13, 60, 5, 0, 0, 0, [CRYSTALLINE_BRACER]);


  // Amplifying Tome
  upgrades[FIENDISH_CODEX] = new Upgrade(this, AMPLIFYING_TOME,           200000, 6, 0, 0, 100, 1, 0, []);
  upgrades[TWIN_SHADOWS] = new Upgrade(this, AMPLIFYING_TOME,             6000000, 8, 0, 2, 150, 1, 0, [FIENDISH_CODEX]);
  upgrades[MORELLONOMICON] = new Upgrade(this, AMPLIFYING_TOME,           2500000000, 12, 0, 0, 200, 3, 0, [FIENDISH_CODEX]);

  upgrades[NEEDLESSLY_LARGE_ROD] = new Upgrade(this, AMPLIFYING_TOME,     100000000, 10, 0, 0, 300, 0, 0, []);
  upgrades[LUDENS_ECHO] = new Upgrade(this, AMPLIFYING_TOME,              50000000000, 14, 0, 3, 450, 0, 0, [NEEDLESSLY_LARGE_ROD]);
  upgrades[ZHONYAS_HOURGLASS] = new Upgrade(this, AMPLIFYING_TOME,        1500000000000, 16, 80, 0, 600, 0, 0, [NEEDLESSLY_LARGE_ROD]);
  upgrades[RABADONS_DEATHCAP] = new Upgrade(this, AMPLIFYING_TOME,        30000000000000, 18, 0, 0, 1100, 0, 0, [NEEDLESSLY_LARGE_ROD]);

  // Dagger
  upgrades[RECURVE_BOW] = new Upgrade(this, DAGGER,                       250000, 6, 0, 0, 0, 2, 0, []);
  upgrades[RUNAANS_HURRICANE] = new Upgrade(this, DAGGER,                 7500000, 8, 0, 0, 20, 3, 0, [RECURVE_BOW]);
  upgrades[WITS_END] = new Upgrade(this, DAGGER,                          5000000000, 12, 50, 0, 80, 5, 0, [RECURVE_BOW]);

  upgrades[ZEAL] = new Upgrade(this, DAGGER,                              200000000, 10, 0, 3, 0, 4, 0, []);
  upgrades[STATIKK_SHIV] = new Upgrade(this, DAGGER,                      100000000000, 14, 0, 3, 150, 5, 0, [ZEAL]);
  upgrades[PHANTOM_DANCER] = new Upgrade(this, DAGGER,                    3000000000000, 16, 0, 4, 0, 10, 0, [ZEAL]);
  upgrades[TRINITY_FORCE] = new Upgrade(this, DAGGER,                     75000000000000, 18, 100, 5, 150, 10, 0, [ZEAL]);


  // TODO: Spell Upgrades
  // upgrades[FLASH] = new Upgrade(this, null, 1000, 5, 0, 1, 0, 0, 0, [], SPELL_UPGRADE);
  // upgrades[GHOST] = new Upgrade(this, null, 1000, 5, 0, 1, 0, 0, 0, [], SPELL_UPGRADE);
  // upgrades[BARRIER] = new Upgrade(this, null, 1000, 5, 0, 1, 0, 0, 0, [], SPELL_UPGRADE);
  // upgrades[HEAL] = new Upgrade(this, null, 1000, 5, 0, 1, 0, 0, 0, [], SPELL_UPGRADE);
  // upgrades[SMITE] = new Upgrade(this, null, 1000, 5, 0, 1, 0, 0, 0, [], SPELL_UPGRADE);
  // upgrades[IGNITE] = new Upgrade(this, null, 1000, 5, 0, 1, 0, 0, 0, [], SPELL_UPGRADE);
  // upgrades[EXHAUST] = new Upgrade(this, null, 1000, 5, 0, 1, 0, 0, 0, [], SPELL_UPGRADE);
  // upgrades[CLEANSE] = new Upgrade(this, null, 1000, 5, 0, 1, 0, 0, 0, [], SPELL_UPGRADE);
  // upgrades[TELEPORT] = new Upgrade(this, null, 1000, 5, 0, 1, 0, 0, 0, [], SPELL_UPGRADE);

  return upgrades;
};

Game.prototype.createMonsters = function() {
  var monsters = {};
  var monster;
  var scaleHealth;
  var scaleExp;
  var scaleReward;
  var i;

  for (i = 0; i < MONSTERS.length; i++) {
    monster = MONSTERS[i];
    scaleHealth = Math.pow(this.scaleMonsterLevelHealth, i);
    scaleExp = Math.pow(SCALE_MONSTER_LEVEL_REWARD, i);
    scaleReward = Math.pow(SCALE_MONSTER_LEVEL_REWARD, i);
    if (i == MONSTERS.length - 1) {
      scaleHealth *= 10;
      scaleExp = 999999000000000000 / MONSTER_EXPERIENCE;
      scaleReward *= 10;
    }
    monsters[monster] = new Monster(this, i + 1, MONSTER_HEALTH * scaleHealth,
                                                 MONSTER_EXPERIENCE * scaleExp,
                                                 MONSTER_REWARD * scaleReward);
  }
  return monsters;
};

Game.prototype.start = function() {
  this.levelUp();


  var thisRef = this;
  window.setInterval(function() {
      thisRef.step(thisRef.stepSize);
  }, thisRef.stepSize * 1000);
};


// Increment functions
Game.prototype.step = function(step) {
  this.addChimes(this.chimesPerClick * this.chimesClickRate * this.ghostBonus * step);
  this.addDamage((this.damagePerClick * this.damageClickRate * this.exhaustBonus + this.igniteDamageRate) * step);
  this.addGold(this.goldRate * step);
  this.addExperience(this.experienceRate * step);
  this.addSpellTime(step);

  this.steps++;

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

Game.prototype.addDamage = function(damage, user) {
  this.damage += damage;
  this.userDamage += damage;

  var monster = this.monsters[this.monster];
  var percent = (monster.currentHealth - damage) / monster.maxHealth;
  if (user && this.spells[SPOILS_OF_WAR].status == AVAILABLE && percent < 15) {
    this.activateSpell(SPOILS_OF_WAR);
    return;
  }

  while (this.damage >= monster.currentHealth) {
    damage -= monster.currentHealth;
    this.killMonster();
  }
  monster.currentHealth -= this.damage;
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
};

Game.prototype.addMeeps = function(meeps) {
  this.meeps += meeps;
  this.chimesPerMeep += Math.log2(this.meeps);
  this.chimesPerMeepFloor = Math.floor(this.chimesPerMeep);

  this.updateStats();
};

Game.prototype.addSpellTime = function(time) {
  // TODO: check variable names
  var activeSpells = this.getSpells(ACTIVE);
  var cooldownSpells = this.getSpells(COOLDOWN);

  for (var activeSpell in activeSpells) {
    activeSpell.durationLeft -= time;
    if (activeSpell.durationLeft <= 0) {
      activeSpell.end(this);
      activeSpell.status = COOLDOWN;
      activeSpell.cooldownLeft = activeSpell.cooldown;
    }
  }
  for (var cooldownSpell in cooldownSpells) {
    cooldownSpell.durationLeft -= time;
    if (cooldownSpell.cooldownLeft <= 0) {
      cooldownSpell.status = AVAILABLE;
    }
  }};

// Update Functions
Game.prototype.updateStats = function() {
  this.chimesPerClick = 1 + this.discoveryBase * this.discoveryBonus;
  this.chimesClickRate = this.swiftnessBase * this.swiftnessBonus;
  this.chimesRate = this.chimesPerClick * this.chimesClickRate * this.ghostBonus;

  this.damagePerClick = (this.meeps * this.meepDamage) + (this.powerBase * this.powerBonus);
  this.damageClickRate = this.agilityBase * this.agilityBonus;
  this.damageRate = this.damagePerClick * this.damageClickRate * this.exhaustBonus + this.igniteDamageRate;

  this.goldRate = (this.meeps * this.meepGold) + (this.incomeBase * this.incomeBonus);
};

Game.prototype.updateView = function() {
  this.scope.$applyAsync(function(scope) {updateButtons();});
};

Game.prototype.unlockItems = function() {
  var items = this.getObjectsByStatus(this.items, LOCKED);
  for (var item in items) {
    if (item.requirements(this)) {
      item.status = AVAILABLE;
    }
  }
};

Game.prototype.unlockUpgrades = function() {
  var upgrades = this.getObjectsByStatus(this.upgrades, LOCKED);
  for (var upgrade in upgrades) {
    if (upgrade.requirements(this)) {
      upgrade.status = AVAILABLE;
    }
  }
};

Game.prototype.unlockSpells = function() {
  var spells = this.getObjectsByStatus(this.spells, LOCKED);
  for (var spell in spells) {
    if (spell.requirements(this)) {
      spell.status = AVAILABLE;
    }
  }
};

Game.prototype.updateMonsters = function() {
  for (var monsterName in this.monsters) {
    if (this.monsters.hasOwnProperty(monsterName)) {
      var monster = this.monsters[monsterName];
      if (this.level == monster.level) {
        this.monstersAvailable.push(monsterName);
        this.monster = monsterName;
      }
      if (this.level - 1 == monster.level) {
        monster.experience /= 5;
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
  if (this.spells[TRIBUTE].status == AVAILABLE)
    this.activateSpell(TRIBUTE);

  this.addDamage(this.damagePerClick, true);
  this.updateView();
};

Game.prototype.activateSpell = function(name) {
  var spell = this.spells[name];
  if (!spell.status == AVAILABLE) {
    return;
  }
  spell.start(game);
  // TODO: check variable name
  spell.durationLeft = spell.duration
  spell.status = ACTIVE;

  this.updateView();
};

Game.prototype.buyItem = function(name, count) {
  count = count ? count : 1;
  var item = this.items[name];
  var bought = 0;

  // control + click buys 5
  // shift + click buys 10
  // control + shift + click buys 50
  // var ctrl = window.event.ctrlKey ? 5 : 1;
  // var shift = window.event.shiftKey ? 10 : 1;
  for (var i = 0; i < count; i++) {
    if (this.gold >= item.cost) {
      this.gold -= item.cost;
      item.count++;
      item.cost += item.startCost * SCALE_ITEM_COST * item.count;
      bought++;

    }
    else {
      break;
    }
  }

  this.discoveryBase += bought * item.discovery;
  this.swiftnessBase += bought * item.swiftness;
  this.powerBase += bought * item.power;
  this.agilityBase += bought * item.agility;
  this.incomeBase += bought * item.income;

  this.updateStats();
  this.updateView();
};

Game.prototype.buyUpgrade = function(name) {
  var upgrade = this.upgrades[name];
  if (upgrade.status == AVAILABLE && this.gold >= upgrade.cost) {
    this.gold -= upgrade.cost;
    upgrade.status = PURCHASED;

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

      this.unlockUpgrades();
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
};

// Threshold functions
Game.prototype.killMonster = function() {
  var monster = this.monsters[this.monster];
  var exp = monster.experience;

  // use smite and/or spoils of war bonus if either/both dealt killing blow
  // otherwise grant favor bonus
  var bonus = this.smiteBonus + this.spoilsOfWarBonus || this.favorBonus;
  var gold = monster.gold * (1 + bonus);

  monster.maxHealth += monster.startHealth * SCALE_MONSTER_HEALTH;
  monster.currentHealth = monster.maxHealth;
  monster.experience += monster.startExperience * SCALE_MONSTER_REWARD;
  monster.gold += monster.startGold * SCALE_MONSTER_REWARD;

  this.addExperience(exp);
  this.addGold(gold);

  if (this.monster == TEEMO)
    this.win();

};

Game.prototype.levelUp = function(levels) {
  levels = levels || 1;
  while (levels > 0 && this.level < 19) {
    this.level += 1;


    this.experienceNeeded *= SCALE_EXPERIENCE_NEEDED;

    if (this.level == 19)
      this.experienceNeeded = 999999000000000000;

    // Increase meep damage and gold generation
    this.meepGold *= SCALE_MEEP_STRENGTH;
    this.meepDamage *= SCALE_MEEP_STRENGTH;

    this.updateStats();
    this.unlockItems();
    this.unlockUpgrades();
    this.unlockSpells
    this.updateMonsters();

    levels--;
  };
};

Game.prototype.win = function() {
  console.log('You Win!');
};

// Utility Functions
Game.prototype.getTime = function() {
  return Math.floor(this.steps / this.fps);
};

Game.prototype.getImageUrl = function(name, folder) {
  return "images/" + folder + "/" + name.split(" ").join("_").split("'").join("").split(".").join("") + ".png";
};

Game.prototype.getItemImageUrl = function(name) {
  return this.getImageUrl(name + '_U', 'items/upscale');
};

Game.prototype.getMonsterImageUrl = function(name) {
  return this.getImageUrl(name, 'monsters/upscale');
};

Game.prototype.getSpellImageUrl = function(name) {
  return this.getImageUrl(name, 'spells');
};

Game.prototype.getLevelText = function() {
  return this.level == 19 ? 'T' : this.level;
};

Game.prototype.prettyInt = function(num, fixed) {
  return prettyIntBig(num, fixed);
};

Game.prototype.prettyIntCompact = function(num, fixed) {
  return prettyIntBigCompact(num, fixed);
};

Game.prototype.prettyIntVariable = function(num, fixed, width) {
  return window.innerWidth > width ? prettyIntBig(num, fixed) : prettyIntBigCompact(num, fixed);
};

Game.prototype.prettyTime = function(seconds) {
  return prettyTime(seconds);
};

Game.prototype.isPlural = function(num, name) {
  return (num == 1 || $.inArray(name, IGNORE_PLURALS) > -1) ? '' : ($.inArray(name, SPECIAL_PLURALS) > -1 ? 'es': 's');
};

Game.prototype.getMeepProgressPercent = function() {
  return 100 * this.chimes / this.chimesPerMeepFloor;
};

Game.prototype.getMonsterHealthPercent = function() {
  var monster = this.monsters[this.monster];
  return 100 * monster.currentHealth / monster.maxHealth;
};

Game.prototype.getExperiencePercent = function() {
  return 100 * this.experience / this.experienceNeeded;
}

Game.prototype.isFirstMonster = function() {
  var index = this.monstersAvailable.indexOf(this.monster);
  return index == 0 ? 'first' : '';
};

Game.prototype.isLastMonster = function() {
  var index = this.monstersAvailable.indexOf(this.monster);
  return index == this.monstersAvailable.length - 1 ? 'last' : '';
};

Game.prototype.getObjectsByStatus = function(objectMap, status) {
  var objects = [];
  for (var objectName in objectMap) {
    if (objectMap.hasOwnProperty(objectName)) {
      var object = objectMap[objectName];
      if (!status || object.status == status) {
        objects.push(object);
      }
    }
  }
  return objects;
}
