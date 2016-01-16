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
var CHIMES_PER_MEEP = 7;
var CHIMES_EXPERIENCE = {'easy' : 1, 'medium' : .75, 'hard' : .5, 'marathon' : .25, 'impossible' : 0};
var MEEPS_DAMAGE = {'easy' : 2, 'medium' : 2, 'hard' : 1, 'marathon' : 1, 'impossible' : .5};
var EXPERIENCE_NEEDED = 1250;
var MONSTER_HEALTH = 200;
var MONSTER_EXPERIENCE = 65;
var MONSTER_REWARD = 20;
var POINT_BONUS = {'easy' : 1, 'medium' : 3, 'hard' : 9, 'marathon' : 27, 'impossible' : 81};

var DIFFICULTIES = ['easy', 'medium', 'hard', 'marathon', 'impossible'];

// Scale Values
var SCALE_CHIMES_PER_MEEP = 1.00;
var SCALE_CHIMES_EXPERIENCE = .90;
var SCALE_ITEM_COST = 0.10;
var SCALE_MONSTER_REWARD = 0.00;
var SCALE_MONSTER_HEALTH = 0.02;
var SCALE_MONSTER_LEVEL_REWARD = 5;
var SCALE_MONSTER_LEVEL_HEALTH = {'easy' : 5.2, 'medium' : 5.8, 'hard' : 6.4, 'marathon' : 7.2, 'impossible' : 9.6};
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
  $('.spell-wrapper').each(function() {
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
var LONG_NUMBER_NAMES = ['million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nontillion', 'decillion']
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
  return Math.floor(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
  else if (spellName == FLASH) id = '#flash-ring';
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
    window.SCOPE = $scope;
    var difficulty = localStorage.getItem('difficulty');
    if (difficulty && difficulty > -1)
      difficulty = DIFFICULTIES[difficulty];
    else
      difficulty = 'medium';
    $scope.game = new Game($scope, difficulty);

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
      	dialog.overlay.slideDown(200);
        dialog.container.slideDown(200);
        dialog.data.slideDown(200);
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

function showNewGameModal(reset, difficulty) {
  hideModal();
  var message = reset ? 'Are you sure you want to reset and start a new game?  All progress will be permanently discarded.' : 'Are you sure you want to start a new game' + (difficulty ? ' on <b>' + difficulty.capitalize() + '</b>' : '')+'?  Your overall progress will be saved.';
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
}

function openSubpage(page) {
  $('#header-' + page).addClass('subpage');
  $('#subpage-panel').html("<iframe src='" + page + ".html'></iframe>");
  $('#subpage-panel iframe').load(function() {
    $('#subpage-panel').css('display', 'block');
    $('#subpage-panel iframe').animate({opacity: 1}, 300);
    subpage = page;
  });
}

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

}
