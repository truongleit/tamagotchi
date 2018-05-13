// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/style.css'
import './assets/css/animate.css'

Vue.config.productionTip = false

var audio;

var character = new Vue({
    el: '#character',
    data: {
        name: 'truongleit',
        type: 0,
        level: 1,
        experience: 0,
        nextLevel: 200,
        url: '/static/svg/monster2.svg',
        currentTrack: 1,
        currentTrackName: 'Music',
        currentIcon: '/static/icon/play-button.svg',
        currentURL: 'static/sound/BikeRides.mp3',
        isPlaying: false,
        music: [{
                no: 1,
                name: 'Bike Rides',
                url: 'static/sound/BikeRides.mp3'
            },
            {
                no: 2,
                name: 'Carefree Melody',
                url: 'static/sound/CarefreeMelody.mp3'
            },
            {
                no: 3,
                name: 'Carefree',
                url: 'static/sound/Carefree.mp3'
            },
            {
                no: 4,
                name: 'Claudio The Worm',
                url: 'static/sound/ClaudioTheWorm.mp3'
            },
            {
                no: 5,
                name: 'Dancing On Green Grass',
                url: 'static/sound/DancingOnGreenGrass.mp3'
            },
            {
                no: 6,
                name: "Vlogger's Delight",
                url: 'static/sound/VloggersDelight.mp3'
            }
        ],
        autoPlaying: function() {
            playMusic(this.currentTrack, this.music);
            this.currentTrackName = getTrackName(this.currentTrack, this.music);
        },
        musicEnd: function() {
            var self = this;
            $('.player').bind("ended", function() {
                self.nextMusic();
            });
        }
    },
    methods: {
        stopMusic: function() {
            if (!this.isPlaying) {
                this.isPlaying = true;
                $('.player')[0].play();
                this.currentTrackName = getTrackName(this.currentTrack, this.music);
                $('.play-button img').addClass('is-paused');
                this.currentIcon = '/static/icon/pause-button.svg';
            } else if (this.isPlaying) {
                this.isPlaying = false;
                $('.player')[0].pause();
                $('.play-button img').removeClass('is-paused');
                this.currentIcon = '/static/icon/play-button.svg';
            } else {
                this.isPlaying = true;
                $('.player')[0].play();
                $('.play-button img').addClass('is-paused');
                this.currentIcon = '/static/icon/pause-button.svg';
            }
        },
        nextMusic: function() {
            if (this.currentTrack < 6) {
                $('.player').attr('autoplay', 'autoplay');
                $('.player')[0].pause();
                this.currentTrack++;
                this.currentTrackName = getTrackName(this.currentTrack, this.music);
                this.currentURL = getTrackURL(this.currentTrack, this.music);
                $('.player')[0].play();
            } else {
                $('.player').attr('autoplay', 'autoplay');
                $('.player')[0].pause();
                this.currentTrack = 1;
                this.currentTrackName = getTrackName(this.currentTrack, this.music);
                this.currentURL = getTrackURL(this.currentTrack, this.music);
                $('.player')[0].play();
            }
        },
        previousMusic: function() {
            if (this.currentTrack > 1) {
                $('.player').attr('autoplay', 'autoplay');
                $('.player')[0].pause();
                this.currentTrack--;
                this.currentTrackName = getTrackName(this.currentTrack, this.music);
                this.currentURL = getTrackURL(this.currentTrack, this.music);
                $('.player')[0].play();
            }
        }
    }
});

function getTrackName(no, list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].no == no) {
            return list[i].name;
        }
    }
}

function getTrackURL(no, list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].no == no) {
            return list[i].url;
        }
    }
}

