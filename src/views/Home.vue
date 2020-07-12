<template>
  <div class="container">
    <div class="jumbotron">
      <h1 class="display-3">Wallet, la billetera pueblo!</h1>
      <p class="lead">Virtual Wallet te hace mas facil la vida</p>
      <p class="lead">
        <router-link class="btn btn-primary btn-lg" :to="{ name: 'signup' }" role="button"
          >Registrarse</router-link
        >
      </p>
    </div>
    <div class="container row">
      <div class="col-md-6">
        <h1 class="text-center">Recarga tu saldo</h1>
        <form
          ref="recharge"
          class="text-center"
          style="margin:auto"
          @submit.prevent="recharge()"
        >
          <div class="form-row">
            <div class="form-group col-md-12">
              <label for="rechargAmount">Ingrese el monto de la recarga</label>
              <input
                v-model="rechargeData.amount"
                type="number"
                class="form-control"
                id="rechargAmount"
                placeholder="Monto"
              />
            </div>
            <div class="form-group col-md-12">
              <label for="rechargePhone">Ingrese su telefono</label>
              <input
                v-model="rechargeData.phone"
                type="number"
                class="form-control"
                id="rechargePhone"
                placeholder="Telefono"
              />
            </div>
            <div class="form-group col-md-12">
              <label for="rechargClientId">Ingrese su documento</label>
              <input
                v-model="rechargeData.clientId"
                type="number"
                class="form-control"
                id="rechargClientId"
                placeholder="Documento"
              />
            </div>
            <div class="form-group col-md-12">
              <label for="detail">Detalles de la recarga (opcinal)</label>
              <input
                v-model="rechargeData.detail"
                type="text"
                class="form-control"
                id="detail"
                placeholder="Detalle"
              />
            </div>
          </div>
          <button type="submit" class="btn btn-primary col-md-12">Recargar</button>
        </form>
      </div>
      <div class="col-md-6">
        <h1 class="text-center">Consulta tu saldo</h1>
        <form
          ref="getBalalance"
          class="text-center"
          style="margin:auto"
          @submit.prevent="getBalance()"
        >
          <div class="form-row">
            <div class="form-group col-md-12">
              <label for="balancePhone">Ingrese su telefono</label>
              <input
                v-model="balanceData.phone"
                type="number"
                class="form-control"
                id="balancePhone"
                placeholder="Telefono"
              />
            </div>
            <div class="form-group col-md-12">
              <label for="balanceClientId">Ingrese su documento</label>
              <input
                v-model="balanceData.clientId"
                type="number"
                class="form-control"
                id="balanceClientId"
                placeholder="Documento"
              />
            </div>
          </div>
          <button type="submit" class="btn btn-primary col-md-12">Consultar Saldo</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import Swal from 'sweetalert2';

  export default {
    data: () => ({
      errorMessage: '',
      balanceData: {
        clientId: '',
        phone: '',
        detail: ''
      },
      rechargeData: {
        amount: '',
        clientId: '',
        phone: '',
        detail: ''
      }
    }),
    methods: {
      recharge() {
        //Clears th fields after submit
        this.$refs.recharge.reset();

        const body = {
          clientId: this.rechargeData.clientId,
          amount: this.rechargeData.amount,
          phone: this.rechargeData.phone,
          detail: this.rechargeData.detail
        };

        const url = 'http://localhost:5000/recharge';

        axios.defaults.headers.common['Content-Type'] = 'application/json';

        axios
          .post(url, body)
          .then((response) => {
            console.log(response);
            Swal.fire({
              icon: 'success',
              title: response.data.message,
              showConfirmButton: false,
              timer: 1300
            });
          })
          .catch((res, err) => {
            Swal.fire({
              title: 'Error!',
              text: response.data.message,
              icon: 'error',
              confirmButtonText: 'Cool'
            });
            console.log(err);
          });

        console.log('Recharge Body', body);
      },

      getBalance() {
        const body = {
          clientId: this.balanceData.clientId,
          phone: this.balanceData.phone
        };

        const url = 'http://localhost:5000/getBalance';

        axios.defaults.headers.common['Content-Type'] = 'application/json';

        axios
          .post(url, body)
          .then((response) => {
            Swal.fire({
              icon: 'success',
              title: response.data.message,
              text: 'Your current Balance is: ' + response.data.balance,
              showConfirmButton: true,
              confirmButtonText: 'OK'
            });
            console.log(response.data);
          })
          .catch((error) => {
            Swal.fire({
              title: 'Error!',
              text: error,
              icon: 'error',
              confirmButtonText: 'OK'
            });
            console.log(error);
          });
        console.log('Get Balance Body', body);
      }
    }
  };
</script>
