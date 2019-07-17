<template>
  <div>
    <v-navigation-drawer class="white" v-model="drawer" fixed clipped disable-resize-watcher app>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img
                src="data:image/jpeg;base64,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"
              />
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>Napoleon Hill</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list dense>
        <div v-for="(item, i) in items">
          <v-layout v-if="item.heading" :key="i" row align-center>
            <v-flex xs6>
              <v-subheader>{{ item.heading }}</v-subheader>
            </v-flex>
          </v-layout>

          <v-divider v-else-if="item.divider" :key="i" dark class="my-3"></v-divider>
          <v-list-tile v-else :key="i" :to="item.to">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{item.text}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="amber" app fixed clipped-left>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title m1-3 mr-5">
        Master
        <span class="font-weight-light">Mind</span>
      </span>
      <v-text-field
        name="search"
        label="Search"
        id="searchbar"
        flat
        hide-details
        solo-inverted
        prepend-inner-icon="search"
      ></v-text-field>
      <v-spacer></v-spacer>

      <strong>
        Master Points:
        <animated-number
          class="earnedPoints"
          :value="masterPoints"
          :duration="1000"
          :formatValue="formatToMasterPoints"
        />
      </strong>
      <strong class="ml-3">
        Rango:
        <span class="earnedPoints">{{rank[1].name}}</span>
      </strong>
    </v-toolbar>

    <v-content class="white" fluid grid-list-md text-xs-center>
      <router-view></router-view>
    </v-content>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AnimatedNumber from "animated-number-vue";

export default {
  components: {
    AnimatedNumber
  },
  data() {
    return {
      drawer: null,
      items: [
        { icon: "home", text: "Inicio", to: "/" },
        { icon: "lightbulb_outline", text: "Ideas", to: "/ideas" },
        {
          icon: "alarm",
          text: "Administración del tiempo",
          to: "/administracion-del-tiempo"
        },
        {
          icon: "touch_app",
          text: "Objetivos diarios",
          to: "/objetivos-diarios"
        },
        { divider: true },
        { heading: "Labels" },
        { icon: "add", text: "Create new label" },
        { divider: true },
        { icon: "archive", text: "Archive" },
        { icon: "delete", text: "Trash" },
        { divider: true },
        { icon: "settings", text: "Settings" },
        { icon: "chat_bubble", text: "Trash" },
        { icon: "help", text: "Help" },
        { icon: "phonelink", text: "App downloads" },
        { icon: "keyboard", text: "Keyboard shortcuts" }
      ]
    };
  },
  computed: {
    ...mapState(["rank", "masterPoints"])
  },
  methods: {
    formatToMasterPoints(value) {
      return `${value.toFixed(0)}mp`;
    }
  }
};
</script>

<style lang="scss">
#keep main .container {
  height: 660px;
}

.navigation-drawer__border {
  display: none;
}

.text {
  font-weight: 400;
}
</style>