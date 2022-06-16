
import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import storage from '../../utils/storage'

const user = {
    state: {
        userId: '',
        token: getToken(),
        name: '',
        avatar: '',
    },

    mutations: {
        SET_USERID: (state, userId) => {
            state.userId = userId
            storage.set("USER_ID", userId)
        },
        SET_TOKEN: (state, token) => {
            state.token = token
            storage.set("USER_TOKEN", token)
        },
        SET_NAME: (state, name) => {
            state.name = name
            storage.set("USER_NAME", name)
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
            storage.set("USER_AVATAR", avatar)
        },
    },
    actions: {

        // 用户名登录
        LoginByUsername({ commit }, userInfo) {
            const username = userInfo.username.trim()
            return new Promise((resolve, reject) => {
                loginByUsername(username, userInfo.password, userInfo.code).then(response => {
                    const token = response.data.token
                    const userId = response.data.userInfo.userId
                    const userAvatar = response.data.userInfo.avatar
                    commit('SET_TOKEN', token)
                    commit('SET_USERID', userId)
                    commit('SET_NAME', username)
                    commit('SET_AVATAR', userAvatar)
                    setToken(token)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetUserInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getUserInfo(state).then(res => {
                    commit('SET_NAME', res.data.name)
                    commit('SET_USERID', res.data.id)
                    commit('SET_AVATAR', res.data.avatar)
                    resolve(res)
                }).catch(error => {
                    console.log("error", error)
                    reject(error)
                })
            })
        },

        // 登出
        LogOut({ commit, state, dispatch }) {
            console.log("yes")
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '')
                    removeToken()
                    storage.clear
                    resetRouter()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        },

    }
}

export default user