<template>
  <div id="" v-cloak>
    <div class="box" :class="{isactive:light}"></div>
  </div>
</template>

<script>
export default {
  props: {
    light: {
      type: Boolean,
      default: () => false,
    },
  },
  components: {},

  data() {
    return {};
  },
  filters: {},
  mounted() {},
  created() {},
  methods: {},
};
</script>
<style lang="scss" >
.box {
  width: 0.16rem;
  height: 0.16rem;
  border-radius: 0.04rem;
  background-color: var(--borderColor);
}
.isactive {
  background-color: rgba(142, 210, 176, 1);
}
</style>
