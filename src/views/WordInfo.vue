<template>
  <div>
    <div class="page word-info-list" v-if="wordData[0].hasOwnProperty('word')">
      <div class="row-f" v-for="(value, key) in this.wordData" :key="key.id">
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
        <div
          class="item local-meaning"
          @click="actionTureng(value.word), (modalHeaderText = value.word)"
        >
          <information-variant v-tooltip="" :id="key"></information-variant>
  
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

    <vue-final-modal
      v-model="showModal"
      classes="modal-container"
      content-class="modal-content"
      :escToClose="true"
    >
      <button class="modal__close" @click="showModal = false">
        <close class="text-red-600"></close>
      </button>
      <span class="modal__title text-yellow-500">{{ modalHeaderText }}</span>
      <div class="modal__content">
        <div v-for="(info,index) in getTurengWordInfo" :key="index" class="flex flex-row">
          <div class="info-box text-red-400 flex-none">
            {{ info.category }} - {{ info.type }}
          </div>
          <div class="pl-3">{{ info.tur }}</div>
        </div>
      </div>
    </vue-final-modal>
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
    "$route.params.word": function(par) {
      this.currentRoute = par;
    },
     getTurengWordInfo: {
      handler() {
        this.showModal = true;
      },
      deep: true,
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
      getTurengWordInfo: "TURENG/getData",
      getWord: "WORD_INFO/getData",
      getButtonStatus: "WORD/getButtonStatus",
    }),
  },
  methods: {
    ...mapActions({
      actionTureng: "TURENG/WORD_INFO_REQUEST",
      actionSearch: "WORD_INFO/WORD_REQUEST",
      actionAddWord: "WORD/ADD_WORD_REQUEST",
      actionButtonStatus: "WORD/CHANGE_WORD_BUTTON_STATUS_ACTION",
    }),
  },
})
export default class WordInfo extends Vue {
  wordData: Array<any> = [{}];
  showModal = false;
  modalHeaderText = "";
  currentRoute: any;
  actionTureng: any;
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
