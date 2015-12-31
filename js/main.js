///// CONSTANTS ////////////////////
// Items
var BOOTS_OF_SPEED = "Boots of Speed";
var ANCIENT_COIN = "Ancient Coin";
var SPELLTHIEFS_EDGE = "Spellthief's Edge";
var RELIC_SHIELD = "Relic Shield";
var AMPLIFYING_TOME = "Amplifying Tome";
var RUBY_CRYSTAL = "Ruby Crystal";
var DAGGER = "Dagger";

// Upgrade Types
var ITEM_UPGRADE = 0;
var SPELL_UPGRADE = 1;

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

// Spells
var FLASH = "Flash";
var GHOST = "Ghost";
var BARRIER = "Barrier";
var HEAL = "Heal";
var SMITE = "Smite";
var IGNITE = "Ignite";
var EXHAUST = "Exhaust";
var CLEANSE = "Cleanse";
var TELEPORT = "Teleport";

var FAVOR = "Favor";
var SPOILS_OF_WAR = "Spoils of War"
var TRIBUTE = "Tribute";

// Spell Types
var SPELL_PASSIVE = "passive";
var SPELL_ACTIVE = "active";

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

// Monster Types
var MONSTER_JUNGLE = "jungle";
var MONSTER_CHAMPION = "champion"
var MONSTER_ALL = "all";

// Constant Arrays
var MONSTERS = [CASTER_MINION, RIFT_SCUTTLER, MELEE_MINION, CANNON_MINION, RAZORBEAK,
                MURK_WOLF, KRUG, GROMP, BLUE_SENTINEL, RED_BRAMBLEBACK,
                SUPER_MINION, RIFT_HERALD, DRAGON, VILEMAW, BARON_NASHOR,
                CHO_GATH, DR_MUNDO, SION, TEEMO];
var CHAMPIONS = [CHO_GATH, DR_MUNDO, SION, TEEMO];
var IGNORE_PLURALS = [BOOTS_OF_SPEED, BOOTS_OF_SWIFTNESS, BOOTS_OF_MOBILITY, IONIAN_BOOTS_OF_LUCIDITY,
                      SORCERERS_SHOES, MERCURYS_TREADS, SPOILS_OF_WAR];
var SPECIAL_PLURALS = [ZHONYAS_HOURGLASS, LUDENS_ECHO, FIENDISH_CODEX, FLASH];

// Default Values
var STARTING_GOLD = 375;
var CHIMES_PER_MEEP = 5;
var CHIMES_EXPERIENCE = {'easy' : 1, 'medium' : 1, 'hard' : .5, 'marathon' : .25, 'impossible' : 0};
var MEEPS_DAMAGE = {'easy' : 5, 'medium' : 5, 'hard' : 4, 'marathon' : 3, 'impossible' : 2};
var EXPERIENCE_NEEDED = 200;
var MONSTER_HEALTH = 450;
var MONSTER_EXPERIENCE = 60;
var MONSTER_REWARD = 25;
var POINT_BONUS = {'easy' : .5, 'medium' : 1, 'hard' : 2, 'marathon' : 5, 'impossible' : 10};


// Scale Values
var SCALE_CHIMES_PER_MEEP = 1.00;
var SCALE_CHIMES_EXPERIENCE = .90;
var SCALE_ITEM_COST = 0.10;
var SCALE_MONSTER_REWARD = 0.00;
var SCALE_MONSTER_HEALTH = 0.02;
var SCALE_MONSTER_LEVEL_REWARD = 5;
var SCALE_MONSTER_LEVEL_HEALTH = {'easy' : 5, 'medium' : 5.5, 'hard' : 6, 'marathon' : 6.5, 'impossible' : 8}
var SCALE_EXPERIENCE_NEEDED = 5;
var SCALE_MEEP_STRENGTH = 1;

// Status Values
var LOCKED = 0;
var AVAILABLE = 1;
var UNAVAILABLE = 2;
var PURCHASED = 3;
var ACTIVE = 4;
var COOLDOWN = 5;


///// STYLING ////////////////////
// update this if style changes
var buttonYMargin = 35;
var buttonXMargin = 45;
var buttonMaxSize = 260;
var buttonOffset = 1; // for press animation

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

