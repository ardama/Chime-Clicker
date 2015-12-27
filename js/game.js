var Game = function (scope, difficulty) {
  this.Init(scope, difficulty);
  this.load();
};

Game.prototype.Init = function(scope, difficulty) {
  this.scope = scope;
  this.difficulty = difficulty;
  this.won = false;

  this.fps = 30;
  this.stepSize = 1 / this.fps;
  this.steps = 0;

  this.scaleMonsterLevelHealth = SCALE_MONSTER_LEVEL_HEALTH[difficulty];

  this.items = this.createItems();
  this.spells = this.createSpells();
  this.spellsUnlocked = [];
  this.upgrades = this.createUpgrades();
  this.upgradesAvailable = [];
  this.monsters = this.createMonsters();
  this.monstersAvailable = [MONSTERS[0]];
  this.monster = MONSTERS[0];

  this.chimes = 0;
  this.chimesPerClick = 1;
  this.chimesPerMeep = CHIMES_PER_MEEP;
  this.chimesPerMeepFloor = CHIMES_PER_MEEP;
  this.chimesClickRate = 0;
  this.chimesRate = 0;
  this.chimesExperience = CHIMES_EXPERIENCE[difficulty];

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

  this.userDamage = 0;
  this.userClicks = 0;

  this.level = 0;
  this.experience = 0;
  this.experienceRate = 0;
  this.experienceNeeded = EXPERIENCE_NEEDED;

  // spell variables
  this.favorBonus = .0;
  this.spoilsOfWarBonus = .0;
  this.tributeBonus = 0;

  this.smiteBonus = 0;
  this.ghostBonus = 1.0;
  this.flashBonus = .05;
  this.exhaustBonus = 1.0;
  this.igniteDamage = 0;

  // Status Values
  this.LOCKED = LOCKED;
  this.AVAILABLE = AVAILABLE;
  this.UNAVAILABLE = UNAVAILABLE;
  this.PURCHASED = PURCHASED
  this.ACTIVE = ACTIVE;
  this.COOLDOWN = COOLDOWN;

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

  return items;
};

