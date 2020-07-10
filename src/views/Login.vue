<template>
  <div class="container">
    <form @submit.prevent="login()">
      <legend>Ingrese a su cuenta</legend>
      <div class="form-group">
        <label for="exampleInputEmail1">Email</label>
        <input
          v-model="loginCredentials.email"
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
          <label for="pasword">Password</label>
          <input
            v-model="loginCredentials.password"
            type="password"
            class="form-control"
            id="pasword"
            placeholder="Password"
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
  import Swal from 'sweetalert2';

  import { loginValidationSchema } from '../helpers/validation.helper';

  export default {
    data: () => ({
      errorMessage: '',
      loginCredentials: {
        email: '',
        password: ''
      }
    }),
    methods: {
      login() {
        this.errorMessage = '';
        if (this.validLogin()) {
          const url = 'http://localhost:5000/login';
          const body = {
            email: this.loginCredentials.email,
            password: this.loginCredentials.password
          };

          axios
            .post(url, body)
            .then((response) => {
              console.log(response.data);
              Swal.fire({
                icon: 'success',
                title: 'Login Exitoso bienvenido a tu panel de cotrol',
                showConfirmButton: false,
                timer: 1500
              });
              setTimeout(() => {
                this.$router.push('/dashboard');
              }, 1000);
            })
            .catch((error) => {
              Swal.fire({
                title: 'Error!',
                text: error,
                icon: 'error',
                confirmButtonText: 'OK'
              });
              console.log(err);
            });
        }
      },
      validLogin() {
        const result = Joi.validate(this.loginCredentials, loginValidationSchema());

        if (result.error === null) {
          return true;
        }
        if (result.error.message.includes('name')) {
          Swal.fire({
            title: 'Error!',
            text: 'Name is Invalid 🙈',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Password is Invalid 🙈',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
        return false;
      }
    }
  };
</script>
