
var Game = {
    function getNewData() {
        return {
            kills: 0,
            deaths: 0,
            score: 0,
            livesLeft: 0,

            enemiesKilled: 0,
            doorsOpened: [],
            secretsFound: [],
        };
    };

    function getNewChaper() {
        var chapter = {
            data: getNewData(),
            levels: [],
        };

        return chapter;
    };
    function getNewLevel() {
        var level = {
            data: getNewData(),
            lives: [],
        };

        return level;
    };
    function getNewLife() {
        var life = {
            data: getNewData(),
            events: [],
        };

        return life;
    };

    data: getNewData(),
    currentChapter: -1,
    currentLevel: -1,
    currentLife: -1,
    chapters: getNewChaper();
};
var Payload = {
    game: Game,
};

Payload.StartGame = (function(){
    game: Game,
})();


Payload.LogEventData = (function(chapterIndex, levelIndex, lifeIndex, data) {
    var chapter = Payload.game.chapters[chapterIndex];
    var level = chapter.levels[levelIndex];
    var life = level.lives[lifeIndex];

    if (typeof(data) == "object") {
        game.data[data.dataKey] += data.dataChange;
        chapter.data[data.dataKey] += data.dataChange;
        level.data[data.dataKey] += data.dataChange;
        life.data[data.dataKey] += data.dataChange;
    } else if (typeof(dataKey) == "array") {
        for(var i = 0; i < data.size; i++) {
            game.data[data[i].dataKey] += data.dataChange;
            chapter.data[data[i].dataKey] += data.dataChange;
            level.data[data[i].dataKey] += data.dataChange;
            life.data[data[i].dataKey] += data.dataChange;
        }
    }
})();

Payload.EventFactory = (function(type, player, actor, data) {
    var result = {
        type,
        self,
        player,
        actor,
        data: {},
    };

    if(typeof(data) != "null") {
        var keys = Object.keys(data);
        for(var i = 0; i < keys.size; i++) {
            result.data[keys[i]] = data[keys[i]]];
        }
    }

    return result;
})();

Payload.AppendEvent = (function(event) {
    pl.game.chapters[pl.currentChapter].levels[pl.currentLevel].lives[pl.currentLife].events.append(event);
})();



//This one has damage
Payload.LogHitActor = (function(player, actor, damage) {
    Payload.AppendEvent(Payload.EventFactory("HitActor", player, actor, {damage}));
})();

//This one does not
Payload.LogMissActor = (function(player, actor) {
    Payload.AppendEvent(Payload.EventFactory("MissActor", player, actor, null));
})();

//This one updates count
Payload.LogKillActor = (function(player, actor, damage) {
    var pl = Payload;
    pl.LogEventData(pl.currentChapter, pl.currentLevel, pl.currentLife, {dataKey: 'kills', dataChange: damage});

    pl.AppendEvent(pl.EventFactory("HitActor", player, actor, {damage}));
})();


Payload.LogHitPlayer = (function(player, actor, damage) {
    Payload.AppendEvent(Payload.EventFactory("HitPlayer", player, actor, {damage}))
})();

Payload.LogMissPlayer = (function(player, actor) {
    Payload.append(Payload.EventFactory("MissPlayer", player, actor, null))
})();

Payload.LogKillPlayer = (function(player, actor, livesLeft) {
    var pl = Payload;
    pl.LogEventData(pl.currentChapter, pl.currentLevel, pl.currentLife, [{dataKey: 'deaths', dataChange: 1}, {dataKey: 'livesLeft', dataChange: -1}]);

    pl.AppendEvent(pl.EventFactory("KillPlayer", player, actor, {livesLeft}));
})();



Payload.LogOpenDoor = (function(player, door) {
    Payload.AppendEvent(Payload.EventFactory("OpenDoor", player, null, {door}));
})();

Payload.LogFoundSecret = (function(player, secret) {
    Payload.AppendEvent(Payload.EventFactory("FoundSecret", player, null, {secret}));
})();



Payload.LogItemPickup = (function(player, item) {
    Payload.AppendEvent(Payload.EventFactory("ItemPickup", player, null, {secret}));
})();


Payload.LogEndChapter = (function() {

})();

Payload.LogEndLevel = (function() {
    Payload.AppendEvent(Payload.EventFactory("EndLevel", player, null, {}}));
    // Payload.game.currentLevel++;
})();

Payload.LogEndGame = (function() {

})();

Payload.LogEndLife = (function() {

})();




Payload.SendPayload = (function() {
    console.log(Payload);
})();