function updateTooltips() {
  $('.spell-wrapper').each(function() {
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

///// UTILITY ////////////////////
function prettyIntBig(num, fixed) {
  if (!fixed)
    fixed = 3;
  if(num >= 1000000000000000000000000000)
    return prettyInt(num)
  if(num >= 1000000000000000000000000)
    return (num / 1000000000000000000000000).toFixed(fixed) + 'septillion';
  if(num >= 1000000000000000000000)
    return (num / 1000000000000000000000).toFixed(fixed) + 'sextillion';
  if(num >= 1000000000000000000)
    return (num / 1000000000000000000).toFixed(fixed) + ' quintillion';
  if(num >= 1000000000000000)
    return (num / 1000000000000000).toFixed(fixed) + ' quadrillion';
  if(num >= 1000000000000)
    return (num / 1000000000000).toFixed(fixed) + ' trillion';
  if(num >= 1000000000)
    return (num / 1000000000).toFixed(fixed) + ' billion';
  if(num >= 1000000)
    return (num / 1000000).toFixed(fixed) + ' million';
  return prettyInt(num);
};

function prettyIntBigCompact(num, fixed, precision) {
  if (!fixed && !precision)
    fixed = 3;
  if(num >= 1000000000000000000000000000)
    return prettyInt(num)
  if(num >= 1000000000000000000000000)
    return (num / 1000000000000000000000000).toFixed(fixed) + 'st';
  if(num >= 1000000000000000000000)
    return (num / 1000000000000000000000).toFixed(fixed) + 's';
  if(num >= 1000000000000000000)
    return (num / 1000000000000000000).toFixed(fixed) + 'qt';
  if(num >= 1000000000000000)
    return (num / 1000000000000000).toFixed(fixed) + 'q';
  if(num >= 1000000000000)
    return (num / 1000000000000).toFixed(fixed) + 't';
  if(num >= 1000000000)
    return (num / 1000000000).toFixed(fixed) + 'b';
  if(num >= 1000000)
    return (num / 1000000).toFixed(fixed) + 'm';
  return prettyInt(num);
};

function prettyInt(num) {
  num = Math.floor(num);
  var str = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return str;
};

function prettyTime(seconds) {
  var s = seconds % 60;
  var m = Math.floor(seconds / 60) % 60;
  var h = Math.floor(seconds / 3600);

  var str = "";
  if (h)
    str = h + "h " + m + "m " + s + "s";
  else if (m)
    str = m + "m " + s + "s";
  else
    str = s + "s";
  return str;
};

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
};

function createFloatingText(parent, text, event) {
  var posX = event.pageX - parent.offset().left - 10;
  var posY = event.pageY - parent.offset().top - 30;
  var $obj = $("<div>", {class:'counter'});
  $obj.html(text);
  $obj.css({left: posX + 'px', top: posY + 'px'});

  parent.append($obj);
  $obj.animate({top: '-=100', left:'+=' + (60 * Math.random() - 30), opacity: 0}, 1000, function() {
    $obj.remove();
  });
};

///// INITIALIZE ////////////////////
var GameApp = angular.module('GameApp', ['ngOrderObjectBy']);
GameApp.controller('GameController', function($scope) {
    window.SCOPE = $scope;
    $scope.game = new Game($scope, 'medium');

    initializeHotkeys($scope.game);
    initializeButtons($scope.game);
});


function initializeButtons(game) {
  $('#chimes-button').click(function(e) {
    game.chimesClick();
    var text = "+" + game.prettyIntCompact(game.chimesPerClick);
    createFloatingText($(this), text, e);
  });

  $('#monster-button').click(function(e) {
    game.damageClick();
    var text = "-" + game.prettyIntCompact(game.damagePerClick);
    createFloatingText($(this), text, e);
  });

  $('.dropdown-button').click(function(){
    $(this).find('.rotate').toggleClass('down');
    $(this).parent().toggleClass('collapsed');
    // var value =  dropdown.attr('data-collapsed') == 'true' ? 'false' : 'true';
    // dropdown.attr('data-collapsed', value);
  });

  $('#monster-selector .selector-left').click(function() {
    game.selectMonster('left');
    updateButtons();
  });

  $('#monster-selector .selector-right').click(function() {
    game.selectMonster('right');
    updateButtons();
  });
};

function initializeHotkeys(game) {
  // Spell hotkeys
  $(document).bind('keydown', 'q', function() {game.spellClick(GHOST)});
  $(document).bind('keydown', 'w', function() {game.spellClick(FLASH)});
  $(document).bind('keydown', 'e', function() {game.spellClick(SMITE)});
  $(document).bind('keydown', 'r', function() {game.spellClick(IGNITE)});
  $(document).bind('keydown', 't', function() {game.spellClick(EXHAUST)});
  $(document).bind('keydown', 'y', function() {game.spellClick(TELEPORT)});

  // Monster hotkeys
  $(document).bind('keydown', 'a', function() {game.selectMonster('left')});
  $(document).bind('keydown', 's', function() {game.selectMonster('right')});

  // Dropdown hotkeys
  $(document).bind('keydown', 'd', function() {$('#chimes-bar-dropdown .dropdown-button').click()});
  $(document).bind('keydown', 'f', function() {$('#damage-bar-dropdown .dropdown-button').click()});

  // Item hotkeys
  $(document).bind('keydown', '1', function() {game.buyItem(RELIC_SHIELD)});
  $(document).bind('keydown', '2', function() {game.buyItem(ANCIENT_COIN)});
  $(document).bind('keydown', '3', function() {game.buyItem(SPELLTHIEFS_EDGE)});
  $(document).bind('keydown', '4', function() {game.buyItem(BOOTS_OF_SPEED)});
  $(document).bind('keydown', '5', function() {game.buyItem(RUBY_CRYSTAL)});
  $(document).bind('keydown', '6', function() {game.buyItem(AMPLIFYING_TOME)});
  $(document).bind('keydown', '7', function() {game.buyItem(DAGGER)});

  $(document).bind('keydown', 'ctrl+1', function() {game.buyItem(RELIC_SHIELD, 10); return false;});
  $(document).bind('keydown', 'ctrl+2', function() {game.buyItem(ANCIENT_COIN, 10); return false;});
  $(document).bind('keydown', 'ctrl+3', function() {game.buyItem(SPELLTHIEFS_EDGE, 10); return false;});
  $(document).bind('keydown', 'ctrl+4', function() {game.buyItem(BOOTS_OF_SPEED, 10); return false;});
  $(document).bind('keydown', 'ctrl+5', function() {game.buyItem(RUBY_CRYSTAL, 10); return false;});
  $(document).bind('keydown', 'ctrl+6', function() {game.buyItem(AMPLIFYING_TOME, 10); return false;});
  $(document).bind('keydown', 'ctrl+7', function() {game.buyItem(DAGGER, 10); return false;});

  $(document).bind('keydown', 'shift+1', function() {game.buyItem(RELIC_SHIELD, 100)});
  $(document).bind('keydown', 'shift+2', function() {game.buyItem(ANCIENT_COIN, 100)});
  $(document).bind('keydown', 'shift+3', function() {game.buyItem(SPELLTHIEFS_EDGE, 100)});
  $(document).bind('keydown', 'shift+4', function() {game.buyItem(BOOTS_OF_SPEED, 100)});
  $(document).bind('keydown', 'shift+5', function() {game.buyItem(RUBY_CRYSTAL, 100)});
  $(document).bind('keydown', 'shift+6', function() {game.buyItem(AMPLIFYING_TOME, 100)});
  $(document).bind('keydown', 'shift+7', function() {game.buyItem(DAGGER, 100)});

  $(document).bind('keydown', 'ctrl+shift+1', function() {game.buyItem(RELIC_SHIELD, 1000)});
  $(document).bind('keydown', 'ctrl+shift+2', function() {game.buyItem(ANCIENT_COIN, 1000)});
  $(document).bind('keydown', 'ctrl+shift+3', function() {game.buyItem(SPELLTHIEFS_EDGE, 1000)});
  $(document).bind('keydown', 'ctrl+shift+4', function() {game.buyItem(BOOTS_OF_SPEED, 1000)});
  $(document).bind('keydown', 'ctrl+shift+5', function() {game.buyItem(RUBY_CRYSTAL, 1000)});
  $(document).bind('keydown', 'ctrl+shift+6', function() {game.buyItem(AMPLIFYING_TOME, 1000)});
  $(document).bind('keydown', 'ctrl+shift+7', function() {game.buyItem(DAGGER, 1000)});

  $(document).bind('keydown', 'alt+1',
    function() {
      var upgrade = game.items[RELIC_SHIELD].upgradesAvailable[0];
      if (upgrade) {game.buyUpgrade(upgrade);}
    }
  );
  $(document).bind('keydown', 'alt+2',
    function() {
      var upgrade = game.items[ANCIENT_COIN].upgradesAvailable[0];
      if (upgrade) {game.buyUpgrade(upgrade);}
    }
  );
  $(document).bind('keydown', 'alt+3',
    function() {
      var upgrade = game.items[SPELLTHIEFS_EDGE].upgradesAvailable[0];
      if (upgrade) {game.buyUpgrade(upgrade);}
    }
  );
  $(document).bind('keydown', 'alt+4',
    function() {
      var upgrade = game.items[BOOTS_OF_SPEED].upgradesAvailable[0];
      if (upgrade) {game.buyUpgrade(upgrade);}
    }
  );
  $(document).bind('keydown', 'alt+5',
    function() {
      var upgrade = game.items[RUBY_CRYSTAL].upgradesAvailable[0];
      if (upgrade) {game.buyUpgrade(upgrade);}
    }
  );
  $(document).bind('keydown', 'alt+6',
    function() {
      var upgrade = game.items[AMPLIFYING_TOME].upgradesAvailable[0];
      if (upgrade) {game.buyUpgrade(upgrade);}
    }
  );
  $(document).bind('keydown', 'alt+7',
    function() {
      var upgrade = game.items[DAGGER].upgradesAvailable[0];
      if (upgrade) {game.buyUpgrade(upgrade);}
    }
  );
};


///// OTHER ////////////////////
$(window).resize(function() {
  updateButtons(true);
});

$(window).load(function() {
  updateButtons(true);
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

  SCOPE.game.start();
});

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

function showStats() {
  $('#progress-modal').modal({
    persist: true,
    overlayClose: true,
    position: [72, null],
    onOpen: function (dialog) {
    	dialog.overlay.fadeIn(200);
      dialog.container.fadeIn(200);
      dialog.data.fadeIn(200);
    },
    onClose: function (dialog) {
      dialog.overlay.fadeOut(200);
      dialog.container.fadeOut(200);
      dialog.data.fadeOut(200, function() {$.modal.close();});
    }
  });
};

function hideStats() {
  $.modal.close();
};