Game.prototype.createUpgrades = function() {
  var upgrades = {};

  // Boots of Speed
  upgrades[BOOTS_OF_SWIFTNESS] = new Upgrade(this, BOOTS_OF_SPEED,        9000, 4, 0, 1, 0, 0, 0, []);
  upgrades[BOOTS_OF_MOBILITY] = new Upgrade(this, BOOTS_OF_SPEED,         180000, 6, 0, 3, 0, 0, 0, [BOOTS_OF_SWIFTNESS]);
  upgrades[IONIAN_BOOTS_OF_LUCIDITY] = new Upgrade(this, BOOTS_OF_SPEED,  25000000, 9, 0, 4, 0, 5, 0, [BOOTS_OF_MOBILITY]);
  upgrades[MERCURYS_TREADS] = new Upgrade(this, BOOTS_OF_SPEED,           2500000000, 12, 60, 6, 0, 0, 0, [IONIAN_BOOTS_OF_LUCIDITY]);
  upgrades[SORCERERS_SHOES] = new Upgrade(this, BOOTS_OF_SPEED,           400000000000, 15, 0, 15, 120, 0, 0, [MERCURYS_TREADS]);


  // Ancient Coin
  upgrades[NOMADS_MEDALLION] = new Upgrade(this, ANCIENT_COIN,            60000, 5, 0, 2, 0, 0, 25, []);
  upgrades[TALISMAN_OF_ASCENSION] = new Upgrade(this, ANCIENT_COIN,       7000000, 8, 0, 3, 0, 2, 170, [NOMADS_MEDALLION]);


  // Spellthief's Edge
  upgrades[FROSTFANG] = new Upgrade(this, SPELLTHIEFS_EDGE,               30000, 5, 0, 0, 20, 0, 12, []);
  upgrades[FROST_QUEENS_CLAIM] = new Upgrade(this, SPELLTHIEFS_EDGE,      3500000, 8, 0, 0, 90, 2, 85, [FROSTFANG]);


  // Relic Shield
  upgrades[TARGONS_BRACE] = new Upgrade(this, RELIC_SHIELD,               30000, 5, 3, 0, 0, 0, 9, []);
  upgrades[FACE_OF_THE_MOUNTAIN] = new Upgrade(this, RELIC_SHIELD,        3500000, 8, 6, 0, 0, 2, 70, [TARGONS_BRACE]);


  // Ruby Crystal
  upgrades[KINDLEGEM] = new Upgrade(this, RUBY_CRYSTAL,                   90000, 5, 5, 0, 0, 1, 0, []);
  upgrades[LOCKET_OF_THE_IRON_SOLARI] = new Upgrade(this, RUBY_CRYSTAL,   600000000000, 15, 80, 0, 0, 4, 0, [KINDLEGEM]);

  upgrades[GIANTS_BELT] = new Upgrade(this, RUBY_CRYSTAL,                 35000000, 9, 20, 0, 0, 0, 0, []);
  upgrades[WARMOGS_ARMOR] = new Upgrade(this, RUBY_CRYSTAL,               750000000, 11, 40, 0, 0, 0, 0, [GIANTS_BELT]);
  upgrades[FROZEN_MALLET] = new Upgrade(this, RUBY_CRYSTAL,               17500000000000, 17, 130, 0, 250, 0, 0, [GIANTS_BELT]);

  upgrades[CRYSTALLINE_BRACER] = new Upgrade(this, RUBY_CRYSTAL,          1000000, 7, 10, 0, 0, 0, 0, []);
  upgrades[RIGHTEOUS_GLORY] = new Upgrade(this, RUBY_CRYSTAL,             18000000000, 13, 60, 5, 0, 0, 0, [CRYSTALLINE_BRACER]);


  // Amplifying Tome
  upgrades[FIENDISH_CODEX] = new Upgrade(this, AMPLIFYING_TOME,           300000, 6, 0, 0, 100, 1, 0, []);
  upgrades[AETHER_WISP] = new Upgrade(this, AMPLIFYING_TOME,              8000000, 8, 0, 2, 150, 1, 0, []);
  upgrades[MORELLONOMICON] = new Upgrade(this, AMPLIFYING_TOME,           4000000000, 12, 0, 0, 200, 3, 0, [FIENDISH_CODEX]);

  upgrades[NEEDLESSLY_LARGE_ROD] = new Upgrade(this, AMPLIFYING_TOME,     150000000, 10, 0, 0, 300, 0, 0, []);
  upgrades[LUDENS_ECHO] = new Upgrade(this, AMPLIFYING_TOME,              75000000000, 14, 0, 3, 450, 0, 0, [NEEDLESSLY_LARGE_ROD]);
  upgrades[ZHONYAS_HOURGLASS] = new Upgrade(this, AMPLIFYING_TOME,        2000000000000, 16, 80, 0, 600, 0, 0, [NEEDLESSLY_LARGE_ROD]);
  upgrades[RABADONS_DEATHCAP] = new Upgrade(this, AMPLIFYING_TOME,        40000000000000, 18, 0, 0, 1100, 0, 0, [NEEDLESSLY_LARGE_ROD]);

  // Dagger
  upgrades[RECURVE_BOW] = new Upgrade(this, DAGGER,                       350000, 6, 0, 0, 0, 2, 0, []);
  upgrades[RUNAANS_HURRICANE] = new Upgrade(this, DAGGER,                 9000000, 8, 0, 0, 20, 3, 0, [RECURVE_BOW]);
  upgrades[WITS_END] = new Upgrade(this, DAGGER,                          9000000000, 12, 50, 0, 80, 5, 0, [RECURVE_BOW]);
  upgrades[ZEAL] = new Upgrade(this, DAGGER,                              450000000, 10, 0, 3, 0, 4, 0, []);
  upgrades[STATIKK_SHIV] = new Upgrade(this, DAGGER,                      150000000000, 14, 0, 3, 150, 5, 0, [ZEAL]);
  upgrades[PHANTOM_DANCER] = new Upgrade(this, DAGGER,                    4500000000000, 16, 0, 4, 0, 10, 0, [ZEAL]);
  upgrades[TRINITY_FORCE] = new Upgrade(this, DAGGER,                     100000000000000, 18, 100, 5, 150, 10, 0, [ZEAL]);

  return upgrades;
};

