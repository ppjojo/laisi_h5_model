import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        myGroupListRefresh: true,
        group: {
            groupInfo: {
                content: "",
                count:"",
                id: "",
                isGroupLeader: 0,
                isInviteConfirm: 0,
                isSilent: null,
                isTop: null,
                labelId: "",
                memberId: "",
                name: "",
                portrait: "",
                slogon: ""
            },
            huanxinGroupId: "",
            isGrouptMember: "",
            memberIcon: "",
            ownerUserId: "",
            userIdData: {}
        }
    },
    mutations: {
        setData(state, param) { //param:{key:*,val:*}
            var val = param.val;
            if (typeof param.val == "object") {
                val = JSON.stringify(val);
            }
            eval(`state.${param.key}=${val}`);
        }
    }
})

export default store