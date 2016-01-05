var Game = function (scope, difficulty) {
  this.Init(scope, difficulty);
  this.loadGame();
};

Game.prototype.Init = function(scope, difficulty) {
  this.scope = scope;
  this.difficulty = difficulty;
  this.won = false;
  this.level = 1;

  // Status Values
  this.LOCKED = LOCKED;
  this.AVAILABLE = AVAILABLE;
  this.UNAVAILABLE = UNAVAILABLE;
  this.PURCHASED = PURCHASED
  this.ACTIVE = ACTIVE;
  this.COOLDOWN = COOLDOWN;

  this.DIFFICULTIES = DIFFICULTIES;

  this.fps = 30;
  this.stepSize = 1 / this.fps;
  this.steps = 0;

  this.scaleMonsterLevelHealth = SCALE_MONSTER_LEVEL_HEALTH[difficulty];

  this.items = this.createItems();
  this.spellsUnlocked = [];
  this.spells = this.createSpells();
  this.upgradesAvailable = [];
  this.upgrades = this.createUpgrades();
  this.monstersAvailable = [];
  this.monsters = this.createMonsters();

  this.unlockItems();
  this.unlockSpells();
  this.unlockUpgrades();
  this.updateMonsters();

  this.chimes = 0;
  this.chimesRate = 0;
  this.chimesPerClick = 0;
  this.chimesPerMeep = CHIMES_PER_MEEP;
  this.chimesPerMeepFloor = CHIMES_PER_MEEP;
  this.chimesExperience = CHIMES_EXPERIENCE[difficulty];

  this.meeps = 0;
  this.meepGold = 0;
  this.meepDamage = MEEPS_DAMAGE[difficulty];

  this.gold = STARTING_GOLD;
  this.goldRate = 0;

  this.discovery = 1;
  this.swiftness = 0;
  this.power = 5;
  this.agility = 0;
  this.income = 0;

  this.damage = 0;
  this.damageRate = 0;
  this.damagePerClick = 0;

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

  this.updateStats();

  this.progress = this.loadProgress();
};

Game.prototype.createItems = function() {
  var items = {};

  items[RELIC_SHIELD] = new Item(this, 250, 1,      1, 0, 0, 0, 1);
  items[ANCIENT_COIN] = new Item(this, 250, 1,      0, 0, 0, 0, 5);
  items[SPELLTHIEFS_EDGE] = new Item(this, 250, 1,  0, 0, 5, 0, 3);
  items[BOOTS_OF_SPEED] = new Item(this, 750, 2,    0, 1, 0, 0, 0);
  items[RUBY_CRYSTAL] = new Item(this, 750, 2,      5, 0, 0, 0, 0);
  items[AMPLIFYING_TOME] = new Item(this, 3000, 3,  0, 0, 50, 0, 0);
  items[DAGGER] = new Item(this, 3000, 3,           0, 0, 0, 1, 0);

  return items;
};

