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

Item.Create = function(game) {
  var items = {};

  items[RELIC_SHIELD] = new Item(game, 250, 1,      2, 0, 0, 0, 1);
  items[ANCIENT_COIN] = new Item(game, 250, 1,      0, 0, 0, 0, 5);
  items[SPELLTHIEFS_EDGE] = new Item(game, 250, 1,  0, 0, 10, 0, 3);
  items[BOOTS_OF_SPEED] = new Item(game, 750, 2,    0, 1, 0, 0, 0);
  items[RUBY_CRYSTAL] = new Item(game, 750, 2,      10, 0, 0, 0, 0);
  items[AMPLIFYING_TOME] = new Item(game, 3000, 3,  0, 0, 50, 0, 0);
  items[DAGGER] = new Item(game, 3000, 3,           0, 0, 0, 1, 0);

  return items;
};
