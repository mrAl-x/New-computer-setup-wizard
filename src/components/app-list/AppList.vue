<template>
  <div>
    <input type="text" class="filterInput" v-model="filter" placeholder="Search">
    <ul class="categoryList">
      <li class="category" v-for="(category, index) in categories" :key="index">
        <h2 class="category__title">{{ category }}</h2>
        <ul class="appList">
          <AppCheck
            v-for="(app, index) in appsOfCategory(category)"
            :name="app.name"
            :code="app.code"
            :logoUrl="app.logoUrl"
            :key="index"
            @handleAppCheck="(payload) => $emit('handleAppCheck', payload)"
          />
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import apps from "../../shared/data/apps";
import AppCheck from "../app-check/AppCheck.vue";

export default {
  name: "AppList",
  components: { AppCheck },
  data() {
    return {
      apps: apps,
      filter: "",
      selectedApps: []
    };
  },
  created() {
    this.categories = this.getCategories();
  },
  computed: {
    filteredApps() {
      /* Regex will be case insentive */
      const regex = new RegExp(this.filter, "i");
      const filteredApps = this.apps.filter(app => app.name.match(regex));

      return filteredApps;
    }
  },
  methods: {
    getCategories() {
      const filteredApps = apps.reduce((acc, app) => {
        if (!acc) {
          return [app.category];
        }

        return acc.find(category => category === app.category)
          ? acc
          : [...acc, app.category];
      }, null);

      return filteredApps;
    },
    appsOfCategory(category) {
      const filteredApps = apps.filter(app => app.category === category);

      return filteredApps;
    }
  }
};
</script>

<style src='./AppList.css' />;