Game.prototype.createUpgrades = function() {
  var upgrades = {};

  // Boots of Speed
  upgrades[BOOTS_OF_SWIFTNESS] = new Upgrade(this, BOOTS_OF_SPEED,        9000, 4, 0, 1, 0, 0, 0, []);
  upgrades[BOOTS_OF_MOBILITY] = new Upgrade(this, BOOTS_OF_SPEED,         180000, 6, 0, 3, 0, 0, 0, [BOOTS_OF_SWIFTNESS]);
  upgrades[IONIAN_BOOTS_OF_LUCIDITY] = new Upgrade(this, BOOTS_OF_SPEED,  25000000, 9, 0, 4, 0, 5, 0, [BOOTS_OF_MOBILITY]);
  upgrades[MERCURYS_TREADS] = new Upgrade(this, BOOTS_OF_SPEED,           2500000000, 12, 50, 6, 0, 0, 0, [IONIAN_BOOTS_OF_LUCIDITY]);
  upgrades[SORCERERS_SHOES] = new Upgrade(this, BOOTS_OF_SPEED,           400000000000, 15, 0, 15, 60, 0, 0, [MERCURYS_TREADS]);


  // Ancient Coin
  upgrades[NOMADS_MEDALLION] = new Upgrade(this, ANCIENT_COIN,            60000, 5, 0, 2, 0, 0, 25, []);
  upgrades[TALISMAN_OF_ASCENSION] = new Upgrade(this, ANCIENT_COIN,       7000000, 8, 0, 3, 0, 2, 170, [NOMADS_MEDALLION]);


  // Spellthief's Edge
  upgrades[FROSTFANG] = new Upgrade(this, SPELLTHIEFS_EDGE,               30000, 5, 0, 0, 10, 0, 12, []);
  upgrades[FROST_QUEENS_CLAIM] = new Upgrade(this, SPELLTHIEFS_EDGE,      3500000, 8, 0, 0, 45, 2, 85, [FROSTFANG]);


  // Relic Shield
  upgrades[TARGONS_BRACE] = new Upgrade(this, RELIC_SHIELD,               30000, 5, 3, 0, 0, 0, 9, []);
  upgrades[FACE_OF_THE_MOUNTAIN] = new Upgrade(this, RELIC_SHIELD,        3500000, 8, 6, 0, 0, 2, 70, [TARGONS_BRACE]);


  // Ruby Crystal
  upgrades[KINDLEGEM] = new Upgrade(this, RUBY_CRYSTAL,                   90000, 5, 5, 0, 0, 1, 0, []);
  upgrades[LOCKET_OF_THE_IRON_SOLARI] = new Upgrade(this, RUBY_CRYSTAL,   600000000000, 15, 80, 0, 0, 4, 0, [KINDLEGEM]);

  upgrades[GIANTS_BELT] = new Upgrade(this, RUBY_CRYSTAL,                 35000000, 9, 20, 0, 0, 0, 0, []);
  upgrades[WARMOGS_ARMOR] = new Upgrade(this, RUBY_CRYSTAL,               750000000, 11, 40, 0, 0, 0, 0, [GIANTS_BELT]);
  upgrades[FROZEN_MALLET] = new Upgrade(this, RUBY_CRYSTAL,               17500000000000, 17, 130, 0, 100, 0, 0, [GIANTS_BELT]);

  upgrades[CRYSTALLINE_BRACER] = new Upgrade(this, RUBY_CRYSTAL,          1000000, 7, 10, 0, 0, 0, 0, []);
  upgrades[RIGHTEOUS_GLORY] = new Upgrade(this, RUBY_CRYSTAL,             18000000000, 13, 60, 5, 0, 0, 0, [CRYSTALLINE_BRACER]);


  // Amplifying Tome
  upgrades[FIENDISH_CODEX] = new Upgrade(this, AMPLIFYING_TOME,           300000, 6, 0, 0, 50, 1, 0, []);
  upgrades[AETHER_WISP] = new Upgrade(this, AMPLIFYING_TOME,              8000000, 8, 0, 2, 70, 1, 0, []);
  upgrades[MORELLONOMICON] = new Upgrade(this, AMPLIFYING_TOME,           4000000000, 12, 0, 0, 80, 3, 0, [FIENDISH_CODEX]);

  upgrades[NEEDLESSLY_LARGE_ROD] = new Upgrade(this, AMPLIFYING_TOME,     150000000, 10, 0, 0, 150, 0, 0, []);
  upgrades[LUDENS_ECHO] = new Upgrade(this, AMPLIFYING_TOME,              75000000000, 14, 0, 3, 200, 0, 0, [NEEDLESSLY_LARGE_ROD]);
  upgrades[ZHONYAS_HOURGLASS] = new Upgrade(this, AMPLIFYING_TOME,        2000000000000, 16, 80, 0, 250, 0, 0, [NEEDLESSLY_LARGE_ROD]);
  upgrades[RABADONS_DEATHCAP] = new Upgrade(this, AMPLIFYING_TOME,        40000000000000, 18, 0, 0, 550, 0, 0, [NEEDLESSLY_LARGE_ROD]);

  // Dagger
  upgrades[RECURVE_BOW] = new Upgrade(this, DAGGER,                       350000, 6, 0, 0, 0, 2, 0, []);
  upgrades[RUNAANS_HURRICANE] = new Upgrade(this, DAGGER,                 9000000, 8, 0, 0, 10, 3, 0, [RECURVE_BOW]);
  upgrades[WITS_END] = new Upgrade(this, DAGGER,                          9000000000, 12, 50, 0, 40, 5, 0, [RECURVE_BOW]);
  upgrades[ZEAL] = new Upgrade(this, DAGGER,                              450000000, 10, 0, 3, 0, 4, 0, []);
  upgrades[STATIKK_SHIV] = new Upgrade(this, DAGGER,                      150000000000, 14, 0, 3, 70, 5, 0, [ZEAL]);
  upgrades[PHANTOM_DANCER] = new Upgrade(this, DAGGER,                    4500000000000, 16, 0, 4, 0, 10, 0, [ZEAL]);
  upgrades[TRINITY_FORCE] = new Upgrade(this, DAGGER,                     100000000000000, 18, 100, 5, 80, 10, 0, [ZEAL]);

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
      "+100% chime gathering for 10 seconds.  </br></br>90 second cooldown. <b>(Q)</b>"}
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
                        var len = cooldownSpells.length;
                        for (var i = 0; i < len; i++) {
                          var spell = game.spells[cooldownSpells[i]];
                          spell.cooldownLeft = 0;
                          spell.status = game.AVAILABLE;
                        }
                        var activeSpells = game.getObjectsByStatus(game.spells, game.ACTIVE);
                        len = activeSpells.length;
                        for (var i = 0; i < len; i++) {
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
                        game.gold += gold;
                        game.progress.spells[TRIBUTE].goldGained += gold;},
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
  var len = MONSTERS.length;
  for (i = 0; i < len; i++) {
    monster = MONSTERS[i];
    scaleHealth = Math.pow(this.scaleMonsterLevelHealth, i);
    scaleExp = Math.pow(SCALE_MONSTER_LEVEL_REWARD, i);
    scaleReward = Math.pow(SCALE_MONSTER_LEVEL_REWARD, i);
    if (i == len - 1) {
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
  var thisRef = this;
  window.setInterval(function() {
      thisRef.step(thisRef.stepSize);
  }, thisRef.stepSize * 1000);
};


// Increment functions
Game.prototype.step = function(step) {
  this.addChimes(this.chimesRate * step);
  this.addDamage(this.damageRate * step);
  this.addGold(this.goldRate * step);
  this.addExperience(this.experienceRate * step);
  this.addSpellTime(step);

  this.steps++;
  this.progress.general.timePlayed += this.stepSize;

  // autosave every 20th second
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
  this.progress.general.totalChimes += chimes;
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

  while (damage >= this.monsters[this.monster].currentHealth) {
    damage -= this.monsters[this.monster].currentHealth;
    this.killMonster();
  }
  monster.currentHealth -= damage;
  this.progress.general.totalDamage += damage;
};

Game.prototype.addGold = function(gold) {
  this.gold += gold;
  this.progress.general.goldEarned += gold;
};

Game.prototype.addExperience = function(experience) {
  this.experience += experience;
  this.progress.general.experienceEarned += experience;
  while (this.experience >= this.experienceNeeded && this.level < 19) {
    this.experience -= this.experienceNeeded;
    this.levelUp();
  }
};

Game.prototype.addMeeps = function(meeps) {
  meeps = meeps || 1;

  this.meeps += meeps;
  this.power += meeps * this.meepDamage;
  this.progress.general.totalMeeps += meeps;

  while (meeps--) {
    this.chimesPerMeep += Math.log2(this.meeps);
  }
  this.chimesPerMeepFloor = Math.floor(this.chimesPerMeep);

  this.updateStats();
};

Game.prototype.addSpellTime = function(time) {
  var activeSpells = this.getObjectsByStatus(this.spells, this.ACTIVE);
  var cooldownSpells = this.getObjectsByStatus(this.spells, this.COOLDOWN);
  var unavailableSpells = this.getObjectsByStatus(this.spells, this.UNAVAILABLE);
  var len = activeSpells.length;
  for (var i = 0; i < len; i++) {
    var activeSpell = this.spells[activeSpells[i]];
    activeSpell.durationLeft -= time;
    if (activeSpell.durationLeft <= -.2) {
      activeSpell.end(this);
      activeSpell.status = this.COOLDOWN;
      activeSpell.cooldownLeft = activeSpell.cooldown;
      this.updateStats();
    }
  }
  len = cooldownSpells.length;
  for (var i = 0; i < len; i++) {
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
  len = unavailableSpells.length;
  for (var i = 0; i < len; i++) {
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
  this.chimesRate = this.discovery * this.swiftness * this.ghostBonus;
  // chimes collected equals base discovery + 2% of current cps
  this.chimesPerClick = this.discovery * this.ghostBonus + .02 * this.chimesRate;

  this.damageRate = this.power * this.agility * this.exhaustBonus + this.igniteDamage / 5;
  // damage dealt equals base power + 2% of current dps
  this.damagePerClick = this.exhaustBonus * this.power + .02 * this.damageRate;

  this.goldRate = this.income;
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
  var len = items.length;
  for (var i = 0; i < len; i++) {
    var item = this.items[items[i]];
    if (item.unlock(this)) {
      item.status = this.AVAILABLE;
    }
  }
};

Game.prototype.unlockUpgrades = function() {
  var upgrades = this.getObjectsByStatus(this.upgrades, this.LOCKED);
  var len = upgrades.length;
  for (var i = 0; i < len; i++) {
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
  var len = spells.length;
  for (var i = 0; i < len; i++) {
    var spell = this.spells[spells[i]];
    if (spell.unlock(this)) {
      spell.status = this.AVAILABLE;
      this.spellsUnlocked.push(spells[i]);
    }
  }

  // disable spells when on wrong monster type
  spells = this.getObjectsByStatus(this.spells, this.AVAILABLE).concat(this.getObjectsByStatus(this.spells, this.ACTIVE));
  len = spells.length;
  for (var i = 0; i < len; i++) {
    var spell = this.spells[spells[i]];
    var monster = this.monsters[this.monster];
    if (monster && spell.target != MONSTER_ALL && spell.target != monster.type) {
      spell.status = this.UNAVAILABLE;
    }
  }

  // enables spells when on correct monster type
  spells = this.getObjectsByStatus(this.spells, this.UNAVAILABLE);
  len = spells.length;
  for (var i = 0; i < len; i++) {
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
      if (this.level >= monster.level && this.monstersAvailable.indexOf(monsterName) < 0) {
        this.monstersAvailable.push(monsterName);
        this.monster = monsterName;
        monster.status = this.ACTIVE;
      }
      if (this.level - 1 >= monster.level && monster.status == this.ACTIVE) {
        monster.experience /= 5;
        monster.status = this.AVAILABLE;
      }
    }
  }
};

// Action Functions
Game.prototype.chimesClick = function() {
  this.addChimes(this.chimesPerClick);
  this.progress.general.clickChimes += this.chimesPerClick;
  this.progress.general.totalClicks++;
  this.progress.general.chimeClicks++;
  this.updateView();
};

Game.prototype.damageClick = function() {
  if (this.spells[TRIBUTE].status == this.AVAILABLE)
    this.activateSpell(TRIBUTE);

  this.addDamage(this.damagePerClick, true);
  this.progress.general.clickDamage += this.damagePerClick;
  this.progress.general.totalClicks++;
  this.progress.general.damageClicks++;
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

  this.progress.spells[name].count++;

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
  while (count--) {
    if (this.gold >= item.cost) {
      this.gold -= item.cost;
      this.progress.items[name].goldSpent += item.cost;
      this.progress.general.goldSpent += item.cost;
      item.count++;
      item.cost += item.startCost * SCALE_ITEM_COST * item.count;
      bought++;

    }
    else {
      break;
    }
  }

  this.discovery += bought * item.discovery;
  this.swiftness += bought * item.swiftness;
  this.power += bought * item.power;
  this.agility += bought * item.agility;
  this.income += bought * item.income;

  this.progress.items[name].count += bought;

  if (this.spells[FAVOR].status == this.AVAILABLE && name == ANCIENT_COIN) {
    this.favorBonus = this.getFavorBonus() / 100;
  }

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
    this.discovery += count * upgrade.discovery;
    this.swiftness += count * upgrade.swiftness;
    this.power += count * upgrade.power;
    this.agility += count * upgrade.agility;
    this.income += count * upgrade.income;

    this.progress.general.goldSpent += upgrade.cost;

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

  var smiteGold = this.smiteBonus * monster.gold;
  var spoilsGold = this.spoilsOfWarBonus * monster.gold;
  var favorGold = this.favorBonus * monster.gold;
  var gold = Math.ceil(monster.gold + smiteGold + spoilsGold + favorGold);

  this.progress.spells[SMITE].goldGained += smiteGold;
  this.progress.spells[SPOILS_OF_WAR].goldGained += spoilsGold;
  this.progress.spells[FAVOR].goldGained += favorGold;

  monster.maxHealth += monster.startHealth * SCALE_MONSTER_HEALTH;
  monster.currentHealth = monster.maxHealth;
  monster.experience += monster.startExperience * SCALE_MONSTER_REWARD;
  monster.gold += monster.startGold * SCALE_MONSTER_REWARD;
  monster.count++;

  this.progress.monsters[this.monster].count++;

  if (this.monster == TEEMO)
  this.win();

  this.addGold(gold);
  this.addExperience(exp);
};

Game.prototype.levelUp = function(levels) {
  levels = levels || 1;
  while (levels > 0 && this.level < 19 && this.level > 0) {
    this.level += 1;


    this.experienceNeeded *= SCALE_EXPERIENCE_NEEDED;
    this.chimesExperience *= SCALE_CHIMES_EXPERIENCE;

    if (this.level == 19) {
      this.experienceNeeded = 999999000000000000;
      this.experience = 0;
   }
    levels--;
  };

  this.updateStats();
  this.unlockItems();
  this.unlockUpgrades();
  this.updateMonsters();
  this.unlockSpells();

  this.updateButtons();
  this.updateTooltips();
};

Game.prototype.win = function() {
  if (!this.won) {
    this.won = true;

    var time;
    switch (this.difficulty) {
      case 'easy':
        this.progress.wins.easy.count++;
        time = this.progress.times.easy.count;
        this.progress.times.easy.count = Math.min(this.getTime(), time ? time : Infinity);
        break;
      case 'medium':
        this.progress.wins.medium.count++;
        time = this.progress.times.medium.count;
        this.progress.times.medium.count = Math.min(this.getTime(), time ? time : Infinity);
        break;
      case 'hard':
        this.progress.wins.hard.count++;
        time = this.progress.times.hard.count;
        this.progress.times.hard.count = Math.min(this.getTime(), time ? time : Infinity);
        break;
      case 'marathon':
        this.progress.wins.marathon.count++;
        time = this.progress.times.marathon.count;
        this.progress.times.marathon.count = Math.min(this.getTime(), time ? time : Infinity);
        break;
      case 'impossible':
        this.progress.wins.impossible.count++;
        time = this.progress.times.impossible.count;
        this.progress.times.impossible.count = Math.min(this.getTime(), time ? time : Infinity);
        break;
      default:
    }



    console.log('You Win!');
  }
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

Game.prototype.isZero = function(count) {
  return count == 0 ? 'zero' : '';
};

Game.prototype.save = function() {
  this.saveGame();
  this.saveProgress();
};

Game.prototype.saveProgress = function() {
  localStorage.setItem('progress', JSON.stringify(this.progress));
};

Game.prototype.saveGame = function() {
  var obj = {};
  obj['stats'] = this.saveStats();
  obj['items'] = this.saveItems();
  obj['upgrades'] = this.saveUpgrades();
  obj['spells'] = this.saveSpells();
  obj['monsters'] = this.saveMonsters();

  localStorage.setItem('save', JSON.stringify(obj));
  localStorage.setItem('difficulty', DIFFICULTIES.indexOf(this.difficulty));
};

Game.prototype.saveStats = function() {
  var obj = {};
  obj['difficulty'] = this.difficulty;
  obj['won'] = this.won;
  obj['fps'] = this.fps;
  obj['stepSize'] = this.stepSize;
  obj['steps'] = this.steps;

  obj['scaleMonsterLevelHealth'] = this.scaleMonsterLevelHealth;

  obj['spellsUnlocked'] = this.spellsUnlocked;
  obj['upgradesAvailable'] = this.upgradesAvailable;
  obj['monstersAvailable'] = this.monstersAvailable;

  obj['chimes'] = this.chimes;
  obj['chimesRate'] = this.chimesRate;
  obj['chimesPerClick'] = this.chimesPerClick;
  obj['chimesPerMeep'] = this.chimesPerMeep;
  obj['chimesPerMeepFloor'] = this.chimesPerMeepFloor;
  obj['chimesExperience'] = this.chimesExperience;

  obj['meeps'] = this.meeps;
  obj['meepGold'] = this.meepGold;
  obj['meepDamage'] = this.meepDamage;

  obj['gold'] = this.gold;
  obj['goldRate'] = this.goldRate;

  obj['discovery'] = this.discovery;
  obj['swiftness'] = this.swiftness;
  obj['power'] = this.power;
  obj['agility'] = this.agility;
  obj['income'] = this.income;

  obj['damage'] = this.damage;
  obj['damageRate'] = this.damageRate;
  obj['damagePerClick'] = this.damagePerClick;

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
  this.loadGame();
  this.loadProgress();
};

Game.prototype.loadProgress = function() {
  var obj = localStorage.getItem('progress', obj);
  if (obj)
    obj = JSON.parse(obj);
  return obj || this.initProgress();
};

Game.prototype.loadGame = function() {
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

Game.prototype.initProgress = function() {
  var progress = {};

  progress['general'] = {};
  progress['general']['timePlayed'] = 0;
  progress['general']['experienceEarned'] = 0;

  progress['general']['totalChimes'] = 0;
  progress['general']['clickChimes'] = 0;

  progress['general']['totalDamage'] = 0;
  progress['general']['clickDamage'] = 0;

  progress['general']['totalClicks'] = 0;
  progress['general']['chimeClicks'] = 0;
  progress['general']['damageClicks'] = 0;

  progress['general']['totalMeeps'] = 0;

  progress['general']['goldEarned'] = 0;
  progress['general']['goldSpent'] = 0;

  // items purchased
  var order = 0;
  progress['items'] = {};
  for (var item in this.items) {
    progress['items'][item] = {'item': item, 'count': 0, 'goldSpent': 0, 'order': order};
    order++;
  }

  // monsters killed
  order = 0;
  progress['monsters'] = {};
  for (var monster in this.monsters) {
    progress['monsters'][monster] = {'monster': monster, 'count': 0, 'order': order};
    order++;
  }

  // spells used
  order = 0;
  progress['spells'] = {};
  for (var spell in this.spells) {
    progress['spells'][spell] = {'spell': spell, 'count': 0, 'goldGained': 0, 'meepsGained': 0, 'order': order};
    order++;
  }

  progress['wins'] = {};
  progress['wins']['easy'] = {'difficulty': 'easy', 'count': 0, 'order': 0};
  progress['wins']['medium'] = {'difficulty': 'medium', 'count': 0, 'order': 1};
  progress['wins']['hard'] = {'difficulty': 'hard', 'count': 0, 'order': 2};
  progress['wins']['marathon'] = {'difficulty': 'marathon', 'count': 0, 'order': 3};
  progress['wins']['impossible'] = {'difficulty': 'impossible', 'count': 0, 'order': 4};


  progress['times'] = {};
  progress['times']['easy'] = {'difficulty': 'easy', 'count': null, 'order': 0};
  progress['times']['medium'] = {'difficulty': 'medium', 'count': null, 'order': 1};
  progress['times']['hard'] = {'difficulty': 'hard', 'count': null, 'order': 2};
  progress['times']['marathon'] = {'difficulty': 'marathon', 'count': null, 'order': 3};
  progress['times']['impossible'] = {'difficulty': 'impossible', 'count': null, 'order': 4};

  progress['pointsEarned'] = 0;


  return progress;
}

Game.prototype.newGame = function(reset, difficulty) {
  var message = reset ? 'Reset all progress and start new game?' : 'Start new game' + (difficulty ? ' on ' + difficulty : '')+'?  Overall progress will be saved.';
  var confirm = window.confirm(message);
  if (confirm) {
    if (reset) {
      localStorage.removeItem('progress');
    }
    else {
      this.saveProgress();
      if (this.monsters[TEEMO].count > 0)
        this.progress.general.pointsEarned += (getBaseLog(20, this.monsters[TEEMO].count) + 1) * POINT_BONUS[this.difficulty];
    }
    localStorage.setItem('difficulty', difficulty ? DIFFICULTIES.indexOf(difficulty) : DIFFICULTIES.indexOf(this.difficulty));
    localStorage.removeItem('save');
    location.reload(true);
  }
}
