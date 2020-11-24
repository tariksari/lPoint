<template>
  <div>
    <div
      :class="[viewType ? 'grid' : 'list', 'page agenda-list']"
      draggable="true"
    >
      <div class="view-type-button" @click="this.listViewChanger()">
        <format-list-bulleted v-if="viewType"></format-list-bulleted>
        <grid-large v-else></grid-large>
      </div>

      <draggable
        v-model="wordData"
        tag="transition-group"
        :component-data="{ name: 'fade' }"
        item-key="_id"
        :sort="true"
        @change="log"
      >
        <template #item="{ element }">
          <div class="item">
            <div class="action">
              <div class="box audio">
                <div class="box uk">
                  <play-box-outline
                    class="play"
                    @click="this.playAudio(element.audio_uk)"
                  ></play-box-outline>
                </div>
                <div class="box us">
                  <play-box-outline
                    class="play"
                    @click="this.playAudio(element.audio_us)"
                  ></play-box-outline>
                </div>
              </div>
              <div class="box info">
                <information-variant
                  :style="[
                    element.local_meaning
                      ? { color: '#ffd78c' }
                      : { color: '#FFF' },
                  ]"
                  :id="'i-' + element._id"
                  @click="wordInfoAction(element.word)"
                  @mouseover="mouseEnter"
                  @mouseleave="mouseLeave"
                ></information-variant>
              </div>
              <div
                v-if="element.local_meaning"
                :ref="'i-' + element._id"
                class="word-info"
              >
                {{ element.local_meaning }}

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
            <div class="name pd-left2x">{{ element.word }}</div>
            <div class="spell pd-left2x">{{ element.spell }}</div>
            <div class="type pd-left2x">{{ element.lexical_category }}</div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapActions, mapGetters } from "vuex";
import draggable from "vuedraggable";

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
    draggable,
  },
  data() {
    return {
      showModal: false,
      wordInfo: [],
      wordData: [],
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
      },
      deep: true,
    },
    getWord: {
      handler(val) {
        let data = JSON.parse(JSON.stringify(val.data));

        this.wordData = data.sort(function (a: any, b: any) {
          return a.order - b.order;
        });
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
    log(evt: any, www: any) {
      if (evt.moved) {
        evt.moved.element.order = evt.moved.newIndex;

        this.wordData.forEach((data: any, key: number) => {
          this.actionAgendaUpdate({
            id: data._id,
            order: key,
          });
        });
      }
    },
    ...mapActions({
      actionAgenda: "AGENDA/AGENDA_GET",
      actionAgendaUpdate: "AGENDA/UDPATE_AGENDA_WORD_REQUEST",
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

