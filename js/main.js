var version = "0.4.0"

///// CONSTANTS ////////////////////
// Items
var BOOTS_OF_SPEED = "Boots of Speed";
var ANCIENT_COIN = "Ancient Coin";
var SPELLTHIEFS_EDGE = "Spellthief's Edge";
var RELIC_SHIELD = "Relic Shield";
var AMPLIFYING_TOME = "Amplifying Tome";
var RUBY_CRYSTAL = "Ruby Crystal";
var DAGGER = "Dagger";

var INDEX_TO_ITEM = [BOOTS_OF_SPEED, ANCIENT_COIN, SPELLTHIEFS_EDGE, RELIC_SHIELD, AMPLIFYING_TOME, RUBY_CRYSTAL, DAGGER];
var ITEM_TO_INDEX = {};
for (var i = 0; i < INDEX_TO_ITEM.length; i++) {
  ITEM_TO_INDEX[INDEX_TO_ITEM[i]] = i;
}

// Item Upgrades
var BOOTS_OF_SWIFTNESS = "Boots of Swiftness";
var BOOTS_OF_MOBILITY = "Boots of Mobility";
var IONIAN_BOOTS_OF_LUCIDITY = "Ionian Boots of Lucidity";
var SORCERERS_SHOES = "Sorcerer's Shoes";
var MERCURYS_TREADS = "Mercury's Treads";
var NOMADS_MEDALLION = "Nomad's Medallion";
var TALISMAN_OF_ASCENSION = "Talisman of Ascension";
var FROSTFANG = "Frostfang";
var FROST_QUEENS_CLAIM = "Frost Queen's Claim";
var TARGONS_BRACE = "Targon's Brace";
var FACE_OF_THE_MOUNTAIN = "Face of the Mountain";
var NEEDLESSLY_LARGE_ROD = "Needlessly Large Rod";
var RABADONS_DEATHCAP = "Rabadon's Deathcap";
var LUDENS_ECHO = "Luden's Echo";
var ZHONYAS_HOURGLASS = "Zhonya's Hourglass";
var FIENDISH_CODEX = "Fiendish Codex";
var MORELLONOMICON = "Morellonomicon";
var AETHER_WISP = "Aether Wisp";
var KINDLEGEM = "Kindlegem";
var LOCKET_OF_THE_IRON_SOLARI = "Locket of the Iron Solari";
var GIANTS_BELT = "Giant's Belt";
var WARMOGS_ARMOR = "Warmog's Armor";
var FROZEN_MALLET = "Frozen Mallet";
var CRYSTALLINE_BRACER = "Crystalline Bracer";
var RIGHTEOUS_GLORY = "Righteous Glory";
var RECURVE_BOW = "Recurve Bow";
var RUNAANS_HURRICANE = "Runaan's Hurricane";
var WITS_END = "Wit's End";
var ZEAL = "Zeal";
var STATIKK_SHIV = "Statikk Shiv";
var PHANTOM_DANCER = "Phantom Dancer";
var TRINITY_FORCE = "Trinity Force";

var INDEX_TO_UPGRADE = [BOOTS_OF_SWIFTNESS, BOOTS_OF_MOBILITY, IONIAN_BOOTS_OF_LUCIDITY,
                        SORCERERS_SHOES, MERCURYS_TREADS, NOMADS_MEDALLION, TALISMAN_OF_ASCENSION,
                        FROSTFANG, FROST_QUEENS_CLAIM, TARGONS_BRACE, FACE_OF_THE_MOUNTAIN,
                        NEEDLESSLY_LARGE_ROD, RABADONS_DEATHCAP, LUDENS_ECHO, ZHONYAS_HOURGLASS,
                        FIENDISH_CODEX, MORELLONOMICON, AETHER_WISP, KINDLEGEM, LOCKET_OF_THE_IRON_SOLARI,
                        GIANTS_BELT, WARMOGS_ARMOR, FROZEN_MALLET, CRYSTALLINE_BRACER, RIGHTEOUS_GLORY,
                        RECURVE_BOW, RUNAANS_HURRICANE, WITS_END, ZEAL, STATIKK_SHIV,
                        PHANTOM_DANCER, TRINITY_FORCE];
var UPGRADE_TO_INDEX = {};
for (var i = 0; i < INDEX_TO_UPGRADE.length; i++) {
  UPGRADE_TO_INDEX[INDEX_TO_UPGRADE[i]] = i;
}

// Spells
var FLASH = "Flash";
var GHOST = "Ghost";
var BARRIER = "Barrier";
var HEAL = "Heal";
var SMITE = "Smite";
var CHALLENGING_SMITE = "Challenging Smite";
var IGNITE = "Ignite";
var EXHAUST = "Exhaust";
var CLEANSE = "Cleanse";
var TELEPORT = "Teleport";
var FAVOR = "Favor";
var SPOILS_OF_WAR = "Spoils of War"
var TRIBUTE = "Tribute";

