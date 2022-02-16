<template>
  <div v-if="$auth.$state.loggedIn" class="user">
      <img :src="picture" class="avatar" />
      {{$auth.user.name}}
      <a href="#" @click.prevent="$auth.logout()"><b-icon-power font-scale="1.5"></b-icon-power></a>
    </div>
</template>

<script>
import get from 'lodash.get'

export default {
  computed: {
    picture() {
      return (
        get(this.$auth.user, 'picture') || // OpenID
        get(this.$auth.user, 'picture.data.url') || // Facebook graph API
        get(this.$auth.user, 'avatar_url')
      ) // GitHub
    }
  }
}
</script>

<style scoped>
.avatar {
  width: 35px;
  height: 35px;
  border-radius: 100%;
}

a:link,
a:visited {
  color: black;
}

.user {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
</style>