<template>
  <div id="app">
    <main class="mainWrapper">
      <p>You should first install XCode by pasting the following code in your terminal*:</p>
      <div class="codeWrapper">
        <code id="xcode" class="codeArea" @click="copyContent">$ xcode-select --install</code>
        <p :class="['message', {'message--active': successMessage.xcode}]">{{successMessage.xcode}}</p>
      </div>
      <p>Then we need to install homebrew:</p>
      <div class="codeWrapper">
        <code
          id="homebrew"
          class="codeArea"
          @click="copyContent"
        >$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"</code>
        <p
          :class="['message', {'message--active': successMessage.homebrew}]"
        >{{successMessage.homebrew}}</p>
      </div>
      <p>Now you can just select the apps you want to install:</p>
      <ul class="list">
        <AppCheck
          v-for="(app, index) in apps"
          :name="app.name"
          :code="app.code"
          :logoUrl="app.logoUrl"
          :key="index"
          @isAppChecked="updateCode"
        />
      </ul>
      <div class="codeWrapper">
        <code id="cask" class="codeArea" @click="copyContent" ref="caskCodeLine">
          $ brew cask install --force
          <template v-for="app in selectedApps">{{`${app} `}}</template>
        </code>
        <p :class="['message', {'message--active': successMessage.cask}]">{{successMessage.cask}}</p>
      </div>
      <p>
        You'll have to enter your password in the terminal
        <br>
        <small
          class="sidenote"
        >You won't be able to see yourself typing in the password but, don't worry, the terminal is paying attention 😉</small>
      </p>
    </main>
  </div>
</template>

<script>
import appList from "./shared/data/appList";
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
      copyCode: "copy code",
      selectedApps: [],
      successMessage: {
        cask: null,
        homebrew: null,
        xcode: null
      }
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
      const regex = /[^$]*/g;
      const command = e.target.innerText.substr(2);
      const messageId = e.target.id;

      this.$copyText(command).then(() => {
        this.successMessage[messageId] = "Code copied";

        return setTimeout(() => {
          this.successMessage[messageId] = null;
        }, 2000);
      });
    }
  }
};
</script>

<!-- Global CSS -->
<style src="./App.css" />