var properties = new Vue({
    data: {
        beMonster: false,
        health: 100,
        hungry: 100,
        thirsty: 100,
        happiness: 100,
        entertainment: 100,
        losingHealth: function() {
            var self = this;
            if (this.beMonster) {
                setInterval(function() {
                    if (self.health > 0 && self.hungry < 80 && self.thirsty < 70) {
                        var type = 'health';
                        self.health = self.health - 0.25;
                        updateBar(type, self.health);
                    } else {
                        clearInterval;
                    }
                }, 50);
                setInterval(function() {
                    if (self.hungry > 0) {
                        var type = 'hunger';
                        self.hungry = self.hungry - 0.25;
                        updateBar(type, self.hungry);
                    } else {
                        clearInterval;
                    }
                }, 50);
                setInterval(function() {
                    if (self.thirsty > 0) {
                        var type = 'thirst';
                        self.thirsty = self.thirsty - 0.25;
                        updateBar(type, self.thirsty);
                    } else {
                        clearInterval;
                    }
                }, 50);
                setInterval(function() {
                    if (self.happiness > 0) {
                        var type = 'happiness';
                        self.happiness = self.happiness - 0.2;
                        updateBar(type, self.happiness);
                    } else {
                        clearInterval;
                    }
                }, 50);
            }
        }
    }
});

var foodLoading = new Vue({
    el: '#food',
    data: {
        items: [{
                name: 'Orange',
                point: 10,
                url: '/static/fruit/food1.svg'
            },
            {
                name: 'Strawberry',
                point: 10,
                url: '/static/fruit/food2.svg'
            },
            {
                name: 'Banana',
                point: 20,
                url: '/static/fruit/food3.svg'
            },
            {
                name: 'Cherry',
                point: 30,
                url: '/static/fruit/food4.svg'
            },
            {
                name: 'Kiwi',
                point: 40,
                url: '/static/fruit/food5.svg'
            },
            {
                name: 'Tomato',
                point: 10,
                url: '/static/fruit/food6.svg'
            },
            {
                name: 'Grapes',
                point: 10,
                url: '/static/fruit/food7.svg'
            }
        ]
    },
    methods: {
        eat: function(point) {
            // Calculating experience point and level up //
            var check = character.nextLevel - character.experience;
            if (point > check) {
                character.experience = point - check;
                character.nextLevel += 200;
                character.level++;
                var percent = (character.experience / character.nextLevel) * 100;
                updateBar('experience', 100);
                $('.firework').addClass('block');
                $('.experience .progress-bar').addClass('no-transition');
                updateBar('experience', 0);
                setTimeout(function() {
                    $('.experience .progress-bar').removeClass('no-transition');
                    updateBar('experience', percent);
                }, 250);
                setTimeout(function() {
                    $('.firework').removeClass('block');
                }, 4000);
            } else {
                character.experience += point;
                var percent = (character.experience / character.nextLevel) * 100;
                updateBar('experience', percent);
            }
            // Changing status of HUNGER bar //
            if (properties.hungry < 100) {
                properties.hungry += 15;
                if (properties.hungry > 100) {
                    properties.hungry = 100;
                }
                updateBar('hunger', properties.hungry);
            } else if (properties.hungry > 100) {
                properties.hungry = 100;
                updateBar('hunger', properties.hungry);
            }
            // Changing status of HEALTH bar //
            if (properties.health < 100) {
                properties.health += 5;
                if (properties.health > 100) {
                    properties.health = 100;
                }
                updateBar('health', properties.health);
            } else if (properties.hungry > 100) {
                properties.health += 5;
                updateBar('health', properties.health);
            }
        }
    }
});

