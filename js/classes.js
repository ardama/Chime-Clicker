var Item = function(game, cost, level, discovery, swiftness, power, agility, income) {
    this.Init(game, cost, level, discovery, swiftness, power, agility, income);
};

Item.prototype.Init = function(game, cost, level, discovery, swiftness, power, agility, income) {
    this.game = game;
    this.cost = cost;
    this.startCost = cost;
    this.discovery = discovery;
    this.swiftness = swiftness;
    this.power = power;
    this.agility = agility;
    this.income = income;
    this.level = level;

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
    this.startCost = cost;
    this.discovery = discovery;
    this.swiftness = swiftness;
    this.power = power;
    this.agility = agility;
    this.income = income;
    this.level = level;
    this.requirements = requirements;
    this.purchased = false;
};

Upgrade.prototype.isZero = function(stat) {
    return this[stat] == 0 ? 'upgrade-zero' : '';
};

var Spell = function(game, cost, level, duration, cooldown, effect) {
    this.Init(game, cost, level, duration, cooldown, effect);
}

Spell.prototype.Init = function(game, cost, level, duration, cooldown, effect) {
    this.game = game;
    this.cost = cost;
    this.level = level;
    this.duration = duration;
    this.cooldown = cooldown;
    this.effect = effect;
    this.purchased = false;
}

var Monster = function(game, level, health, experience, gold) {
    this.Init(game, level, health, experience, gold);
};

Monster.prototype.Init = function(game, level, health, experience, gold) {
    this.game = game;
    this.level = level;
    this.health = health;
    this.experience = experience;
    this.gold = gold;

    this.startHealth = health;
    this.startExperience = experience;
    this.startGold = gold;

    this.count = 0;
}
