<template>
  <div>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex v-for="card in cards" sm6 :key="card.id">
          <v-card :color="card.color" class="white--text">
            <v-card-title primary-title>
              <div>
                <div class="headline">{{card.title}} - {{card.percent*100}}%</div>
                <span>{{card.description}}</span>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat dark v-if="!timer" @click="startTimer">Iniciar</v-btn>
              <v-btn flat dark v-if="timer" @click="stopTimer">Detener</v-btn>
              <v-btn flat dark v-if="resetButton" @click="resetTimer">Resetear</v-btn>
              <span>{{minutes}}:{{seconds}}</span>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <div class="container has-text-centered">
      <h2 class="title is-6">{{title}}</h2>

      <div id="timer">
        <span id="minutes">{{ minutes }}</span>
        <span id="middle">:</span>
        <span id="seconds">{{ seconds }}</span>
      </div>

      <div id="buttons">
        <!--     Start TImer -->
        <button id="start" class="button is-dark is-large" v-if="!timer" @click="startTimer">
          <i class="far fa-play-circle"></i>
        </button>
        <!--     Pause Timer -->
        <button id="stop" class="button is-dark is-large" v-if="timer" @click="stopTimer">
          <i class="far fa-pause-circle"></i>
        </button>
        <!--     Restart Timer -->
        <button id="reset" class="button is-dark is-large" v-if="resetButton" @click="resetTimer">
          <i class="fas fa-undo"></i>
        </button>
      </div>
    </div>
    <countdown :time="1 * 6 * 60 * 60 * 1000">
      <template
        slot-scope="props"
      >Time Remaining：{{ props.days }} days, {{ props.hours }} hours, {{ props.minutes }} minutes, {{ props.seconds }} seconds.</template>
    </countdown>
  </div>
</template>

<script>
import countdown from "@chenfengyuan/vue-countdown";
export default {
  components: {
    countdown
  },
  data() {
    return {
      t: [0, 0, 0, 0, 0, 0, 0, 1],
      displayValue: 0,
      laps: [],
      cards: [],
      timer: null,
      totalTime: 25 * 60,
      resetButton: false,
      title: "Let the countdown begin!!"
    };
  },
  mounted() {
    var vm = this;
    vm.load();
    this.loadCards();
  },
  methods: {
    startTimer: function() {
      this.timer = setInterval(() => this.countdown(), 1000);
      this.resetButton = true;
      this.title = "Greatness is within sight!!";
    },
    stopTimer: function() {
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = true;
      this.title = "Never quit, keep going!!";
    },
    resetTimer: function() {
      this.totalTime = 25 * 60;
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = false;
      this.title = "Let the countdown begin!!";
    },
    padTime: function(time) {
      return (time < 10 ? "0" : "") + time;
    },
    countdown: function() {
      if (this.totalTime >= 1) {
        this.totalTime--;
      } else {
        this.totalTime = 0;
        this.resetTimer();
      }
    },
    loadCards() {
      this.cards = [
        {
          id: 1,
          title: "Dormir",
          description: "Dormir es bueno en todo sentido",
          percent: 0.48,
          timeElapsed: Date().now,
          limitTime: Date().now,
          color: "light-green"
        },
        {
          id: 2,
          title: "Hacer deporte",
          description: "Preferiblemente en la mañana",
          percent: 0.48,
          timeElapsed: Date().now,
          limitTime: Date().now,
          color: "amber"
        },
        {
          id: 3,
          title: "Leer",
          description: "Lo que sea",
          percent: 0.23,
          timeElapsed: Date().now,
          limitTime: Date().now,
          color: "green"
        },
        {
          id: 4,
          title: "Otras actividades",
          description: "Facebook, youtube, agario, dota",
          percent: 0.38,
          timeElapsed: Date().now,
          limitTime: Date().now,
          color: "light-blue"
        }
      ];
    },
    ss() {
      var vm = this;
      vm.t[vm.t[2]] = new Date().valueOf();
      vm.t[2] = 1 - vm.t[2];

      if (0 == vm.t[2]) {
        clearInterval(vm.t[4]);
        vm.t[3] += vm.t[1] - vm.t[0];

        vm.laps.push({
          no: vm.t[7]++,
          current: vm.format(vm.t[1] - vm.t[0]),
          runningTotal: vm.format(vm.t[3])
        });
        vm.t[4] = vm.t[1] = vm.t[0] = 0;
        vm.disp();
      } else {
        vm.t[4] = setInterval(vm.disp, 43);
      }
    },
    r() {
      var vm = this;
      if (vm.t[2]) vm.ss();
      vm.t[4] = vm.t[3] = vm.t[2] = vm.t[1] = vm.t[0] = 0;
      vm.disp();
      document.getElementById("lap").innerHTML = "";
      vm.t[7] = 1;
    },
    disp() {
      var vm = this;
      if (vm.t[2]) vm.t[1] = new Date().valueOf();
      vm.t[6] = vm.format(vm.t[3] + vm.t[1] - vm.t[0]);
      vm.displayValue = vm.t[6];
    },
    format(ms) {
      var vm = this;
      // used to do a substr, but whoops, different browsers, different formats
      // so now, this ugly regex finds the time-of-day bit alone
      var d = new Date(ms + vm.t[5])
        .toString()
        .replace(/.*([0-9][0-9]:[0-9][0-9]:[0-9][0-9]).*/, "$1");
      var x = String(ms % 1000);
      while (x.length < 3) x = "0" + x;
      d += "." + x;
      return d;
    },
    load() {
      var vm = this;
      vm.t[5] = new Date(1970, 1, 1, 0, 0, 0, 0).valueOf();
      vm.t[6] = vm.$refs.disp;

      vm.disp();
    }
  },
  computed: {
    minutes: function() {
      const minutes = Math.floor(this.totalTime / 60);
      return this.padTime(minutes);
    },
    seconds: function() {
      const seconds = this.totalTime - this.minutes * 60;
      return this.padTime(seconds);
    }
  }
};
</script>

<style lang="scss" scoped>
#message {
  color: #ddd;
  font-size: 50px;
  margin-bottom: 20px;
}

#timer {
  font-size: 200px;
  line-height: 1;
  margin-bottom: 40px;
}
</style>