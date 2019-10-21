<template>
  <div id="app">
    <main class="mainWrapper">
      <h1>First Setup Wizard 🧙‍♂️</h1>
      <p>This page allows you to pick multiple apps and install them all at once through your computer's terminal.</p>
      <h2>Requirements</h2>
      <p>
        You should first install
        <strong>XCode</strong>, if you haven't already, by pasting the following code in your terminal:
      </p>
      <small class="sidenote">Pro tip: you can just click any code section to copy it</small>
      <div class="codeWrapper">
        <code id="xcode" class="codeArea" @click="copyContent">$ xcode-select --install</code>
        <p :class="['message', {'message--active': successMessage.xcode}]">{{successMessage.xcode}}</p>
      </div>
      <p>
        Then you need to install
        <a href="https://brew.sh/">Homebrew</a>:
      </p>
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
      <p>Pick select the apps you want to install:</p>
      <AppList @handleAppCheck="updateCode" />
      <p>Finally you can copy and paste the code bellow on your terminal and you're golden! 👌</p>
      <div class="codeWrapper">
        <code id="cask" class="codeArea" @click="copyContent" ref="caskCodeLine">
          $ brew cask install --force
          <template v-for="app in selectedApps">{{`${app} `}}</template>
        </code>
        <p :class="['message', {'message--active': successMessage.cask}]">{{successMessage.cask}}</p>
      </div>
      <p>
        Oh! One more thing you'll have to enter your password in the terminal
        <br />
        <small
          class="sidenote"
        >You won't be able to see yourself typing in the password but, don't worry, the terminal is paying attention 😉</small>
      </p>
    </main>
    <footer class="footer">
      <span>
        Coded by
        <a href="https://twitter.com/mrAl_x" target="_blank" class="footer__link">@mrAl_x</a>
      </span>
      <a href="https://github.com/mrAl-x/setup_wizard" alt="Github repository" target="_blank">
        <img
          src="./shared/assets/images/github.png"
          class="footer__icon"
          alt="Github logo"
          aria-hidden
        />
      </a>
    </footer>
  </div>
</template>

<script>
import AppList from "./components/app-list/AppList.vue";

export default {
  name: "app",
  components: { AppList },
  data: function() {
    return {
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
    },

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
    }
  }
};
</script>

<!-- Global CSS -->
<style src="./App.css" />
