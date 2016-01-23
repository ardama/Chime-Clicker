var Item = function(game, cost, level, defenseStat, movespeedStat, damageStat, attackrateStat, income) {
  this.Init(game, cost, level, defenseStat, movespeedStat, damageStat, attackrateStat, income);
};

Item.prototype.Init = function(game, cost, level, defenseStat, movespeedStat, damageStat, attackrateStat, income) {
  this.game = game;
  this.cost = cost;
  this.level = level;
  this.startCost = cost;
  this.defenseStat = defenseStat;
  this.movespeedStat = movespeedStat;
  this.damageStat = damageStat;
  this.attackrateStat = attackrateStat;
  this.income = income;

  this.unlock = function(game) {
    return game.level >= this.level;
  };

  this.status = LOCKED;
  this.count = 0;

  this.upgrades = [];
  this.upgradesAvailable = [];

  this.cost10 = this.calculatePurchaseCost(10);
  this.cost100 = this.calculatePurchaseCost(100);
  this.cost1000 = this.calculatePurchaseCost(1000);
};

Item.prototype.isZero = function(stat) {
  return this[stat] ? '' : 'item-zero';
};

Item.prototype.calculateTotalCost  = function(n) {
  return this.startCost * SCALE_ITEM_COST * ((Math.pow(n, 3) - n) / 6) + n * this.startCost;
};

Item.prototype.calculatePurchaseCost  = function(n) {
  return this.calculateTotalCost(n + this.count) - this.calculateTotalCost(this.count);
};

Item.convertUpgradeToIndex = function(upgrades) {
  var result = [];
  var len = upgrades.length;
  var i = 0;
  while (i < len) {
    result.push(upgradeToIndex(upgrades[i]));
    i++;
  }
  return result;
};

Item.convertIndexToUpgrade = function(indices) {
  var result = [];
  var len = indices.length;
  var i = 0;
  while (i < len) {
    result.push(indexToUpgrade(indices[i]));
    i++;
  }
  return result;
};


var Upgrade = function(game, item, cost, level, defenseStat, movespeedStat, damageStat, attackrateStat, income, requirements) {
  this.Init(game, item, cost, level, defenseStat, movespeedStat, damageStat, attackrateStat, income, requirements);
};

Upgrade.prototype.Init = function(game, item, cost, level, defenseStat, movespeedStat, damageStat, attackrateStat, income, requirements) {
  this.game = game;
  this.item = item;
  this.cost = cost;
  this.level = level;
  this.defenseStat = defenseStat;
  this.movespeedStat = movespeedStat;
  this.damageStat = damageStat;
  this.attackrateStat = attackrateStat;
  this.income = income;

  this.unlock = function(game) {
    if (game.level < this.level)
      return false;
    if (!this.requirements || !this.requirements.length)
      return true;
    for (var i = 0; i < this.requirements.length; i++) {
      if (game.upgrades[this.requirements[i]].status != PURCHASED)
        return false;
    }
    return true;
  };

  this.status = LOCKED;
};

Upgrade.prototype.isZero = function(stat) {
  return this[stat] ? '' : 'upgrade-zero';
};

var Spell = function(game, duration, cooldown, type, target, start, end, unlock, tooltip) {
  this.Init(game, duration, cooldown, type, target, start, end, unlock, tooltip);
};

Spell.prototype.Init = function(game, duration, cooldown, type, target, start, end, unlock, tooltip) {
  this.game = game;
  this.duration = duration;
  this.durationLeft = 0;
  this.cooldown = cooldown;
  this.cooldownLeft = 0;
  this.type = type;
  this.target = target;

  // callbacks
  this.start = start;
  this.end = end;
  this.unlock = unlock;
  this.tooltip = tooltip;

  this.status = LOCKED;
};

Spell.prototype.getSpellTime = function() {
  var time = 0;
  if (this.status == ACTIVE)
    time = this.durationLeft;
  else if (this.status == COOLDOWN)
    time = this.cooldownLeft;

  return time > 0 ? time.toFixed(0): '';
};

var Monster = function(game, level, health, experience, gold, type) {
  this.Init(game, level, health, experience, gold, type);
};

Monster.prototype.Init = function(game, level, health, experience, gold, type) {
  this.game = game;
  this.level = level;
  this.maxHealth = health;
  this.currentHealth = health;
  this.experience = experience;
  this.gold = gold;
  this.type = type;

  this.startHealth = health;
  this.startExperience = experience;
  this.startGold = gold;

  this.count = 0;
  this.status = LOCKED;
};
