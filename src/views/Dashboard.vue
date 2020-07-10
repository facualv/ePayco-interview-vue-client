<template>
  <div class="container">
    <div class="jumbotron">
      <h1 class="display-3">PANEL DE CONTROL</h1>
      <p class="lead">
        A traves de este panel podras hacer pagos y recargar tu billetera
      </p>
      <form class="form-inline">
        <div class="form-group mb-2">
          <button type="submit" class="btn btn-primary">Consultar Saldo</button>
        </div>
        <div class="form-group ml-2 pl-10">
          <div v-if="currentBalance" type="submit" class="alert alert-danger">
            {{ currentBalance }}
          </div>
        </div>
      </form>
    </div>

    <br />

    <div class="row">
      <div class="col-md-12">
        <h1 class="text-center">Emitir un pago</h1>
        <form class="text-center" style="margin:auto" @submit.prevent="payment()">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="ammount">Ingrese el monto</label>
              <input
                v-model="paymentData.ammount"
                type="number"
                class="form-control"
                id="paymentAmmount"
                placeholder="Monto del Pago (solo numeros)"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="detail">Detalle del pago</label>
              <input
                v-model="paymentData.detail"
                type="text"
                class="form-control"
                id="detail"
                placeholder="Detalles del pago "
              />
            </div>
          </div>
          <button type="submit" class="btn btn-primary col-md-12">
            Enviar datos del pago
          </button>
        </form>
        <br />
        <p class="text-danger">
          Luego de que envies los datos del pago, te enviaremos a tu correo un token de
          seguridad y un id de sesión, ingresalos para confirmar el pago
        </p>
        <br />
        <form class="text-center" style="margin:auto" @submit.prevent="payment()">
          <div class="form-row">
            <div class="form-group col-md-6">
              <input
                v-model="paymentData.token"
                type="text"
                class="form-control"
                id="token"
                placeholder="TOKEN DE SEGURIDAD"
              />
            </div>
            <div class="form-group col-md-6">
              <input
                v-model="paymentData.sessionId"
                type="text"
                class="form-control"
                id="sessionId"
                placeholder="ID DE SESION"
              />
            </div>
            <button type="submit" class="btn btn-danger col-md-12">CONFIRMAR PAGO</button>
          </div>
        </form>
        <br />
      </div>
    </div>
    <br />
  </div>
</template>
<script>
  import axios from 'axios';
  import Swal from 'sweetalert2';

  export default {
    data: () => ({
      errorMessage: '',
      paymentData: {
        ammount: '',
        detail: '',
        token: '',
        sessionId: ''
      },
      rechargeData: {
        ammount: '',
        details: ''
      },
      currentBalance: ''
    }),
    methods: {
      payment() {
        const body = {
          ammount: this.paymentData.ammount,
          detail: this.paymentData.detail,
          token: this.paymentData.token,
          sessionId: this.paymentData.sessionId
        };

        const url = 'http://localhost:5000/payment';

        axios.defaults.headers.common['Content-Type'] = 'application/json';

        axios
          .post(url, body)
          .then((response) => {
            if (response.data.message.includes('INVALID')) {
              Swal.fire({
                icon: 'error',
                title: 'Payment Confirmation Failed',
                text: response.data.message,
                timer: 1200
              });
            } else {
              Swal.fire({
                icon: 'success',
                title: 'Payment Successfull',
                text: response.data.message,
                showConfirmButton: false,
                timer: 3000
              });
            }
            console.log(response.data);
          })
          .catch((error) => {
            Swal.fire({
              title: 'Error!',
              text: error.message,
              icon: 'error',
              confirmButtonText: 'OK'
            });
            console.log(err);
          });
        console.log('Payment', body);
      }
    }
  };
</script>
