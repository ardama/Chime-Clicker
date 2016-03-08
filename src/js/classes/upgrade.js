var Upgrade = function(game, item, cost, level, defenseStat, movespeedStat, damageStat, attackrateStat, income, requirements, activate, deactivate, tooltip) {
  this.Init(game, item, cost, level, defenseStat, movespeedStat, damageStat, attackrateStat, income, requirements, activate, deactivate, tooltip);
};

Upgrade.prototype.Init = function(game, item, cost, level, defenseStat, movespeedStat, damageStat, attackrateStat, income, requirements, activate, deactivate, tooltip) {
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

  this.activate = activate;
  this.deactivate = deactivate;
  this.tooltip = tooltip;

  this.status = LOCKED;
};

Upgrade.prototype.isZero = function(stat) {
  return this[stat] ? '' : 'upgrade-zero';
};

Upgrade.Create = function(game) {
  var upgrades = {};

  // Ancient Coin /////////////////////////////////////////
  upgrades[NOMADS_MEDALLION] = new Upgrade(game, ANCIENT_COIN,            15000, 4, 0, 1, 0, 0, 15, [],
    function(game) {
      game.upgradeStats.goldBonus += 0.03;
      game.upgradeStats.priceBonus += 0.015;
    },
    function(game) {
      game.upgradeStats.goldBonus -= 0.03;
      game.upgradeStats.priceBonus -= 0.015;
    }
  );
  upgrades[TALISMAN_OF_ASCENSION] = new Upgrade(game, ANCIENT_COIN,       9000000, 8, 0, 4, 0, 2, 180, [NOMADS_MEDALLION],
    function(game) {
      game.upgradeStats.goldBonus -= 0.015;
      game.upgradeStats.priceBonus -= 0.03;
    },
    function(game) {
      game.upgradeStats.goldBonus += 0.015;
      game.upgradeStats.priceBonus += 0.03;
    }
  );

  // Spellthief's Edge ////////////////////////////////////
  upgrades[FROSTFANG] = new Upgrade(game, SPELLTHIEFS_EDGE,               10000, 4, 0, 0, 20, 0, 7, [],
    function(game) {
      game.upgradeStats.goldBonus += 0.03;
      game.upgradeStats.damageBonus -= 0.015;
    },
    function(game) {
      game.upgradeStats.goldBonus -= 0.03;
      game.upgradeStats.damageBonus += 0.015;
    }
  );
  upgrades[FROST_QUEENS_CLAIM] = new Upgrade(game, SPELLTHIEFS_EDGE,      5000000, 8, 0, 0, 70, 2, 90, [FROSTFANG],
    function(game) {
      game.upgradeStats.goldBonus -= 0.015;
      game.upgradeStats.damageBonus += 0.03;
    },
    function(game) {
      game.upgradeStats.goldBonus += 0.015;
      game.upgradeStats.damageBonus -= 0.03;
    }
  );

  // Relic Shield /////////////////////////////////////////
  upgrades[TARGONS_BRACE] = new Upgrade(game, RELIC_SHIELD,               10000, 4, 5, 0, 0, 0, 4, [],
    function(game) {
      game.upgradeStats.goldBonus += 0.03;
      game.upgradeStats.chimeBonus -= 0.03;
    },
    function(game) {
      game.upgradeStats.goldBonus -= 0.03;
      game.upgradeStats.chimeBonus += 0.03;
    }
  );
  upgrades[FACE_OF_THE_MOUNTAIN] = new Upgrade(game, RELIC_SHIELD,        5000000, 8, 18, 0, 0, 2, 85, [TARGONS_BRACE],
    function(game) {
      game.upgradeStats.goldBonus -= 0.015;
      game.upgradeStats.chimeBonus += 0.06;
    },
    function(game) {
      game.upgradeStats.goldBonus += 0.015;
      game.upgradeStats.chimeBonus -= 0.06;
    }
  );

  // Boots of Speed ///////////////////////////////////////
  upgrades[BOOTS_OF_SWIFTNESS] = new Upgrade(game, BOOTS_OF_SPEED,        40000, 5, 0, 2, 0, 0, 0, [],
    function(game) {
      game.upgradeStats.chimeBonus += 0.05;
    },
    function(game) {
      game.upgradeStats.chimeBonus -= 0.05;
    }
  );
  upgrades[NINJA_TABI] = new Upgrade(game, BOOTS_OF_SPEED,                1000000, 7, 0, 3, 0, 0, 0, [],
    function(game) {
      game.upgradeStats.chimeClickPercent += 0.05;
    },
    function(game) {
      game.upgradeStats.chimeClickPercent -= 0.05;
    }
  );
  upgrades[IONIAN_BOOTS_OF_LUCIDITY] = new Upgrade(game, BOOTS_OF_SPEED,  20000000, 9, 0, 4, 0, 1, 0, [],
    function(game) {
      game.upgradeStats.cooldownReduction += 0.05;
    },
    function(game) {
      game.upgradeStats.cooldownReduction -= 0.05;
    }
  );
  upgrades[BOOTS_OF_MOBILITY] = new Upgrade(game, BOOTS_OF_SPEED,         500000000, 11, 0, 10, 0, 0, 0, [],
    function(game) {
      game.upgradeStats.chimeBonus += 0.1;
      game.upgradeStats.damageBonus -= 0.02;
    },
    function(game) {
      game.upgradeStats.chimeBonus -= 0.1;
      game.upgradeStats.damageBonus += 0.02;
    }
  );
  upgrades[MERCURYS_TREADS] = new Upgrade(game, BOOTS_OF_SPEED,           12000000000, 13, 45, 10, 0, 0, 0, [],
    function(game) {
      game.upgradeStats.flashBonus += 0.3;
    },
    function(game) {
      game.upgradeStats.flashBonus -= 0.3;
    }
  );
  upgrades[SORCERERS_SHOES] = new Upgrade(game, BOOTS_OF_SPEED,           400000000000, 15, 0, 10, 200, 0, 0, [],
    function(game) {
      game.upgradeStats.damageBonus += 0.025;
    },
    function(game) {
      game.upgradeStats.damageBonus -= 0.025;
    }
  );
  upgrades[BERSERKERS_GREAVES] = new Upgrade(game, BOOTS_OF_SPEED,        10000000000000, 17, 0, 10, 0, 4, 0, [],
    function(game) {
      game.upgradeStats.monsterClickPercent += 0.03;
    },
    function(game) {
      game.upgradeStats.monsterClickPercent -= 0.03;
    }
  );

  // Ruby Crystal /////////////////////////////////////////
  upgrades[CRYSTALLINE_BRACER] = new Upgrade(game, RUBY_CRYSTAL,          80000, 5, 15, 0, 0, 0, 0, [],
    function(game) {
      game.upgradeStats.chimeClickBonus += 0.3;
    },
    function(game) {
      game.upgradeStats.chimeClickBonus -= 0.3;
    }
  );
  upgrades[KINDLEGEM] = new Upgrade(game, RUBY_CRYSTAL,                   1000000, 7, 15, 0, 0, 1, 0, [],
    function(game) {
      game.upgradeStats.cooldownReduction += 0.05;
    },
    function(game) {
      game.upgradeStats.cooldownReduction -= 0.05;
    }
  );
  upgrades[GIANTS_BELT] = new Upgrade(game, RUBY_CRYSTAL,                 35000000, 9, 40, 0, 0, 0, 0, [],
    function(game) {
      game.upgradeStats.chimeBonus += 0.05;
    },
    function(game) {
      game.upgradeStats.chimeBonus -= 0.05;
    }
  );
  upgrades[WARMOGS_ARMOR] = new Upgrade(game, RUBY_CRYSTAL,               750000000, 11, 70, 0, 0, 0, 0, [GIANTS_BELT],
    function(game) {
      game.upgradeStats.warmogBonus += 0.1;
    },
    function(game) {
      game.upgradeStats.warmogBonus -= 0.1;
    }
  );
  upgrades[RIGHTEOUS_GLORY] = new Upgrade(game, RUBY_CRYSTAL,             18000000000, 13, 70, 5, 0, 0, 0, [CRYSTALLINE_BRACER],
    function(game) {
      game.upgradeStats.ghostBonus += 0.5;
    },
    function(game) {
      game.upgradeStats.ghostBonus -= 0.5;
    }
  );
  upgrades[SPIRIT_VISAGE] = new Upgrade(game, RUBY_CRYSTAL,               600000000000, 15, 120, 0, 0, 4, 0, [KINDLEGEM],
    function(game) {
      game.upgradeStats.healBonus += 1;
    },
    function(game) {
      game.upgradeStats.healBonus -= 1;
    }
  );
  upgrades[FROZEN_MALLET] = new Upgrade(game, RUBY_CRYSTAL,               15000000000000, 17, 160, 0, 200, 0, 0, [GIANTS_BELT],
    function(game) {
      game.upgradeStats.frozenBonus += 0.05;
    },
    function(game) {
      game.upgradeStats.frozenBonus -= 0.05;
    }
  );

  // Amplifying Tome //////////////////////////////////////
  upgrades[FIENDISH_CODEX] = new Upgrade(game, AMPLIFYING_TOME,           300000, 6, 0, 0, 50, 1, 0, [],
    function(game) {
      game.upgradeStats.cooldownReduction += 0.05;
    },
    function(game) {
      game.upgradeStats.cooldownReduction -= 0.05;
    }
  );
  upgrades[AETHER_WISP] = new Upgrade(game, AMPLIFYING_TOME,              7500000, 8, 0, 2, 100, 0, 0, [],
    function(game) {
      game.upgradeStats.chimeBonus += 0.05;
    },
    function(game) {
      game.upgradeStats.chimeBonus -= 0.05;
    }
  );
  upgrades[NEEDLESSLY_LARGE_ROD] = new Upgrade(game, AMPLIFYING_TOME,     150000000, 10, 0, 0, 200, 0, 0, [],
    function(game) {
      game.upgradeStats.monsterClickBonus += 0.3;
    },
    function(game) {
      game.upgradeStats.monsterClickBonus -= 0.3;
    }
  );
  upgrades[MORELLONOMICON] = new Upgrade(game, AMPLIFYING_TOME,           4000000000, 12, 0, 0, 200, 4, 0, [FIENDISH_CODEX],
    function(game) {
      game.upgradeStats.morelloBonus += 0.04;
    },
    function(game) {
      game.upgradeStats.morelloBonus -= 0.04;
    }
  );
  upgrades[LUDENS_ECHO] = new Upgrade(game, AMPLIFYING_TOME,              75000000000, 14, 0, 3, 250, 0, 0, [NEEDLESSLY_LARGE_ROD],
    function(game) {
    },
    function(game) {
    }
  );
  upgrades[RYLAIS_CRYSTAL_SCEPTER] = new Upgrade(game, AMPLIFYING_TOME,   2000000000000, 16, 50, 0, 350, 0, 0, [NEEDLESSLY_LARGE_ROD],
    function(game) {
      game.upgradeStats.exhaustBonus += 0.5;
    },
    function(game) {
      game.upgradeStats.exhaustBonus -= 0.5;
    }
  );
  upgrades[RABADONS_DEATHCAP] = new Upgrade(game, AMPLIFYING_TOME,        40000000000000, 18, 0, 0, 800, 0, 0, [NEEDLESSLY_LARGE_ROD],
    function(game) {
      game.upgradeStats.rabadonBonus += 0.1;
    },
    function(game) {
      game.upgradeStats.rabadonBonus -= 0.1;
    }
  );

  // Dagger ///////////////////////////////////////////////
  upgrades[RECURVE_BOW] = new Upgrade(game, DAGGER,                       350000, 6, 0, 0, 0, 2, 0, [],
    function(game) {
      game.upgradeStats.damageBonus += 0.02;
    },
    function(game) {
      game.upgradeStats.damageBonus -= 0.02;
    }
  );
  upgrades[RUNAANS_HURRICANE] = new Upgrade(game, DAGGER,                 9000000, 8, 0, 0, 30, 3, 0, [RECURVE_BOW],
    function(game) {
      game.upgradeStats.monsterClickPercent += 0.03;
    },
    function(game) {
      game.upgradeStats.monsterClickPercent -= 0.03;
    }
  );
  upgrades[ZEAL] = new Upgrade(game, DAGGER,                              450000000, 10, 0, 3, 0, 4, 0, [],
    function(game) {
      game.upgradeStats.chimeBonus += 0.05;
    },
    function(game) {
      game.upgradeStats.chimeBonus -= 0.05;
    }
  );
  upgrades[WITS_END] = new Upgrade(game, DAGGER,                          9000000000, 12, 50, 0, 60, 5, 0, [RECURVE_BOW],
    function(game) {
    },
    function(game) {
    }
  );
  upgrades[STATIKK_SHIV] = new Upgrade(game, DAGGER,                      150000000000, 14, 0, 3, 90, 5, 0, [ZEAL],
    function(game) {
    },
    function(game) {
    }
  );
  upgrades[PHANTOM_DANCER] = new Upgrade(game, DAGGER,                    4500000000000, 16, 0, 4, 0, 10, 0, [ZEAL],
    function(game) {
      game.upgradeStats.chimeClickPercent += 0.05;
    },
    function(game) {
      game.upgradeStats.chimeClickPercent -= 0.05;
    }
  );
  upgrades[TRINITY_FORCE] = new Upgrade(game, DAGGER,                     100000000000000, 18, 100, 5, 220, 20, 0, [ZEAL],
    function(game) {
      game.upgradeStats.chimeBonus += 0.02;
      game.upgradeStats.damageBonus += 0.01;
      game.upgradeStats.cooldownReduction += 0.05;
    },
    function(game) {
      game.upgradeStats.chimeBonus -= 0.02;
      game.upgradeStats.damageBonus -= 0.01;
      game.upgradeStats.cooldownReduction -= 0.05;
    }
  );

  return upgrades;
};

Upgrade.CreateStatsObject = function() {
  var obj = {};

  obj.goldBonus = 1;
  obj.priceBonus = 1;

  obj.chimeBonus = 1;
  obj.damageBonus = 1;

  obj.chimeClickBonus = 0;
  obj.monsterClickBonus = 0;

  obj.chimeClickPercent = 0;
  obj.monsterClickPercent = 0;

  obj.cooldownReduction = 0;

  obj.flashBonus = 1;
  obj.healBonus = 1;
  obj.ghostBonus = 1;
  obj.exhaustBonus = 1;

  obj.warmogBonus = 1;
  obj.warmogTimer = null;

  obj.frozenBonus = 1;
  obj.morelloBonus = 1;
  obj.rabadonBonus = 1;

  obj.ludenCount = 0;
  obj.statikkCount = 0;
  obj.witCount = 0;
  obj.witTimer = null;

  return obj;
};
