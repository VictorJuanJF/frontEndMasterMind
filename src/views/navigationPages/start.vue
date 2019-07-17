<template>
  <v-container>
    <h2>Frase del día:</h2>
    <v-slide-y-transition>
      <blockquote v-if="phrase" class="blockquote" :cite="phrase.author">{{phrase.text}}</blockquote>
    </v-slide-y-transition>
    <h3 class="headline mt-3 mb-3">Resumen del día</h3>
    <p>Hoy pasó esto:</p>
    <ul>
      <li>
        Cumpliste todos tus objetivos!! ganas
        <code class="earnedPoints">+100pts</code>
      </li>
    </ul>
    <h3 class="headline mt-3 mb-3">¿Cómo vas con la meta máxima?</h3>
    <p>Voy a conseguir $ 4,300,000,000 para antes de mis 25 años; es decir, para antes del 05/03/21</p>
    <v-img :src="require('@/assets/personalImages/mejor.png')" aspect-ratio="1.7" contain></v-img>
  </v-container>
</template>

<script>
import { getRandomInt } from "../../tools/random";
export default {
  data() {
    return {
      phrases: [],
      phrase: null
    };
  },
  mounted() {
    this.randomizePhrase();
  },
  methods: {
    randomizePhrase() {
      this.phrases = [
        {
          id: 1,
          text:
            "El mundo funciona con finanzas y con codigo, y si no sabemos programar, nos lleva la corriente",
          author: "Freddy Vega"
        },
        {
          id: 2,
          text:
            "Voy a ganar no porque los demás sean menos que yo, voy a ganar porque yo soy más que ellos",
          author: "Víctor Jimenez"
        },
        {
          id: 3,
          text: "Confía un 99,9% ... reserva ese 0,1%",
          author: "Juan Jimenez"
        },
        {
          id: 4,
          text:
            "Pocas cosas son imposibles con diligencia y habilidad; las grandes obras fueron realizadas no con fuerza, sino con perseverancia",
          author: "Samuel Johnson"
        },
        {
          id: 5,
          text:
            "Asegúrese de que todo lo que dice y hace a partir de este momento sea coherente con lo que está convencido de que quiere tener y con la persona que quiere llegar a ser.",
          author: "Brian Tracy"
        },
        {
          id: 6,
          text:
            "Su amplitud: segun su extension multiples o individuales",
          author: "Carlos Villajuana"
        }
      ];
      let phrasesQty = this.phrases.length - 1;
      this.phrase = this.phrases[getRandomInt(0, phrasesQty)];
    }
  }
};
</script>

<style lang="scss" scoped>
.earnedPoints {
  color: green;
}
.center {
  text-align: center;
}

blockquote {
  display: block;
  border-width: 2px 0;
  border-style: solid;
  border-color: #eee;
  padding: 1.5em 0 0.5em;
  margin: 1.5em 0;
  position: relative;
}
blockquote:before {
  content: "\201C";
  position: absolute;
  top: 0em;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  width: 3rem;
  height: 2rem;
  font: 6em/1.08em "PT Sans", sans-serif;
  color: #666;
  text-align: center;
}
blockquote:after {
  content: "\2013 \2003"attr(cite);
  display: block;
  text-align: right;
  font-size: 0.875em;
  color: #e74c3c;
}
</style>