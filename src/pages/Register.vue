<template>
    <div class="flex flex-center bg-primary" style="height: 100vh;">
        <q-card class="text-center" style="width: 400px;">
            <h5 class="title">Pose Estimation</h5>
            <q-card-section>
                <q-input v-model="user.name" type="text" label="Name" filled />
                <q-input v-model="user.email" class="q-my-md" type="text" label="Email" filled />
                <q-input v-model="user.password" filled :type="isPwd ? 'password' : 'text'" label="Password">
                    <template v-slot:append>
                        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                            @click="isPwd = !isPwd" />
                    </template>
                </q-input>
            </q-card-section>
            <q-card-section>
                <q-checkbox v-model="t_c" label="Agree to terms & conditions" />
            </q-card-section>
            <q-card-section class="text-center">
                <q-btn color="primary" icon="person_add" :loading="loading" label="Register" @click="registerUser" />
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            isPwd: true,
            t_c: false,
            user: {
                name: null,
                email: null,
                password: null
            },
            error: null,
            success: null,
            loading: false
        }
    },
    methods: {
        async registerUser() {
            try {
                this.loading = true
                // Replace with your actual API endpoint
                const response = await axios.post('http://localhost:5000/api/auth/register', this.user);
                // Store the authentication token
                localStorage.setItem('authToken', response.data.token);
                this.loading = false
                // Redirect to home or intended route
                this.$router.push('/');
            } catch (err) {
                console.log(err);
                this.loading = false
            }
        }
    }
}
</script>

<style>

</style>