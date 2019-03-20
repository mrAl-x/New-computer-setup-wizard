<template>
  <li class="item">
    <input type="checkbox" :value="code" v-model="isChecked" :id="code">
    <label :for="code">{{name}}</label>
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
    }
  },
  data() {
    return {
      isChecked: false,
    };
  },
  watch: {
    isChecked(newVal, oldVal) {
      this.$emit('isAppChecked', {code: this.code, isChecked: newVal});
    }
  },
};
</script>

<style src="./AppCheck.css" scoped />

