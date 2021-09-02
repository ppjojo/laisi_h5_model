<template>
    <section>
        <router-view/>
    </section>
</template>
<script>
    export default {
        computed: {
            checkPer() {
                return function (btn) {
                    return (checkPermission(this.$route.path + '/' + btn))
                }
            }
        },
        data() {
            return {
                list: [],
                loading: false,
                memberList:[],
                
               

            }
        },
        mounted() {
           //this.getMemberList()
        },
        methods: {
            
           
            





        }
    }
</script>