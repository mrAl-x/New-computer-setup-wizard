<template>
  <div id="app">
    <p>You should first install XCode by pasting the following code in your terminal*:</p>
    <code @click="copyContent" ref="xcodeCodeLine">$ xcode-select --install</code>
    <p>Then we need to install homebrew:</p>
    <code
      @click="copyContent"
      ref="xcodeCodeLine"
    >$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"</code>
    <p>Now you can just select the apps you want to install:</p>
    <ul class="list">
      <AppCheck
        v-for="(app, index) in apps"
        :name="app.name"
        :code="app.code"
        :key="index"
        @isAppChecked="updateCode"
      />
    </ul>
    <code @click="copyContent" ref="caskCodeLine">$ brew cask install
      <template v-for="app in selectedApps">{{`${app} `}}</template>
    </code>
  </div>
</template>

<script>
import appList from "./data/appList";
import AppCheck from "./components/app-check/AppCheck.vue";

export default {
  name: "app",
  use: function() {
    return VueClipboard;
  },
  components: { AppCheck },
  data: function() {
    return {
      apps: appList,
      selectedApps: [],
      copyCode: "copy code"
    };
  },
  methods: {
    updateCode(app) {
      if (app.isChecked) {
        this.selectedApps = [...this.selectedApps, app.code];
      } else {
        const index = this.selectedApps.findIndex(
          appName => appName === app.code
        );

        this.selectedApps = [
          ...this.selectedApps.slice(0, index),
          ...this.selectedApps.slice(index + 1)
        ];
      }
    },
    copyContent(e) {
      // e.target;
      this.$refs.caskCodeLine;
      console.log(e.target.innerText);
    }
  }
};
</script>

<!-- Global CSS -->
<style src="./App.css" />
