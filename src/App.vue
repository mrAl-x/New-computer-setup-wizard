<template>
  <div id="app">
    <form>
      <ul class="list">
        <AppCheck v-for="(app, index) in apps" :name="app.name" :code="app.code" :key="index"/>
      </ul>
    </form>
  </div>
</template>

<script>
import appList from "./data/appList";
import AppCheck from "./components/app-check/AppCheck.vue";

export default {
  name: "app",
  components: { AppCheck },
  data: function() {
    return {
      apps: appList
    };
  }
};
</script>

<!-- Global CSS -->
<style src="./App.css" />