Game.prototype.createSpells = function() {
    var spells = {};

    // game, duration, cooldown, start, end, unlock, tooltip
    spells[GHOST] = new Spell(this, 10, 90, SPELL_ACTIVE, MONSTER_ALL,
      function(game) {game.ghostBonus = 2.0;},
      function(game) {game.ghostBonus = 1.0;},
      function(game) {return game.level >= 4},
      function(game) {return game.spells[GHOST].status == game.LOCKED ? "":
      "+100% chime generation for 10 seconds.  </br></br>90 second cooldown. <b>(Q)</b>"}
    );

    spells[FLASH] = new Spell(this, 0, 120, SPELL_ACTIVE, MONSTER_ALL,
      function(game) {game.addMeeps(Math.ceil(game.meeps * game.flashBonus));},
      function(game) {},
      function(game) {return game.level >= 6},
      function(game) {return game.spells[FLASH].status == game.LOCKED ? "":
      "+5% total meeps.</br>(<b>" + Math.ceil(game.meeps * game.flashBonus) + "</b>)</br></br>2 minute cooldown. <b>(W)</b>"}
    );

    spells[SMITE] = new Spell(this, 0, 60, SPELL_ACTIVE, MONSTER_JUNGLE,
      function(game) {game.smiteBonus = .20;
                      game.addDamage(game.getSmiteDamage(), true);
                      game.smiteBonus = 0;},
        function(game) {},
        function(game) {return game.level >= 2},
        function(game) {return game.spells[SMITE].status == game.LOCKED ? "":
                        "Deal <b>" + game.prettyIntCompact(game.getSmiteDamage()) + "</b> damage instantly.  Damage scales with level.  Kills with smite grant +20% gold.  Does not work against champions.  </br></br>1 minute cooldown. <b>(E)</b>"}
      );


    spells[IGNITE] = new Spell(this, 5, 120, SPELL_ACTIVE, MONSTER_CHAMPION,
        function(game) {game.igniteDamage = game.getIgniteDamage();},
        function(game) {game.igniteDamage = 0},
        function(game) {return game.level >= 16},
        function(game) {return game.spells[IGNITE].status == game.LOCKED ? "":
                        "Deal <b>" + game.prettyIntCompact(game.getIgniteDamage()) + "</b> damage over 5 seconds.  Damage scales with level.  Only works against champions.  </br></br>2 minute cooldown. <b>(R)</b>"}
    );

    spells[EXHAUST] = new Spell(this, 10, 90, SPELL_ACTIVE, MONSTER_CHAMPION,
        function(game) {game.exhaustBonus = 2.0;},
        function(game) {game.exhaustBonus = 1.0},
        function(game) {return game.level >= 17},
        function(game) {return game.spells[EXHAUST].status == game.LOCKED ? "":
                        "+100% damage dealt for 10 seconds.  Only works against champions.  </br></br>90 second cooldown. <b>(T)</b>"}
    );

    spells[TELEPORT] = new Spell(this, 0, 300, SPELL_ACTIVE, MONSTER_ALL,
        function(game) {},
        function(game) {var cooldownSpells = game.getObjectsByStatus(game.spells, game.COOLDOWN);
                        for (var i = 0; i < cooldownSpells.length; i++) {
                          var spell = game.spells[cooldownSpells[i]];
                          spell.cooldownLeft = 0;
                          spell.status = AVAILABLE;
                        }
                        var activeSpells = game.getObjectsByStatus(game.spells, game.ACTIVE);
                        for (var i = 0; i < activeSpells.length; i++) {
                          var spell = game.spells[activeSpells[i]];
                          spell.durationLeft = spell.duration;
                        }
                       },
        function(game) {return game.level >= 13},
        function(game) {return game.spells[TELEPORT].status == game.LOCKED ? "":
                        "Reset cooldowns of all spells.  </br></br>5 minute cooldown. <b>(Y)</b>"}
    );

    spells[SPOILS_OF_WAR] = new Spell(this, 0, 45, SPELL_PASSIVE, MONSTER_JUNGLE,
        function(game) {game.spoilsOfWarBonus = game.getSpoilsOfWarBonus() / 100;
                        game.killMonster();
                        game.spoilsOfWarBonus = 0;},
        function(game) {},
        function(game) {return game.upgrades[FACE_OF_THE_MOUNTAIN].status == game.PURCHASED;},
        function(game) {return game.spells[SPOILS_OF_WAR].status == game.LOCKED ? "":
                        "Execute monsters below 30% max health on click, gaining <b>+" + game.getSpoilsOfWarBonus().toFixed(1) + "%</b> reward gold.  Gold scales with Relic Shields owned.  Does not work against champions. </br></br>45 second cooldown."}
    );

    spells[FAVOR] = new Spell(this, 0, 0, SPELL_PASSIVE, MONSTER_ALL,
        function(game) {},
        function(game) {},
        function(game) {return game.upgrades[TALISMAN_OF_ASCENSION].status == game.PURCHASED;},
        function(game) {return game.spells[FAVOR].status == game.LOCKED ? "":
                        "Passively gain <b>+" + game.getFavorBonus().toFixed(1) + "%</b> gold from monsters killed.  Gold scales with Ancient Coins owned."}
    );

    spells[TRIBUTE] = new Spell(this, 0, 30, SPELL_PASSIVE, MONSTER_ALL,
        function(game) {var gold = Math.ceil(game.monsters[game.monster].gold * game.getTributeBonus() / 100);
                        gold /= game.monster == TEEMO ? 10 : 1;
                        game.gold += gold;},
        function(game) {},
        function(game) {return game.upgrades[FROST_QUEENS_CLAIM].status == game.PURCHASED;},
        function(game) {return game.spells[TRIBUTE].status == game.LOCKED ? "":
                        "Gain <b>" + game.getTributeBonus().toFixed(1) + "%</b> of reward gold on monster click.  Gold scales with Spellthief's Edges owned. </br></br>30 second cooldown."}
    );

    return spells;
}

