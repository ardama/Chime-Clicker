var Rune = function(game, type, name, tier, difficulty, apply, tooltip) {
  this.Init(game, type, name, tier, difficulty, apply, tooltip);
};

Rune.prototype.Init = function(game, type, name, tier, difficulty, apply, tooltip) {
  this.game = game;
  this.type = type;
  this.name = name;
  this.tier = tier;
  this.difficulty = difficulty;
  this.apply = apply;
  this.tooltip = tooltip;

  this.fullName = type.capitalize() + ' of ' + name;
  this.cost = RUNE_PRICES[difficulty] * Math.pow(10, tier - 1) * (type == QUINT ? 3 : 1);
  this.status = LOCKED;
  this.purchased = 0;
  this.count = 0;
  this.image = Rune.GetImageName(this);
  this.unlock = function(game) {return DIFFICULTIES.indexOf(game.difficulty) >= DIFFICULTIES.indexOf(this.difficulty)};
};

Rune.prototype.getLockedText = function() {
  return "Unlock by completing <b>" + this.difficulty.capitalize() + "</b>";
};

Rune.GetImageName = function(rune) {
  var s = '';
  if (rune.type == MARK) {
    s += 'r_';
    if (rune.difficulty == 'medium') s += '1_';
    else if (rune.difficulty == 'hard') s += '2_';
    else if (rune.difficulty == 'marathon') s += '4_';
  }
  else if (rune.type == SEAL) {
    s += 'y_';
    if (rune.difficulty == 'medium') s += '1_';
    else if (rune.difficulty == 'hard') s += '2_';
    else if (rune.difficulty == 'marathon') s += '3_';
  }
  else if (rune.type == GLYPH) {
    s += 'b_';
    if (rune.difficulty == 'medium') s += '3_';
    else if (rune.difficulty == 'hard') s += '1_';
    else if (rune.difficulty == 'marathon') s += '2_';
  }
  else if (rune.type == QUINT) {
    s += 'bl_';
    if (rune.difficulty == 'hard') s += '3_';
    else if (rune.difficulty == 'marathon') s += '2_';
    else if (rune.difficulty == 'impossible') s += '1_';
  }

  s += rune.tier;
  return s;
};

Rune.CreateSet = function(game, type, name, difficulty, applyFunc, tooltipFunc) {
  var set = {};
  for (var i = 1 ; i <= 3; i++)
    set[i] = new Rune(game, type, name, i, difficulty, applyFunc(i), tooltipFunc(i));

  return set;
};