var INDEX_TO_SPELL = [FLASH, GHOST, BARRIER, HEAL, SMITE, CHALLENGING_SMITE, IGNITE,
                      EXHAUST, CLEANSE, TELEPORT, FAVOR, SPOILS_OF_WAR, TRIBUTE];
var SPELL_TO_INDEX = {};
for (var i = 0; i < INDEX_TO_SPELL.length; i++) {
  SPELL_TO_INDEX[INDEX_TO_SPELL[i]] = i;
}

// Monsters
var CASTER_MINION = "Caster Minion";
var RIFT_SCUTTLER = "Rift Scuttler";
var MELEE_MINION = "Melee Minion";
var CANNON_MINION = "Cannon Minion";
var RAZORBEAK = "Razorbeak";
var MURK_WOLF = "Murk Wolf";
var KRUG = "Krug";
var GROMP = "Gromp";
var BLUE_SENTINEL = "Blue Sentinel";
var RED_BRAMBLEBACK = "Red Brambleback";
var SUPER_MINION = "Super Minion";
var RIFT_HERALD = "Rift Herald";
var DRAGON = "Dragon";
var VILEMAW = "Vilemaw";
var BARON_NASHOR = "Baron Nashor";
var CHO_GATH = "Cho'Gath";
var DR_MUNDO = "Dr. Mundo";
var SION = "Sion";
var TEEMO = "Teemo";

var INDEX_TO_MONSTER = [CASTER_MINION, RIFT_SCUTTLER, MELEE_MINION, CANNON_MINION, RAZORBEAK,
                        MURK_WOLF, KRUG, GROMP, BLUE_SENTINEL, RED_BRAMBLEBACK, SUPER_MINION,
                        RIFT_HERALD, DRAGON, VILEMAW, BARON_NASHOR, CHO_GATH, DR_MUNDO, SION, TEEMO];
var MONSTER_TO_INDEX = {};
for (var i = 0; i < INDEX_TO_MONSTER.length; i++) {
  MONSTER_TO_INDEX[INDEX_TO_MONSTER[i]] = i;
}

// Spell Types
var SPELL_PASSIVE = "passive";
var SPELL_ACTIVE = "active";

// Monster Types
var MONSTER_JUNGLE = "jungle";
var MONSTER_CHAMPION = "champion"
var MONSTER_ALL = "all";

var INDEX_TO_TYPE = [SPELL_PASSIVE, SPELL_ACTIVE, MONSTER_JUNGLE, MONSTER_CHAMPION, MONSTER_ALL];
var TYPE_TO_INDEX = {};
for (var i = 0; i < INDEX_TO_TYPE.length; i++) {
  TYPE_TO_INDEX[INDEX_TO_TYPE[i]] = i;
}

// Constant Arrays
var MONSTERS = [CASTER_MINION, RIFT_SCUTTLER, MELEE_MINION, CANNON_MINION, RAZORBEAK,
                MURK_WOLF, KRUG, GROMP, BLUE_SENTINEL, RED_BRAMBLEBACK,
                SUPER_MINION, RIFT_HERALD, DRAGON, VILEMAW, BARON_NASHOR,
                CHO_GATH, DR_MUNDO, SION, TEEMO];
var CHAMPIONS = [CHO_GATH, DR_MUNDO, SION, TEEMO];
var IGNORE_PLURALS = [BOOTS_OF_SPEED, BOOTS_OF_SWIFTNESS, BOOTS_OF_MOBILITY, IONIAN_BOOTS_OF_LUCIDITY,
                      SORCERERS_SHOES, MERCURYS_TREADS, SPOILS_OF_WAR];
var SPECIAL_PLURALS = [ZHONYAS_HOURGLASS, LUDENS_ECHO, FIENDISH_CODEX, FLASH];

// Runes
  // Colors
var MARK = "Mark";
var SEAL = "Seal";
var GLYPH = "Glyph";
var QUINT = "Quint";

var INDEX_TO_RUNE_TYPE = [MARK, SEAL, GLYPH, QUINT]
var RUNE_TYPE_TO_INDEX = {};
for (var i = 0; i < INDEX_TO_RUNE_TYPE.length; i++) {
  RUNE_TYPE_TO_INDEX[INDEX_TO_RUNE_TYPE[i]] = i;
}

  // T1
var DEFENSE = "Defense";
var MOVESPEED = "Movement Speed";
var DAMAGE = "Damage";
var ATTACKRATE = "Attack Rate";
var MONSTER_CLICKING = "Monster Clicking";
var CHIME_CLICKING = "Chime Clicking";
var GOLD = "Gold";
var COOLDOWN_REDUCTION = "Cooldown Reduction";
  // T2
