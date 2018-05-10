// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/style.css'

Vue.config.productionTip = false

var properties = new Vue({
    el: '#example-2',
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
                    console.log(self.health);
                } else {
                    clearInterval;
                }
            }, 50);
            setInterval(function() {
                if (self.hungry > 0) {
                    var type = 'hunger';
                    self.hungry = self.hungry - 0.05;
                    updateBar(type, self.hungry);
                    console.log(self.hungry);
                } else {
                    clearInterval;
                }
            }, 50);
            setInterval(function() {
                if (self.thirsty > 0) {
                    var type = 'thirst';
                    self.thirsty = self.thirsty - 0.05;
                    updateBar(type, self.thirsty);
                    console.log(self.thirsty);
                } else {
                    clearInterval;
                }
            }, 50);
            setInterval(function() {
                if (self.happiness > 0) {
                    var type = 'happiness';
                    self.happiness = self.happiness - 0.05;
                    updateBar(type, self.happiness);
                    console.log(self.happiness);
                } else {
                    clearInterval;
                }
            }, 50);
        }
    },
    methods: {
        eat: function() {
            if (this.health < 100) {
                this.health += 15;
                if (this.health > 100) {
                    this.health = 100;
                }
                updateBar('health', this.health);
                console.log(this.health);
            } else if (this.health > 100) {
                this.health = 100;
                updateBar('health', this.health);
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
}

properties.losingHealth();