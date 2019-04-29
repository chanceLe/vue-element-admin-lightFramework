<template>
	<div class="upload">
		<div class="lab">
			<div class="title">实验室数据填写</div>
			<el-table border>
				<el-table-column
					prop="sn"
					label="检测项目"
					align='center'
					>
					<template slot-scope="scope">
					
						猪瘟链球菌-定性法
					 </template>
				</el-table-column>
				<el-table-column
					prop="sn"
					label="是否填写"
					align='center'
					>
					<template slot-scope="scope">
					
						<el-tag>否</el-tag>
					 </template>
				</el-table-column>
				<el-table-column
					prop="sn"
					label="操作"
					align='center'
					>
					<template slot-scope="scope">
						<el-button>填写</el-button>
						<el-button>取消</el-button>
						
					 </template>
				</el-table-column>
				
			</el-table>
		</div>
		<div class="upload-imgs">
			<div class="title">上传结果图片</div>
			<el-upload
			  action="https://jsonplaceholder.typicode.com/posts/"
			  list-type="picture-card"
			  :on-preview="handlePictureCardPreview"
			  :on-remove="handleRemove">
			  <i class="el-icon-plus"></i>
			</el-upload>
			<el-dialog :visible.sync="dialogVisible" >
			  <img width="100%" :src="dialogImageUrl" alt="">
			</el-dialog>
		</div>
		
		<div class="text-area">
			<div class="title">检测结论</div>
			<el-input
			  type="textarea"
			  :rows="3"
			  placeholder="请输入检测结论"
			  v-model="textarea">
			</el-input>
		</div>
		
		<div class="btns">
			<el-button>发布</el-button>
			<el-button>下载word报告</el-button>
			<el-button>上传pdf报告</el-button>
			<el-button>取消</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				dialogVisible:false,
				dialogImageUrl:'',
				textarea:''
			}
		},
		methods:{
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			}
		}
	}
</script>
<style scoped lang="scss">
	.upload{
		padding: 15px;
		div{
			margin-bottom: 30px;
		}
		& .title{
			color: #42b983;
			margin: 10px 0;
		}
	}
	.btns{
		text-align: center;
	}
</style>