var SCALING_DEFENSE = "Scaling Defense";
var SCALING_MOVESPEED = "Scaling Move Speed";
var SCALING_DAMAGE = "Scaling Damage";
var SCALING_ATTACKRATE = "Scaling Attack Rate";
var CLICKING = "Clicking";
  // T3
var PENETRATION = "Penetration";
var SCALING_GOLD = "Scaling Gold";
var SCALING_COOLDOWN_REDUCTION = "Scaling Cooldown Reduction";
  // T4
var TEEMO_SLAYER = "the Teemo Slayer";

var INDEX_TO_RUNE = [DEFENSE, MOVESPEED, DAMAGE, ATTACKRATE, MONSTER_CLICKING, CHIME_CLICKING, GOLD,
                          COOLDOWN_REDUCTION, SCALING_DEFENSE, SCALING_MOVESPEED, SCALING_DAMAGE, SCALING_ATTACKRATE,
                          CLICKING, PENETRATION, SCALING_GOLD, SCALING_COOLDOWN_REDUCTION, TEEMO_SLAYER];
var RUNE_TO_INDEX = {};
for (var i = 0; i < INDEX_TO_RUNE.length; i++) {
  RUNE_TO_INDEX[INDEX_TO_RUNE[i]] = i;
}

var RUNE_PRICES = {'easy' : 4, 'medium' : 4, 'hard' : 6, 'marathon' : 8, 'impossible' : 10};


// Default Values
var STARTING_GOLD = 375;
var CHIMES_PER_MEEP = 7;
var CHIMES_EXPERIENCE = {'easy' : 1, 'medium' : .75, 'hard' : .5, 'marathon' : .25, 'impossible' : 0};
var MEEPS_DAMAGE = {'easy' : 2, 'medium' : 2, 'hard' : 1, 'marathon' : 1, 'impossible' : .5};
var EXPERIENCE_NEEDED = 1250;
var MONSTER_HEALTH = 200;
var MONSTER_EXPERIENCE = 65;
var MONSTER_REWARD = 20;
var POINT_BONUS = {'easy' : 1, 'medium' : 4, 'hard' : 10, 'marathon' : 30, 'impossible' : 100};
var SMITE_PERCENT = {'easy' : .12, 'medium' : .1, 'hard' : .08, 'marathon' : .06, 'impossible' : .04};


var DIFFICULTIES = ['easy', 'medium', 'hard', 'marathon', 'impossible'];

// Scale Values
var SCALE_CHIMES_PER_MEEP = 1.00;
var SCALE_CHIMES_EXPERIENCE = .90;
var SCALE_ITEM_COST = 0.10;
var SCALE_MONSTER_REWARD = 0.00;
var SCALE_MONSTER_HEALTH = 0.02;
var SCALE_MONSTER_LEVEL_REWARD = 5;
var SCALE_MONSTER_LEVEL_HEALTH = {'easy' : 4.4, 'medium' : 4.9, 'hard' : 5.4, 'marathon' : 6.1, 'impossible' : 8.1};
var SCALE_EXPERIENCE_NEEDED = 5;
var SCALE_MEEP_STRENGTH = 1;

// Status Values
var LOCKED = 0;
var AVAILABLE = 1;
var UNAVAILABLE = 2;
var PURCHASED = 3;
var ACTIVE = 4;
var COOLDOWN = 5;

// Calculation Values
var LOG2 = Math.log(2);
var STIRLING_CONST =  Math.log(2 * Math.PI) / 2

///// STYLING ////////////////////
var RING_DURATION = 300;

// update this if style changes
var buttonYMargin = 35;
var buttonXMargin = 45;
var buttonMaxSize = 260;
var buttonOffset = 1; // for press animation

var modal = false;

function updateButtons(force) {
  $('.click-button').each(function() {
    if ( $(this).css('display') != 'none' && !force)
      return;

    $(this).show();

    var $wrapper = $(this).parent();
    var h = $wrapper.parent().height();
    var w = $wrapper.parent().width();

    // ensure margin-top > 35px
    var height = h - 2 * buttonYMargin;
    // ensure margin-left > 45px;
    var width = w - 2 * buttonXMargin;

    var size = Math.min(height, width, buttonMaxSize);

    $(this).height(size);
    $(this).width(size);
  });


  $('.click-button-holder').each(function() {
    if ( $(this).css('display') != 'none' && !force)
      return;

    $(this).show();

    var $wrapper = $(this).parent();
    var h = $wrapper.parent().height();
    var w = $wrapper.parent().width();

    // ensure margin-top > 25px
    var height = h - 2 * buttonYMargin;
    // ensure margin-left > 35px;
    var width = w - 2 * buttonXMargin;

    var size = Math.min(height, width, buttonMaxSize);

    $(this).height(size + 22);
    $(this).width(size + 20);

    $wrapper.css('left', (w - size - 20) / 2);
    $wrapper.css('top', 25 + (h - size - 22) / 2);
  });
};

