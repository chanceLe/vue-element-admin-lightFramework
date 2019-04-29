<template>
	<div>
		<div class="detail">
			<h3>分子生物学PCR检测请验单</h3>
			<div class="detail-block">
				<div>送检信息</div>
				<el-form>
					<el-row>
						<el-col :xs="24" :sm="24" :md="12">
							<el-form-item label="控制号" >
								<span>0011</span>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="12">
							<el-form-item label="送检人" >
								<span>0011</span>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="12">
								<el-form-item label="隶属项目" >
								<span>0011</span>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="12">
							<el-form-item label="样本名称">
								<span>dkjasgdasbdkjadsbkjadskjdlashdahsdiqoiwdhbndkjqduwgqhwpidjqwpidhooqbdhiqwbdhniqwdhn</span>
							</el-form-item>
							
						</el-col>
						<el-col :xs="24" :sm="24" :md="12">
							<el-form-item label="样本类型">
								<span>大赛的徕卡圣诞快乐模拟接口鲁大师科技大厦看逻辑ad恐龙当家奥斯卡了京东看垃圾啊圣诞快乐挤啊圣诞快乐</span>
							</el-form-item>
							
						</el-col>
						<el-col :xs="24" :sm="24" :md="12">
							<el-form-item label="样本数量">
								<span>0011</span>
							</el-form-item>
							
						</el-col>
						<el-col :xs="24" :sm="24" :md="12">
						<el-form-item label="是否加急">
							<span>0011</span>
						</el-form-item>
							
						</el-col>
						<el-col :xs="24" :sm="24" :md="12">
							<el-form-item label="是否测序">
								<span>0011</span>
							</el-form-item>
							
						</el-col>
						<el-col :xs="24" :sm="24" :md="12">
							<el-form-item label="采样时间">
								<span>0011</span>
							</el-form-item>	
						</el-col>
						
						<el-col :span="24">
							<el-form-item label="检测类目">
								<el-table border>
									<el-table-column
										prop="sn"
										label="样品编号"
										align='center'
										>
									</el-table-column>
									<el-table-column
										prop="sn"
										label="样品类型"
										align='center'
										>
										<template slot-scope="scope">
										
											<el-tag>血清</el-tag>
										 </template>
									</el-table-column>
									<el-table-column
										prop="sn"
										label="检测项目"
										align='center'
										>
										<template slot-scope="scope">
										
											<el-tag>猪瘟</el-tag>
										 </template>
									</el-table-column>
								</el-table>
							</el-form-item>
						</el-col>
					</el-row>
					
					<el-form-item label="检测价格">
						<span>0011</span>
					</el-form-item>
					
					
				</el-form>
			</div>
			<div class="detail-block">
				<div>订单信息</div>
				
				<el-form>
					<el-form-item label="订单号">
						<span>0011</span>
					</el-form-item>
					<el-form-item label="创建时间">
						<span>0011</span>
					</el-form-item>
					<el-form-item label="完成时间">
						<span>0011</span>
					</el-form-item>
				</el-form>
				
					
			</div>
			
			<div class="btns">
				<el-button type="primary" @click="close">关闭</el-button>
				<el-button type="primary">下载报告</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			close(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style scoped lang="scss">

	.detail{
		width: 80%;
		margin:20px auto;
		border: 1px solid #999;
		padding: 15px;
		h3{
			text-align: center;
		}
		.detail-block{
			padding: 10px 0;
			border-bottom: 1px solid #999;  
			/*DCDFE6*/
			& > div{
				border-bottom: 1px solid #999;
				padding: 10px 0;
				font-weight: 600;
				margin-bottom: 10px;
			}
			&:last-child{
				border: none;
			}
		}
	}
	@media(max-width:768px){
		.detail{
			width: 94%;
		}
	}
	
	.btns{
		text-align: center;
		padding-top: 15px;
		.el-button{
			margin-right: 40px;
			&:last-child{
				margin-right: 0;
			}
		}
	}
	
	.el-form-item__content span{
		word-break: break-all;
	}
</style>
