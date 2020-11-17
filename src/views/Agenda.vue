<template>
  <div>
    <div :class="[viewType ? 'grid' : 'list', 'page agenda-list']">
      <div class="view-type-button" @click="this.listViewChanger()">
        <format-list-bulleted v-if="viewType"></format-list-bulleted>
        <grid-large v-else></grid-large>
      </div>
      <div v-for="(value, key) in this.wordData" :key="key.id" class="item">
        <div class="action">
          <div class="box audio">
            <div class="box uk">
              <play-box-outline
                class="play"
                @click="this.playAudio(value.audio_uk)"
              ></play-box-outline>
            </div>
            <div class="box us">
              <play-box-outline
                class="play"
                @click="this.playAudio(value.audio_us)"
              ></play-box-outline>
            </div>
          </div>
          <div class="box info">
            <information-variant
              :style="[
                value.local_meaning ? { color: '#ffd78c' } : { color: '#FFF' },
              ]"
              :id="'i-' + key"
              @click="wordInfoAction(value.word)"
              @mouseover="mouseEnter"
              @mouseleave="mouseLeave"
            ></information-variant>
          </div>
          <div v-if="value.local_meaning" :ref="'i-' + key" class="word-info">
            {{ value.local_meaning }}

            <ul>
              <li v-for="(value, key) in wordInfo" :key="key">
                <div v-if="wordInfo.lenght > 5000">
                  {{ value.category }}
                  {{ value.eng }}
                  {{ value.tur }}
                  {{ value.type }}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="name pd-left2x">{{ value.word }}</div>
        <div class="spell pd-left2x">{{ value.spell }}</div>
        <div class="type pd-left2x">{{ value.lexical_category }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapActions, mapGetters } from "vuex";

import {
  GridLarge,
  FormatListBulleted,
  PlayBoxOutline,
  InformationVariant,
} from "mdue";

@Options({
  components: {
    GridLarge,
    FormatListBulleted,
    PlayBoxOutline,
    InformationVariant,
  },
  data() {
    return {
      showModal: false,
      wordInfo: {},
      wordData: {},
      currentRoute: "agenda",
      viewType: true,
    };
  },
  watch: {
    "$route.params.word": function (par) {
      this.currentRoute = par;
    },
    getInfo: {
      handler(val) {
        this.wordInfo = val.data;
        console.log(this.wordInfo, "infoooo");
      },
      deep: true,
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
      getInfo: "TURENG/getData",
    }),
  },
  methods: {
    ...mapActions({
      actionAgenda: "AGENDA/AGENDA_GET",
      actionInfo: "TURENG/WORD_INFO_REQUEST",
    }),
    mouseEnter: function (el: any) {
      if (this.$refs[el.target.id]) {
        this.$refs[el.target.id].classList.add("show");
      }
    },
    mouseLeave: function (el: any) {
      if (this.$refs[el.target.id]) {
        this.$refs[el.target.id].classList.remove("show");
      }
    },
    playAudio(mediaUrl: string) {
      new Audio(mediaUrl).play();
    },
    listViewChanger() {
      this.viewType = !this.viewType;
    },
    wordInfoAction(word: string) {
      this.actionInfo(word);
    },
  },
  created() {
    this.actionAgenda(this.currentRoute);
  },
})
export default class WordInfo extends Vue {}
</script>