function updateTooltips(scroll) {
  $('.spell-wrapper, .item-buy').each(function() {
    // TODO: figure out how to position off-screen tooltips properly
    if (scroll) {
      return;
    }
    var newContent = $(this).attr('data-title');
    var oldContent = $(this).tooltipster('content');
    if (newContent != oldContent) {
      if (newContent.length > 0) {
        $(this).tooltipster('enable');
        $(this).tooltipster('content', newContent);
      }
      else {
        $(this).tooltipster('disable');
      }
    }
  });
};

function updateLastItem() {
  if ($(window).hasHScrollBar()) {
    $('.item').last().css('margin-bottom', '16px');
    $('#spells-container').css('padding-bottom', '16px');
  }
  else {
    $('.item').last().css('margin-bottom', '0');
    $('#spells-container').css('padding-bottom', '0');
  }

};

///// UTILITY ////////////////////
function isString(str) { return (typeof str === 'string' || str instanceof String); };

function itemToIndex(item) { return isString(item) ? ITEM_TO_INDEX[item] : item; };
function upgradeToIndex(upgrade) { return isString(upgrade) ? UPGRADE_TO_INDEX[upgrade] : upgrade; };
function spellToIndex(spell) { return isString(spell) ? SPELL_TO_INDEX[spell] : spell; };
function monsterToIndex(monster) { return isString(monster) ? MONSTER_TO_INDEX[monster] : monster; };
function typeToIndex(type) { return isString(type) ? TYPE_TO_INDEX[type] : type; };
function runeTypeToIndex(runeType) { return isString(runeType) ? RUNE_TYPE_TO_INDEX[runeType] : runeType; };
function runeToIndex(rune) { return isString(rune) ? RUNE_TO_INDEX[rune] : rune; };

function indexToItem(index) { return isString(index) ? index : INDEX_TO_ITEM[index]; };
function indexToUpgrade(index) { return isString(index) ? index : INDEX_TO_UPGRADE[index]; };
function indexToSpell(index) { return isString(index) ? index : INDEX_TO_SPELL[index]; };
function indexToMonster(index) { return isString(index) ? index : INDEX_TO_MONSTER[index]; };
function indexToType(index) { return isString(index) ? index : INDEX_TO_TYPE[index]; };
function indexToRuneType(index) { return isString(index) ? index : INDEX_TO_RUNE_TYPE[index]; };
function indexToRune(index) { return isString(index) ? index : INDEX_TO_RUNE[index]; };


var LONG_NUMBER_NAMES = ['million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion']
var SHORT_NUMBER_NAMES = ['m', 'b', 't', 'qd', 'qt', 'sx', 'sp', 'o', 'n', 'd']
function prettyIntBig(num, fixed) {
  fixed = fixed || 2;
  var n = Math.pow(10, fixed);

  var a = num;
  var b = -2;
  while (a >= 1000) {
    a /= 1000;
    b++;
  }

  if (b >= 0 && b < LONG_NUMBER_NAMES.length) {
    return (Math.floor(a*n)/n).toFixed(fixed) + ' ' + LONG_NUMBER_NAMES[b];
  }
  return prettyInt(num);
};

function prettyIntBigCompact(num, fixed) {
  fixed = fixed || 2;
  var n = Math.pow(10, fixed);

  var a = num;
  var b = -2;
  while (a >= 1000) {
    a /= 1000;
    b++;
  }

  if (b >= 0 && b < SHORT_NUMBER_NAMES.length) {
    return (Math.floor(a*n)/n).toFixed(fixed) + SHORT_NUMBER_NAMES[b];
  }
  return prettyInt(num);
};

function prettyInt(num) {
  // var s = num > 1000 ? Math.floor(num).toString() : num.toFixed(1);
  // return s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return Math.floor(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function prettyTime(seconds) {
  var s = Math.floor(seconds % 60);
  var m = Math.floor(seconds / 60) % 60;
  var h = Math.floor(seconds / 3600) % 24;
  var d = Math.floor(seconds / 86400);

  var str = "";
  if (d)
    str = d + ":" + ("0" + h).slice(-2) + ":" + ("0" + m).slice(-2) + ":" + ("0" + s).slice(-2);
  else if (h)
    str = h + ":" + ("0" + m).slice(-2) + ":" + ("0" + s).slice(-2);
  else if (m)
    str = m + ":" + ("0" + s).slice(-2);
  else
    str = s;
  return str;
};

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
};

function getFactorialRange(n, m) {
  var result = 1;
  n = n || 0;
  m = m || 0;

  while (n > m) {
    result *= n;
    n--;
  }
  return result;
};

