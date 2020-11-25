<template>
  <div>
    <div class="page search-area">
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        v-model="searchText"
      />

      <button
        @click="this.searchText = ''"
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
      >
        <text-box-remove-outline></text-box-remove-outline>
        <span> CLEAR</span>
      </button>
    </div>
    <div :class="[viewType ? 'grid' : 'list', 'page agenda-list']">
      <div class="view-type-button" @click="this.listViewChanger()">
        <format-list-bulleted v-if="viewType"></format-list-bulleted>
        <grid-large v-else></grid-large>
      </div>

      <draggable
        v-model="wordData"
        tag="transition-group"
        :component-data="{ name: 'fade' }"
        item-key="_id"
        :sort="draggableStatus"
        @change="dragDrop"
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
                  :id="element._id"
                  v-tooltip=""
                  @click="wordInfoAction(element.word)"
                ></information-variant>
              </div>
              <div
                v-if="element.local_meaning"
                :id="'tooltip-' + element._id"
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
  TextBoxRemoveOutline,
} from "mdue";
import { privateDecrypt } from "crypto";

@Options({
  components: {
    GridLarge,
    FormatListBulleted,
    PlayBoxOutline,
    InformationVariant,
    draggable,
    TextBoxRemoveOutline,
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
    searchText: {
      handler(text) {
        this.draggableStatus = !text;
        this.searchWord(text);
      },
      deep: true,
    },
    getWord: {
      handler(val) {
        let shortedWord = JSON.parse(JSON.stringify(val.data)).sort(function (
          a: any,
          b: any
        ) {
          return a.order - b.order;
        });

        this.wordData = shortedWord;
        this.allWord = shortedWord;
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters({
      getWord: "WORD/getData",
      getInfo: "TURENG/getData",
    }),
  },
  methods: {
    ...mapActions({
      actionGetWord: "WORD/WORD_REQUEST",
      actionUpdateWordOrder: "WORD/UPDATE_WORD_ORDER_REQUEST",
      actionInfo: "TURENG/WORD_INFO_REQUEST",
    }),
  },
})
export default class WordInfo extends Vue {
  viewType: boolean = true;
  wordInfo: Array<object> = [];
  wordData: Array<object> = [];
  allWord: Array<object> = [];
  showModal: boolean = false;
  currentRoute: string = "agenda";
  searchText: string = "";
  actionGetWord: any;
  actionUpdateWordOrder: any;
  actionInfo: any;
  getWord: any;
  getInfo: any;
  draggableStatus: boolean = true;

  private listViewChanger(): void {
    this.viewType = !this.viewType;
  }

  private searchWord(text: string) {
    let vm = this;

    if (!vm.searchText) {
      vm.wordData = vm.allWord;
      return [];
    }

    this.wordData = vm.allWord.filter((value: any) => {
      return (
        value.word.toLowerCase().indexOf(vm.searchText.toLowerCase()) != -1
      );
    });
  }

  private playAudio(mediaUrl: string) {
    new Audio(mediaUrl).play();
  }

  private wordInfoAction(word: string) {
    this.actionInfo(word);
  }

  private dragDrop(el: any) {
    if (el.moved) {
      el.moved.element.order = el.moved.newIndex;
      let vm = this;

      let sortedItems = this.wordData.map(function (val: any, index: Number) {
        return {
          id: val._id,
          order: index,
        };
      });

      vm.actionUpdateWordOrder({ items: sortedItems });
    }
  }

  created() {
    this.actionGetWord(this.currentRoute);
  }
}
</script>

