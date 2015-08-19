///// Constants /////

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
var TWIN_SHADOWS = "Twin Shadows";
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

// Spell Upgrades
var FLASH = "Flash";
var GHOST = "Ghost";
var BARRIER = "Barrier";
var HEAL = "Heal";
var SMITE = "Smite";
var IGNITE = "Ignite";
var EXHAUST = "Exhaust";
var CLEANSE = "Cleanse";
var TELEPORT = "Teleport";

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
var TIBBERS = "Tibbers";
var DRAGON = "Dragon";
var VILEMAW = "Vilemaw";
var BARON_NASHOR = "Baron Nashor";
var CHO_GATH = "Cho'Gath";
var DR_MUNDO = "Dr. Mundo";
var TEEMO = "Teemo";

// Constant Arrays
var MONSTERS = [CASTER_MINION, RIFT_SCUTTLER, MELEE_MINION, CANNON_MINION, RAZORBEAK,
                MURK_WOLF, KRUG, GROMP, BLUE_SENTINEL, RED_BRAMBLEBACK, SUPER_MINION,
                TIBBERS, DRAGON, VILEMAW, BARON_NASHOR, CHO_GATH, DR_MUNDO, TEEMO];
var IGNORE_PLURALS = [BOOTS_OF_SPEED, BOOTS_OF_SWIFTNESS, BOOTS_OF_MOBILITY, IONIAN_BOOTS_OF_LUCIDITY,
                      SORCERERS_SHOES, MERCURYS_TREADS, TWIN_SHADOWS, TIBBERS];
var SPECIAL_PLURALS = [ZHONYAS_HOURGLASS, LUDENS_ECHO, FIENDISH_CODEX];

// Default Values
var STARTING_GOLD = 375;
var CHIMES_PER_MEEP = 5;
var EXPERIENCE_NEEDED = 200;
var MONSTER_HEALTH = 450;
var MONSTER_EXPERIENCE = 60;
var MONSTER_REWARD = 25;

// Scale Values
var SCALE_CHIMES_PER_MEEP = 1.00;
var SCALE_ITEM_COST = 0.10;
var SCALE_MONSTER_REWARD = 0.03;
var SCALE_MONSTER_DIFFICULTY = 0.05;
var SCALE_MONSTER_LEVEL = 5;
var SCALE_EXPERIENCE_NEEDED = 5;
var SCALE_MEEP_STRENGTH = 1; //1.2;


///// Styling /////
// update this if style changes
var buttonYMargin = 25 + 3; // margin + border
var buttonXMargin = 35 + 3; // margin + border
var buttonMaxSize = 280;

var updateButtons = function() {
  $('.click-button').each(function() {
    $(this).show();

    // ensure margin-top > 25px
    var height = $(this).parent().height() - 2 * buttonYMargin;
    // ensure margin-left > 35px;
    var width = $(this).parent().width() - 2 * buttonXMargin;

    var size = Math.min(height, width, buttonMaxSize);

    $(this).height(size);
    $(this).width(size);
  });
};

///// Utility /////
var prettyIntBig = function(num, fixed) {
    if (!fixed)
        fixed = 3;
    if(num >= 1000000000000000000000)
        return prettyInt(num)
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
}

var prettyIntBigCompact = function(num, fixed) {
    if (!fixed)
        fixed = 3;
    if(num >= 1000000000000000000000)
        return prettyInt(num)
    if(num >= 1000000000000000000)
        return (num / 1000000000000000000).toFixed(fixed) + 'QT';
    if(num >= 1000000000000000)
        return (num / 1000000000000000).toFixed(fixed) + 'Q';
    if(num >= 1000000000000)
        return (num / 1000000000000).toFixed(fixed) + 'T';
    if(num >= 1000000000)
        return (num / 1000000000).toFixed(fixed) + 'B';
    if(num >= 1000000)
        return (num / 1000000).toFixed(fixed) + 'M';
    return prettyInt(num);
}

var prettyInt = function(num) {
    num = Math.floor(num);
    var str = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str;
}

///// Initialize Game /////
var GameApp = angular.module('GameApp', []);
GameApp.controller('GameController', function($scope) {
    window.SCOPE = $scope;
    $scope.game = new Game($scope);
    $scope.game.start();

    var fps = 30;
    var stepSize = 1 / fps;
    window.setInterval(function() {
        $scope.game.step(stepSize);
    }, stepSize * 1000);

    $('#chimes-button').on({
      click: function() {
        $scope.game.chimesClick();
      },
      mouseenter: function() {
        $(this).stop();
//        $(this).animate({height: "225px", width: "225px", marginTop: "20px", marginBottom: "0px"}, 200);
      },
      mouseleave: function() {
        $(this).stop();
//        $(this).animate({height: "215px", width: "215px", marginTop: "25px", marginBottom: "5px"}, 200);
      },
      mouseup: function() {
        $(this).stop();
//        $(this).animate({height: "225px", width: "225px", marginTop: "20px", marginBottom: "0px"}, 200);
      },
      mousedown: function() {
        $(this).stop();
//        $(this).animate({height: "215px", width: "215px", marginTop: "25px", marginBottom: "5px"}, 200);
      },
    });

    $('#monster-button').click(function() {
      $scope.game.damageClick();
    });

    $(".dropdown-button").click(function(){
      $(this).find('.rotate').toggleClass('down');

      var dropdown = $(this).parent();
      var value =  dropdown.attr('data-collapsed') == 'true' ? 'false' : 'true';
      if (value == 'true') {
        dropdown.children('.dropdown-content').height('0px');
      }
      else {
        // update if $dropdownButtonSize changes
        dropdown.children('.dropdown-content').height('25px');
      }

      dropdown.attr('data-collapsed', value);
    });

    $('#monster-selector .selector-left').click(function() {
      $scope.game.selectMonster('left');
      updateButtons();
    });

    $('#monster-selector .selector-right').click(function() {
      $scope.game.selectMonster('right');
      updateButtons();
    });
})

///// Other /////
$(window).resize(function() {
  updateButtons();
});

$(window).load(function() {
  updateButtons();
});
