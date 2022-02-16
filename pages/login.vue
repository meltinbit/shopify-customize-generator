<template>
  <div class="login-container">
    <button @click="$auth.loginWith('github')" class="github">
      <b-icon-github font-scale="1.5"></b-icon-github>&nbsp;
      <span>Log in with GitHub</span>
    </button>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.login-container {
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
}

.github {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  background-color: black;
  color: white;
  padding: .8rem 1.2rem;
  border-radius: .4rem;
  font-size: 1rem;
}
</style>