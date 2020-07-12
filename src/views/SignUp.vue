<template>
  <div class="container">
    <form @submit.prevent="signup()">
      <legend class="text-center">Ingrese sus datos personales</legend>
      <div class="form-group">
        <label for="name">Nombre</label>
        <input
          v-model="client.name"
          type="text"
          class="form-control"
          id="name"
          aria-describedby="nameHelp"
          placeholder="Ingrese su nombre"
          required
        />
      </div>
      <div class="form-group">
        <label for="name">Documento</label>
        <input
          v-model="client.clientId"
          type="number"
          class="form-control"
          id="clientId"
          aria-describedby="clientIdHelp"
          placeholder="Ingrese su documento"
          required
        />
      </div>
      <div class="form-group">
        <label for="phone">Telefono</label>
        <input
          v-model="client.phone"
          type="number"
          class="form-control"
          id="phone"
          aria-describedby="phoneHelp"
          placeholder="Ingrese su telefono"
          required
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email</label>
        <input
          v-model="client.email"
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          required
        />
        <small id="emailHelp" class="form-text text-muted"
          >Nunca compartiremos tu email con nadie</small
        >
      </div>

      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="password">Password</label>
          <input
            v-model="client.password"
            type="password"
            class="form-control"
            id="password"
            placeholder="Ingrese el password"
            required
          />
        </div>
        <div class="form-group col-md-6">
          <label for="passwordConfirm">Confirmar Password</label>
          <input
            v-model="client.confirmPassword"
            type="password"
            class="form-control"
            id="passwordConfirm"
            placeholder="Confirme el password elegido"
            required
          />
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Aceptar</button>
    </form>
    <br />
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
  import Joi from 'joi';
  import axios from 'axios';
  import { signUpValidationSchema } from '../helpers/validation.helper';
  import Swal from 'sweetalert2';

  export default {
    data: () => ({
      errorMessage: '',
      client: {
        name: '',
        phone: '',
        clientId: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }),
    methods: {
      signup() {
        this.errorMessage = '';
        if (this.validClient()) {
          const url = 'http://localhost:5000/signup';
          const body = {
            clientId: this.client.clientId,
            name: this.client.name,
            phone: this.client.phone,
            email: this.client.email,
            password: this.client.password
          };

          axios
            .post(url, body)
            .then((response) => {
              // console.log(response.data.message);
              Swal.fire({
                icon: 'success',
                title: 'Operacion exitosa',
                text: response.data.message,
                showConfirmButton: false,
                timer: 3000
              });
              setTimeout(() => {
                this.$router.push('/login');
              }, 1000);
            })
            .catch((error) => {
              Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                showConfirmButton: true,
                confirmButtonText: 'Ok'
              });

              console.log(error.response);
            });
        }
      },
      validClient() {
        if (this.client.password !== this.client.confirmPassword) {
          this.errorMessage = 'Passwords must match. 🙈';
          return false;
        }

        const result = Joi.validate(this.client, signUpValidationSchema());

        if (result.error === null) {
          return true;
        }

        if (result.error.message.includes('name')) {
          this.errorMessage = 'Name is invalid 😭';
        } else {
          this.errorMessage = 'Password is invalid 🙈';
        }

        return false;
      }
    }
  };
</script>
