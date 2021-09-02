<template>
    <div class="app-container">
        <div class="container-search">
            <el-form :inline="true" :model="searchForm">
                <el-form-item label="统计日期">
                    <el-date-picker v-model="searchForm.statisticalTime" type="date" placeholder="统计日期"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <!-- <el-date-picker v-model="searchForm.endTime1" type="date" placeholder="结束日期"
                        value-format="timestamp">
                    </el-date-picker> -->
                </el-form-item>

                <el-form-item>
                    <el-button type="success" @click="getList">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="bindTime" label="统计时间">
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
        </el-table>

        <!-- <pagination :pageTotal="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
        </pagination>
 -->





    </div>
</template>

<script>
    import { communityItem as listItem,communityItemAll } from '@/api/operateReport/operateReport'
    import { checkPermission } from '@/api/checkPermission'
    import { formatDate } from '@/utils/date'
    import Pagination from "@/components/pagination";

    export default {
        components: {
            Pagination
        },
        filters: {
            statusFilter(status) {
                const statusMap = {
                    1: 'success',
                    // 0: 'gray',
                    0: 'danger'
                }
                return statusMap[status]
            },
            formatDate(time) {
                time = time
                let date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd hh:mm')
            }

        },
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
                page: 1,
                limit: 10,
                total: 0,
                searchForm: {
                    statisticalTime: '',
                },
                deviceModelList: [],
                deviceTypeList: []
            }
        },
        mounted() {
            // this.getList()
        },
        methods: {
            getList() {
                if (!this.searchForm.statisticalTime){
                  this.getAll();
                  return;
                }
                // if (this.searchForm.endTime1) this.searchForm.endTime = this.searchForm.endTime1 / 1000
                listItem(this.searchForm).then(res => {
                    this.list = [res.data];
                    // this.total = res.data.total;
                    this.loading = false
                })
            },
            getAll(){
              communityItemAll({}).then(res=>{
                this.list = res.data;
                this.loading = false
              })
            }
        }
    }
</script>
