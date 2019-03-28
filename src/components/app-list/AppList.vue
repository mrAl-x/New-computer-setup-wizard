<template>
  <div>
    <input type="text" class="filterInput" v-model="filter" placeholder="Search">
    <ul class="list">
      <AppCheck
        v-for="(app, index) in filteredApps"
        :name="app.name"
        :code="app.code"
        :logoUrl="app.logoUrl"
        :key="index"
        @handleAppCheck="(payload) => $emit('handleAppCheck', payload)"
      />
    </ul>
  </div>
</template>

<script>
import appList from "../../shared/data/appList";
import AppCheck from "../app-check/AppCheck.vue";

export default {
  name: "AppList",
  components: { AppCheck },
  data() {
    return {
      apps: appList,
      filter: "",
      selectedApps: []
    };
  },
  computed: {
    filteredApps() {
      /* Regex will be case insentive */
      const regex = new RegExp(this.filter, "i");
      const filteredApps = this.apps.filter(app => app.name.match(regex));

      return filteredApps;
    }
  }
};
</script>

<style src='./AppList.css' />;