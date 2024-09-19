<template>
    <div class="flex flex-center bg-primary" style="height: 100vh;">
        <q-card class="text-center" style="width: 400px;">
            <h5 class="title">Pose Estimation</h5>
            <q-card-section>
                <q-input v-model="user.email" class="q-my-md" type="text" label="Email" filled />
                <q-input v-model="user.password" filled :type="isPwd ? 'password' : 'text'" label="Password">
                    <template v-slot:append>
                        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                            @click="isPwd = !isPwd" />
                    </template>
                </q-input>
            </q-card-section>
            <q-card-section class="text-center">
                <q-btn color="primary" icon="login" :loading="loading" label="Login" @click="loginUser" />
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            isPwd: true,
            t_c: false,
            user: {
                email: null,
                password: null
            },
            error: null,
            success: null,
            loading: false
        }
    },
    // Example login method
    methods: {
        async loginUser() {
            try {
                this.loading = true
                // Replace with your login logic
                const response = await axios.post('http://localhost:5000/api/auth/login', this.user);

                // Store the authentication token
                localStorage.setItem('authToken', response.data.token);

                // Redirect to home or intended route
                this.loading = false
                this.$router.push('/');
            } catch (error) {
                this.loading = false
                console.error('Login failed:', error);
            }
        }
    }
}
</script>

<style></style>s