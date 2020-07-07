<template>
  <div>
    <div class="jumbotron">
      <h1 class="display-3">Wallet, la billetera pueblo!</h1>
      <p class="lead">Virtual Wallet te hace mas facil la vida</p>
      <hr class="my-4" />
      <p>Virtual Wallet te hace mas facil la vida</p>
      <p class="lead">
        <router-link class="btn btn-primary btn-lg" :to="{ name: 'signup'}" role="button">Registrarse</router-link>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Home",
  components: {}
};
</script>
