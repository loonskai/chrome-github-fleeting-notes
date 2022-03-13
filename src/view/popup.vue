<template>
  <el-container>
    <el-button type="primary" @click="login()" color="#24292e"
      >Sign in</el-button
    >
  </el-container>
</template>

<script setup>
// TODO: Move to BE service (lambda?)
const STATE_STRING = process.env.VUE_APP_STATE_STRING;
const GITHUB_CLIENT_ID = process.env.VUE_APP_GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.VUE_APP_GITHUB_CLIENT_SECRET;
const REDIRECT_URI = chrome.identity.getRedirectURL("oauth2");

const authUrl = new URL("https://github.com/login/oauth/authorize");
authUrl.searchParams.append("client_id", GITHUB_CLIENT_ID);
authUrl.searchParams.append("state", STATE_STRING);
authUrl.searchParams.append("redirect_uri", REDIRECT_URI);

const getAccessToken = ({ code }) => {
  const url = new URL("https://github.com/login/oauth/access_token");
  url.searchParams.append("client_id", GITHUB_CLIENT_ID);
  url.searchParams.append("client_secret", GITHUB_CLIENT_SECRET);
  url.searchParams.append("code", code);
  url.searchParams.append("state", STATE_STRING);
  url.searchParams.append("redirect_uri", REDIRECT_URI);
  console.log(url.href);
};

function login() {
  chrome.identity.launchWebAuthFlow(
    {
      url: authUrl.href,
      interactive: true,
    },
    (redirectUrl) => {
      if (redirectUrl) {
        const responseUrl = new URL(redirectUrl);
        const response = responseUrl.searchParams.get("code") || {};
        if (response) {
          getAccessToken(response);
        } else {
          console.error("Cannot login");
        }
      } else {
        console.error("Cannot login");
      }
    }
  );
}
</script>

<style></style>