function stirlingApproximation(n) {
  return (n + 0.5) * Math.log(n) - n + STIRLING_CONST;
};

function stirlingSum(n) {
  return -.75 * Math.pow(n,2) + 1.41894 * n + (.5 * n - .5) * n * Math.log(n);
};


function createFloatingText(parent, text, event) {
  var posX
  var posY;
  if (!event.pageX && !event.pageY) {
    var bounds = event.currentTarget.getBoundingClientRect();
    posX = bounds.left + bounds.width / 2 + 40 * Math.random() - 20;
    posY = bounds.top + bounds.height / 2 + 40 * Math.random() - 20;
  }
  else {
    posX = event.pageX;
    posY = event.pageY;
  }
  posX -= parent.offset().left + 10;
  posY -= parent.offset().top + 30;

  var $obj = $("<div>", {class:'counter'});
  $obj.html(text);
  $obj.css({left: posX + 'px', top: posY + 'px'});

  parent.append($obj);
  var children = parent.children();
  if (children.length > 5) {
    children[0].remove();
  }
  $obj.animate({top: '-=100', left:'+=' + (60 * Math.random() - 30), opacity: 0}, 1000, function() {
    $obj.remove();
  });
};

function showRing(spellName, duration) {
  var id;
  if (spellName == SPOILS_OF_WAR) id = '#spoils-ring';
  else if (spellName == TRIBUTE) id = '#tribute-ring';
  else if (spellName == SMITE) id = '#smite-ring';
  else if (spellName == CHALLENGING_SMITE) id = '#challenging-smite-ring';
  else if (spellName == FLASH) id = '#flash-ring';
  else if (spellName == IGNITE+'1') id = '#ignite-ring-1';
  else if (spellName == IGNITE+'2') id = '#ignite-ring-2';
  if (id) {
    $(id).css('display', 'block');
    if (duration)
      window.setTimeout(function() {$(id).css('display', 'none');}, duration);
  }

};

jQuery.fn.hasHScrollBar = function() {
  return $(window).width() < $('body').width();
};

///// INITIALIZE ////////////////////
var GameApp = angular.module('GameApp', ['ngOrderObjectBy']);
GameApp.controller('GameController', function($scope) {
    $scope.version = version;
    window.SCOPE = $scope;
    var difficulty = localStorage.getItem('difficulty');
    if (difficulty && difficulty > -1)
      difficulty = DIFFICULTIES[difficulty];
    else
      difficulty = 'medium';
    $scope.game = new Game($scope, difficulty);

    initializeHotkeys($scope.game);
    initializeButtons($scope.game);

    window.importGame = function() {
      $scope.game.importGame($('#import-modal-text').val());
    }

    $scope.LOCKED = LOCKED;
    $scope.AVAILABLE = AVAILABLE;
    $scope.UNAVAILABLE = UNAVAILABLE;
    $scope.PURCHASED = PURCHASED
    $scope.ACTIVE = ACTIVE;
    $scope.COOLDOWN = COOLDOWN;
    $scope.DIFFICULTIES = DIFFICULTIES;

    $scope.itemToIndex = function(a) {return itemToIndex(a)};
    $scope.upgradeToIndex = function(a) {return upgradeToIndex(a)};
    $scope.spellToIndex = function(a) {return spellToIndex(a)};
    $scope.monsterToIndex = function(a) {return monsterToIndex(a)};
    $scope.typeToIndex = function(a) {return typeToIndex(a)};

    $scope.indexToItem = function(a) {return indexToItem(a)};
    $scope.indexToUpgrade = function(a) {return indexToUpgrade(a)};
    $scope.indexToSpell = function(a) {return indexToSpell(a)};
    $scope.indexToMonster = function(a) {return indexToMonster(a)};
    $scope.indexToType = function(a) {return indexToType(a)};
});


function initializeButtons(game) {
  $('#chimes-button').click(function(e) {
    if (game.paused) return;

    game.chimesClick();
    var text = "+" + game.prettyIntCompact(game.chimesPerClick);
    createFloatingText($(this), text, e);
  });

  $('#monster-button').click(function(e) {
    if (game.paused) return;

    game.damageClick();
    var text = "-" + game.prettyIntCompact(game.damagePerClick);
    createFloatingText($(this), text, e);
  });

  $('.dropdown-button').click(function(){
    $(this).find('.rotate').toggleClass('down');
    $(this).parent().toggleClass('collapsed');
  });

  $('#monster-selector .selector-left').click(function() {
    game.selectMonster('left');
  });

  $('#monster-selector .selector-right').click(function() {
    game.selectMonster('right');
  });
};

