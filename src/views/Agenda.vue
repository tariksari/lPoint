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
          <slot>
            Do you want to delete
            <span class="text-red-400">{{ wordToBeDelete.word }}</span> ?
          </slot>
        </div>
        <div class="modal__action">
          <button
            @click="confirmDeleteWord()"
            class="btn rounded-2 cbtn btn_ok"
          >
            <delete-forever-outline></delete-forever-outline>
            <span> YES</span>
          </button>
          <div></div>
          <button @click="clearDeleteWord()" class="btn rounded-2 cbtn btn_no">
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
      <input class="rounded-2" type="text" v-model="searchText" />

      <button @click="this.searchText = ''" class="btn rounded-2">
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
        :animation="300"
        v-model="words"
        tag="transition-group"
        :component-data="{ name: 'fade' }"
        item-key="_id"
        :sort="draggableStatus"
        @change="dragDrop"
      >
        <template #item="{ element, index }">
          <div class="item">
            <div class="action">
              <div class="left">
                <div class="box">
                  <div class="content uk">
                    <play-box-outline
                      class="play"
                      @click="this.playAudio(element.audio_uk)"
                    ></play-box-outline>
                  </div>
                  <div class="content us">
                    <play-box-outline
                      class="play"
                      @click="this.playAudio(element.audio_us)"
                    ></play-box-outline>
                  </div>
                </div>
                <div class="box">
                  <div class="content info">
                    <information-variant
                      class="block top-1"
                      :id="element._id"
                      v-tooltip=""
                      @click="
                        wordInfoAction(
                          element,
                          (modalHeaderText = element.word)
                        )
                      "
                    ></information-variant>
                    <div
                      :id="'tooltip-' + element._id"
                      class="word-info"
                    >
                      {{ element.local_meaning }}
                    </div>
                  </div>
                  <div class="content delete">
                    <a
                      class=""
                      id="options-menu"
                      aria-haspopup="true"
                      aria-expanded="true"
                      @click="deleteWord(element._id, element.word, index)"
                    >
                      <delete-forever-outline></delete-forever-outline>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="action">
              <div class="right">
                <div class="box audio">
                  <div class="box movup">
                    <arrow-up @click="moveUpItem(element._id)" />
                  </div>
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
import { Options, Vue } from "vue-class-component";
import { mapActions, mapGetters } from "vuex";
import draggable from "vuedraggable";

import {
  GridLarge,
  FormatListBulleted,
  PlayBoxOutline,
  InformationVariant,
  TextBoxRemoveOutline,
  Close,
  DeleteForeverOutline,
  CloseBoxOutline,
  ArrowUp,
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
    CloseBoxOutline,
    ArrowUp,
  },
  watch: {
    "$route.params.word": function(par) {
      this.currentRoute = par;
    },
    getTurengWordInfo: {
      handler(val) {
        this.wordInfo = val;
        this.showModal = true;
        this.updateWordLocalMeaning(val);
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
        this.words = val.data;
        this.wordCollection = val.data;
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
      actionUpdateWord: "WORD/UPDATE_WORD_REQUEST",
      actionUpdateWordOrder: "WORD/UPDATE_WORD_ORDER_REQUEST",
      actionDeleteWord: "WORD/DELETE_WORD_REQUEST",
      actionInfo: "TURENG/WORD_INFO_REQUEST",
    }),
  },
})
export default class Agenda extends Vue {
  viewType = true;
  wordInfo: Array<any> = [];
  words: Array<any> = [];
  wordCollection: Array<any> = [];
  showModal = false;
  modalHeaderText = "true";
  currentRoute = "agenda";
  searchText = "";
  actionGetWord: any;
  actionUpdateWord: any;
  actionUpdateWordOrder: any;
  actionDeleteWord: any;
  actionInfo: any;
  getWord: any;
  getInfo: any;
  draggableStatus = true;
  deleteModalShow = false;
  wordToBeDelete: {
    id?: string;
    word?: string;
    index?: number;
  } = {};
  itemSelectedForVocabulary: any = [];

  private listViewChanger(): void {
    this.viewType = !this.viewType;
  }

  private updateWordLocalMeaning(localMeaning: any): void {
    localMeaning = localMeaning.slice(0, 5);

    const formatedLocalMeaning = localMeaning.reduce(
      (prevItem: any, currentItem: any, i: any) => {
        const isIndicator = i !== localMeaning.length - 1 ? ", " : "";

        return prevItem + currentItem.tur + isIndicator;
      },
      ""
    );

    if (
      formatedLocalMeaning.lenght !== 0 &&
      this.itemSelectedForVocabulary.local_meaning.length === 0
    ) {
      this.actionUpdateWord({
        ...this.itemSelectedForVocabulary,
        id: this.itemSelectedForVocabulary._id,
        local_meaning: formatedLocalMeaning,
      }).then(() => {
        setTimeout(() => {
          this.actionGetWord(this.currentRoute);
        }, 200);
      });
    }
  }

  private moveUpItem(_id: any) {
    let vm = this;
    let attributes = {
      id: _id,
      order: 0,
      list_type: "agenda",
    };

    vm.actionUpdateWordOrder(attributes).then(() => {
      setTimeout(() => {
        this.actionGetWord(this.currentRoute);
      }, 200);
    });
  }

  private searchWord() {
    let vm = this;

    if (!vm.searchText) {
      vm.words = vm.wordCollection;
      return [];
    }

    this.words = vm.wordCollection.filter((value: any) => {
      if (value.word) {
        return (
          value.word.toLowerCase().indexOf(vm.searchText.toLowerCase()) != -1
        );
      }
    });
  }

  private playAudio(mediaUrl: string) {
    new Audio(mediaUrl).play();
  }

  private confirmDeleteWord() {
    let vm = this;
    vm.deleteModalShow = false;
    vm.actionDeleteWord(vm.wordToBeDelete.id);
    setTimeout(() => this.actionGetWord(this.currentRoute), 500);
  }

  private clearDeleteWord() {
    this.deleteModalShow = false;
    this.wordToBeDelete = {};
  }

  private wordInfoAction(element: any): void {
    this.itemSelectedForVocabulary = element;
    this.actionInfo(element.word);
  }

  private deleteWord(id: string, word: string) {
    this.$vfm.show("deleteModal");
    this.wordToBeDelete = { id: id, word: word };
  }

  private dragDrop(el: any) {
    if (el.moved) {
      let vm = this;
      let attributes = {
        id: el.moved.element._id,
        order: el.moved.newIndex,
        list_type: "agenda",
      };

      vm.actionUpdateWordOrder(attributes);
    }
  }

  created(): void {
    this.actionGetWord(this.currentRoute);
  }
}
</script>