Game.prototype.createMonsters = function() {
  var monsters = {};
  var monster;
  var scaleHealth;
  var scaleExp;
  var scaleReward;
  var type;
  var i;

  for (i = 0; i < MONSTERS.length; i++) {
    monster = MONSTERS[i];
    scaleHealth = Math.pow(this.scaleMonsterLevelHealth, i);
    scaleExp = Math.pow(SCALE_MONSTER_LEVEL_REWARD, i);
    scaleReward = Math.pow(SCALE_MONSTER_LEVEL_REWARD, i);
    if (i == MONSTERS.length - 1) {
      var health = MONSTER_HEALTH * scaleHealth * 10;
      var healthPower = Math.floor(Math.log10(health));
      var newHealth = Math.pow(10, healthPower) * 1.11111.toFixed(2 + healthPower % 3);
      newHealth = Math.ceil(health / newHealth) * newHealth;

      scaleHealth =  newHealth / MONSTER_HEALTH;
      scaleExp = 999999000000000000 / MONSTER_EXPERIENCE;
      scaleReward = 999999000000000 / MONSTER_REWARD;
    }

    type = CHAMPIONS.indexOf(monster) > -1 ? MONSTER_CHAMPION : MONSTER_JUNGLE;
    monsters[monster] = new Monster(this, i + 1, MONSTER_HEALTH * scaleHealth,
                                                 MONSTER_EXPERIENCE * scaleExp,
                                                 MONSTER_REWARD * scaleReward,
                                                 type);
  }
  return monsters;
};

Game.prototype.start = function() {
  if (!this.level)
    this.levelUp();


  var thisRef = this;
  window.setInterval(function() {
      thisRef.step(thisRef.stepSize);
  }, thisRef.stepSize * 1000);
};


// Increment functions
Game.prototype.step = function(step) {
  this.addChimes(this.chimesPerClick * this.chimesClickRate * this.ghostBonus * step);
  this.addDamage((this.damagePerClick * this.damageClickRate * this.exhaustBonus + (this.igniteDamage / 5)) * step);
  this.addGold(this.goldRate * step);
  this.addExperience(this.experienceRate * step);
  this.addSpellTime(step);

  this.steps++;

  // autosave every 10th second
  if (this.getTime() % 20 == 0) {
    this.save();
  }

  this.updateView();
};

Game.prototype.addChimes = function(chimes) {
  this.chimes += chimes;
  if (this.level < 19)
    this.addExperience(this.chimesExperience * chimes);
  while (this.chimes >= this.chimesPerMeepFloor) {
    this.chimes -= this.chimesPerMeepFloor;
    this.addMeeps(1);
  }
};

Game.prototype.addDamage = function(damage, user) {
  var monster = this.monsters[this.monster];
  var executeThreshold = .30 * monster.maxHealth;
  var currentHealth = monster.currentHealth;
  if (user && this.spells[SPOILS_OF_WAR].status == this.AVAILABLE && currentHealth - damage <= executeThreshold) {
    if (currentHealth > executeThreshold)
      damage -= currentHealth - executeThreshold;
    this.activateSpell(SPOILS_OF_WAR);
  }

  while (damage >= monster.currentHealth) {
    damage -= monster.currentHealth;
    this.killMonster();
  }
  monster.currentHealth -= damage;
};

Game.prototype.addGold = function(gold) {
  this.gold += gold;
};

Game.prototype.addExperience = function(experience) {
  this.experience += experience;
  while (this.experience >= this.experienceNeeded && this.level < 19) {
    this.experience -= this.experienceNeeded;
    this.levelUp();
  }
};

Game.prototype.addMeeps = function(meeps) {
  meeps = meeps || 1;

  this.meeps += meeps;
  this.chimesPerMeep += Math.log2(this.meeps);
  this.chimesPerMeepFloor = Math.floor(this.chimesPerMeep);

  this.updateStats();
};

