<template>
	<div>
		<div class="m-list">
			<!-- <div class="title">审核列表</div> -->
			
			<div class="m-item">
				<el-badge value="加急">
				<el-form>
					<el-form-item label="送检人">
						<span>张三</span>
					</el-form-item>
					<el-form-item label="送检时间">
						<span>2019-05-02 09:30:25</span>
					</el-form-item>
					<el-form-item label="检测项目">
						<el-tag size="mini">猪瘟</el-tag>
						<el-tag size="mini">蓝耳</el-tag>
					</el-form-item>
					<el-form-item label="样品数量">
						<span>20</span>
					</el-form-item>
				</el-form>
				</el-badge> 
				<div class="btns">
					<el-button plain size="small" type="warning">驳回</el-button>
					<el-button plain size="small" type="success">通过</el-button>
				</div>
				
			</div>
			
				
			
		</div>
	</div>
</template>

<script>
</script>

<style scoped lang="scss">
	.m-list{
		border: 1px solid #999;
		height: 100vh;
		width: 100%;
		padding:0 10px;
	}
	.m-item{
		padding: 10px 0;
		border-bottom: 1px solid #999;
	}
	.el-form-item{
		margin-bottom: 0;
	}
	.btns{
		width: 100%;
		display: flex;
		justify-content: space-around;
		
	} 
	.el-button{
		display: inline-block;
		width: 50%;
	}

</style>

<style>
	.el-badge{
		width: 100%;
	}
	.el-badge__content.is-fixed {
		top: 12px;
		right: 35px;
	}
	
	.el-badge__content{
		border-radius: 4px;
		height:22px;
		line-height: 22px;
	}
</style>
