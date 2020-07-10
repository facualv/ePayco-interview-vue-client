<template>
  <div class="container">
    <form @submit.prevent="signup()">
      <legend>Ingrese sus datos</legend>
      <div class="form-group">
        <label for="name">Nombre</label>
        <input
          v-model="client.name"
          type="text"
          class="form-control"
          id="name"
          aria-describedby="nameHelp"
          placeholder="Enter name"
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
          placeholder="Enter name"
          required
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Telefono</label>
        <input
          v-model="client.phone"
          type="number"
          class="form-control"
          id="phone"
          aria-describedby="emailphone"
          placeholder="Enter phone"
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
          <label for="exampleInputPassword1">Password</label>
          <input
            v-model="client.password"
            type="password"
            class="form-control"
            id="pasword"
            placeholder="Password"
            required
          />
        </div>
        <div class="form-group col-md-6">
          <label for="exampleInputPassword1">Confirmar Password</label>
          <input
            v-model="client.confirmPassword"
            type="password"
            class="form-control"
            id="confirmPassword1"
            placeholder="Confirm Password"
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
              console.log(response.data.message);
              Swal.fire({
                icon: 'success',
                title: 'Operacion exitosa',
                text: response.data.message,
                showConfirmButton: false,
                timer: 1500
              });
              setTimeout(() => {
                this.$router.push('/login');
              }, 1000);
            })
            .catch((error) => {
              Swal.fire({
                title: 'Error!',
                text: error.message,
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
