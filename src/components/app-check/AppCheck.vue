<template>
  <li class="item">
    <input type="checkbox" :value="code" v-model="bool" :id="code">
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
  mounted: function() {console.log(this.appName)},
};
</script>

<style src="./AppCheck.css" />