function initializeHotkeys(game) {
  // Spell hotkeys
  $(document).bind('keydown.q', function() {game.spellClick(GHOST)});
  $(document).bind('keydown.w', function() {game.spellClick(FLASH)});
  $(document).bind('keydown.e', function() {game.spellClick(SMITE)});
  $(document).bind('keydown.r', function() {game.spellClick(IGNITE)});
  $(document).bind('keydown.t', function() {game.spellClick(EXHAUST)});
  $(document).bind('keydown.y', function() {game.spellClick(TELEPORT)});

  // Monster hotkeys
  $(document).bind('keydown.a', function() {game.selectMonster('left')});
  $(document).bind('keydown.s', function() {game.selectMonster('right')});

  // Dropdown hotkeys
  $(document).bind('keydown.d', function() {$('#chimes-bar-dropdown .dropdown-button').click()});
  $(document).bind('keydown.f', function() {$('#damage-bar-dropdown .dropdown-button').click()});

  // Dialog hotkeys
  $(document).bind('keydown.esc', function() {hideSubpage(); hideModal();});
  $(document).bind('keydown.alt_s', function() {game.save();});
  $(document).bind('keydown.alt_n', function() {game.showNewGameModal(false);});
  $(document).bind('keydown.p', function() {game.pauseGame();});

  // Item hotkeys
  $(document).bind('keydown.1', function() {game.buyItem(RELIC_SHIELD)});
  $(document).bind('keydown.2', function() {game.buyItem(ANCIENT_COIN)});
  $(document).bind('keydown.3', function() {game.buyItem(SPELLTHIEFS_EDGE)});
  $(document).bind('keydown.4', function() {game.buyItem(BOOTS_OF_SPEED)});
  $(document).bind('keydown.5', function() {game.buyItem(RUBY_CRYSTAL)});
  $(document).bind('keydown.6', function() {game.buyItem(AMPLIFYING_TOME)});
  $(document).bind('keydown.7', function() {game.buyItem(DAGGER)});

  $(document).bind('keydown.ctrl_1', function() {game.buyItem(RELIC_SHIELD, 10); return false;});
  $(document).bind('keydown.ctrl_2', function() {game.buyItem(ANCIENT_COIN, 10); return false;});
  $(document).bind('keydown.ctrl_3', function() {game.buyItem(SPELLTHIEFS_EDGE, 10); return false;});
  $(document).bind('keydown.ctrl_4', function() {game.buyItem(BOOTS_OF_SPEED, 10); return false;});
  $(document).bind('keydown.ctrl_5', function() {game.buyItem(RUBY_CRYSTAL, 10); return false;});
  $(document).bind('keydown.ctrl_6', function() {game.buyItem(AMPLIFYING_TOME, 10); return false;});
  $(document).bind('keydown.ctrl_7', function() {game.buyItem(DAGGER, 10); return false;});

  $(document).bind('keydown.shift_1', function() {game.buyItem(RELIC_SHIELD, 100)});
  $(document).bind('keydown.shift_2', function() {game.buyItem(ANCIENT_COIN, 100)});
  $(document).bind('keydown.shift_3', function() {game.buyItem(SPELLTHIEFS_EDGE, 100)});
  $(document).bind('keydown.shift_4', function() {game.buyItem(BOOTS_OF_SPEED, 100)});
  $(document).bind('keydown.shift_5', function() {game.buyItem(RUBY_CRYSTAL, 100)});
  $(document).bind('keydown.shift_6', function() {game.buyItem(AMPLIFYING_TOME, 100)});
  $(document).bind('keydown.shift_7', function() {game.buyItem(DAGGER, 100)});

  $(document).bind('keydown.ctrl_shift_1', function() {game.buyItem(RELIC_SHIELD, 1000)});
  $(document).bind('keydown.ctrl_shift_2', function() {game.buyItem(ANCIENT_COIN, 1000)});
  $(document).bind('keydown.ctrl_shift_3', function() {game.buyItem(SPELLTHIEFS_EDGE, 1000)});
  $(document).bind('keydown.ctrl_shift_4', function() {game.buyItem(BOOTS_OF_SPEED, 1000)});
  $(document).bind('keydown.ctrl_shift_5', function() {game.buyItem(RUBY_CRYSTAL, 1000)});
  $(document).bind('keydown.ctrl_shift_6', function() {game.buyItem(AMPLIFYING_TOME, 1000)});
  $(document).bind('keydown.ctrl_shift_7', function() {game.buyItem(DAGGER, 1000)});

  $(document).bind('keydown.alt_ctrl_shift_1', function() {game.buyItem(RELIC_SHIELD, 10000)});
  $(document).bind('keydown.alt_ctrl_shift_2', function() {game.buyItem(ANCIENT_COIN, 10000)});
  $(document).bind('keydown.alt_ctrl_shift_3', function() {game.buyItem(SPELLTHIEFS_EDGE, 10000)});
  $(document).bind('keydown.alt_ctrl_shift_4', function() {game.buyItem(BOOTS_OF_SPEED, 10000)});
  $(document).bind('keydown.alt_ctrl_shift_5', function() {game.buyItem(RUBY_CRYSTAL, 10000)});
  $(document).bind('keydown.alt_ctrl_shift_6', function() {game.buyItem(AMPLIFYING_TOME, 10000)});
  $(document).bind('keydown.alt_ctrl_shift_7', function() {game.buyItem(DAGGER, 10000)});

  $(document).bind('keydown.alt_1',
    function() {
      var upgrade = game.items[RELIC_SHIELD].upgradesAvailable[0];
      if (upgrade) {game.buyUpgrade(upgrade);}
    }
  );
  $(document).bind('keydown.alt_2',
    function() {
      var upgrade = game.items[ANCIENT_COIN].upgradesAvailable[0];
      if (upgrade) {game.buyUpgrade(upgrade);}
    }
  );
  $(document).bind('keydown.alt_3',
    function() {
      var upgrade = game.items[SPELLTHIEFS_EDGE].upgradesAvailable[0];
      if (upgrade) {game.buyUpgrade(upgrade);}
    }
  );
  $(document).bind('keydown.alt_4',
    function() {
      var upgrade = game.items[BOOTS_OF_SPEED].upgradesAvailable[0];
      if (upgrade) {game.buyUpgrade(upgrade);}
    }
  );
  $(document).bind('keydown.alt_5',
    function() {
      var upgrade = game.items[RUBY_CRYSTAL].upgradesAvailable[0];
      if (upgrade) {game.buyUpgrade(upgrade);}
    }
  );
  $(document).bind('keydown.alt_6',
    function() {
      var upgrade = game.items[AMPLIFYING_TOME].upgradesAvailable[0];
      if (upgrade) {game.buyUpgrade(upgrade);}
    }
  );
  $(document).bind('keydown.alt_7',
    function() {
      var upgrade = game.items[DAGGER].upgradesAvailable[0];
      if (upgrade) {game.buyUpgrade(upgrade);}
    }
  );
};


