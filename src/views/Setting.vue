<template>
  <div class="setting__content">
    <div class="form-group">
      <label>Theme Mod</label>
      <select class="form-control" v-model="themeMod">
        <option value="0">Light</option>
        <option value="1">Dark</option>
      </select>
    </div>
    <div class="form-group">
      <div class="form-action">
        <button class="btn rounded-2" @click="setThemeMod(this.themeMod)">
          <content-save-cog />
          <span> SAVE</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapGetters, mapMutations } from "vuex";

import { ContentSaveCog } from "mdue";

@Options({
  components: {
    ContentSaveCog,
  },
  computed: {
    ...mapGetters({
      getThemeMod: "APP/getThemeMod",
    }),
  },
  methods: {
    ...mapMutations({
      setThemeMod: "APP/SET_THEME_MOD",
    }),
  },
})
export default class Agenda extends Vue {
  themeMod = 0;
  setThemeMod: any;
  getThemeMod: any;

  created() {
    this.themeMod = this.getThemeMod;
  }
}
</script>
