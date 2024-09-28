import { defineStore } from 'pinia';

interface UserState {
    username: string;
}

export const useUserStore = defineStore('userStore', {
    state: (): UserState => ({
        username: ''
    }),
    getters: {
        isUserLoggedIn(state): boolean {
            return !!state.username;
        }
    },
    actions: {
        logIn(username: string) {
            this.username = username;
        },
        logOut() {
            this.username = '';
        }
    }
});
