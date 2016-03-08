var Game = function (scope, difficulty) {
  this.Init(scope, difficulty);
};
Game.prototype.Init = function (scope, difficulty) {
  this.scope = scope;
  this.difficulty = difficulty;
  // Game variables
  this.fps = 18;
  this.stepSize = 1 / this.fps;
  this.steps = 0;
  this.timePlayed = 0;
  this.stepStart = new Date();
  this.stepEnd = new Date();
  this.paused = false;
  this.won = false;
  this.clickTimes = [];
  // Status variables
  this.points = 0;
  this.level = 1;
  this.gold = STARTING_GOLD;
  this.experience = 0;
  this.experienceNeeded = EXPERIENCE_NEEDED;
  this.meeps = 0;
  this.meepsEarned = 0;
  this.meepDamage = MEEPS_DAMAGE[difficulty];
  this.chimes = 0;
  this.chimesRate = 0;
  this.chimesPerClick = 0;
  this.chimesPerMeep = CHIMES_PER_MEEP;
  this.chimesPerMeepFloor = CHIMES_PER_MEEP;
  this.chimesExperience = CHIMES_EXPERIENCE[difficulty];
  this.chimesCollected = 0;
  this.damageRate = 0;
  this.damagePerClick = 0;
  this.scaleMonsterLevelHealth = SCALE_MONSTER_LEVEL_HEALTH[difficulty];
  // Stat variables
  this.defenseStat = 0;
  this.movespeedStat = 0;
  this.damageStat = 0;
  this.attackrateStat = 0;
  this.defenseBase = 1;
  this.movespeedBase = 0;
  this.damageBase = 0;
  this.damageBought = 5;
  this.attackrateBase = 0;
  this.income = 0;
  this.cooldownReduction = 0;
  this.oldCooldownReduction = 0;
  // Spell variables
  this.favorBonus = 0;
  this.spoilsOfWarBonus = 0;
  this.spoilsOfWarActive = 0;
  this.tributeBonus = 0;
  this.smiteBonus = 0;
  this.smiteDamageRate = 0;
  this.healBonus = 1;
  this.ghostBonus = 1;
  this.flashBonus = 0.03;
  this.exhaustBonus = 1;
  this.igniteBonus = 1;
  // Rune counts
  this[MARK] = [];
  this[SEAL] = [];
  this[GLYPH] = [];
  this[QUINT] = [];
  // Object arrays
  this.monstersAvailable = [];
  this.items = Item.Create(this);
  this.spells = Spell.Create(this);
  this.upgrades = Upgrade.Create(this);
  this.upgradeStats = Upgrade.CreateStatsObject();
  this.monsters = Monster.Create(this);
  this.runes = Rune.Create(this);
  this.masteries = Mastery.Create(this);
  this.achievements = Achievement.Create(this);
  this.runesChanged = false;
  this.runeStats = Rune.CreateStatsObject();
  this.tempRuneStats = Rune.CreateStatsObject();
  this.load();
  this.unlockItems();
  this.unlockSpells();
  this.unlockUpgrades();
  this.unlockMonsters(false);
  this.updateStats();
};
Game.prototype.start = function () {
  this.step();
  window.setInterval(function () {
    updateTooltips();
  }, 200);
  var thisref = this;
  window.setInterval(function () {
    thisref.save();
  }, 20000);
};
// Increment functions
Game.prototype.step = function (step) {
  this.stepStart = new Date();
  var elapsedTime = (this.stepStart - this.stepEnd) / 1000;
  // Don't simulate more than 8hrs of afk time
  elapsedTime = Math.min(elapsedTime, 1000 * 60 * 60 * 8);
  var thisref = this;
  if (elapsedTime > 0 && !this.paused) {
    this.scope.$apply(function (scope) {
      thisref.addChimes(thisref.chimesRate * elapsedTime);
      thisref.addDamage(thisref.damageRate * elapsedTime);
      thisref.addGold(thisref.income * elapsedTime);
      thisref.addSpellTime(elapsedTime);
      thisref.timePlayed += elapsedTime;
      thisref.progress.general.timePlayed += elapsedTime;
    });
  } else {
    this.scope.$apply();
  }
  this.stepEnd = this.stepStart;
  window.setTimeout(function () {
    thisref.step();
  }, thisref.stepSize * 1000);
};
Game.prototype.addChimes = function (chimes) {
  this.chimesCollected += chimes;
  this.progress.general.totalChimes += chimes;
  if (this.level < 19)
    this.addExperience(this.chimesExperience * chimes);
  var chimesNeeded = this.chimesPerMeepFloor - this.chimes;
  if (chimes >= chimesNeeded) {
    chimes -= chimesNeeded;
    this.addMeeps();
    this.chimes = 0;
  }
  while (chimes >= this.chimesPerMeepFloor) {
    var meepEstimate = Math.max(Math.floor(chimes / this.chimesPerMeepFloor / 2), 1);
    var chimeEstimate = (stirlingSum(meepEstimate + this.meepsEarned) - stirlingSum(this.meepsEarned)) / LOG2 + CHIMES_PER_MEEP * meepEstimate;
    while (chimeEstimate >= chimes && meepEstimate > 1) {
      meepEstimate = Math.max(Math.floor(meepEstimate / 2), 1);
      chimeEstimate = (stirlingSum(meepEstimate + this.meepsEarned) - stirlingSum(this.meepsEarned)) / LOG2 + CHIMES_PER_MEEP * meepEstimate;
    }
    chimes -= chimeEstimate;
    this.addMeeps(meepEstimate);
  }
  this.chimes += chimes;
};
Game.prototype.addDamage = function (damage, user) {
  if (this.isMonsterChampion(this.monster))
    damage *= this.runeStats.penetration;
  if (this.monster == TEEMO)
    damage *= this.runeStats.teemoSlayer;
  this.progress.general.totalDamage += damage;
  var executeThreshold = 0.25 * this.monsters[this.monster].maxHealth;
  var currentHealth = this.monsters[this.monster].currentHealth;
  if (user && this.spells[SPOILS_OF_WAR].status == AVAILABLE && currentHealth - damage <= executeThreshold) {
    if (currentHealth > executeThreshold)
      damage -= currentHealth - executeThreshold;
    this.activateSpell(SPOILS_OF_WAR);
  }
  if (damage >= this.monsters[this.monster].currentHealth) {
    damage -= this.monsters[this.monster].currentHealth;
    this.killMonster();
  }
  while (damage >= this.monsters[this.monster].maxHealth) {
    var maxHealth = this.monsters[this.monster].maxHealth;
    var startHealth = this.monsters[this.monster].startHealth;
    var killEstimate = Math.max(Math.floor(damage / maxHealth / 2), 1);
    var killEstimateDamage = killEstimate * (killEstimate - 1) / 2 * startHealth * SCALE_MONSTER_HEALTH + killEstimate * maxHealth;
    while (killEstimateDamage > damage) {
      killEstimate = Math.max(Math.floor(killEstimate / 2), 1);
      killEstimateDamage = killEstimate * (killEstimate - 1) / 2 * startHealth * SCALE_MONSTER_HEALTH + killEstimate * maxHealth;
    }
    damage -= killEstimateDamage;
    this.killMonster(killEstimate);
  }
  this.monsters[this.monster].currentHealth -= damage;
};
Game.prototype.addGold = function (gold) {
  gold *= this.runeStats.scalingGold;
  this.gold += gold;
  this.progress.general.goldEarned += gold;
};
Game.prototype.addExperience = function (experience) {
  this.experience += experience;
  this.progress.general.experienceEarned += experience;
  while (this.experience >= this.experienceNeeded && this.level < 19) {
    this.experience -= this.experienceNeeded;
    this.levelUp();
  }
};
Game.prototype.addMeeps = function (meeps, flash) {
  meeps = meeps || 1;
  var oldMeeps = this.meeps || 1;
  var newMeeps = oldMeeps + meeps;
  // don't increase chimes needed if meeps granted via flash
  if (!flash) {
    var oldMeepsEarned = this.meepsEarned || 1;
    var newMeepsEarned = oldMeepsEarned + meeps;
    if (oldMeepsEarned < 15 && newMeepsEarned < 30) {
      this.chimesPerMeep += Math.log(getFactorialRange(newMeepsEarned, oldMeepsEarned)) / LOG2;
    } else {
      this.chimesPerMeep = stirlingApproximation(newMeepsEarned) / LOG2 + CHIMES_PER_MEEP;
    }
    this.chimesPerMeepFloor = Math.floor(this.chimesPerMeep);
    this.meepsEarned = newMeepsEarned;
  }
  this.meeps = newMeeps;
  this.progress.general.totalMeeps += meeps;
  this.updateStats();
};
Game.prototype.addSpellTime = function (time) {
  var activeSpells = this.getObjectsByStatus(this.spells, ACTIVE);
  var cooldownSpells = this.getObjectsByStatus(this.spells, COOLDOWN);
  var unavailableSpells = this.getObjectsByStatus(this.spells, UNAVAILABLE);
  var len = activeSpells.length;
  for (var i = 0; i < len; i++) {
    var activeSpell = this.spells[activeSpells[i]];
    activeSpell.durationLeft -= time;
    if (activeSpell.durationLeft <= -0.2) {
      activeSpell.durationLeft = 0;
      activeSpell.end(this);
      activeSpell.status = COOLDOWN;
      activeSpell.cooldownLeft = activeSpell.cooldown;
      this.updateStats();
    }
  }
  len = cooldownSpells.length;
  for (i = 0; i < len; i++) {
    var cooldownSpell = this.spells[cooldownSpells[i]];
    cooldownSpell.cooldownLeft -= time;
    if (cooldownSpell.cooldownLeft <= 0) {
      cooldownSpell.cooldownLeft = 0;
      // after coming off cooldown, check if spell should be available or not
      var monster = this.monsters[this.monster];
      if (monster && cooldownSpell.target != MONSTER_ALL && cooldownSpell.target != monster.type)
        cooldownSpell.status = UNAVAILABLE;
      else
        cooldownSpell.status = AVAILABLE;
    }
  }
  // if unavailable but with duration remaining, end spell and put on cooldown.
  len = unavailableSpells.length;
  for (i = 0; i < len; i++) {
    var unavailableSpell = this.spells[unavailableSpells[i]];
    if (unavailableSpell.durationLeft > 0) {
      unavailableSpell.durationLeft = 0;
      unavailableSpell.end(this);
      unavailableSpell.status = COOLDOWN;
      unavailableSpell.cooldownLeft = unavailableSpell.cooldown;
      this.updateStats();
    }
  }
};
// Update Functions
Game.prototype.updateStats = function () {
  this.damageBase = this.runeStats.damage + this.damageBought * this.igniteBonus + this.meeps * this.meepDamage;
  this.defenseStat = this.defenseBase * this.runeStats.scalingDefense;
  this.movespeedStat = this.movespeedBase * this.runeStats.scalingMovespeed;
  this.damageStat = this.damageBase * this.runeStats.scalingDamage;
  this.attackrateStat = this.attackrateBase * this.runeStats.scalingAttackrate;
  this.chimesRate = this.defenseStat * this.movespeedStat * this.ghostBonus;
  // chimes collected equals base defenseStat + 3% of current cps
  this.chimesPerClick = (this.defenseStat * this.ghostBonus + 0.03 * this.chimesRate) * this.healBonus * this.runeStats.chimeClicking;
  this.damageRate = this.damageStat * this.attackrateStat * this.exhaustBonus + this.smiteDamageRate;
  // damage dealt equals base damageStat + 3% of current dps
  this.damagePerClick = (this.exhaustBonus * this.damageStat + 0.03 * this.damageRate) * this.runeStats.monsterClicking;
};
Game.prototype.unlockItems = function () {
  var items = this.getObjectsByStatus(this.items, LOCKED);
  var len = items.length;
  for (var i = 0; i < len; i++) {
    var item = this.items[items[i]];
    if (item.unlock(this)) {
      item.status = AVAILABLE;
    }
  }
};
Game.prototype.unlockUpgrades = function () {
  var upgrades = this.getObjectsByStatus(this.upgrades, LOCKED);
  var len = upgrades.length;
  for (var i = 0; i < len; i++) {
    var upgrade = this.upgrades[upgrades[i]];
    var item = this.items[upgrade.item];
    if (upgrade.unlock(this)) {
      upgrade.status = AVAILABLE;
      item.upgradesAvailable.push(upgrades[i]);
    }
  }
};
Game.prototype.unlockSpells = function () {
  var spell, monster;
  var spells = this.getObjectsByStatus(this.spells, LOCKED);
  var len = spells.length;
  for (var i = 0; i < len; i++) {
    spell = this.spells[spells[i]];
    if (spell.unlock(this)) {
      spell.status = AVAILABLE;
    }
  }
  // disable spells when on wrong monster type
  spells = this.getObjectsByStatus(this.spells, AVAILABLE).concat(this.getObjectsByStatus(this.spells, ACTIVE));
  len = spells.length;
  for (i = 0; i < len; i++) {
    spell = this.spells[spells[i]];
    monster = this.monsters[this.monster];
    if (monster && spell.target != MONSTER_ALL && spell.target != monster.type) {
      spell.status = UNAVAILABLE;
    }
  }
  // enables spells when on correct monster type
  spells = this.getObjectsByStatus(this.spells, UNAVAILABLE);
  len = spells.length;
  for (i = 0; i < len; i++) {
    spell = this.spells[spells[i]];
    monster = this.monsters[this.monster];
    if (!monster || spell.target == MONSTER_ALL || spell.target == monster.type) {
      spell.status = AVAILABLE;
    }
  }
};
Game.prototype.calculateCooldownReduction = function () {
  this.cooldownReduction = this.runeStats.cooldownReduction + this.runeStats.scalingCooldownReduction * this.level / MONSTERS.length;
  var oldCooldownReduction = Math.min(this.oldCooldownReduction, 0.4);
  var newCooldownReduction = Math.min(this.cooldownReduction, 0.4);

  if (oldCooldownReduction != newCooldownReduction) {
    for (var spellName in this.spells) {
      var spell = this.spells[spellName];
      spell.cooldown *= (1 - newCooldownReduction) / (1 - oldCooldownReduction);
      spell.cooldownLeft *= (1 - newCooldownReduction) / (1 - oldCooldownReduction);
    }
  }
  this.oldCooldownReduction = this.cooldownReduction;
};
// TODO: do this without setMonster
Game.prototype.unlockMonsters = function (setMonster) {
  for (var monsterName in this.monsters) {
    if (this.monsters.hasOwnProperty(monsterName)) {
      var monster = this.monsters[monsterName];
      if (setMonster && monster.status == ACTIVE) {
        monster.experience /= 5;
        monster.status = AVAILABLE;
      }
      if (this.level >= monster.level && this.monstersAvailable.indexOf(monsterName) < 0) {
        this.monstersAvailable.push(monsterName);
        if (!this.monster || setMonster) {
          this.monster = monsterName;
          monster.status = ACTIVE;
        }
      }
    }
  }
};
Game.prototype.unlockRunes = function () {
  for (var runeTypeName in this.runes) {
    var runeType = this.runes[runeTypeName];
    for (var runeName in runeType) {
      var runeSet = runeType[runeName];
      for (var runeTier in runeSet) {
        var rune = runeSet[runeTier];
        if (rune.status == LOCKED && rune.unlock(this))
          rune.status = AVAILABLE;
      }
    }
  }
};
// Action Functions
Game.prototype.chimesClick = function () {
  if (!this.addClick()) return;
  this.addChimes(this.chimesPerClick);
  this.progress.general.clickChimes += this.chimesPerClick;
  this.progress.general.totalClicks++;
  this.progress.general.chimeClicks++;
};
Game.prototype.damageClick = function () {
  if (!this.addClick()) return;
  if (this.spells[TRIBUTE].status == AVAILABLE)
    this.activateSpell(TRIBUTE);
  this.addDamage(this.damagePerClick, true);
  this.progress.general.clickDamage += this.damagePerClick;
  this.progress.general.totalClicks++;
  this.progress.general.damageClicks++;
};
Game.prototype.spellClick = function (name) {
  var spell = this.spells[name];
  if (spell.type == SPELL_PASSIVE)
    return;
  this.activateSpell(name);
};
Game.prototype.activateSpell = function (name) {
  if (this.paused)
    return;
  var spell = this.spells[name];
  if (spell.status != AVAILABLE) {
    return;
  }
  spell.start(this);
  spell.durationLeft = spell.duration;
  spell.status = ACTIVE;
  this.progress.spells[name].count++;
  this.updateStats();
};
Game.prototype.buyItem = function (name, count) {
  if (this.paused)
    return;
  count = count ? count : 1;
  var item = this.items[name];
  var bought = 0;
  while (count--) {
    if (this.gold >= item.cost) {
      this.gold -= item.cost;
      this.progress.items[name].goldSpent += item.cost;
      this.progress.general.goldSpent += item.cost;
      item.count++;
      item.cost += item.startCost * SCALE_ITEM_COST * item.count;
      bought++;
    } else {
      break;
    }
  }
  this.defenseBase += bought * item.defenseStat;
  this.movespeedBase += bought * item.movespeedStat;
  this.damageBought += bought * item.damageStat;
  this.attackrateBase += bought * item.attackrateStat;
  this.income += bought * item.income;
  item.cost10 = item.calculatePurchaseCost(10);
  item.cost100 = item.calculatePurchaseCost(100);
  item.cost1000 = item.calculatePurchaseCost(1000);
  this.progress.items[name].count += bought;
  if (this.spells[FAVOR].status != LOCKED && name == ANCIENT_COIN)
    this.favorBonus = this.getFavorBonus() / 100;
  else if (this.spells[TRIBUTE].status != LOCKED && name == SPELLTHIEFS_EDGE)
    this.tributeBonus = this.getTributeBonus() / 100;
  else if (this.spells[SPOILS_OF_WAR].status != LOCKED && name == RELIC_SHIELD)
    this.spoilsOfWarBonus = this.getSpoilsOfWarBonus() / 100;
  this.updateStats();
};
Game.prototype.buyUpgrade = function (name) {
  if (this.paused)
    return;
  var upgrade = this.upgrades[name];
  if (upgrade.status == AVAILABLE && this.gold >= upgrade.cost) {
    this.gold -= upgrade.cost;
    upgrade.status = PURCHASED;
    // Upgrade all future items
    var item = this.items[upgrade.item];
    item.defenseStat += upgrade.defenseStat;
    item.movespeedStat += upgrade.movespeedStat;
    item.damageStat += upgrade.damageStat;
    item.attackrateStat += upgrade.attackrateStat;
    item.income += upgrade.income;
    item.upgrades.push(name);
    item.upgradesAvailable.splice(item.upgradesAvailable.indexOf(name), 1);
    // Upgrade all previously bought items
    var count = item.count;
    this.defenseBase += count * upgrade.defenseStat;
    this.movespeedBase += count * upgrade.movespeedStat;
    this.damageBought += count * upgrade.damageStat;
    this.attackrateBase += count * upgrade.attackrateStat;
    this.income += count * upgrade.income;
    this.progress.general.goldSpent += upgrade.cost;
    this.unlockUpgrades();
    this.unlockSpells();
    this.updateStats();
    if (name == TALISMAN_OF_ASCENSION)
      this.favorBonus = this.getFavorBonus() / 100;
    else if (name == FROST_QUEENS_CLAIM)
      this.tributeBonus = this.getTributeBonus() / 100;
    else if (name == FACE_OF_THE_MOUNTAIN)
      this.spoilsOfWarBonus = this.getSpoilsOfWarBonus() / 100;
  }
};
Game.prototype.buyRune = function (rune, count) {
  if (!rune)
    return;
  var max = rune.type == QUINT ? 3 : 9;
  count = count || 1;
  count = Math.min(max - rune.purchased, count);
  var cost = rune.cost * count;
  if (cost <= this.progress.general.chimePoints + this.points) {
    this.progress.general.chimePoints -= cost;
    rune.purchased += count;
    return true;
  }
  return false;
};
Game.prototype.addRune = function (rune) {
  if (!rune || rune.count >= rune.purchased)
    return;
  var runes = this[rune.type];
  var max = rune.type == QUINT ? 3 : 9;
  for (var i = 0; i < max; i++) {
    if (!runes[i]) {
      runes[i] = rune;
      rune.count++;
      rune.apply(this.tempRuneStats, 1);
      this.runesChanged = true;
      break;
    }
  }
};
Game.prototype.removeRune = function (rune) {
  if (!rune)
    return;
  var index = this[rune.type].lastIndexOf(rune);
  if (index > -1)
    this.removeRuneAtIndex(rune.type, index);
};
Game.prototype.removeRuneAtIndex = function (type, index) {
  var rune = this[type][index];
  if (rune) {
    rune.count--;
    rune.apply(this.tempRuneStats, -1);
    this[type][index] = null;
    this.runesChanged = true;
  }
};
Game.prototype.clearPage = function () {
  for (var i = 0; i < RUNE_TYPES.length; i++) {
    var runeType = RUNE_TYPES[i];
    for (var j = 0; j < this[runeType].length; j++) {
      this.removeRuneAtIndex(runeType, j);
    }
    this[runeType] = [];
  }
};
Game.prototype.revertChanges = function () {
  this.tempRuneStats = Rune.CreateStatsObject();
  for (var runeTypeName in this.runes) {
    var runeType = this.runes[runeTypeName];
    this[runeTypeName] = [];
    for (var runeName in runeType) {
      var runeSet = runeType[runeName];
      for (var runeTier in runeSet) {
        var rune = runeSet[runeTier];
        rune.count = rune.active;
        if (rune.count) {
          rune.apply(this.tempRuneStats, rune.count);
          for (var i = 0; i < rune.count; i++)
            this[runeTypeName].push(rune);
        }
      }
    }
  }
  this.runesChanged = false;
};
Game.prototype.selectMonster = function (direction) {
  var index = this.monstersAvailable.indexOf(this.monster);
  var length = this.monstersAvailable.length;
  index += direction == 'left' ? -1 : 1;
  if (index == -1 || index == length)
    return;
  this.monster = this.monstersAvailable[index];
  this.unlockSpells();
};
Game.prototype.addClick = function() {
  var oldest = this.clickTimes[0];
  var current = new Date();
  if (!oldest || current - oldest > 1000) {
    this.clickTimes.shift();
    this.clickTimes[14] = current;
    return true;
  }
  return false;
};
// Threshold functions
Game.prototype.killMonster = function (kills) {
  kills = kills || 1;
  var monster = this.monsters[this.monster];
  var exp = monster.experience * kills;
  var smiteGold = this.smiteBonus * monster.gold * kills;
  var spoilsGold = this.spoilsOfWarBonus * this.spoilsOfWarActive * monster.gold * kills;
  var favorGold = this.favorBonus * monster.gold * kills;
  var gold = Math.ceil(monster.gold * kills + smiteGold + spoilsGold + favorGold);
  this.progress.spells[SMITE].goldGained += smiteGold;
  this.progress.spells[SPOILS_OF_WAR].goldGained += spoilsGold;
  this.progress.spells[FAVOR].goldGained += favorGold;
  monster.maxHealth += kills * monster.startHealth * SCALE_MONSTER_HEALTH;
  monster.currentHealth = monster.maxHealth;
  monster.count += kills;
  this.progress.monsters[this.monster].count += kills;
  this.addGold(gold);
  if (this.monster == TEEMO) {
    this.win();
    this.points = this.getPointsEarned();
  }
  if (this.level != 19 || this.monster == TEEMO)
    this.addExperience(exp);
};
Game.prototype.levelUp = function (levels) {
  levels = levels || 1;
  while (levels > 0 && this.level < 19 && this.level > 0) {
    this.level += 1;
    this.experienceNeeded *= SCALE_EXPERIENCE_NEEDED;
    this.chimesExperience *= SCALE_CHIMES_EXPERIENCE;
    if (this.level == 19) {
      this.experienceNeeded = 999990000000000000;
      this.experience = 0;
    }
    levels--;
  }
  this.igniteDamage = this.getIgniteDamage();
  this.updateStats();
  this.unlockItems();
  this.unlockUpgrades();
  this.unlockMonsters(true);
  this.unlockSpells();
  this.calculateCooldownReduction();
};
Game.prototype.win = function () {
  if (!this.won) {
    this.won = true;
    var time;
    switch (this.difficulty) {
    case 'easy':
      this.progress.wins.easy.count++;
      time = this.progress.times.easy.count;
      this.progress.times.easy.count = Math.min(this.timePlayed, time ? time : Infinity);
      break;
    case 'medium':
      this.progress.wins.medium.count++;
      time = this.progress.times.medium.count;
      this.progress.times.medium.count = Math.min(this.timePlayed, time ? time : Infinity);
      break;
    case 'hard':
      this.progress.wins.hard.count++;
      time = this.progress.times.hard.count;
      this.progress.times.hard.count = Math.min(this.timePlayed, time ? time : Infinity);
      break;
    case 'marathon':
      this.progress.wins.marathon.count++;
      time = this.progress.times.marathon.count;
      this.progress.times.marathon.count = Math.min(this.timePlayed, time ? time : Infinity);
      break;
    case 'impossible':
      this.progress.wins.impossible.count++;
      time = this.progress.times.impossible.count;
      this.progress.times.impossible.count = Math.min(this.timePlayed, time ? time : Infinity);
      break;
    default:
    }
    this.unlockRunes();
    showModal('win', {});
  }
};
// Utility Functions
Game.prototype.getTime = function () {
  return this.steps / this.fps;
};
Game.prototype.getRoundedTime = function () {
  return Math.floor(this.getTime());
};
Game.prototype.getImageUrl = function (name, folder) {
  if (folder)
    folder += '/';
  else
    folder = '';
  return 'images/' + folder + name.split(' ').join('_').split('\'').join('').split('.').join('') + '.png';
};
Game.prototype.getItemImageUrl = function (name) {
  return this.getImageUrl(name + '_U', 'items/upscale');
};
Game.prototype.getMonsterImageUrl = function (name) {
  return this.getImageUrl(name, 'monsters/upscale');
};
Game.prototype.getSpellImageUrl = function (name) {
  if (name == SMITE && this.isMonsterChampion(this.monster))
    name = CHALLENGING_SMITE;
  return this.getImageUrl(name, 'spells');
};
Game.prototype.getRuneImageUrl = function (name) {
  return name ? this.getImageUrl(name, 'runes') : '';
};
Game.prototype.getLockedImageUrl = function () {
  return this.getImageUrl('locked');
};
Game.prototype.getLevelText = function () {
  if (this.level == 19) {
    return this.won ? this.points.toFixed(1) : 'T';
  }
  return this.level;
};
Game.prototype.getMeepProgressPercent = function () {
  return 100 * this.chimes / this.chimesPerMeepFloor;
};
Game.prototype.getMonsterHealthPercent = function () {
  var monster = this.monsters[this.monster];
  return 100 * monster.currentHealth / monster.maxHealth;
};
Game.prototype.getExperiencePercent = function () {
  var percent = 100 * this.experience / this.experienceNeeded;
  return percent > 100 ? 100 : percent;
};
Game.prototype.getExperienceText = function () {
  return this.won ? 'You Win!' : prettyIntBig(this.experience) + ' / ' + prettyIntBig(this.experienceNeeded) + ' xp';
};
Game.prototype.getSpellTimePercent = function (spellName) {
  var spell = this.spells[spellName];
  if (spell.status == ACTIVE) {
    return Math.min(100, 100 - 100 * Math.max(0, spell.durationLeft) / (spell.duration + 0.15));
  } else if (spell.status == COOLDOWN) {
    return 100 * spell.cooldownLeft / spell.cooldown;
  } else
    return 0;
};
Game.prototype.getFavorBonus = function () {
  return 0.4 * Math.pow(this.items[ANCIENT_COIN].count + 10000, 0.3) - 4;
};
Game.prototype.getSpoilsOfWarBonus = function () {
  return 1 * Math.pow(this.items[RELIC_SHIELD].count + 10000, 0.3) - 2;
};
Game.prototype.getTributeBonus = function () {
  return 0.6 * Math.pow(this.items[SPELLTHIEFS_EDGE].count + 10000, 0.3) - 5;
};
Game.prototype.getSmiteDamage = function () {
  var monsterName = MONSTERS[this.level - 1];
  var monster = this.monsters[monsterName];
  var damage = 20 * this.level + monster.startHealth * SMITE_PERCENT[this.difficulty] * (1 + this.getExperiencePercent() / 100);
  if (monsterName == TEEMO) {
    damage /= 20;
  }
  return damage;
};
Game.prototype.getIgniteDamage = function () {
  return 0;  //MONSTER_HEALTH * Math.pow(this.scaleMonsterLevelHealth, this.level - 1) * IGNITE_PERCENT[this.difficulty];
};
Game.prototype.getPointsEarned = function () {
  return Math.max((getBaseLog(20, this.monsters[TEEMO].count) + 1) * POINT_BONUS[this.difficulty], 0);
};
Game.prototype.getActiveRuneCount = function () {
  var count = 0;
  for (var i = 0; i < RUNE_TYPES.length; i++) {
    var runes = this[RUNE_TYPES[i]];
    for (var j = 0; j < runes.length; j++) {
      if (runes[j])
        count++;
    }
  }
  return count;
};
Game.prototype.isFirstMonster = function () {
  var index = this.monstersAvailable.indexOf(this.monster);
  return index === 0 ? 'first' : '';
};
Game.prototype.isLastMonster = function () {
  var index = this.monstersAvailable.indexOf(this.monster);
  return index == this.monstersAvailable.length - 1 ? 'last' : '';
};
Game.prototype.isMonsterChampion = function (name) {
  return CHAMPIONS.indexOf(name) != -1;
};
Game.prototype.getObjectsByStatus = function (objectMap, status) {
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
Game.prototype.sortRunes = function (rune) {
  return RUNE_NAMES.indexOf(rune.name) * 3 + rune.tier;
};
Game.prototype.getRuneSets = function (type) {
  var runes = this.runes[type];
  var runeSets = [];
  for (var runeName in runes) {
    runeSets.push(runes[runeName]);
  }
  runeSets.sort(function (a, b) {
    var names = RUNE_NAMES[a[1].type];
    return names.indexOf(a[1].name) - names.indexOf(b[1].name);
  });
  return runeSets;
};
Game.prototype.getRuneTooltip = function (type, index) {
  var tooltip = '';
  var rune = this[type][index];
  if (rune) {
    var tier = 'I'.repeat(rune.tier);
    tooltip = '<div class="rune-tooltip ' + rune.type.toLowerCase() + '"><b>' + rune.fullName + ' ' + tier + '</b><br/>' + rune.tooltip() + '</div>';
  }
  return tooltip;
};
Game.prototype.getSpellClassName = function (name) {
  return name.toLowerCase().split(' ')[0];
};
Game.prototype.getStatNameVariable = function (name, width) {
  if (window.innerWidth < width) {
    switch (name) {
    case 'Defense':
      return 'Def';
    case 'Move speed':
      return 'MS';
    case 'Damage':
      return 'Dmg';
    case 'Attack rate':
      return 'AR';
    }
  }
  return name;
};
Game.prototype.showNewGameModal = function (reset, difficulty, source) {
  difficulty = difficulty || this.difficulty;
  this.newGameDifficulty = difficulty;
  this.newGameReset = reset;
  var points = this.points;
  return showModal('newgame', {
    'reset': reset,
    'difficulty': difficulty,
    'points': points,
    'source': source
  });
};
Game.prototype.save = function () {
  this.saveProgress();
  this.saveGame();
  showSave();
};
Game.prototype.saveProgress = function () {
  var items = [];
  for (var item in this.progress.items) {
    delete this.progress.items[item].$$hashKey;
    items.push(this.progress.items[item]);
  }
  var monsters = [];
  for (var monster in this.progress.monsters) {
    delete this.progress.monsters[monster].$$hashKey;
    monsters.push(this.progress.monsters[monster]);
  }
  var spells = [];
  for (var spell in this.progress.spells) {
    delete this.progress.spells[spell].$$hashKey;
    spells.push(this.progress.spells[spell]);
  }
  var wins = [];
  for (var win in this.progress.wins) {
    delete this.progress.wins[win].$$hashKey;
    wins.push(this.progress.wins[win]);
  }
  var times = [];
  for (var time in this.progress.times) {
    delete this.progress.times[time].$$hashKey;
    times.push(this.progress.times[time]);
  }
  var runes = [];
  for (var runeTypeName in this.runes) {
    var runeType = this.runes[runeTypeName];
    for (var runeName in runeType) {
      var runeSet = runeType[runeName];
      for (var runeTier in runeSet) {
        var rune = runeSet[runeTier];
        var runeData = {};
        runeData.type = runeTypeToIndex(runeTypeName);
        runeData.name = runeToIndex(runeName);
        runeData.tier = runeTier;
        runeData.status = rune.status;
        runeData.purchased = rune.purchased || 0;
        runeData.count = rune.count || 0;
        runeData.active = rune.active || 0;
        runes.push(runeData);
      }
    }
  }
  var progress = {
    'general': this.progress.general,
    'items': jsonh.pack(items),
    'monsters': jsonh.pack(monsters),
    'spells': jsonh.pack(spells),
    'wins': jsonh.pack(wins),
    'times': jsonh.pack(times),
    'runes': jsonh.pack(runes)
  };
  localStorage.setItem('progress', JSON.stringify(progress));
  return progress;
};
Game.prototype.saveGame = function () {
  var save = {};
  this.saveState(save);
  this.saveItems(save);
  this.saveUpgrades(save);
  this.saveSpells(save);
  this.saveMonsters(save);
  localStorage.setItem('save', JSON.stringify(save));
  localStorage.setItem('difficulty', DIFFICULTIES.indexOf(this.difficulty));
  return save;
};
Game.prototype.saveState = function (save) {
  var obj = {};
  obj.steps = this.steps;
  obj.timePlayed = Math.round(this.timePlayed);
  obj.paused = this.paused;
  obj.won = this.won;
  obj.level = this.level;
  obj.gold = Math.ceil(this.gold);
  obj.experience = Math.ceil(this.experience);
  obj.meeps = this.meeps;
  obj.meepsEarned = this.meepsEarned;
  obj.chimes = Math.ceil(this.chimes);
  obj.chimesPerMeep = this.chimesPerMeep;
  obj.chimesPerMeepFloor = this.chimesPerMeepFloor;
  obj.chimesCollected = Math.ceil(this.chimesCollected);
  obj.monster = this.monster;
  obj.spoilsOfWarActive = this.spoilsOfWarActive;
  obj.smiteBonus = this.smiteBonus;
  obj.smiteDamageRate = this.smiteDamageRate;
  obj.healBonus = this.healBonus;
  obj.ghostBonus = this.ghostBonus;
  obj.exhaustBonus = this.exhaustBonus;
  obj.igniteBonus = this.igniteBonus;
  save.state = obj;
};
Game.prototype.saveItems = function (save) {
  var items = this.items;
  var obj = [];
  for (var itemName in items) {
    if (items.hasOwnProperty(itemName)) {
      var item = items[itemName];
      var itemData = {};
      itemData.name = itemToIndex(itemName);
      itemData.count = item.count;
      itemData.upgrades = Item.convertUpgradeToIndex(item.upgrades);
      itemData.upgradesAvailable = Item.convertUpgradeToIndex(item.upgradesAvailable);
      itemData.cost = item.cost;
      obj.push(itemData);
    }
  }
  save.items = jsonh.pack(obj);
};
Game.prototype.saveUpgrades = function (save) {
  var upgrades = this.upgrades;
  var obj = [];
  for (var upgradeName in upgrades) {
    if (upgrades.hasOwnProperty(upgradeName)) {
      var upgrade = upgrades[upgradeName];
      var upgradeData = {};
      upgradeData.name = upgradeToIndex(upgradeName);
      upgradeData.status = upgrade.status;
      obj.push(upgradeData);
    }
  }
  save.upgrades = jsonh.pack(obj);
};
Game.prototype.saveSpells = function (save) {
  var spells = this.spells;
  var obj = [];
  for (var spellName in spells) {
    if (spells.hasOwnProperty(spellName)) {
      var spell = spells[spellName];
      var spellData = {};
      spellData.name = spellToIndex(spellName);
      spellData.durationLeft = Math.ceil(spell.durationLeft);
      spellData.cooldownLeft = Math.floor(spell.cooldownLeft);
      spellData.duration = spell.duration;
      spellData.status = spell.status;
      obj.push(spellData);
    }
  }
  save.spells = jsonh.pack(obj);
};
Game.prototype.saveMonsters = function (save) {
  var monsters = this.monsters;
  var obj = [];
  for (var monsterName in monsters) {
    if (monsters.hasOwnProperty(monsterName)) {
      var monster = monsters[monsterName];
      var monsterData = {};
      monsterData.name = monsterToIndex(monsterName);
      monsterData.currentHealth = Math.floor(monster.currentHealth);
      monsterData.count = monster.count;
      monsterData.status = monster.status;
      obj.push(monsterData);
    }
  }
  save.monsters = jsonh.pack(obj);
};
Game.prototype.saveRunes = function () {
  for (var runeTypeName in this.runes) {
    var runeType = this.runes[runeTypeName];
    for (var runeName in runeType) {
      var runeSet = runeType[runeName];
      for (var runeTier in runeSet) {
        var rune = runeSet[runeTier];
        rune.active = rune.count;
      }
    }
  }
};
Game.prototype.load = function () {
  this.loadProgress();
  this.calculateStartState();
  this.loadGame();
  this.recalculateState();
};
Game.prototype.loadProgress = function () {
  obj = {};
  obj.general = {};
  obj.general.timePlayed = 0;
  obj.general.experienceEarned = 0;
  obj.general.totalChimes = 0;
  obj.general.clickChimes = 0;
  obj.general.totalDamage = 0;
  obj.general.clickDamage = 0;
  obj.general.totalClicks = 0;
  obj.general.chimeClicks = 0;
  obj.general.damageClicks = 0;
  obj.general.totalMeeps = 0;
  obj.general.goldEarned = 0;
  obj.general.goldSpent = 0;
  obj.general.chimePoints = 0;
  obj.general.chimePointsEarned = 0;
  // items purchased
  var order = 0;
  obj.items = {};
  for (var item in this.items) {
    obj.items[item] = {
      'item': itemToIndex(item),
      'count': 0,
      'goldSpent': 0,
      'order': order
    };
    order++;
  }
  // monsters killed
  order = 0;
  obj.monsters = {};
  for (var monster in this.monsters) {
    obj.monsters[monster] = {
      'monster': monsterToIndex(monster),
      'count': 0,
      'order': order
    };
    order++;
  }
  // spells used
  order = 0;
  obj.spells = {};
  for (var spell in this.spells) {
    obj.spells[spell] = {
      'spell': spellToIndex(spell),
      'count': 0,
      'goldGained': 0,
      'meepsGained': 0,
      'order': order
    };
    order++;
  }
  obj.wins = {};
  obj.wins.easy = {
    'difficulty': 'easy',
    'count': 0,
    'order': 0
  };
  obj.wins.medium = {
    'difficulty': 'medium',
    'count': 0,
    'order': 1
  };
  obj.wins.hard = {
    'difficulty': 'hard',
    'count': 0,
    'order': 2
  };
  obj.wins.marathon = {
    'difficulty': 'marathon',
    'count': 0,
    'order': 3
  };
  obj.wins.impossible = {
    'difficulty': 'impossible',
    'count': 0,
    'order': 4
  };
  obj.times = {};
  obj.times.easy = {
    'difficulty': 'easy',
    'count': null,
    'order': 0
  };
  obj.times.medium = {
    'difficulty': 'medium',
    'count': null,
    'order': 1
  };
  obj.times.hard = {
    'difficulty': 'hard',
    'count': null,
    'order': 2
  };
  obj.times.marathon = {
    'difficulty': 'marathon',
    'count': null,
    'order': 3
  };
  obj.times.impossible = {
    'difficulty': 'impossible',
    'count': null,
    'order': 4
  };
  var loadObj = JSON.parse(localStorage.getItem('progress'));
  var progress = {};
  if (loadObj) {
    progress.general = loadObj.general;
    progress.items = {};
    progress.monsters = {};
    progress.spells = {};
    progress.wins = {};
    progress.times = {};
    // update 16-01-22 - cap old points at 200
    if (loadObj.general.points > 0) {
      progress.general.chimePoints = Math.min(200, loadObj.general.points);
      progress.general.chimePointsEarned = Math.min(200, loadObj.general.pointsEarned);
      progress.general.points = 0;
      progress.general.pointsEarned = 0;
    }
    var i;
    var o;

    if (loadObj.items.constructor === Array) {
      o = jsonh.unpack(loadObj.items);
      i = o.length;
      while (i--) {
        item = o[i];
        // convert string to index
        item.item = itemToIndex(item.item);
        delete item.order;
        progress.items[indexToItem(item.item)] = item;
      }
    }
    else
      progress.items = loadObj.items;

    if (loadObj.monsters.constructor === Array) {
      o = jsonh.unpack(loadObj.monsters);
      i = o.length;
      while (i--) {
        monster = o[i];
        // convert string to index
        monster.monster = monsterToIndex(monster.monster);
        delete monster.order;
        progress.monsters[indexToMonster(monster.monster)] = monster;
      }
    }
    else
      progress.monsters = loadObj.monsters;

    if (loadObj.spells.constructor === Array) {
      o = jsonh.unpack(loadObj.spells);
      i = o.length;
      while (i--) {
        spell = o[i];
        // convert string to index
        spell.spell = spellToIndex(spell.spell);
        delete spell.order;
        progress.spells[indexToSpell(spell.spell)] = spell;
      }
    }
    else
      progress.spells = loadObj.spells;

    var difficulty;
    if (loadObj.wins.constructor === Array) {
      o = jsonh.unpack(loadObj.wins);
      i = o.length;
      while (i--) {
        difficulty = o[i];
        delete difficulty.order;
        progress.wins[difficulty.difficulty] = difficulty;
      }
    }
    else
      progress.wins = loadObj.wins;

    if (loadObj.times.constructor === Array) {
      o = jsonh.unpack(loadObj.times);
      i = o.length;
      while (i--) {
        difficulty = o[i];
        delete difficulty.order;
        progress.times[difficulty.difficulty] = difficulty;
      }
    }
    else
      progress.times = loadObj.times;

    if (loadObj.runes) {
      o = jsonh.unpack(loadObj.runes);
      i = o.length;
      while (i--) {
        var runeData = o[i];
        var rune = this.runes[indexToRuneType(runeData.type)][indexToRune(runeData.name)][runeData.tier];
        rune.status = runeData.status;
        rune.purchased = runeData.purchased;
        rune.count = runeData.count;
        rune.active = runeData.active;
      }
    }
  }
  this.progress = $.extend(true, obj, progress);
};
Game.prototype.calculateStartState = function () {
  // Apply runes
  for (var runeTypeName in this.runes) {
    var runeType = this.runes[runeTypeName];
    for (var runeName in runeType) {
      var runeSet = runeType[runeName];
      for (var runeTier in runeSet) {
        var rune = runeSet[runeTier];
        rune.apply(this.runeStats, rune.active);
        rune.apply(this.tempRuneStats, rune.count);
        if (rune.active != rune.count)
          this.runesChanged = true;
        for (var i = 0; i < rune.count; i++)
          this[runeTypeName].push(rune);
      }
    }
  }
  this.gold += this.runeStats.gold;
  this.defenseBase += this.runeStats.defense;
  this.movespeedBase += this.runeStats.movespeed;
  this.damageBase += this.runeStats.damage;
  this.attackrateBase += this.runeStats.attackrate;
};
Game.prototype.loadGame = function () {
  var save = JSON.parse(localStorage.getItem('save'));
  if (save) {
    this.loadState(save.state);
    this.loadItems(save.items);
    this.loadUpgrades(save.upgrades);
    this.loadSpells(save.spells);
    this.loadMonsters(save.monsters);
  }
};
Game.prototype.loadState = function (obj) {
  if (!obj)
    return;
  this.steps = obj.steps;
  this.timePlayed = obj.timePlayed || this.steps * this.stepSize;
  this.paused = obj.paused || false;
  this.won = obj.won;
  this.level = obj.level;
  this.gold = obj.gold;
  this.experience = obj.experience;
  this.meeps = obj.meeps;
  this.meepsEarned = obj.meepsEarned || obj.meeps;
  this.chimes = obj.chimes;
  this.chimesPerMeep = obj.chimesPerMeep;
  this.chimesPerMeepFloor = obj.chimesPerMeepFloor;
  this.chimesCollected = obj.chimesCollected;
  this.monster = obj.monster;
  this.spoilsOfWarActive = obj.spoilsOfWarActive;
  this.smiteBonus = obj.smiteBonus;
  this.smiteDamageRate = obj.smiteDamageRate || 0;
  this.healBonus = obj.healBonus || 1;
  this.ghostBonus = obj.ghostBonus || 1;
  this.exhaustBonus = obj.exhaustBonus || 1;
  this.igniteBonus = obj.igniteBonus || 1;
};
Game.prototype.loadItems = function (obj) {
  if (!obj)
    return;

  var data, item;
  if (obj.constructor === Array) {
    obj = jsonh.unpack(obj);
    var i = obj.length;
    while (i--) {
      data = obj[i];
      item = this.items[indexToItem(data.name)];
      if (data && item) {
        item.count = data.count;
        item.upgrades = Item.convertIndexToUpgrade(data.upgrades);
        item.upgradesAvailable = Item.convertIndexToUpgrade(data.upgradesAvailable);
        item.cost = item.startCost + item.startCost * SCALE_ITEM_COST * item.count * (item.count + 1) / 2;
        item.cost10 = item.calculatePurchaseCost(10);
        item.cost100 = item.calculatePurchaseCost(100);
        item.cost1000 = item.calculatePurchaseCost(1000);
      }
    }
  }  // deprecated
  else {
    for (var name in obj) {
      if (obj.hasOwnProperty(name)) {
        data = obj[name];
        item = this.items[name];
        if (data && item) {
          item.count = data.count;
          item.upgrades = data.upgrades;
          item.upgradesAvailable = data.upgradesAvailable;
          item.cost = item.startCost + item.startCost * SCALE_ITEM_COST * item.count * (item.count + 1) / 2;
          item.cost10 = item.calculatePurchaseCost(10);
          item.cost100 = item.calculatePurchaseCost(100);
          item.cost1000 = item.calculatePurchaseCost(1000);
        }
      }
    }
  }
};
Game.prototype.loadUpgrades = function (obj) {
  if (!obj)
    return;

  var data, upgrade, item;
  if (obj.constructor === Array) {
    obj = jsonh.unpack(obj);
    var i = obj.length;
    while (i--) {
      data = obj[i];
      upgrade = this.upgrades[indexToUpgrade(data.name)];
      if (data && upgrade) {
        upgrade.status = data.status;
        if (data.status == PURCHASED) {
          item = this.items[upgrade.item];
          item.defenseStat += upgrade.defenseStat;
          item.movespeedStat += upgrade.movespeedStat;
          item.damageStat += upgrade.damageStat;
          item.attackrateStat += upgrade.attackrateStat;
          item.income += upgrade.income;
        }
      }
    }
  }  // deprecated
  else {
    for (var name in obj) {
      if (obj.hasOwnProperty(name)) {
        data = obj[name];
        upgrade = this.upgrades[name];
        if (data && upgrade) {
          upgrade.status = data.status;
          if (data.status == PURCHASED) {
            item = this.items[upgrade.item];
            item.defenseStat += upgrade.defenseStat;
            item.movespeedStat += upgrade.movespeedStat;
            item.damageStat += upgrade.damageStat;
            item.attackrateStat += upgrade.attackrateStat;
            item.income += upgrade.income;
          }
        }
      }
    }
  }
};
Game.prototype.loadSpells = function (obj) {
  if (!obj)
    return;

  var data, spell;
  if (obj.constructor === Array) {
    obj = jsonh.unpack(obj);
    var i = obj.length;
    while (i--) {
      data = obj[i];
      spell = this.spells[indexToSpell(data.name)];
      if (data && spell) {
        spell.durationLeft = data.durationLeft;
        spell.cooldownLeft = data.cooldownLeft;
        if (data.duration)
          spell.duration = data.duration;
        spell.status = data.status;
      }
    }
  }  // deprecated
  else {
    for (var name in obj) {
      if (obj.hasOwnProperty(name)) {
        data = obj[name];
        spell = this.spells[name];
        if (data && spell) {
          spell.durationLeft = data.durationLeft;
          spell.cooldownLeft = data.cooldownLeft;
          spell.status = data.status;
        }
      }
    }
  }
};
Game.prototype.loadMonsters = function (obj) {
  if (!obj)
    return;

  var data, monster;
  if (obj.constructor === Array) {
    obj = jsonh.unpack(obj);
    var i = obj.length;
    while (i--) {
      data = obj[i];
      monster = this.monsters[indexToMonster(data.name)];
      if (data && monster) {
        if (data.currentHealth)
          monster.currentHealth = data.currentHealth;
        monster.count = data.count;
        monster.status = data.status;
        monster.maxHealth = monster.startHealth + monster.startHealth * SCALE_MONSTER_HEALTH * monster.count;
      }
    }
  }  // deprecated
  else {
    for (var name in obj) {
      if (obj.hasOwnProperty(name)) {
        data = obj[name];
        monster = this.monsters[name];
        if (data && monster) {
          monster.currentHealth = data.currentHealth;
          monster.count = data.count;
          monster.status = data.status;
          monster.maxHealth = monster.startHealth + monster.startHealth * SCALE_MONSTER_HEALTH * monster.count;
        }
      }
    }
  }
};
Game.prototype.recalculateState = function () {
  if (this.level == 19)
    this.experienceNeeded = 999990000000000000;
  else
    this.experienceNeeded *= Math.pow(SCALE_EXPERIENCE_NEEDED, this.level - 1);
  this.chimesExperience *= Math.pow(SCALE_CHIMES_EXPERIENCE, this.level - 1);
  this.points = this.getPointsEarned();
  var items = this.getObjectsByStatus(this.items);
  for (var i = 0; i < items.length; i++) {
    var item = this.items[items[i]];
    this.defenseBase += item.count * item.defenseStat;
    this.movespeedBase += item.count * item.movespeedStat;
    this.damageBought += item.count * item.damageStat;
    this.attackrateBase += item.count * item.attackrateStat;
    this.income += item.count * item.income;
  }
  var monsters = this.getObjectsByStatus(this.monsters, AVAILABLE);
  for (i = 0; i < monsters.length; i++) {
    this.monsters[monsters[i]].experience /= 5;
  }
  this.damageStat = this.damageBought * this.igniteBonus + this.meeps * this.meepDamage;
  this.favorBonus = this.getFavorBonus() / 100;
  this.spoilsOfWarBonus = this.getSpoilsOfWarBonus() / 100;
  this.tributeBonus = this.getTributeBonus() / 100;
  this.igniteDamage = this.getIgniteDamage();
  this.calculateCooldownReduction();
};
Game.prototype.newGame = function (reset, difficulty) {
  if (reset) {
    localStorage.removeItem('progress');
  } else {
    if (this.monsters[TEEMO].count > 0) {
      this.progress.general.chimePoints += this.points;
      this.progress.general.chimePointsEarned += this.points;
    }
    this.saveRunes();
    this.saveProgress();
  }
  localStorage.setItem('difficulty', difficulty ? DIFFICULTIES.indexOf(difficulty) : DIFFICULTIES.indexOf(this.difficulty));
  localStorage.removeItem('save');
  location.reload(true);
};
Game.prototype.exportGame = function () {
  showModal('export', {
    'text': lzw_encode(JSON.stringify({
      'progress': this.saveProgress(),
      'save': this.saveGame(),
      'difficulty': DIFFICULTIES.indexOf(this.difficulty)
    }))
  });
};
Game.prototype.importGame = function (text) {
  if (text && text.length > 0) {
    var obj = JSON.parse(lzw_decode(text.trim()));
    localStorage.setItem('progress', JSON.stringify(obj.progress));
    localStorage.setItem('save', JSON.stringify(obj.save));
    localStorage.setItem('difficulty', obj.difficulty);
  }
  location.reload(true);
};
Game.prototype.pauseGame = function () {
  this.paused = !this.paused;
};
