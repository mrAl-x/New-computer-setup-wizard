<template>
  <li class="item">
    <figure class="logoWrapper">
      <img class="logo" :alt="`${name} logo`" :src="getImageUrl(logoUrl)">
    </figure>
    <input type="checkbox" class="checkbox" :value="code" v-model="isChecked" :id="code">
    <label class="label" :for="code">{{name}}</label>
    <div class="backgroundEffect"></div>
  </li>
</template>

<script lang="js">

export default {
  name: "AppCheck",
  props: {
    name: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    },
    logoUrl: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isChecked: false,
    };
  },
  methods: {
    getImageUrl(code) {
      return require(`../../${code}`);
    }
  },
  watch: {
    isChecked(newVal, oldVal) {
      this.$emit('handleAppCheck', {code: this.code, isChecked: newVal});
    }
  },
};
</script>

<style src="./AppCheck.css" />

