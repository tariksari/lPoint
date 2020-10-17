<template>
  <div>
    <div class="page word-info-list">
      <div class="row" v-for="(value, key) in this.wordData" :key="key.id">
        <div class="item name">{{ value.word }}</div>
        <div
          class="item pronunciation-spell"
          v-if="this.getPronunciationsInfo(value)"
        >
          /
          {{ this.getPronunciationsInfo(value)["phoneticSpelling"] }}/ :
        </div>
        <div
          class="item pronunciation-audio"
          v-if="this.getPronunciationsInfo(value)"
        >
          <a
            @click="
              this.playAudio(this.getPronunciationsInfo(value)['audioFile'])
            "
          >
            <play-box-outline></play-box-outline>
          </a>
        </div>
        <div class="item word-action">
          <a @click="this.addAgendaWord(value)">
            <playlist-plus></playlist-plus>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapActions, mapGetters } from "vuex";
import { GridLarge, PlaylistPlus, PlayBoxOutline } from "mdue";

@Options({
  components: {
    PlayBoxOutline,
    PlaylistPlus,
  },
  data() {
    return {
      wordData: {},
      currentRoute: this.$route.params.word,
    };
  },
  watch: {
    "$route.params.word": function (par) {
      this.currentRoute = par;
    },
    getWord: {
      handler(val) {
        console.log(val);
        this.wordData = val.data.results;
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters({
      getWord: "WORD_INFO/getData",
    }),
  },
  methods: {
    ...mapActions({
      actionSearch: "WORD_INFO/WORD_GET",
      actionAddAgendaWord: "AGENDA/ADD_AGENDA_WORD_REQUEST",
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
    addAgendaWord(data: any) {
      let wordInfo = this.getPronunciationsInfo(data);

      let AgendaWordAttributes = {
        type: "agenda",
        word: data.word,
        lexical_category: data.lexicalEntries[0]["lexicalCategory"].text,
        audio: wordInfo["audioFile"],
        spell: wordInfo["phoneticSpelling"],
      };

      this.actionAddAgendaWord(AgendaWordAttributes);
    },
  },
  created() {
    this.actionSearch(this.currentRoute);
  },
})
export default class WordInfo extends Vue {}
</script>
