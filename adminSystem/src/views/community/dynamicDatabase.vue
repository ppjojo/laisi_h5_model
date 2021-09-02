<template>
    <div class="app-container">
        <div class="container-search">
            <el-form :inline="true" :model="searchForm">
                <el-form-item label="时间：">
                    <el-date-picker v-model="searchForm.statisticalTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="searchData">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small">
            <el-table-column align="center" prop="statisticalTime"  label="日期">
                <template scope="scope">
                    {{scope.row.statisticalTime.split('T')[0]}}
                </template>
            </el-table-column>
            <el-table-column align="center" prop="storyCount" label="动态总数">
            </el-table-column>
            <el-table-column align="center" prop="storyUsersCount" label="发动态用户数量">
            </el-table-column>
            <el-table-column align="center" prop="commentUsersCount" label="评论用户数量">
            </el-table-column>
            <el-table-column align="center" prop="readCount" label="动态浏览总数">
            </el-table-column>
            <el-table-column align="center" prop="totalComment" label="动态评论总数">
            </el-table-column>

            <el-table-column align="center" prop="storyMarksCount" label="动态收藏总数">
            </el-table-column>
            <el-table-column align="center" prop="storyLikesCount" label="动态点赞总数">
            </el-table-column>
            <el-table-column align="center" prop="storyPlaintextCount" label="纯文本动态数">
            </el-table-column>
            <el-table-column align="center" prop="storyPictureCount" label="图片动态数">
            </el-table-column>
            <el-table-column align="center" prop="storyVideoCount" label="视频动态数">
            </el-table-column>
            <el-table-column align="center" prop="storyTopicCount" label="新增话题数">
            </el-table-column>
            <el-table-column align="center" prop="storyTopicInteractiveCount" label="话题参与人数">
            </el-table-column>
            <el-table-column align="center" prop="storyTopicCommentCount" label="话题评论数">
            </el-table-column>
            <el-table-column align="center" prop="storyTopicMarksCount" label="话题收藏数">
            </el-table-column>
            <el-table-column align="center" prop="storyTopicLikesCount" label="话题点赞数">
            </el-table-column>
            <!-- <el-table-column align="center" prop="readCount" label="社区分享数">
            </el-table-column> -->
        </el-table>
    </div>
</template>

<script>
    import { listItem, queryItem } from '@/api/community/dynamicDatabase'
    import { checkPermission } from '@/api/checkPermission'

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
                searchForm:{}
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            getList() {
                listItem({}).then(res => {
                    this.list = res.data
                    this.loading = false
                })
            },
            searchData() {
                if(!this.searchForm.statisticalTime){
                    this.getList();
                    return;
                }
                queryItem(this.searchForm)
                    .then(res => {
                           this.list=[];
                           this.list.push(res.data)
                        
                    })
                   
            },
        }
    }
</script>

