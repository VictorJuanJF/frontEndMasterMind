<template>
  <v-container v-if="this.goals">
    <countdown
      v-if="!countdownFinished"
      @end="goalsTimeFinished()"
      :time="calculateTimeRemaining()"
    >
      <template slot-scope="props">
        <code
          class="percent"
        >Quedan {{ props.hours }} horas, {{ props.minutes }} minutos, {{ props.seconds }} segundos para evaluar el cumplimiento de tus objetivos.</code>
      </template>
    </countdown>
    <h1 class="mb-3" v-else>Tu tiempo se acabo, ¿Qué tanto avanzaste hoy Víctor?</h1>

    <v-card class="mb-3">
      <v-toolbar flat>
        <v-toolbar-title>Resumen del día</v-toolbar-title>
      </v-toolbar>
      <v-card-title primary-title>
        <div>
          <ul>
            <li v-for="(goal,index) in goals" :key="goal._id">
              <p class v-if="goal.state">
                El objetivo {{index}} fue cumplido, ganas
                <span class="earnedPoints">+100pts</span>
              </p>
              <p v-else>
                El objetivo {{index}} no fue cumplido, pierdes
                <span class="lostPoints">-100pts</span>
              </p>
            </li>
          </ul>
        </div>
      </v-card-title>
    </v-card>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="mb-3">
          <v-card-title primary-title>
            <v-container>
              <h3 class="headline mb-0">Añadir nuevo objetivo</h3>
              <v-layout row wrap justify-space-between>
                <v-flex sm6 xs12>
                  <v-text-field v-model="newObjetive.description" label="El dia de hoy haré..."></v-text-field>
                </v-flex>
                <v-flex sm6 xs12>
                  <v-text-field v-model="newObjetive.timeLimit" label="para antes de..."></v-text-field>
                </v-flex>
              </v-layout>
              <v-btn round color="primary" @click="addObjetive" dark>Añadir objetivo</v-btn>
            </v-container>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-toolbar flat>
          <v-toolbar-title>
            Objetivos del día de hoy - cumpliste el
            <span
              class="percent"
            >{{calculatePercent()?calculatePercent():0}}%</span>
          </v-toolbar-title>
        </v-toolbar>

        <v-data-table expand :headers="headers" :items="goals" class="elevation-1" hide-actions>
          <template v-slot:items="props">
            <td class="text-xs-left">
              <v-switch
                :disabled="disabled"
                @change="updateSwitch(props.item._id,props.item.state)"
                color="red"
                v-model="props.item.state"
              ></v-switch>
            </td>
            <td class="text-xs-left">{{ props.item.description }}</td>
            <td class="text-xs-left">{{ props.item.timeLimit }}</td>
            <td class="text-xs-left">{{ formattedTime(props.item.date) }}</td>
            <td class="justify-center layout px-0">
              <v-icon small class="mr-2" @click="editItem(props.item)" :disabled="disabled">edit</v-icon>
              <v-icon small @click="deleteObjetive(props.item._id)" :disabled="disabled">delete</v-icon>
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import countdown from "@chenfengyuan/vue-countdown";
import { customCopyObject } from "../../tools/customCopyObject";
import { day_month_year } from "../../tools/customDate";
import axios from "axios";
import { mapActions } from "vuex";
export default {
  components: {
    countdown
  },
  data() {
    return {
      disabled: false,
      summaryStatus: false,
      countdownFinished: false,
      goals: null,
      newObjetive: {
        state: false,
        description: "",
        timeLimit: "",
        date: Date.now()
      },
      percent: 0,
      headers: [
        {
          text: "¿Lo hiciste?",
          align: "left",
          sortable: false,
          value: "state"
        },
        {
          text: "Descripción",
          value: "description",
          align: "left",
          sortable: false
        },
        { text: "Plazo", value: "timeLimit", align: "left", sortable: false },
        { text: "Fecha", value: "date", sortable: false, align: "center" },
        { text: "Acciones", value: "name", sortable: false, align: "center" }
      ]
    };
  },
  mounted() {
    this.getObjetivesAPI();
  },
  methods: {
    ...mapActions(["updateMasterPoints"]),
    goalsTimeFinished() {
      this.countdownFinished = true;
      this.disabled = true;
      this.summary();
      this.updateStoreMasterPoints();
    },
    summary() {},
    updateStoreMasterPoints() {
      this.goals.forEach(goal => {
        if (goal.state) {
          console.log("actualizando puntaje positivo");
          this.updateMasterPoints(+100);
        } else {
          console.log("actualizando puntaje negativo");
          this.updateMasterPoints(-150);
        }
      });
    },
    calculateTimeRemaining() {
      let currentTime = new Date().getTime();
      let endHour = new Date();
      endHour.setHours(22, 15, 0, 0);
      endHour = endHour.getTime();
      let timeRemaining = endHour - currentTime;
      return timeRemaining > 0 ? timeRemaining : 0;
    },
    calculatePercent() {
      let dones = 0;
      let percent = 0;
      this.goals.forEach(goal => {
        if (goal.state) dones += 1;
      });
      percent = (dones / this.goals.length).toFixed(2);
      return percent * 100;
    },
    formattedTime(date) {
      return day_month_year(date);
    },
    updateSwitch(id, state) {
      axios
        .put(`/api/goal/${id}`, { state })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          // handle error
          console.log(error);
        });
    },
    getObjetivesAPI() {
      axios
        .get("/api/goals")
        .then(response => {
          this.goals = response.data.goals;
        })
        .catch(error => {
          // handle error
          console.log(error);
        });
    },
    addObjetive() {
      axios
        .post("/api/goals", {
          state: this.newObjetive.state,
          description: this.newObjetive.description,
          timeLimit: this.newObjetive.timeLimit,
          date: Date.now()
        })
        .then(response => {
          this.goals.push(customCopyObject(response.data.goal));
          this.clearObjetive();
        })
        .catch(error => {
          // handle error
          console.log(error);
        });
    },
    deleteObjetive(id) {
      confirm("¿Seguro que deseas eliminar este objetivo?") &&
        axios
          .delete(`/api/goal/${id}`)
          .then(response => {
            let index = this.goals.findIndex(obj => obj._id == id);
            this.goals.splice(index, 1);
          })
          .catch(error => {
            // handle error
            console.log(error);
          });
    },
    clearObjetive() {
      this.newObjetive = {
        state: false,
        description: "",
        timeLimit: "",
        date: Date.now()
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.percent {
  font-size: 15px;
}
</style>