<template>
  <div class="header">
    <b-navbar id="header" toggleable="lg" type="dark" variant="#333">
      <b-navbar-brand to="/">Reverse Shopping</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <template v-if="isLoggedIn">
            <div id="user-link-wrapper" class="mr-4">
                ようこそ<b-link id="user-link" to="/user">hoge</b-link>さん
            </div>   
            <b-button to="/sign-in" size="sm" class="button my-2 mr-2 my-sm-0">ログアウト</b-button>
          </template>
          <b-button v-else to="/sign-in" size="sm" class="button my-2 mr-2 my-sm-0">ログイン</b-button>
          <b-button to="/sign-up" size="sm" class="button my-2 my-sm-0">新規登録</b-button>
        </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isLoggedIn : true
    }
  }
}
</script>

<style scoped>
#header {
  color: #FFF;
  background-color: #D74B4B;
}

#user-link-wrapper {
  height: 30px;
}

#user-link {
  line-height: 30px;
}
</style>