///// OTHER ////////////////////
$(window).resize(function() {
  updateButtons(true);
  updateLastItem();
  $('#difficulty-modal').width($('#restart-container').width());
});

$(window).load(function() {
  updateButtons(true);
  updateLastItem();

  $('#difficulty-modal').width($('#restart-container').width());

  $('[data-toggle="tooltip"]').each(function() {
    var content = $(this).attr('data-title');
    var position = $(this).attr('data-position') || 'left';
    $(this).tooltipster({
      'theme': 'tooltipster-custom',
      'maxWidth': 200,
      'position': position,
      'content' : content,
      'contentAsHTML': true,
      'updateAnimation': false
    });

    if (content.length == 0) {
      $(this).tooltipster('disable');
    }
  });

  $('.touch-target').bind('touchend', function(e) {
    e.preventDefault();
    this.click();
  });

  $('#header-stats').click(function(event) {
    event.stopPropagation();
    $('#progress-modal').modal({
      persist: true,
      overlayClose: true,
      overlayId: 'progress-modal-overlay',
      position: [72, null],
      onOpen: function (dialog) {
        dialog.overlay.fadeIn(200);
        dialog.container.fadeIn(200);
        dialog.data.fadeIn(200);
      }
    });
  })

  $('#header-menu').click(function(event) {
    if (modal) {
      hideModal();
      return;
    }

    event.stopPropagation();
    var posX = $(this).offset().left - $('body').scrollLeft() - 57;
    var posY = $(this).offset().top + $(this).outerHeight();

    $('#menu-modal').modal({
      persist: true,
      overlayClose: true,
      position: [posY, posX],
      modal: false,
      onOpen: function(dialog) {
      	dialog.overlay.fadeIn(200);
        dialog.container.fadeIn(200);
        dialog.data.fadeIn(200);
      },
      onShow: function () {
        modal = true;
      }
    });
  });

  $('#difficulty').click(function(event) {
    if (modal) {
      hideModal();
      return;
    }

    event.stopPropagation();
    var posX = $(this).offset().left - $('body').scrollLeft();
    var posY = $(this).offset().top + $(this).outerHeight() + 2;

    $('#difficulty-modal').modal({
      persist: true,
      overlayClose: true,
      position: [posY, posX],
      modal: false,
      onOpen: function(dialog) {
      	dialog.overlay.fadeIn(200);
        dialog.container.fadeIn(200);
        dialog.data.fadeIn(200);
      },
      onShow: function () {
        modal = true;
      }
    });
  });

  $('body').click(function(){
    if (modal) hideModal();
  });

  $(window).scroll(function(event) {
    if (modal) hideModal();
    updateTooltips(true);
  });

  $('#column-3').scroll(function(event) {
    if (modal) hideModal();
  });

  SCOPE.game.start();
});

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

