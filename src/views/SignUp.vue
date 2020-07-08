<template>
  <div class="container">
    <form @submit.prevent="signup">
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
          type="text"
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
          type="text"
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
  import { signUpValidationSchema } from '../helpers/validation.helper';

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
          console.log(this.client);
          // fetch(SIGN_UP_URL,{
          //   method: 'post',
          //   body: {
          //     client
          //   }
          // })
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
