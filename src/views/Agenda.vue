<template>
  <div>
    <div class="agenda-list">
      <div v-for="(value, key) in this.wordData" :key="key.id" class="item">
        <div class="audio">
          <i
            class="el-icon-video-play"
            @click="this.playAudio(value.audio)"
          ></i>
        </div>
        <div class="name">{{ value.word }}</div>
        <div class="spell">{{ value.spell }}</div>
        <div class="type">{{ value.lexical_category }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapActions, mapGetters } from "vuex";

@Options({
  data() {
    return {
      wordData: {},
      currentRoute: "agenda", //this.$route.params.word,
    };
  },
  watch: {
    "$route.params.word": function (par) {
      this.currentRoute = par;
    },
    getWord: {
      handler(val) {
        console.log(val);
        this.wordData = val.data;
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters({
      getWord: "AGENDA/getData",
    }),
  },
  methods: {
    ...mapActions({
      actionAgenda: "AGENDA/AGENDA_GET",
    }),
    getPronunciationsInfo(data: any) {
      if (typeof data.lexicalEntries[0]["entries"] !== "undefined") {
        return data.lexicalEntries[0]["entries"][0]["pronunciations"][0];
      }

      return null;
    },
    playAudio(mediaUrl: string) {
      new Audio(mediaUrl).play();
    },
  },
  created() {
    this.actionAgenda(this.currentRoute);
  },
})
export default class WordInfo extends Vue {}
</script>