Game.prototype.addSpellTime = function(time) {
  var activeSpells = this.getObjectsByStatus(this.spells, this.ACTIVE);
  var cooldownSpells = this.getObjectsByStatus(this.spells, this.COOLDOWN);
  var unavailableSpells = this.getObjectsByStatus(this.spells, this.UNAVAILABLE);

  for (var i = 0; i < activeSpells.length; i++) {
    var activeSpell = this.spells[activeSpells[i]];
    activeSpell.durationLeft -= time;
    if (activeSpell.durationLeft <= -.2) {
      activeSpell.end(this);
      activeSpell.status = this.COOLDOWN;
      activeSpell.cooldownLeft = activeSpell.cooldown;
      this.updateStats();
    }
  }

  for (var i = 0; i < cooldownSpells.length; i++) {
    var cooldownSpell = this.spells[cooldownSpells[i]];
    cooldownSpell.cooldownLeft -= time;
    if (cooldownSpell.cooldownLeft <= 0) {

      // after coming off cooldown, check if spell should be available or not
      var monster = this.monsters[this.monster];
      if (monster && cooldownSpell.target != MONSTER_ALL && cooldownSpell.target != monster.type)
        cooldownSpell.status = this.UNAVAILABLE;
      else
        cooldownSpell.status = this.AVAILABLE;
    }
  }

  // if unavailable but with duration remaining, end spell and put on cooldown.
  for (var i = 0; i < unavailableSpells.length; i++) {
    var unavailableSpell = this.spells[unavailableSpells[i]];
    if (unavailableSpell.durationLeft > 0) {
      unavailableSpell.end(this);
      unavailableSpell.status = this.COOLDOWN;
      unavailableSpell.cooldownLeft = unavailableSpell.cooldown;
      this.updateStats();
    }
  }
};

// Update Functions
Game.prototype.updateStats = function() {
  this.chimesPerClick = 1 + this.discoveryBase * this.discoveryBonus;
  this.chimesClickRate = this.swiftnessBase * this.swiftnessBonus;
  this.chimesRate = this.chimesPerClick * this.chimesClickRate * this.ghostBonus;

  this.damagePerClick = (this.meeps * this.meepDamage) + (this.powerBase * this.powerBonus);
  this.damageClickRate = this.agilityBase * this.agilityBonus;
  this.damageRate = this.damagePerClick * this.damageClickRate * this.exhaustBonus + this.igniteDamage / 5;

  this.goldRate = (this.meeps * this.meepGold) + (this.incomeBase * this.incomeBonus);

  if (this.spells[FAVOR].status == this.AVAILABLE) {
    this.favorBonus = this.getFavorBonus() / 100;
  }
};

Game.prototype.updateView = function() {
  this.scope.$applyAsync(function(scope) {updateButtons();updateTooltips();});
};

Game.prototype.updateButtons = function() {
  this.scope.$applyAsync(function(scope) {updateButtons();});
};

Game.prototype.updateTooltips = function() {
  this.scope.$applyAsync(function(scope) {updateTooltips();});
};


Game.prototype.unlockItems = function() {
  var items = this.getObjectsByStatus(this.items, this.LOCKED);
  for (var i = 0; i < items.length; i++) {
    var item = this.items[items[i]];
    if (item.unlock(this)) {
      item.status = this.AVAILABLE;
    }
  }
};

Game.prototype.unlockUpgrades = function() {
  var upgrades = this.getObjectsByStatus(this.upgrades, this.LOCKED);
  for (var i = 0; i < upgrades.length; i++) {
    var upgrade = this.upgrades[upgrades[i]];
    var item = this.items[upgrade.item];
    if (upgrade.unlock(this)) {
      upgrade.status = this.AVAILABLE;
      item.upgradesAvailable.push(upgrades[i]);
    }
  }
};

Game.prototype.unlockSpells = function() {
  var spells = this.getObjectsByStatus(this.spells, this.LOCKED);
  for (var i = 0; i < spells.length; i++) {
    var spell = this.spells[spells[i]];
    if (spell.unlock(this)) {
      spell.status = this.AVAILABLE;
      this.spellsUnlocked.push(spells[i]);
    }
  }

  // disable spells when on wrong monster type
  spells = this.getObjectsByStatus(this.spells, this.AVAILABLE).concat(this.getObjectsByStatus(this.spells, this.ACTIVE));
  for (var i = 0; i < spells.length; i++) {
    var spell = this.spells[spells[i]];
    var monster = this.monsters[this.monster];
    if (monster && spell.target != MONSTER_ALL && spell.target != monster.type) {
      spell.status = this.UNAVAILABLE;
    }
  }

  // enables spells when on correct monster type
  spells = this.getObjectsByStatus(this.spells, this.UNAVAILABLE);
  for (var i = 0; i < spells.length; i++) {
    var spell = this.spells[spells[i]];
    var monster = this.monsters[this.monster];
    if (!monster || spell.target == MONSTER_ALL || spell.target == monster.type) {
      spell.status = this.AVAILABLE;
    }
  }

};

