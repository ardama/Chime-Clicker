var Spell = function (game, duration, cooldown, type, target, start, end, unlock, tooltip) {
  this.Init(game, duration, cooldown, type, target, start, end, unlock, tooltip);
};
Spell.prototype.Init = function (game, duration, cooldown, type, target, start, end, unlock, tooltip) {
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
Spell.prototype.getSpellTime = function () {
  var time = 0;
  if (this.status == ACTIVE)
    time = this.durationLeft;
  else if (this.status == COOLDOWN)
    time = this.cooldownLeft;
  return time > 0 ? time.toFixed(0) : '';
};
Spell.Create = function (game) {
  var spells = {};
  // game, duration, cooldown, start, end, unlock, tooltip
  spells[SMITE] = new Spell(game, 0, 60, SPELL_ACTIVE, MONSTER_ALL, function (game) {
    if (!game.isMonsterChampion(game.monster)) {
      game.smiteBonus = 0.2;
      game.addDamage(game.getSmiteDamage(), true);
      showRing(SMITE, RING_DURATION);
      game.smiteBonus = 0;
      this.duration = 0;
    } else {
      game.smiteDamageRate = game.getSmiteDamage() / 5;
      showRing(CHALLENGING_SMITE, RING_DURATION);
      this.duration = 5;
    }
  }, function (game) {
    game.smiteDamageRate = 0;
  }, function (game) {
    return game.level >= 2;
  }, function (game) {
    return this.status == LOCKED ? '' : 'Deal <b>' + prettyIntBigCompact(game.getSmiteDamage()) + '</b> damage ' + (!game.isMonsterChampion(game.monster) ? 'instantly' : 'over 5 seconds') + '.  Damage scales with level and experience.</br></br>Non-champion kills with smite grant +20% gold.</br></br>' + Math.round(this.cooldown) + ' second cooldown. <b>(Q)</b>';
  });
  spells[GHOST] = new Spell(game, 10, 90, SPELL_ACTIVE, MONSTER_ALL, function (game) {
    game.ghostBonus = 2;
  }, function (game) {
    game.ghostBonus = 1;
  }, function (game) {
    return game.level >= 4;
  }, function (game) {
    return this.status == LOCKED ? '' : '+100% chime gathering for 10 seconds.  </br></br>' + Math.round(this.cooldown) + ' second cooldown. <b>(W)</b>';
  });
  spells[HEAL] = new Spell(game, 5, 120, SPELL_ACTIVE, MONSTER_ALL, function (game) {
    game.healBonus = 5;
    game.updateStats();
  }, function (game) {
    game.healBonus = 1;
  }, function (game) {
    return game.level >= 6;
  }, function (game) {
    return this.status == LOCKED ? '' : '5x chimes per click for 5 seconds.</br></br>' + Math.round(this.cooldown) + ' second cooldown. <b>(E)</b>';
  });
  spells[FLASH] = new Spell(game, 0, 180, SPELL_ACTIVE, MONSTER_ALL, function (game) {
    game.addMeeps(Math.ceil(game.meepsEarned * game.flashBonus), true);
    showRing(FLASH, RING_DURATION);
  }, function (game) {
  }, function (game) {
    return game.level >= 10;
  }, function (game) {
    return this.status == LOCKED ? '' : '+3% meeps earned from chimes.</br>(<b>' + prettyIntBigCompact(Math.ceil(game.meepsEarned * game.flashBonus)) + '</b>)</br></br>' + Math.round(this.cooldown) + ' second cooldown. <b>(R)</b>';
  });
  spells[TELEPORT] = new Spell(game, 0, 300, SPELL_ACTIVE, MONSTER_ALL, function (game) {
  }, function (game) {
    var cooldownSpells = game.getObjectsByStatus(game.spells, COOLDOWN);
    var len = cooldownSpells.length;
    var spell, i;
    for (i = 0; i < len; i++) {
      spell = game.spells[cooldownSpells[i]];
      spell.cooldownLeft = 0;
      spell.status = AVAILABLE;
    }
    var activeSpells = game.getObjectsByStatus(game.spells, ACTIVE);
    len = activeSpells.length;
    for (i = 0; i < len; i++) {
      spell = game.spells[activeSpells[i]];
      spell.durationLeft += spell.duration;
    }
  }, function (game) {
    return game.level >= 13;
  }, function (game) {
    return this.status == LOCKED ? '' : 'Reset cooldowns of all spells.  </br></br>' + Math.round(this.cooldown) + ' second cooldown. <b>(T)</b>';
  });
  spells[EXHAUST] = new Spell(game, 10, 90, SPELL_ACTIVE, MONSTER_CHAMPION, function (game) {
    game.exhaustBonus = 2;
  }, function (game) {
    game.exhaustBonus = 1;
  }, function (game) {
    return game.level >= 16;
  }, function (game) {
    return this.status == LOCKED ? '' : '+100% damage dealt for 10 seconds.  Only works against champions.  </br></br>' + Math.round(this.cooldown) + ' second cooldown. <b>(Y)</b>';
  });
  spells[IGNITE] = new Spell(game, 0, 120, SPELL_ACTIVE, MONSTER_ALL, function (game) {
    game.igniteBonus += 0.05;
    game.updateStats();
    showRing(IGNITE + '1', RING_DURATION);
  }, function (game) {
    showRing(IGNITE + '2', RING_DURATION);
  }, function (game) {
    return game.level >= 17;
  }, function (game) {
    return this.status == LOCKED ? '' : '+5% damage from items.</br>(<b>' + prettyIntBigCompact(Math.ceil(game.damageBought * 0.05)) + '</b>)</br></br>' + Math.round(this.cooldown) + ' second cooldown. <b>(U)</b>';
  });
  spells[SPOILS_OF_WAR] = new Spell(game, 0, 45, SPELL_PASSIVE, MONSTER_JUNGLE, function (game) {
    game.spoilsOfWarActive = 1;
    game.killMonster();
    game.spoilsOfWarActive = 0;
    showRing(SPOILS_OF_WAR, RING_DURATION);
  }, function (game) {
  }, function (game) {
    return game.upgrades[FACE_OF_THE_MOUNTAIN].status == PURCHASED;
  }, function (game) {
    return this.status == LOCKED ? '' : 'Execute monsters below 25% max health on click, gaining <b>+' + (game.spoilsOfWarBonus * 100).toFixed(1) + '%</b> reward gold.  Gold scales with Relic Shields owned.  Does not work against champions. </br></br>' + Math.round(this.cooldown) + ' second cooldown.';
  });
  spells[FAVOR] = new Spell(game, 0, 0, SPELL_PASSIVE, MONSTER_ALL, function (game) {
  }, function (game) {
  }, function (game) {
    return game.upgrades[TALISMAN_OF_ASCENSION].status == PURCHASED;
  }, function (game) {
    return game.spells[FAVOR].status == LOCKED ? '' : 'Passively gain <b>+' + (game.favorBonus * 100).toFixed(1) + '%</b> gold from kills.  Gold scales with Ancient Coins owned. </br></br>No cooldown.';
  });
  spells[TRIBUTE] = new Spell(game, 0, 30, SPELL_PASSIVE, MONSTER_ALL, function (game) {
    var monster = game.monsters[game.monster];
    var gold = Math.ceil(monster.gold * game.tributeBonus);
    gold /= game.monster == TEEMO ? 15 : 1;
    game.addGold(gold);
    game.progress.spells[TRIBUTE].goldGained += gold;
    if (monster.type == MONSTER_CHAMPION) {
      game.addDamage(game.damageStat * game.attackrateStat * game.exhaustBonus * 5);
    }
    showRing(TRIBUTE, RING_DURATION);
  }, function (game) {
  }, function (game) {
    return game.upgrades[FROST_QUEENS_CLAIM].status == PURCHASED;
  }, function (game) {
    if (this.status == LOCKED)
      return '';
    else if (game.monster == TEEMO)
      return 'Gain <b>' + (game.tributeBonus * 100 / 15).toFixed(1) + '%</b> of reward gold on next Teemo click.  Gold scales with Spellthief\'s Edges owned.</br></br>Deals <b>' + prettyIntBigCompact(game.damageStat * game.attackrateStat * game.exhaustBonus * 5, 1) + '</b> bonus damage (scales with DPS).</br></br>' + Math.round(this.cooldown) + ' second cooldown.';
    else
      return 'Gain <b>' + (game.tributeBonus * 100).toFixed(1) + '%</b> of reward gold on next monster click.  Gold scales with Spellthief\'s Edges owned.</br></br>Deals <b>' + prettyIntBigCompact(game.damageStat * game.attackrateStat * game.exhaustBonus * 5, 1) + '</b> bonus damage to champions (scales with DPS).</br></br>' + Math.round(this.cooldown) + ' second cooldown.';
  });
  return spells;
};
