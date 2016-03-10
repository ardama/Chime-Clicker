var Item = function(game, cost, level, defenseStat, movespeedStat, damageStat, attackrateStat, income, upgrades) {
  this.Init(game, cost, level, defenseStat, movespeedStat, damageStat, attackrateStat, income, upgrades);
};

Item.prototype.Init = function(game, cost, level, defenseStat, movespeedStat, damageStat, attackrateStat, income, upgrades) {
  this.game = game;
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

  this.upgrades = upgrades;
  this.upgradesPurchased = [];
  this.upgradesAvailable = [];
  this.upgradeActive = null;
  this.upgradeCooldown = 0;

  this.cost = this.calculatePurchaseCost(1);
  this.cost10 = this.calculatePurchaseCost(10);
  this.cost100 = this.calculatePurchaseCost(100);
  this.cost1000 = this.calculatePurchaseCost(1000);
};

Item.prototype.calculateTotalCost  = function(n) {
  return (this.startCost * SCALE_ITEM_COST * ((Math.pow(n, 3) - n) / 6) + n * this.startCost) * this.game.upgradeStats.priceBonus;
};

Item.prototype.calculatePurchaseCost = function(n) {
  return this.calculateTotalCost(n + this.count) - this.calculateTotalCost(this.count);
};

Item.prototype.getItemText = function() {
  if (this.upgradeActive == WITS_END)
    return this.game.upgradeStats.witCount + '';
  else  if (this.upgradeActive == STATIKK_SHIV)
    return this.game.upgradeStats.statikkCount + '';
  else if (this.upgradeActive == LUDENS_ECHO)
    return this.game.upgradeStats.ludenCount + '';
  return '';
};

Item.prototype.getItemClass = function() {
  if (this.upgradeActive == WITS_END)
    return 'wits';
  else  if (this.upgradeActive == STATIKK_SHIV)
    return 'statikk';
  else if (this.upgradeActive == LUDENS_ECHO)
    return 'ludens';
  return '';
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

  items[RELIC_SHIELD] = new Item(game, 250, 1,      2,  0, 0,  0, 1, [TARGONS_BRACE, FACE_OF_THE_MOUNTAIN]);
  items[ANCIENT_COIN] = new Item(game, 250, 1,      0,  0, 0,  0, 5, [NOMADS_MEDALLION, TALISMAN_OF_ASCENSION]);
  items[SPELLTHIEFS_EDGE] = new Item(game, 250, 1,  0,  0, 10, 0, 3, [FROSTFANG, FROST_QUEENS_CLAIM]);
  items[BOOTS_OF_SPEED] = new Item(game, 750, 2,    0,  1, 0,  0, 0, [BOOTS_OF_SWIFTNESS, NINJA_TABI, IONIAN_BOOTS_OF_LUCIDITY, BOOTS_OF_MOBILITY, MERCURYS_TREADS, SORCERERS_SHOES, BERSERKERS_GREAVES]);
  items[RUBY_CRYSTAL] = new Item(game, 750, 2,      10, 0, 0,  0, 0, [CRYSTALLINE_BRACER, KINDLEGEM, GIANTS_BELT, WARMOGS_ARMOR, RIGHTEOUS_GLORY, SPIRIT_VISAGE, FROZEN_MALLET]);
  items[AMPLIFYING_TOME] = new Item(game, 2000, 3,  0,  0, 50, 0, 0, [FIENDISH_CODEX, AETHER_WISP, NEEDLESSLY_LARGE_ROD, MORELLONOMICON, LUDENS_ECHO, RYLAIS_CRYSTAL_SCEPTER, RABADONS_DEATHCAP]);
  items[DAGGER] = new Item(game, 3000, 3,           0,  0, 0,  1, 0, [RECURVE_BOW, RUNAANS_HURRICANE, ZEAL, WITS_END, STATIKK_SHIV, PHANTOM_DANCER, TRINITY_FORCE]);

  return items;
};