Game.prototype.updateMonsters = function() {
  for (var monsterName in this.monsters) {
    if (this.monsters.hasOwnProperty(monsterName)) {
      var monster = this.monsters[monsterName];
      if (this.level == monster.level && this.monstersAvailable.indexOf(monsterName) < 0) {
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
  if (this.spells[TRIBUTE].status == this.AVAILABLE)
    this.activateSpell(TRIBUTE);

  this.addDamage(this.damagePerClick, true);
  this.updateView();
};

Game.prototype.spellClick = function(name) {
  var spell = this.spells[name];
  if (spell.type == SPELL_PASSIVE)
    return;
  this.activateSpell(name)
};

Game.prototype.activateSpell = function(name) {
  var spell = this.spells[name];
  if (spell.status != this.AVAILABLE) {
    return;
  }
  spell.start(this);
  spell.durationLeft = spell.duration
  spell.status = this.ACTIVE;

  this.updateStats();
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
  this.updateTooltips();
};

Game.prototype.buyUpgrade = function(name) {
  var upgrade = this.upgrades[name];
  if (upgrade.status == this.AVAILABLE && this.gold >= upgrade.cost) {
    this.gold -= upgrade.cost;
    upgrade.status = this.PURCHASED;

    // Upgrade all future items
    var item = this.items[upgrade.item];
    item.discovery += upgrade.discovery;
    item.swiftness += upgrade.swiftness;
    item.power += upgrade.power;
    item.agility += upgrade.agility;
    item.income += upgrade.income;

    item.upgrades.push(name);
    item.upgradesAvailable.splice(item.upgradesAvailable.indexOf(name), 1);

    // Upgrade all previously bought items
    var count = item.count;
    this.discoveryBase += count * upgrade.discovery;
    this.swiftnessBase += count * upgrade.swiftness;
    this.powerBase += count * upgrade.power;
    this.agilityBase += count * upgrade.agility;
    this.incomeBase += count * upgrade.income;

    this.unlockUpgrades();
    this.unlockSpells();
    this.updateStats();
    this.updateView();
    this.updateTooltips();

  }
};

Game.prototype.selectMonster = function(direction) {
  var index = this.monstersAvailable.indexOf(this.monster);
  var length = this.monstersAvailable.length;
  direction == 'left' ? index -= 1 : index += 1;

  if (index == -1 || index == length)
    return;

  this.monster = this.monstersAvailable[index];
  this.unlockSpells();
  this.updateButtons();
};

// Threshold functions
Game.prototype.killMonster = function() {
  var monster = this.monsters[this.monster];
  var exp = monster.experience;

  // use smite and/or spoils of war bonus if either/both dealt killing blow
  // otherwise grant favor bonus
  var bonus = this.smiteBonus + this.spoilsOfWarBonus || this.favorBonus;
  var gold = Math.ceil(monster.gold * (1 + bonus));

  monster.maxHealth += monster.startHealth * SCALE_MONSTER_HEALTH;
  monster.currentHealth = monster.maxHealth;
  monster.experience += monster.startExperience * SCALE_MONSTER_REWARD;
  monster.gold += monster.startGold * SCALE_MONSTER_REWARD;
  monster.count++;

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
    this.chimeExperience *= SCALE_CHIMES_EXPERIENCE;

    if (this.level == 19) {
      this.experienceNeeded = 999999000000000000;
      this.experience = 0;
   }

    this.updateStats();
    this.unlockItems();
    this.unlockUpgrades();
    this.updateMonsters();
    this.unlockSpells();

    this.updateButtons();
    this.updateTooltips();

    levels--;
  };
};

Game.prototype.win = function() {
  this.won = true;
  console.log('You Win!');
};

// Utility Functions
Game.prototype.getTime = function() {
  return this.steps / this.fps;
};

Game.prototype.getRoundedTime = function() {
  return Math.floor(this.steps / this.fps);
};

Game.prototype.getImageUrl = function(name, folder) {

  if (folder)
    folder += "/";
  else
    folder = "";

  return "images/" + folder + name.split(" ").join("_").split("'").join("").split(".").join("") + ".png";
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

Game.prototype.getLockedImageUrl = function() {
  return this.getImageUrl('locked');
}

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
  var percent = 100 * this.experience / this.experienceNeeded;
  return percent > 100 ? 100 : percent;
};

Game.prototype.getExperienceText = function() {
  return this.won ? "You Win!" : prettyIntBig(this.experience) + " / " + prettyIntBig(this.experienceNeeded) + " xp";

};

Game.prototype.getSpellTimePercent = function(spellName) {
  var spell = this.spells[spellName];
  if (spell.status == ACTIVE) {
    return 100 - 100 * Math.max(0, spell.durationLeft) / (spell.duration + .15);
  }
  else if (spell.status == COOLDOWN) {
    return 100 * spell.cooldownLeft / spell.cooldown;
  }
  else return 0;
};

Game.prototype.getFavorBonus = function() {
  return 2 + getBaseLog(4, this.items[ANCIENT_COIN].count + 1);
};

Game.prototype.getSpoilsOfWarBonus = function() {
  return getBaseLog(1.5, this.items[RELIC_SHIELD].count + 1);
};

Game.prototype.getTributeBonus = function() {
  return 5 + getBaseLog(2.5, this.items[SPELLTHIEFS_EDGE].count + 1);
};

Game.prototype.getSmiteDamage = function() {
  return MONSTER_HEALTH * Math.pow(this.scaleMonsterLevelHealth, this.level - 1) * .2;
};

Game.prototype.getIgniteDamage = function() {
  return MONSTER_HEALTH * Math.pow(this.scaleMonsterLevelHealth, this.level - 1) * .3;
};

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
      if (isNaN(status) || object.status == status) {
        objects.push(objectName);
      }
    }
  }
  return objects;
};

