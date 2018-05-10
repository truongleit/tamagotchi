// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/style.css'

Vue.config.productionTip = false

new Vue({
    data: {
        health: 100
    },
    created: function() {
        while (this.health > 0) {
            console.log(this.health);
            this.health--;
        }
    }
});