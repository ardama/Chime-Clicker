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

Monster.Create = function(game) {
  var monsters = {};
  var monster;
  var baseHealth;
  var scaleHealth;
  var totalHealth;
  var scaleExp;
  var scaleReward;
  var type;
  var i;
  var len = MONSTERS.length;
  for (i = 0; i < len; i++) {
    monster = MONSTERS[i];
    baseHealth = MONSTER_HEALTH + 12 * Math.pow(i, 2) + 25 * i;
    scaleHealth = Math.pow(game.scaleMonsterLevelHealth, i);
    totalHealth = Math.floor(baseHealth * scaleHealth);
    scaleExp = Math.pow(SCALE_MONSTER_LEVEL_REWARD, i);
    scaleReward = Math.pow(SCALE_MONSTER_LEVEL_REWARD, i);
    if (i == len - 1) {
      var health = totalHealth * 15;
      var healthPower = Math.floor(getBaseLog(10, health));
      var newHealth = Math.pow(10, healthPower) * (1.11111).toFixed(2 + healthPower % 3);
      newHealth = Math.ceil(health / newHealth) * newHealth;

      totalHealth =  newHealth;
      scaleExp = 999990000000000000 / MONSTER_EXPERIENCE;
      scaleReward = 999990000000000 / MONSTER_REWARD;
    }

    type = game.isMonsterChampion(monster) ? MONSTER_CHAMPION : MONSTER_JUNGLE;
    monsters[monster] = new Monster(game, i + 1, totalHealth,
                                                 MONSTER_EXPERIENCE * scaleExp + 10 * (i + 1),
                                                 MONSTER_REWARD * scaleReward + 10 * (i + 1),
                                                 type);
  }
  return monsters;
};