Game.prototype.getClassName = function(name) {
  var name = name.toLowerCase();
  return name.split(' ')[0];
};

Game.prototype.save = function() {
  var obj = {};
  obj['stats'] = this.saveStats();
  obj['items'] = this.saveItems();
  obj['upgrades'] = this.saveUpgrades();
  obj['spells'] = this.saveSpells();
  obj['monsters'] = this.saveMonsters();

  localStorage.setItem('save', JSON.stringify(obj));
};

Game.prototype.saveStats = function() {
  var obj = {};
  obj['difficulty'] = this.difficulty;
  obj['fps'] = this.fps;
  obj['stepSize'] = this.stepSize;
  obj['steps'] = this.steps;

  obj['scaleMonsterLevelHealth'] = this.scaleMonsterLevelHealth;

  obj['spellsUnlocked'] = this.spellsUnlocked;
  obj['upgradesAvailable'] = this.upgradesAvailable;
  obj['monstersAvailable'] = this.monstersAvailable;

  obj['chimes'] = this.chimes;
  obj['chimesPerClick'] = this.chimesPerClick;
  obj['chimesPerMeep'] = this.chimesPerMeep;
  obj['chimesPerMeepFloor'] = this.chimesPerMeepFloor;
  obj['chimesClickRate'] = this.chimesClickRate;
  obj['chimesRate'] = this.chimesRate;

  obj['meeps'] = this.meeps;
  obj['meepGold'] = this.meepGold;
  obj['meepDamage'] = this.meepDamage;

  obj['gold'] = this.gold;
  obj['goldRate'] = this.goldRate;

  obj['discovery'] = this.discovery;
  obj['discoveryBase'] = this.discoveryBase;
  obj['discoveryBonus'] = this.discoveryBonus;

  obj['swiftness'] = this.swiftness;
  obj['swiftnessBase'] = this.swiftnessBase;
  obj['swiftnessBonus'] = this.swiftnessBonus;

  obj['power'] = this.power;
  obj['powerBase'] = this.powerBase;
  obj['powerBonus'] = this.powerBonus;

  obj['agility'] = this.agility;
  obj['agilityBase'] = this.agilityBase;
  obj['agilityBonus'] = this.agilityBonus;

  obj['income'] = this.income;
  obj['incomeBase'] = this.incomeBase;
  obj['incomeBonus'] = this.incomeBonus;

  obj['damage'] = this.damage;
  obj['damageRate'] = this.damageRate;
  obj['damagePerClick'] = this.damagePerClick;
  obj['damageClickRate'] = this.damageClickRate;
  obj['userDamage'] = this.userDamage;
  obj['userClicks'] = this.userClicks;

  obj['monster'] = this.monster;

  obj['level'] = this.level;
  obj['experience'] = this.experience;
  obj['experienceRate'] = this.experienceRate;
  obj['experienceNeeded'] = this.experienceNeeded;

  // spell variables
  obj['favorBonus'] = this.favorBonus;
  obj['spoilsOfWarBonus'] = this.spoilsOfWarBonus;
  obj['tributeBonus'] = this.tributeBonus;

  obj['smiteBonus'] = this.smiteBonus;
  obj['ghostBonus'] = this.ghostBonus;
  obj['flashBonus'] = this.flashBonus;
  obj['exhaustBonus'] = this.exhaustBonus;
  obj['igniteDamage'] = this.igniteDamage;

  return obj;
};

