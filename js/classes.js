var Item = function(game, cost, level, discovery, swiftness, power, agility, income) {
  this.Init(game, cost, level, discovery, swiftness, power, agility, income);
};

Item.prototype.Init = function(game, cost, level, discovery, swiftness, power, agility, income) {
  this.game = game;
  this.cost = cost;
  this.level = level;
  this.startCost = cost;
  this.discovery = discovery;
  this.swiftness = swiftness;
  this.power = power;
  this.agility = agility;
  this.income = income;

  this.unlock = function(game) {
    return game.level >= this.level;
  };

  this.status = LOCKED;
  this.count = 0;

  this.upgrades = [];
  this.upgradesAvailable = [];
};

Item.prototype.isZero = function(stat) {
  return this[stat] == 0 ? 'item-zero' : '';
};

var Upgrade = function(game, item, cost, level, discovery, swiftness, power, agility, income, requirements) {
  this.Init(game, item, cost, level, discovery, swiftness, power, agility, income, requirements);
};

Upgrade.prototype.Init = function(game, item, cost, level, discovery, swiftness, power, agility, income, requirements) {
  this.game = game;
  this.item = item;
  this.cost = cost;
  this.level = level;
  this.discovery = discovery;
  this.swiftness = swiftness;
  this.power = power;
  this.agility = agility;
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
  return this[stat] == 0 ? 'upgrade-zero' : '';
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
};
