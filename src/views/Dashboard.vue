<template>
  <div class="container">
    <div class="jumbotron">
      <h1 class="display-3">PANEL DE PAGOS</h1>
      <p class="lead">
        Para confirmar un pago deberas ingresar el token de seguridad y el id de session a
        que te enviamos a tu email
      </p>
    </div>
    <br />
    <div class="row">
      <div class="col-md-12">
        <h1 class="text-center">Emitir un pago</h1>
        <form class="text-center" style="margin:auto" @submit.prevent="payment()">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="amount">Ingrese el monto</label>
              <input
                v-model="paymentData.amount"
                type="number"
                class="form-control"
                id="paymentAmount"
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
          amount: this.paymentData.amount,
          detail: this.paymentData.detail,
          token: this.paymentData.token,
          sessionId: this.paymentData.sessionId
        };

        const url = 'http://localhost:5000/payment';

        axios.defaults.headers.common['Content-Type'] = 'application/json';

        axios
          .post(url, body)
          .then((response) => {
            if (response.data.error) {
              Swal.fire({
                title: 'Error!',
                text: response.data.message,
                icon: 'error'
              });
            } else {
              Swal.fire({
                icon: 'success',
                title: response.data.message,
                showConfirmButton: false,
                timer: 3000
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              title: 'Error!',
              text: error.response.data.message,
              icon: 'error',
              confirmButtonText: 'OK'
            });
            console.log(error);
          });
        console.log('Payment', body);
      }
    }
  };
</script>
