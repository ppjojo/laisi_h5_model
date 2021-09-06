import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        searchTime:"",
        myGroupListRefresh: true,
        groupIndexRefresh: true,
        group: {
            groupInfo: {
                content: "",
                count: "",
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
        },
        personalGroupInfo: {
            isDel: 0,
            isGroupLeader: 0,
            isSilent: 0,
            isTop: 0
        },
        groupMemberList: [],
        
    },
    mutations: {
        setData(state, param) { //param:{key:*,val:*}
            
            var val = param.val;
            if (typeof param.val == "object") {
                val = JSON.stringify(val);
            }
            eval(`state.${param.key}=${val}`);
            //console.log(state)
        },
    }
})

export default store