Rune.Create = function(game) {
  var runes = {};

  // Marks
  var marks = {};
  marks[DAMAGE] = Rune.CreateSet(game, MARK, DAMAGE, 'medium',
    function(i) {return function(game) {game.runeDamage += this.count * 10 * i}},
    function(i) {return function(game) {return this.status == LOCKED ? this.getLockedText() :
    "+" + 10 * i + " Damage";}}
  );
  marks[ATTACKRATE] = Rune.CreateSet(game, MARK, ATTACKRATE, 'medium',
    function(i) {return function(game) {game.runeAttackrate += this.count * .5 * i}},
    function(i) {return function(game) {return this.status == LOCKED ? this.getLockedText() :
    "+" + .5 * i + " Attack Rate";}}
  );
  marks[MONSTER_CLICKING] = Rune.CreateSet(game, MARK, MONSTER_CLICKING, 'medium',
    function(i) {return function(game) {game.runeMonsterClicking += this.count * .03 * i}},
    function(i) {return function(game) {return this.status == LOCKED ? this.getLockedText() :
    "+" + 3 * i + "% Damage per click";}}
  );
  marks[SCALING_DAMAGE] = Rune.CreateSet(game, MARK, SCALING_DAMAGE, 'hard',
    function(i) {return function(game) {game.runeScalingDamage += this.count * .01 * i}},
    function(i) {return function(game) {return this.status == LOCKED ? this.getLockedText() :
    "+" + 1 * i + "% Damage";}}
  );
  marks[SCALING_ATTACKRATE] = Rune.CreateSet(game, MARK, SCALING_ATTACKRATE, 'hard',
    function(i) {return function(game) {game.runeScalingAttackrate += this.count * .01 * i}},
    function(i) {return function(game) {return this.status == LOCKED ? this.getLockedText() :
    "+" + 1 * i + "% Attack Rate";}}
  );
  marks[PENETRATION] = Rune.CreateSet(game, MARK, PENETRATION, 'marathon',
    function(i) {return function(game) {game.runePenetration += this.count * .02 * i}},
    function(i) {return function(game) {return this.status == LOCKED ? this.getLockedText() :
    "+" + 2 * i + "% Damage to champions";}}
  );
  runes[MARK] = marks;

  // Seals
  var seals = {};
  seals[MOVESPEED] = Rune.CreateSet(game, SEAL, MOVESPEED, 'medium',
    function(i) {return function(game) {game.runeMovespeed += this.count * .5 * i}},
    function(i) {return function(game) {return this.status == LOCKED ? this.getLockedText() :
    "+" + .5 * i + " Move Speed";}}
  );
  seals[GOLD] = Rune.CreateSet(game, SEAL, GOLD, 'medium',
    function(i) {return function(game) {game.runeGold += this.count * 300 * i}},
    function(i) {return function(game) {return this.status == LOCKED ? this.getLockedText() :
    "+" + 300 * i + " Starting gold";}}
  );
  seals[CHIME_CLICKING] = Rune.CreateSet(game, SEAL, CHIME_CLICKING, 'medium',
    function(i) {return function(game) {game.runeChimeClicking += this.count * .03 * i}},
    function(i) {return function(game) {return this.status == LOCKED ? this.getLockedText() :
    "+" + 3 * i + "% Chimes per click";}}
  );
  seals[SCALING_DEFENSE] = Rune.CreateSet(game, SEAL, SCALING_DEFENSE, 'hard',
    function(i) {return function(game) {game.runeScalingDefense += this.count * .015 * i}},
    function(i) {return function(game) {return this.status == LOCKED ? this.getLockedText() :
    "+" + 1.5 * i + "% Defense";}}
  );
  seals[SCALING_MOVESPEED] = Rune.CreateSet(game, SEAL, SCALING_MOVESPEED, 'hard',
    function(i) {return function(game) {game.runeScalingMovsSpeed += this.count * .015 * i}},
    function(i) {return function(game) {return this.status == LOCKED ? this.getLockedText() :
    "+" + 1.5 * i + "% Move Speed";}}
  );
  seals[SCALING_GOLD] = Rune.CreateSet(game, SEAL, SCALING_GOLD, 'marathon',
    function(i) {return function(game) {game.runeScalingGold += this.count * .01 * i}},
    function(i) {return function(game) {return this.status == LOCKED ? this.getLockedText() :
    "+" + 1 * i + "% Gold earned";}}
  );
  runes[SEAL] = seals;

  // Glyphs;
  var glyphs = {};
  glyphs[SCALING_DAMAGE] = Rune.CreateSet(game, GLYPH, SCALING_DAMAGE, 'medium',
    function(i) {return function(game) {game.runeScalingDamage += this.count * .01 * i}},
    function(i) {return function(game) {return this.status == LOCKED ? this.getLockedText() :
    "+" + 1 * i + "% Damage";}}
  );
  glyphs[DEFENSE] = Rune.CreateSet(game, GLYPH, DEFENSE, 'medium',
    function(i) {return function(game) {game.runeDefense += this.count * 4 * i}},
    function(i) {return function(game) {return this.status == LOCKED ? this.getLockedText() :
    "+" + 4 * i + " Defense";}}
  );
  glyphs[COOLDOWN_REDUCTION] = Rune.CreateSet(game, GLYPH, COOLDOWN_REDUCTION, 'medium',
    function(i) {return function(game) {game.runeCooldownReduction += this.count * (.005 + .005 * i)}},
    function(i) {return function(game) {return this.status == LOCKED ? this.getLockedText() :
    "+" + (.5 + .5 * i) + "% Cooldown Reduction";}}
  );
  glyphs[SCALING_DEFENSE] = Rune.CreateSet(game, GLYPH, SCALING_DEFENSE, 'hard',
    function(i) {return function(game) {game.runeScalingDefense += this.count * .01 * i}},
    function(i) {return function(game) {return this.status == LOCKED ? this.getLockedText() :
    "+" + 1 * i + "% Defense";}}
  );
  glyphs[CLICKING] = Rune.CreateSet(game, GLYPH, CLICKING, 'hard',
    function(i) {return function(game) {game.runeChimeClicking += this.count * .03 * i; game.runeMonsterClicking += this.count * .03 * i}},
    function(i) {return function(game) {return this.status == LOCKED ? this.getLockedText() :
    "+" + 3 * i + "% Damage/Chimes per click";}}
  );
  glyphs[SCALING_COOLDOWN_REDUCTION] = Rune.CreateSet(game, GLYPH, SCALING_COOLDOWN_REDUCTION, 'marathon',
    function(i) {return function(game) {game.runeScalingCooldownReduction += this.count * (.01 + .005 * i)}},
    function(i) {return function(game) {return this.status == LOCKED ? this.getLockedText() :
    "+" + (1 + .5 * i) + "% Cooldown Reduction at max level";}}
  );
  runes[GLYPH] = glyphs;

  // Quints
  var quints = {};
  quints[SCALING_ATTACKRATE] = Rune.CreateSet(game, QUINT, SCALING_ATTACKRATE, 'hard',
    function(i) {return function(game) {game.runeScalingAttackrate += this.count * .02 * i}},
    function(i) {return function(game) {return this.status == LOCKED ? this.getLockedText() :
    "+" + 2 * i + "% Attack Rate";}}
  );
  quints[SCALING_MOVESPEED] = Rune.CreateSet(game, QUINT, SCALING_MOVESPEED, 'hard',
    function(i) {return function(game) {game.runeScalingMovespeed += this.count * .03 * i}},
    function(i) {return function(game) {return this.status == LOCKED ? this.getLockedText() :
    "+" + 3 * i + "% Move Speed";}}
  );
  quints[CLICKING] = Rune.CreateSet(game, QUINT, CLICKING, 'hard',
    function(i) {return function(game) {game.runeChimeClicking += this.count * .06 * i; game.runeMonsterClicking += this.count * .06 * i}},
    function(i) {return function(game) {return this.status == LOCKED ? this.getLockedText() :
    "+" + 6 * i + "% Damage and Chimes per click";}}
  );
  quints[PENETRATION] = Rune.CreateSet(game, QUINT, PENETRATION, 'marathon',
    function(i) {return function(game) {game.runePenetration += this.count * .04 * i}},
    function(i) {return function(game) {return this.status == LOCKED ? this.getLockedText() :
    "+" + 4 * i + "% Damage to champions";}}
  );
  quints[SCALING_GOLD] = Rune.CreateSet(game, QUINT, SCALING_GOLD, 'marathon',
    function(i) {return function(game) {game.runeScalingGold += this.count * .02 * i}},
    function(i) {return function(game) {return this.status == LOCKED ? this.getLockedText() :
    "+" + 2 * i + "% Gold earned";}}
  );
  quints[COOLDOWN_REDUCTION] = Rune.CreateSet(game, QUINT, COOLDOWN_REDUCTION, 'marathon',
    function(i) {return function(game) {game.runeCooldownReduction += this.count * (.01 + .01 * i)}},
    function(i) {return function(game) {return this.status == LOCKED ? this.getLockedText() :
    "+" + (1 + 1 * i) + "% Cooldown Reduction";}}
  );
  quints[TEEMO_SLAYER] = Rune.CreateSet(game, QUINT, TEEMO_SLAYER, 'impossible',
    function(i) {return function(game) {game.runeTeemoSlayer += this.count * .06 * i}},
    function(i) {return function(game) {return this.status == LOCKED ? this.getLockedText() :
    "+" + 6 * i + "% Damage to Teemo";}}
  );
  runes[QUINT] = quints;

  return runes;
};
