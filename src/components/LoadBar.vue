<template>
  <div class="loader" v-show="getLoader.loader">
    <div class="v-spinner">
      <div class="v-beat v-beat-odd" v-bind:style="spinnerStyle"></div>
      <div class="v-beat v-beat-even" v-bind:style="spinnerStyle"></div>
      <div class="v-beat v-beat-odd" v-bind:style="spinnerStyle"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapGetters, mapActions } from "vuex";

@Options({
  data() {
    return {
      spinnerStyle: {
        backgroundColor: "#5dc596",
        height: "15px",
        width: "15px",
        margin: "2px",
        borderRadius: "100%",
      },
    };
  },
  computed: {
    ...mapGetters({
      getLoader: "APP/getLoader",
    }),
  },
  created() {
    // console.log(this.getLoader);
  },
})
export default class LoadBar extends Vue {}
</script>

<style scoped lang="scss">
.loader {
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #00000080;
  position: absolute;
  display: block;
  z-index: 99999;
}
.v-spinner {
  top: 50%;
  position: absolute;
  left: 46%;
}
.v-spinner .v-beat {
  -webkit-animation: v-beatStretchDelay 0.7s infinite linear;
  animation: v-beatStretchDelay 0.7s infinite linear;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  display: inline-block;
}
.v-spinner .v-beat-odd {
  animation-delay: 0s;
}
.v-spinner .v-beat-even {
  animation-delay: 0.35s;
}
@-webkit-keyframes v-beatStretchDelay {
  50% {
    -webkit-transform: scale(0.75);
    transform: scale(0.75);
    -webkit-opacity: 0.2;
    opacity: 0.2;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-opacity: 1;
    opacity: 1;
  }
}
@keyframes v-beatStretchDelay {
  50% {
    -webkit-transform: scale(0.75);
    transform: scale(0.75);
    -webkit-opacity: 0.2;
    opacity: 0.2;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-opacity: 1;
    opacity: 1;
  }
}
</style>