var drinkLoading = new Vue({
    el: '#drink',
    data: {
        items: [{
                name: 'Drink 1',
                point: 10,
                url: '/static/drink/drink1.svg'
            },
            {
                name: 'Drink 2',
                point: 10,
                url: '/static/drink/drink2.svg'
            },
            {
                name: 'Drink 3',
                point: 20,
                url: '/static/drink/drink3.svg'
            },
            {
                name: 'Drink 4',
                point: 30,
                url: '/static/drink/drink4.svg'
            },
            {
                name: 'Drink 5',
                point: 40,
                url: '/static/drink/drink5.svg'
            },
            {
                name: 'Drink 6',
                point: 10,
                url: '/static/drink/drink6.svg'
            },
            {
                name: 'Drink 7',
                point: 10,
                url: '/static/drink/drink7.svg'
            },
            {
                name: 'Drink 8',
                point: 10,
                url: '/static/drink/drink8.svg'
            }
        ]
    },
    methods: {
        drinking: function(point) {
            // Calculating experience point and level up //
            var check = character.nextLevel - character.experience;
            if (point > check) {
                character.experience = point - check;
                character.nextLevel += 200;
                character.level++;
                var percent = (character.experience / character.nextLevel) * 100;
                updateBar('experience', 100);
                $('.experience .progress-bar').addClass('no-transition');
                updateBar('experience', 0);
                setTimeout(function() {
                    $('.experience .progress-bar').removeClass('no-transition');
                    updateBar('experience', percent);
                }, 250);
            } else {
                character.experience += point;
                var percent = (character.experience / character.nextLevel) * 100;
                updateBar('experience', percent);
            }
            // Changing status of THIRST bar //
            if (properties.thirsty < 100) {
                properties.thirsty += 15;
                if (properties.thirsty > 100) {
                    properties.thirsty = 100;
                }
                updateBar('thirst', properties.thirsty);
            } else if (properties.thirsty > 100) {
                properties.thirsty = 100;
                updateBar('thirst', properties.thirsty);
            }
            // Changing status of HEALTH bar //
            if (properties.health < 100) {
                properties.health += 5;
                if (properties.health > 100) {
                    properties.health = 100;
                }
                updateBar('health', properties.health);
            } else if (properties.hungry > 100) {
                properties.health += 5;
                updateBar('health', properties.health);
            }
        }
    }
});

var musicLoading = new Vue({
    el: '#music',
    data: {
        items: [{
                name: 'Piano',
                point: 30,
                url: '/static/music/music1.svg'
            },
            {
                name: 'Guitar',
                point: 40,
                url: '/static/music/music2.svg'
            },
            {
                name: 'Accordion',
                point: 25,
                url: '/static/music/music3.svg'
            },
            {
                name: 'Cello',
                point: 50,
                url: '/static/music/music4.svg'
            },
            {
                name: 'Accordion',
                point: 25,
                url: '/static/music/music5.svg'
            },
            {
                name: 'Accordion',
                point: 25,
                url: '/static/music/music6.svg'
            },
            {
                name: 'Accordion',
                point: 25,
                url: '/static/music/music7.svg'
            },
            {
                name: 'Accordion',
                point: 25,
                url: '/static/music/music8.svg'
            }
        ]
    },
    methods: {
        listening: function(point) {
            $('.music-instrument').addClass('animated zoomIn');
            // Calculating experience point and level up //
            var check = character.nextLevel - character.experience;
            if (point > check) {
                character.experience = point - check;
                character.nextLevel += 200;
                character.level++;
                var percent = (character.experience / character.nextLevel) * 100;
                updateBar('experience', 100);
                $('.experience .progress-bar').addClass('no-transition');
                updateBar('experience', 0);
                setTimeout(function() {
                    $('.experience .progress-bar').removeClass('no-transition');
                    updateBar('experience', percent);
                }, 250);
            } else {
                character.experience += point;
                var percent = (character.experience / character.nextLevel) * 100;
                updateBar('experience', percent);
            }
            // Changing status of HAPPINESS bar //
            if (properties.happiness < 100) {
                properties.happiness += 15;
                if (properties.happiness > 100) {
                    properties.happiness = 100;
                }
                updateBar('happiness', properties.happiness);
            } else if (properties.happiness > 100) {
                properties.happiness = 100;
                updateBar('happiness', properties.happiness);
            }
        }
    }
});

function updateBar(type, percent) {
    switch (type) {
        case 'health':
            $('.health .progress-bar').css('width', percent + '%');
            break;
        case 'hunger':
            $('.hungry .progress-bar').css('width', percent + '%');
            break;
        case 'thirst':
            $('.thirsty .progress-bar').css('width', percent + '%');
            break;
        case 'happiness':
            $('.happy .progress-bar').css('width', percent + '%');
            break;
        case 'experience':
            $('.experience .progress-bar').css('width', percent + '%');
            break;
    }
};

properties.losingHealth();
$('img').on('dragstart', function(event) {
    event.preventDefault();
});
character.musicEnd();
// character.autoPlaying();