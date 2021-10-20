<template>
  <div>
    <div class="page word-info-list" v-if="wordData[0].hasOwnProperty('word')">
      <div class="row" v-for="(value, key) in this.wordData" :key="key.id">
        <div class="item name">{{ value.word }}</div>
        <div class="item pronunciation-spell">
          /
          {{ value.phonetic_spelling }}/ :
        </div>
        <div class="item pronunciation-audio uk">
          <a @click="this.playAudio(value.audio_uk)">
            <play-box-outline></play-box-outline>
          </a>
        </div>
        <div class="item pronunciation-audio us">
          <a @click="this.playAudio(value.audio_us)">
            <play-box-outline></play-box-outline>
          </a>
        </div>
        <div class="item local-meaning">
          <information-variant v-tooltip="" :id="key"></information-variant>
          <div
            v-if="value.local_meaning"
            :id="'tooltip-' + key"
            class="word-info"
          >
            {{ value.local_meaning }}
          </div>
        </div>
        <div class="item word-action" v-if="!getButtonStatus">
          <a @click="this.addAgendaWord(value)">
            <playlist-plus></playlist-plus>
          </a>
        </div>
        <div class="item word-action" v-else>
          <check></check>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapActions, mapGetters } from "vuex";
import { PlaylistPlus, PlayBoxOutline, Check, InformationVariant } from "mdue";

@Options({
  components: {
    PlayBoxOutline,
    PlaylistPlus,
    Check,
    InformationVariant,
  },
  watch: {
    "$route.params.word": function (par) {
      this.currentRoute = par;
    },
    getWord: {
      handler(val) {
        this.wordData = val.data;
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters({
      getWord: "WORD_INFO/getData",
      getButtonStatus: "WORD/getButtonStatus",
    }),
  },
  methods: {
    ...mapActions({
      actionSearch: "WORD_INFO/WORD_REQUEST",
      actionAddWord: "WORD/ADD_WORD_REQUEST",
      actionButtonStatus: "WORD/CHANGE_WORD_BUTTON_STATUS_ACTION",
    }),
  },
})
export default class WordInfo extends Vue {
  wordData: Array<any> = [{}];
  currentRoute: any;
  actionSearch: any;
  actionAddWord: any;
  actionButtonStatus: any;

  private playAudio(mediaUrl: string): void {
    new Audio(mediaUrl).play();
  }

  private addAgendaWord(data: any): void {
    let AgendaWordAttributes = {
      type: "agenda",
      word: data.word,
      lexical_category: data.type,
      local_meaning: data.local_meaning,
      audio_uk: data.audio_uk,
      audio_us: data.audio_us,
      spell: data.phonetic_spelling,
      word_info: data.word_info,
    };

    this.actionAddWord(AgendaWordAttributes);
  }

  mounted(): void {
    this.actionButtonStatus(false);
  }

  created(): void {
    this.currentRoute = this.$route.params.word;
    this.actionSearch(this.currentRoute);
  }
}
</script>
