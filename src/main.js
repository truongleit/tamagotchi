// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/style.css'

Vue.config.productionTip = false

var properties = new Vue({
    data: {
        health: 100,
        hungry: 100,
        thirsty: 100,
        happiness: 100,
        entertainment: 100,
        losingHealth: function() {
            var self = this;
            setInterval(function() {
                if (self.health > 0) {
                    var type = 'health';
                    self.health = self.health - 0.05;
                    updateBar(type, self.health);
                } else {
                    clearInterval;
                }
            }, 50);
            setInterval(function() {
                if (self.hungry > 0) {
                    var type = 'hunger';
                    self.hungry = self.hungry - 0.05;
                    updateBar(type, self.hungry);
                } else {
                    clearInterval;
                }
            }, 50);
            setInterval(function() {
                if (self.thirsty > 0) {
                    var type = 'thirst';
                    self.thirsty = self.thirsty - 0.05;
                    updateBar(type, self.thirsty);
                } else {
                    clearInterval;
                }
            }, 50);
            setInterval(function() {
                if (self.happiness > 0) {
                    var type = 'happiness';
                    self.happiness = self.happiness - 0.05;
                    updateBar(type, self.happiness);
                } else {
                    clearInterval;
                }
            }, 50);
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
        eat: function() {
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
        drinking: function() {
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
            }
        ]
    },
    methods: {
        listening: function() {
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