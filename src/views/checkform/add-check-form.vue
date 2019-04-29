<template>
	<div class="components-container">
		<div class="form-div">
		<h3>分子生物学PCR检测请验单</h3>
		<el-form  :model="form" :rules="rules" ref="form" label-width="80px">
			
			<!-- <div class="layout-form"> -->
		  <el-form-item label="请验班组" prop='team'>
			<el-input v-model="form.team" placeholder="请输入请验班组"></el-input>
		  </el-form-item>
		  <el-form-item label="控制号" prop='controlNum'>
		  			<el-input v-model="form.controlNum" placeholder="请输入控制号"></el-input>
		  </el-form-item>
		  <el-form-item label="送检人" prop='sendName'>
		  			<el-input v-model="form.sendName" placeholder="请输入送检人"></el-input>
		  </el-form-item>
		  <el-form-item label="隶属项目" prop='project'>
		  			<el-input v-model="form.project" placeholder="请输入隶属项目"></el-input>
		  </el-form-item>
		  
		  
		    <el-form-item label="采样时间" prop='date'>
		  	<el-col :span="11">
		  	  <el-date-picker type="date" placeholder="选择日期" v-model="form.date"  value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
		  	</el-col>
	
		    </el-form-item>
		  
		   <el-form-item label="是否加急">
		  			<el-switch v-model="form.urgent"></el-switch>
		  </el-form-item>
		  
		  
		 <el-form-item label="是否测序">
			<el-select v-model="form.sequence"  default-value="0" placeholder="请选择是否测序">
			  <el-option label="是" value="1"></el-option>
			  <el-option label="否" value="0"></el-option>
			</el-select>
		  </el-form-item>
		
		  <el-form-item label="项目经理" prop='manager'>
		 			<el-input v-model="form.manager" placeholder="请输入项目经理"></el-input>
		 </el-form-item>
		 <!-- </div> -->
		 
		   <el-form-item label="检测类目" required>
			  
			    </el-form-item>
		 <div class="table-div" >
				<div class="table-tool">
					 <el-button size="mini" type="primary"  @click="addNewTableLine">添加一行</el-button>
				</div>
				
		 	    <el-table
		 		border
		 		  :data="tableData" 
		 		  style="width: 100%">
		 		  <el-table-column
		 			prop="sn"
		 			label="起始编号"
		 			align='center'
		 			width="100">
		 		  </el-table-column>
		 		  
		 		   <el-table-column
		 			prop="en"
		 			label="结束编号"
		 			align='center'
		 			width="100">
		 			<template slot-scope="scope">
						<!-- input 有一个默认参数  用$event 传递 -->
		 				<el-input size="mini" type="text" maxlength="5" v-model='scope.row.en' @change="checkEndNumber($event,scope.row,scope.$index)"></el-input>
		 			 </template>
		 		  </el-table-column>
		 		   <el-table-column
		 			prop="types"
		 			label="样品类型"
		 			align='center'
		 			>
		 			
		 			 <template slot-scope="scope">
		 				<div class="table-tags" >
		 					<el-tag closable size="mini" v-for="(type,index) in scope.row.types" :key="index" @close="removeTag(index,scope.row,scope.$index,'types')">{{type}}</el-tag>
							<el-input
							  class="input-new-tag"
							  v-if="inputVisible"
							  v-model="inputValue"
							  ref="saveTagInput"
							  size="mini"
							  @keyup.enter.native="handleInputConfirm(scope.$index)"
							  @blur="handleInputConfirm(scope.$index)"
							>
							</el-input>
							<el-button type="warning"  class="button-new-tag" size="mini" @click="showInput">+新增</el-button>
						</div>
		 			  </template>
		 		  </el-table-column>
		 		   <el-table-column
		 			prop="items"
		 			label="检测项目"
		 			align='center'
		 			>
		 			 <template slot-scope="scope">
		 					<div class="table-tags" @click="openItemsSelect(scope.$index)">
		 						<el-tag closable size="mini" v-for="(type,index) in scope.row.items" :key="index" @close="removeTag(index,scope.row,scope.$index,'items')">{{type}}</el-tag>
		 					</div>
		 				
		 				  </template>
		 		  </el-table-column>
		 		  <el-table-column label="操作" align='center' width='100'>
		 			  <template slot-scope="scope">
		 				<el-button
		 				  size="mini"
		 				  type="danger"
						  v-if="tableData.length-1 == scope.$index "
		 				  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
		 			  </template>
		 			</el-table-column>
		 		</el-table>
				<div class="table-total">
					<span>样本总计 {{total | toThousandFilter}} 份  </span> 
					<span>检测总价格 ¥{{ 0 |toCurrency}}</span>
				</div>
		 </div>
		
		  <el-form-item>
			<el-button type="primary" @click="onSubmit">立即创建</el-button>
			<el-button>取消</el-button>
		  </el-form-item>
		</el-form>	
		
		
		</div>
		
	
		
		<el-dialog
		  title="样品类型"
		  :visible.sync="dialogVisibleItems"
		  width="50%"
		  :before-close="handleClose">
			<div class="select-area">
				<div class="select-oper">
					<div>可选检测项目:</div>
					<el-tag  v-for="(item,index) in itemsList" :key="index" @click="selectItem(item)">
						{{item}}
					</el-tag>
				</div>
				<div class="select-res">
					<div>已选检测项目:</div>
					<el-tag type="success" v-for="(item,index) in tableData[selectItemsIndex].items" :key="index">
						{{item}}
					</el-tag>
				</div>
				
			</div>
		  <span slot="footer" class="dialog-footer">
			
			<el-button type="primary" @click="dialogVisibleItems = false">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	import { toCurrency ,toThousandFilter} from '@/filters/index.js'
	const checkNameLen = {min:2,max:8,message:'长度在2-8个字符',trigger:'blur'}; 
  export default {
    data() {
      return {
		  
		tableData: [{
            sn: '1',
            en: '',
			types:['zssss'],
			items: ['zhangsan'],
            oper: '',
          }
		  ],
        form: {
			team: '',  //请验班组
			controlNum:'',  //控制号
			sendName: '',  //送检人
			project: '',  //隶属项目
			date: '', //采样时间
			urgent:false, //是否加急
			sequence: '0', //是否测序
			manager:'' ,//项目经理
			
        },
		rules:{
			team:[
				{required:true, message:'请输入请验班组',trigger:'blur'},
			],
			controlNum:[
				{required:true,message:'请输入控制号',trgger:'blur'}
			],
			sendName:[
				{required:true,message:'请输入送检人',trgger:'blur'},
				checkNameLen
			],
			project:[
				{required:true,message:'请输入隶属项目',trgger:'blur'}
			],
			date:[
				{required:true,message:'请选择日期',trgger:'blur'}
			],
			manager:[
				{required:true,message:'请输入项目经理',trgger:'blur'},
				checkNameLen
			]
		},
		dialogVisibleItems:false,  //检测项目选择
		inputVisible:false, //新增样本标签的输入框
		inputValue:'',  //新增样本标签输入框的值
		itemsList : [
			'猪瘟','伪狂犬','蓝耳','猪瘟2','某项目'
		],
		selectItemsIndex:0,
		
      }
    },
	filters:{
		toCurrency(money){
			return toCurrency(money)
		},
		toThousandFilter(num){
			return toThousandFilter(num)
		}
	},
	computed:{
		total(){
			return this.tableData[this.tableData.length-1].en || 0;
		}
	},
    methods: {
		// 选择检测项目
		selectItem(item){
			const arr = this.tableData[this.selectItemsIndex].items;
			const cindex = arr.indexOf(item);
			 if(cindex > -1){
				 this.tableData[this.selectItemsIndex].items.splice(cindex,1)
			 }else{
				  this.tableData[this.selectItemsIndex].items.push(item)
			 }
		},
		//输入样本类型
	  showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
	
		//提交样本类型
      handleInputConfirm(index) {
        let inputValue = this.inputValue;
        if (inputValue) {
			console.log(inputValue,index,"confirm")
			this.tableData[index].types.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      
    },
		
		// handleClose
		handleClose(){
			this.dialogVisibleItems = false;
		},
		
	
		// 打开items选择
		openItemsSelect(index){
			this.selectItemsIndex = index;
			console.log('selecItem')
			this.dialogVisibleItems = true;
		},
		// 结束编号输入校验
		//不能小于起始编号
		checkEndNumber(value,row,index){
			if(value < row.sn){
				this.$message.error('结束编号不能小于起始编号')
				this.tableData[index].en = '';
			}
		},
		//表格添加一行
		addNewTableLine(){
			const preEn = this.tableData[this.tableData.length-1].en || '';
			if(!preEn){
				this.$message.error('请填写结束编号');
				return;
			}
			console.log(preEn,"preEn")
			const start = Number(preEn) + 1;
			this.tableData.push({
				  sn: start,
				en: '',
				types:[],
				items: [],
				oper: '',
			})
		},
		removeTag(index,row,$index,key){
			console.log(index,row,$index,key,"removeTag");
			this.tableData[$index][key].splice(index,1)
		},
		handleDelete(index,row){
			console.log(index,row,"delete")
			 this.tableData.splice(index, 1);
		},
      onSubmit() {
        console.log('submit!');
		console.log(this.form,"fromdata")
		this.$refs['form'].validate((valid) => {
          if (valid) {
			  // 提交操作
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss">
	.select-area{
		border: 1px solid #DCDFE6;
		padding: 10px;
		.select-oper{
			padding-bottom: 10px;
			margin-bottom: 10px;
			border-bottom:1px solid #DCDFE6;
			
		}
		.select-res{
			
		}
		div{
			margin-bottom: 10px;
		}
		.el-tag{
			margin-right: 10px;
			cursor: pointer;
		}
	}
	.input-new-tag{
		margin-bottom: 5px;
	}
	.form-div{
		width: 800px;
		margin: auto;
		margin-bottom: 80px;
		h3{
			text-align: center;
			margin-top: 40px;
		}
	}
	.table-div{
		margin-bottom: 30px;
		margin-top: -20px;
	}
	.table-tags{
		text-align: left;
		-webkit-appearance: none;
		background-color: #FFFFFF;
		background-image: none;
		border-radius: 4px;
		border: 1px solid #DCDFE6;
		min-height: 36px;
		// line-height: 34px;
		cursor: pointer;
		padding: 5px;
		.el-tag{
			margin: 0 5px 5px 0;
		}
	}
	
	.layout-form{
		width: 800px;
		margin: auto;
	}
	.table-tool{
		text-align: right;
		margin: 0 0 10px;
	}
	.table-total{
		border: 1px solid #dfe6ec;
		border-top: none;
		color: #606266;
		padding: 10px;
		font-size: 14px;
		span{
			padding: 0 10px;
			margin-right: 10px;
			border-right: 1px solid #dfe6ec ;
			&:last-child{
			border :none;
		}
		}
	}
</style>