function hideModal() {
  modal = false;
  $.modal.close();
};

function showNewGameModal(reset, difficulty, points) {
  hideModal();
  var message;
  if (reset)
    message = 'Are you sure you want to reset everything and start a new game?  All progress will be permanently discarded.'
  else {
    message = 'Are you sure you want to start a new game' + (difficulty ? ' on <b>' + difficulty.capitalize() + '</b>' : '')+'?  Your overall progress will be saved';
    if (points > 0)
      message += ' and you will be credited with <b>' + points.toFixed(1) + '</b> chime points.';
    else
      message += '.';
  }

  $("#newgame-modal-text").html(message);
  $("#newgame-modal").modal({
    persist: true,
    overlayClose: true,
    modal: true,
    overlayId: 'newgame-modal-overlay',
    position: [72, null],
    onOpen: function (dialog) {
      dialog.overlay.fadeIn(200);
      dialog.container.fadeIn(200);
      dialog.data.fadeIn(200);
    }
  });
};

function showWinModal() {
  hideModal();
  $("#win-modal").modal({
    persist: true,
    overlayClose: false,
    modal: true,
    overlayId: 'win-modal-overlay',
    position: [72, null],
    onOpen: function (dialog) {
      dialog.overlay.fadeIn(200);
      dialog.container.fadeIn(200);
      dialog.data.fadeIn(200);
    }
  });
};

function showExportModal(text) {
  hideModal();
  $("#export-modal-text").html(text);
  $("#export-modal").modal({
    persist: true,
    overlayClose: false,
    modal: false,
    overlayId: 'export-modal-overlay',
    position: [72, null],
    onOpen: function (dialog) {
      dialog.overlay.fadeIn(200);
      dialog.container.fadeIn(200);
      dialog.data.fadeIn(200);
    }
  });
};

function showImportModal() {
  hideModal();
  $("#import-modal").modal({
    persist: true,
    overlayClose: false,
    modal: false,
    overlayId: 'import-modal-overlay',
    position: [72, null],
    onOpen: function (dialog) {
      dialog.overlay.fadeIn(200);
      dialog.container.fadeIn(200);
      dialog.data.fadeIn(200);
    }
  });
};

var subpage;
function showSubpage(page) {
  if (subpage && subpage != page) {
    hideSubpage(openSubpage, page);
  }
  else if (subpage == page) {
    hideSubpage();
  }
  else {
    openSubpage(page);
  }
};

function openSubpage(page) {
  $('#header-' + page).addClass('subpage');
  $('#subpage-panel').html("<iframe src='" + page + ".html'></iframe>");
  $('#subpage-panel iframe').load(function() {
    $('#subpage-panel').css('display', 'block');
    $('#subpage-panel iframe').animate({opacity: 1}, 300);
    subpage = page;
  });
};

function hideSubpage(onEnd, page) {
  $('#header-' + subpage).removeClass('subpage');
  $('#subpage-panel iframe').animate({opacity: 0}, 300,
    function() {
      $('#subpage-panel').css('display', 'none');
      subpage = null;
      if (onEnd) onEnd(page);
    }
  );

  // add class immediately to avoid lag
  if (onEnd == openSubpage)
    $('#header-' + page).addClass('subpage');

};

var savingTimeout;
function showSave() {
  if (savingTimeout) window.clearTimeout(savingTimeout);

  $('#header-save').addClass('saving');
  savingTimeout = window.setTimeout(function() {$('#header-save').removeClass('saving'); savingTimeout = null;}, 200);
};

// LZW-compress a string
function lzw_encode(s) {
    var dict = {};
    var data = (s + "").split("");
    var out = [];
    var currChar;
    var phrase = data[0];
    var code = 256;
    for (var i=1; i<data.length; i++) {
        currChar=data[i];
        if (dict[phrase + currChar] != null) {
            phrase += currChar;
        }
        else {
            out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
            dict[phrase + currChar] = code;
            code++;
            phrase=currChar;
        }
    }
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
    for (var i=0; i<out.length; i++) {
        out[i] = String.fromCharCode(out[i]);
    }
    return out.join("");
};

// Decompress an LZW-encoded string
function lzw_decode(s) {
    var dict = {};
    var data = (s + "").split("");
    var currChar = data[0];
    var oldPhrase = currChar;
    var out = [currChar];
    var code = 256;
    var phrase;
    for (var i=1; i<data.length; i++) {
        var currCode = data[i].charCodeAt(0);
        if (currCode < 256) {
            phrase = data[i];
        }
        else {
           phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
        }
        out.push(phrase);
        currChar = phrase.charAt(0);
        dict[code] = oldPhrase + currChar;
        code++;
        oldPhrase = phrase;
    }
    return out.join("");
};
