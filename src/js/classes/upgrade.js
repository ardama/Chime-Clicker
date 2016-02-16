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

Upgrade.Create = function(game) {
  var upgrades = {};

  // Boots of Speed
  upgrades[BOOTS_OF_SWIFTNESS] = new Upgrade(game, BOOTS_OF_SPEED,        9000, 4, 0, 2, 0, 0, 0, []);
  upgrades[BOOTS_OF_MOBILITY] = new Upgrade(game, BOOTS_OF_SPEED,         180000, 6, 0, 4, 0, 0, 0, [BOOTS_OF_SWIFTNESS]);
  upgrades[IONIAN_BOOTS_OF_LUCIDITY] = new Upgrade(game, BOOTS_OF_SPEED,  25000000, 9, 0, 8, 0, 5, 0, [BOOTS_OF_MOBILITY]);
  upgrades[MERCURYS_TREADS] = new Upgrade(game, BOOTS_OF_SPEED,           2500000000, 12, 50, 10, 0, 0, 0, [IONIAN_BOOTS_OF_LUCIDITY]);
  upgrades[SORCERERS_SHOES] = new Upgrade(game, BOOTS_OF_SPEED,           400000000000, 15, 0, 25, 100, 0, 0, [MERCURYS_TREADS]);

  // Ancient Coin
  upgrades[NOMADS_MEDALLION] = new Upgrade(game, ANCIENT_COIN,            70000, 5, 0, 2, 0, 0, 25, []);
  upgrades[TALISMAN_OF_ASCENSION] = new Upgrade(game, ANCIENT_COIN,       7000000, 8, 0, 3, 0, 2, 170, [NOMADS_MEDALLION]);

  // Spellthief's Edge
  upgrades[FROSTFANG] = new Upgrade(game, SPELLTHIEFS_EDGE,               50000, 5, 0, 0, 20, 0, 12, []);
  upgrades[FROST_QUEENS_CLAIM] = new Upgrade(game, SPELLTHIEFS_EDGE,      5000000, 8, 0, 0, 70, 2, 85, [FROSTFANG]);

  // Relic Shield
  upgrades[TARGONS_BRACE] = new Upgrade(game, RELIC_SHIELD,               50000, 5, 7, 0, 0, 0, 9, []);
  upgrades[FACE_OF_THE_MOUNTAIN] = new Upgrade(game, RELIC_SHIELD,        5000000, 8, 16, 0, 0, 2, 90, [TARGONS_BRACE]);

  // Ruby Crystal
  upgrades[KINDLEGEM] = new Upgrade(game, RUBY_CRYSTAL,                   90000, 5, 10, 0, 0, 1, 0, []);
  upgrades[CRYSTALLINE_BRACER] = new Upgrade(game, RUBY_CRYSTAL,          1000000, 7, 20, 0, 0, 0, 0, []);
  upgrades[GIANTS_BELT] = new Upgrade(game, RUBY_CRYSTAL,                 35000000, 9, 40, 0, 0, 0, 0, []);
  upgrades[WARMOGS_ARMOR] = new Upgrade(game, RUBY_CRYSTAL,               750000000, 11, 70, 0, 0, 0, 0, [GIANTS_BELT]);
  upgrades[RIGHTEOUS_GLORY] = new Upgrade(game, RUBY_CRYSTAL,             18000000000, 13, 70, 5, 0, 0, 0, [CRYSTALLINE_BRACER]);
  upgrades[LOCKET_OF_THE_IRON_SOLARI] = new Upgrade(game, RUBY_CRYSTAL,   600000000000, 15, 120, 0, 0, 4, 0, [KINDLEGEM]);
  upgrades[FROZEN_MALLET] = new Upgrade(game, RUBY_CRYSTAL,               15000000000000, 17, 160, 0, 100, 0, 0, [GIANTS_BELT]);

  // Amplifying Tome
  upgrades[FIENDISH_CODEX] = new Upgrade(game, AMPLIFYING_TOME,           300000, 6, 0, 0, 50, 1, 0, []);
  upgrades[AETHER_WISP] = new Upgrade(game, AMPLIFYING_TOME,              8000000, 8, 0, 2, 100, 0, 0, []);
  upgrades[NEEDLESSLY_LARGE_ROD] = new Upgrade(game, AMPLIFYING_TOME,     150000000, 10, 0, 0, 200, 0, 0, []);
  upgrades[MORELLONOMICON] = new Upgrade(game, AMPLIFYING_TOME,           4000000000, 12, 0, 0, 200, 4, 0, [FIENDISH_CODEX]);
  upgrades[LUDENS_ECHO] = new Upgrade(game, AMPLIFYING_TOME,              75000000000, 14, 0, 3, 250, 0, 0, [NEEDLESSLY_LARGE_ROD]);
  upgrades[ZHONYAS_HOURGLASS] = new Upgrade(game, AMPLIFYING_TOME,        2000000000000, 16, 50, 0, 350, 0, 0, [NEEDLESSLY_LARGE_ROD]);
  upgrades[RABADONS_DEATHCAP] = new Upgrade(game, AMPLIFYING_TOME,        40000000000000, 18, 0, 0, 800, 0, 0, [NEEDLESSLY_LARGE_ROD]);

  // Dagger
  upgrades[RECURVE_BOW] = new Upgrade(game, DAGGER,                       350000, 6, 0, 0, 0, 2, 0, []);
  upgrades[RUNAANS_HURRICANE] = new Upgrade(game, DAGGER,                 9000000, 8, 0, 0, 20, 3, 0, [RECURVE_BOW]);
  upgrades[ZEAL] = new Upgrade(game, DAGGER,                              450000000, 10, 0, 3, 0, 4, 0, []);
  upgrades[WITS_END] = new Upgrade(game, DAGGER,                          9000000000, 12, 50, 0, 50, 5, 0, [RECURVE_BOW]);
  upgrades[STATIKK_SHIV] = new Upgrade(game, DAGGER,                      150000000000, 14, 0, 3, 80, 5, 0, [ZEAL]);
  upgrades[PHANTOM_DANCER] = new Upgrade(game, DAGGER,                    4500000000000, 16, 0, 4, 0, 10, 0, [ZEAL]);
  upgrades[TRINITY_FORCE] = new Upgrade(game, DAGGER,                     100000000000000, 18, 100, 5, 150, 20, 0, [ZEAL]);

  return upgrades;
};
