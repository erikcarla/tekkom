var checkoperandtable = true;
$(document).ready(function(){
	//view
	$('#next').click(function(){
		var sv=this;
		if($(sv).hasClass('index')){
			$('#index').css('display','none');
			$('#iTableManager').css('display','');
			
			$('#back').css('display','').removeClass('index').addClass('iTableManager');
			$('#next').removeClass('index').addClass('iTableManager');
		}
		else if($(sv).hasClass('iTableManager')){
			$('#iTableManager').css('display','none');
			$('#iStatement').css('display','');
			
			$('#back').removeClass('iTableManager').addClass('iStatement');
			$('#next').removeClass('iTableManager').addClass('iStatement');
		}
		else if($(sv).hasClass('iStatement')){
			checkoperandtable = true;
			checkStatement();
			if(checkoperandtable == false){
				alert('Operand tersebut belum terdaftar di dalam table');
			}
			else{
				$('#iStatement').css('display','none');
				$('#iTree').css('display','');
				
				$('#back').removeClass('iStatement').addClass('iTree');
				$('#next').removeClass('iStatement').addClass('iTree');
				
				statement();
			}
		}
	});
	$('#back').click(function(){
		var sv=this;
		if($(sv).hasClass('iTableManager')){
			$('#index').css('display','');
			$('#iTableManager').css('display','none');
			
			$('#back').css('display','none').removeClass('iTableManager').addClass('index');
			$('#next').removeClass('iTableManager').addClass('index');
		}
		else if($(sv).hasClass('iStatement')){
			$('#iStatement').css('display','none');
			$('#iTableManager').css('display','');
			
			$('#back').removeClass('iStatement').addClass('iTableManager');
			$('#next').removeClass('iStatement').addClass('iTableManager');
		}
		else if($(sv).hasClass('iTree')){
			$('#iTree').css('display','none');
			$('#iStatement').css('display','');
			
			$('#back').removeClass('iTree').addClass('iStatement');
			$('#next').removeClass('iTree').addClass('iStatement');
		}
	});
	
	//table manager
	var tempdatatype={
		value: ["int","float","token","token","token"],
		desc: ["Integer","Float","Varchar","Char","Boolean"]
	};
	var content="";
	for(var i = 1 ; i < 3 ; i++){
		content='<tr><td><span class="lexeme-id">'+i
			+'</span></td><td><input type="text" class="form-control lexeme"/></td><td><select class="form-control dataType">';
			for(var j = 0 ; j < 4 ; j++)
				content+='<option value="'+tempdatatype.value[j]+'">'+tempdatatype.desc[j]+'</option>';
		content+='</select></td></tr>';
		$('#table-manager').append(content);
	}
	$('#button-add').click(function(){
		content='<tr><td><span class="lexeme-id">'+($('#table-manager tbody tr').length+1)
			+'</span></td><td><input type="text" class="form-control lexeme"/></td><td><select class="form-control dataType">';
			for(var j = 0 ; j < 4 ; j++)
				content+='<option value="'+tempdatatype.value[j]+'">'+tempdatatype.desc[j]+'</option>';
		content+='</select></td></tr>';
		$('#table-manager').append(content);
	});
	
	
});


//statement
function statement(){
	txt = $('#statement').val();
	var txt,tbl,
		listR = ["=","*","/","+","-"];
}

//check statement
function checkStatement(){
	var s = $('#statement').val();
	var operator = [],operand = [],t,n,
		listR = ["=","*","/","+","-"];
	var sLen = s.length;
	if(s)
	{	
		for(var i = 0; i < sLen; i++)
		{
			t = s[i];
			if(t === ' ') continue;
			var j = i + 1;
			if(listR.indexOf(s[i]) !== -1)
			{
				for(var j = i + 1;listR.indexOf(s[j]) !== -1; j++)
				{
					t += s[j];
				}
				i += t.length - 1;
				if(listR.indexOf(t) !== -1)
				{
					operator.push(t);
				}
				else 
				{
					error = true;
					alert('error');
				}
			}
			else if(s[i] !== ' ')
			{
				for(var j = i + 1; s[j] && s[j] !== ' ' && listR.indexOf(s[j]) === -1;j++)
				{
					t += s[j];
				}
				i += t.length -1;
				
				operand.push(t);
				
			}
		}			
	}
	
	var tr = $('#table-manager tbody tr');
	var checkoperand = 0;
	for(var i = 0 ; i < operand.length ; i++){
		if (operand.indexOf(i) === -1)
			continue;
		else{
			while($(tr).length !== 0)
			{
				if($('.lexeme',tr).val() == operand[i]){
					checkoperand++;
					break;
				}
				tr = $(tr).next();
			}
		}
	}
	console.log(operand);
	console.log(operator);
	
	if(checkoperand != operand.length)
		checkoperandtable = false;
		
	
}