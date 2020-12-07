<template>
  <div>
    <div>
      <vue-final-modal
          v-bind="$attrs"
          classes="modal-container"
          content-class="modal-content"
          v-model="deleteModalShow"
          name="deleteModal"
          :escToClose="true"
          @closed="clearDeleteWord"
      >
        <div class="modal__content">
          <slot
          >
            Do you want to delete <span class="text-red-400">{{ deleteWordData.word }}</span> ?
          </slot
          >
        </div>
        <div class="modal__action">
          <button
              @click="confirmDeleteWord()"
              class="transition duration-500 ease-in-out transform hover:-translate-x-1 hover:scale-120 bg-green-500
               hover:bg-green-800  px-6 py-1 rounded inline-flex items-center text-xs mr-3"
          >
            <delete-forever-outline></delete-forever-outline>
            <span> YES</span>
          </button>
          <div></div>
          <button
              @click="clearDeleteWord()"
              class="transition duration-500 ease-in-out transform hover:-translate-x-1 hover:scale-120 bg-red-500
               hover:bg-red-800  px-6 py-1 rounded inline-flex items-center text-xs text-white"
          >
            <close-box-outline></close-box-outline>
            <span> NO</span>
          </button>
        </div>
      </vue-final-modal>

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
          <div v-for="info in wordInfo" :key="info" class="flex flex-row">
            <div class="info-box text-red-400 flex-none">
              {{ info.category }} - {{ info.type }}
            </div>
            <div class="pl-3">{{ info.tur }}</div>
          </div>
        </div>
      </vue-final-modal>
    </div>

    <div class="page search-area">
      <input
          class="shadow-2xl shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          v-model="searchText"
      />

      <button
          @click="this.searchText = ''"
          class="transition duration-500 ease-in-out transform hover:-translate-x-1 hover:scale-120 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
      >
        <text-box-remove-outline></text-box-remove-outline>
        <span> CLEAR</span>
      </button>
    </div>
    <div :class="[viewType ? 'grid' : 'list', 'page agenda-list']">
      <div class="view-type-button z-50" @click="this.listViewChanger()">
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
        <template #item="{ element, index }">
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
              <div class="box">
                <div class="bg-middle-blue hover:bg-middle-dark text-yellow-300 info h-5
                flex cursor-pointer border-b border-opacity-25 border-black">
                  <information-variant
                      class="block top-1"
                      :id="element._id"
                      v-tooltip=""
                      @click="
                      wordInfoAction(
                        element.word,
                        (modalHeaderText = element.word)
                      )
                    "
                  ></information-variant>
                  <div
                      v-if="element.local_meaning"
                      :id="'tooltip-' + element._id"
                      class="word-info"
                  >
                    {{ element.local_meaning }}
                  </div>
                </div>
                <div class="bg-middle-blue hover:bg-middle-dark text-red-200 h-5 ">
                  <button
                      type="button"
                      class="delete"
                      id="options-menu"
                      aria-haspopup="true"
                      aria-expanded="true"
                      @click="deleteWord(element._id, element.word, index)"
                  >
                    <delete-forever-outline></delete-forever-outline>
                  </button>
                </div>
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
import {Options, Vue, VueMixin} from "vue-class-component";
import {mapActions, mapGetters} from "vuex";
import draggable from "vuedraggable";

import {
  GridLarge,
  FormatListBulleted,
  PlayBoxOutline,
  InformationVariant,
  TextBoxRemoveOutline,
  Close,
  DeleteForeverOutline,
  CloseBoxOutline
} from "mdue";

@Options({
  components: {
    GridLarge,
    FormatListBulleted,
    PlayBoxOutline,
    InformationVariant,
    draggable,
    TextBoxRemoveOutline,
    Close,
    DeleteForeverOutline,
    CloseBoxOutline
  },
  watch: {
    "$route.params.word": function (par) {
      this.currentRoute = par;
    },
    getTurengWordInfo: {
      handler(val) {
        this.wordInfo = val.data;
        this.showModal = true;
      },
      deep: true,
    },
    searchText: {
      handler(text) {
        this.draggableStatus = !text;
        this.searchWord();
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
      getTurengWordInfo: "TURENG/getData",
    }),
  },
  methods: {
    ...mapActions({
      actionGetWord: "WORD/WORD_REQUEST",
      actionUpdateWordOrder: "WORD/UPDATE_WORD_ORDER_REQUEST",
      actionDeleteWord: "WORD/DELETE_WORD_REQUEST",
      actionInfo: "TURENG/WORD_INFO_REQUEST",
    }),
  },
})
export default class Agenda extends Vue {
  viewType: boolean = true;
  wordInfo: Array<object> = [];
  wordData: Array<object> = [];
  allWord: Array<object> = [];
  showModal: boolean = false;
  modalHeaderText: string = "true";
  currentRoute: string = "agenda";
  searchText: string = "";
  actionGetWord: any;
  actionUpdateWordOrder: any;
  actionDeleteWord: any;
  actionInfo: any;
  getWord: any;
  getInfo: any;
  draggableStatus: boolean = true;
  deleteModalShow: boolean = false;
  deleteWordData: {
    id?: string;
    word?: string;
    index?: Number;
  } = {};

  private listViewChanger(): void {
    this.viewType = !this.viewType;
  }

  private searchWord() {
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

  private confirmDeleteWord() {
    let vm = this;
    vm.deleteModalShow = false;
    vm.actionDeleteWord(vm.deleteWordData.id);
    this.actionGetWord(this.currentRoute);
  }

  private clearDeleteWord() {
    this.deleteModalShow = false;
    this.deleteWordData = {};
  }

  private wordInfoAction(word: string): void {
    this.actionInfo(word);
  }

  private deleteWord(id: string, word: string) {
    this.$vfm.show("deleteModal");
    this.deleteWordData = {id: id, word: word};
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

      vm.actionUpdateWordOrder({items: sortedItems});
    }
  }

  created() {
    this.actionGetWord(this.currentRoute);
  }
}
</script>