Game.prototype.saveItems = function() {
  var items = this.items;
  var obj = {};
  for (var itemName in items) {
    if (items.hasOwnProperty(itemName)) {
      var item = items[itemName];
      var itemData = {};
      itemData['cost'] = item.cost;
      itemData['discovery'] = item.discovery;
      itemData['swiftness'] = item.swiftness;
      itemData['power'] = item.power;
      itemData['agility'] = item.agility;
      itemData['income'] = item.income;

      itemData['status'] = item.status;
      itemData['count'] = item.count;

      itemData['upgrades'] = item.upgrades;
      itemData['upgradesAvailable'] = item.upgradesAvailable;

      obj[itemName] = itemData;
    }
  }
  return obj;
};

Game.prototype.saveUpgrades = function() {
  var upgrades = this.upgrades;
  var obj = {};
  for (var upgradeName in upgrades) {
    if (upgrades.hasOwnProperty(upgradeName)) {
      var upgrade = upgrades[upgradeName];

      var upgradeData = {};
      upgradeData['status'] = upgrade.status;

      obj[upgradeName] = upgradeData;
    }
  }
  return obj;
};

Game.prototype.saveSpells = function() {
  var spells = this.spells;
  var obj = {};
  for (var spellName in spells) {
    if (spells.hasOwnProperty(spellName)) {
      var spell = spells[spellName];
      var spellData = {};

      spellData['durationLeft'] = spell.durationLeft
      spellData['cooldownLeft'] = spell.cooldownLeft
      spellData['status'] = spell.status;

      obj[spellName] = spellData;
    }
  }
  return obj;
};

Game.prototype.saveMonsters = function() {
  var monsters = this.monsters;
  var obj = {};
  for (var monsterName in monsters) {
    if (monsters.hasOwnProperty(monsterName)) {
      var monster = monsters[monsterName];
      var monsterData = {};
      monsterData['maxHealth'] = monster.maxHealth;
      monsterData['currentHealth'] = monster.currentHealth;
      monsterData['experience'] = monster.experience;
      monsterData['gold'] = monster.gold;

      monsterData['startHealth'] = monster.startHealth;
      monsterData['startExperience'] = monster.startExperience;
      monsterData['startGold'] = monster.startGold;

      monsterData['count'] = monster.count;

      obj[monsterName] = monsterData;
    }
  }
  return obj;
};

Game.prototype.load = function() {
  var obj = localStorage.getItem('save', obj);
  if (obj) {
    obj = JSON.parse(obj);
    this.loadStats(obj);
    this.loadItems(obj);
    this.loadUpgrades(obj);
    this.loadSpells(obj);
    this.loadMonsters(obj);
  }
};

Game.prototype.loadStats = function(obj) {
  var stats = obj['stats'];
  for (var key in stats) {
    if (stats.hasOwnProperty(key)) {
      this[key] = stats[key];
    }
  }
};

Game.prototype.loadItems = function(obj) {
  var items = obj['items'];
  for (var itemName in items) {
    if (items.hasOwnProperty(itemName)) {
      var item = items[itemName];
      for (var key in item) {
        if (item.hasOwnProperty(key)) {
          this.items[itemName][key] = item[key];
        }
      }
    }
  }
};

Game.prototype.loadUpgrades = function(obj) {
  var upgrades = obj['upgrades'];
  for (var upgradeName in upgrades) {
    if (upgrades.hasOwnProperty(upgradeName)) {
      var upgrade = upgrades[upgradeName];
      for (var key in upgrade) {
        if (upgrade.hasOwnProperty(key)) {
          this.upgrades[upgradeName][key] = upgrade[key];
        }
      }
    }
  }
};

Game.prototype.loadSpells = function(obj) {
  var spells = obj['spells'];
  for (var spellName in spells) {
    if (spells.hasOwnProperty(spellName)) {
      var spell = spells[spellName];
      for (var key in spell) {
        if (spell.hasOwnProperty(key)) {
          this.spells[spellName][key] = spell[key];
        }
      }
    }
  }
};

Game.prototype.loadMonsters = function(obj) {
  var monsters = obj['monsters'];
  for (var monsterName in monsters) {
    if (monsters.hasOwnProperty(monsterName)) {
      var monster = monsters[monsterName];
      for (var key in monster) {
        if (monster.hasOwnProperty(key)) {
          this.monsters[monsterName][key] = monster[key];
        }
      }
    }
  }
};

Game.prototype.reset = function() {
  localStorage.removeItem('save');
  location.reload(true);
}
