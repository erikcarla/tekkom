var checkoperandtable = true,operator = [],operand = [];var checkEnd = true;
$(document).ready(function(){
	//view
	$('#next').click(function(){
		var sv=this;
		if($(sv).hasClass('index')){
			$('#index').css('display','none');
			$('#iType').css('display','');
			
			$('#back').css('display','').removeClass('index').addClass('iType');
			$('#next').removeClass('index').addClass('iType');
		}
		else if($(sv).hasClass('iType')){
			$('#iType').css('display','none');
			$('#iToken').css('display','');
			
			$('#back').removeClass('iType').addClass('iToken');
			$('#next').removeClass('iType').addClass('iToken');
		}
		else if($(sv).hasClass('iToken')){
			$('#iToken').css('display','none');
			$('#iTableManager').css('display','');
			
			$('#back').removeClass('iToken').addClass('iTableManager');
			$('#next').removeClass('iToken').addClass('iTableManager');
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
			// if(checkoperandtable == false){
				// alert('Operand tersebut belum terdaftar di dalam table');
			// }
			// else{
				$('#iStatement').css('display','none');
				$('#iTree').css('display','');
				
				$('#back').removeClass('iStatement').addClass('iTree');
				$('#next').removeClass('iStatement').addClass('iTree');
				
				statement();
			// }
		}
	});
	$('#back').click(function(){
		var sv=this;
		if($(sv).hasClass('iType')){
			$('#index').css('display','');
			$('#iType').css('display','none');
			
			$('#back').css('display','none').removeClass('iType').addClass('index');
			$('#next').removeClass('iType').addClass('index');
		}
		else if($(sv).hasClass('iToken')){
			$('#iType').css('display','');
			$('#iToken').css('display','none');
			
			$('#back').removeClass('iToken').addClass('iType');
			$('#next').removeClass('iToken').addClass('iType');
		}
		else if($(sv).hasClass('iTableManager')){
			$('#iToken').css('display','');
			$('#iTableManager').css('display','none');
			
			$('#back').removeClass('iTableManager').addClass('iToken');
			$('#next').removeClass('iTableManager').addClass('iToken');
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
	
	//type checking
	var temptype={
		value: ["int","float"],
		desc: ["Integer","Float"]
	};
	
	var content="";
	content='<select class="form-control dataType">';
		for(var j = 0 ; j < temptype.value.length ; j++)
			content+='<option value="'+temptype.value[j]+'">'+temptype.desc[j]+'</option>';
	content+='</select>';
	$('#iType .row').append(content);
	
	//table manager
	var tempdatatype={
		value: ["int","float","token","token"],
		desc: ["Integer","Float","Char","Boolean"]
	};
	var content="";
	for(var i = 1 ; i < 3 ; i++){
		content='<tr><td><span class="lexeme-id">'+i
			+'</span></td><td><input type="text" class="form-control lexeme"/></td><td><select class="form-control dataType">';
			for(var j = 0 ; j < tempdatatype.value.length ; j++)
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
	var s = $('#statement').val();
	var tempseqoperator=[],tempseqtoken=[],token =[], datatype =[],
		sequence = ["^","%","*","/","+","-","="];
	var sLen = s.length;
	//token
	for(var i = 0 ; i < operand.length ; i++){
		if($.isNumeric(operand[i]))
			token.push(operand[i]);
		else{
			var tr = $('#table-manager tbody tr').first();
			while($(tr).length !== 0)
			{
				if($('.lexeme',tr).val() == operand[i]){
					token.push('<'+ $('#iTokenText').val()+','+ $('.lexeme-id',tr).text()+'>');
					datatype.push($('.dataType',tr).text());
					break;
				}
				tr = $(tr).next();
			}
		}
	}
	//want to get token? print token.. want to get datatype? print datatype	
	
	
	//penampungan ke sebuah object untuk dibuat tree
	var state = {};
	var x = 0;
	var kurung = 0;
	var temporar = 0;
	
	tempseqoperator = operator;
	tempseqtoken = operand;
	
	for(var j = 0 ; j < tempseqoperator.length ; j++){
		if(tempseqoperator[j] == '('){
			kurung++;
		}
	}
	
	// for(var j = 0 ; j < tempseqoperator.length ; j++){
		// if(tempseqoperator[j] == ')'){
			// tempseqoperator.splice(j,1);
			// for(var i = j-1 ; i >= 0 ; i--){
				// if(tempseqoperator[i] == '('){
					// tempseqoperator.splice(i,1);
					// for(var k = i ; k < j-1 ; k++){		
						// if(tempseqoperator[k] == '/' || tempseqoperator[k] == '*' || tempseqoperator[k] == '%'){
							// var tree = {'left':tempseqtoken[k-kurung+1],'right':tempseqtoken[k-kurung+2],'parent':tempseqoperator[k]};
							// state['obj'+x]=tree;
							// tempseqtoken.splice(k-kurung+1,2,'obj'+x);
							// tempseqoperator.splice(k,1);
							// x++;
							// k = i-1;
							// j = j-1;
						// }	
					// }
					// for(var k = i ; k < j-1 ; k++){		
						// if(tempseqoperator[k] == '+' || tempseqoperator[k] == '-'){
							// var tree = {'left':tempseqtoken[k-kurung+1],'right':tempseqtoken[k-kurung+2],'parent':tempseqoperator[k]};
							// state['obj'+x]=tree;
							// tempseqtoken.splice(k,2,'obj'+x);
							// tempseqoperator.splice(k,1);
							// x++;
							// k = i-1;
							// j = j-1;
						// }	
					// }
					// for(var k = i ; k < j-1 ; k++){		
						// if(tempseqoperator[k] == '='){
							// var tree = {'left':tempseqtoken[k-kurung+1],'right':tempseqtoken[k-kurung+2],'parent':tempseqoperator[k]};
							// state['obj'+x]=tree;
							// tempseqtoken.splice(k,2,'obj'+x);
							// tempseqoperator.splice(k,1);
							// x++;
							// k = i-1;
							// j = j-1;
						// }	
					// }
					// i = j;
				// }
			// }
			// j = 0;
		// }	
	// }
	
	
	for(var j = 0 ; j < tempseqtoken.length ; j++){
		if(tempseqoperator[j] == '/' || tempseqoperator[j] == '*' || tempseqoperator[j] == '%'){
			var tree = {'left':tempseqtoken[j],'right':tempseqtoken[j+1],'parent':tempseqoperator[j]};
			state['obj'+x]=tree;
			tempseqtoken.splice(j,2,'obj'+x);
			tempseqoperator.splice(j,1);
			x++;
			j = -1;
		}	
	}
	for(var j = 0 ; j < tempseqtoken.length ; j++){
		if(tempseqoperator[j] == '+' || tempseqoperator[j] == '-'){
			var tree = {'left':tempseqtoken[j],'right':tempseqtoken[j+1],'parent':tempseqoperator[j]};
			state['obj'+x]=tree;
			tempseqtoken.splice(j,2,'obj'+x);
			tempseqoperator.splice(j,1);
			x++;
			j = -1;
		}	
	}
	
	for(var j = 0 ; j < tempseqtoken.length ; j++){
		if(tempseqoperator[j] == '='){
			var tree = {'left':tempseqtoken[j],'right':tempseqtoken[j+1],'parent':tempseqoperator[j]};
			state['obj'+x]=tree;
			tempseqtoken.splice(j,2,'obj'+x);
			tempseqoperator.splice(j,1);
			x++;
			j = -1;
		}	
	}
	$('.tree').empty();
	
	var text = '';
	text+='<ul>'
		text+='<li>';
			text+='<a href="#">'+state['obj'+(x-1)].parent+'</a>';
			text+='<ul>';
				text+='<li>';
					if(state['obj'+(x-1)].left.indexOf('obj') == 0){
						text+=printtree(state['obj'+(x-1)].left,state);
					}else{
						text+='<a href="#">';
							text+=state['obj'+(x-1)].left;
						text+='</a>';
					}
				text+='</li>';
				text+='<li>';
				if(state['obj'+(x-1)].right.indexOf('obj') == 0){
					text+=printtree(state['obj'+(x-1)].right,state);
				}else{
					text+='<a href="#">';
						text+=state['obj'+(x-1)].right;
					text+='</a>';
				}
				text+='</li>';
			text+='</ul>';
		text+='</li>';
	text+='</ul>';
	$('.tree').append(text);
	
	$('.tree').css('width',$('.tree ul').length * 75 - $('.tree ul').length * 20);
}


//tree
function printtree(obj,state){
	var text = '';
	text+='<a href="#">'+state[obj].parent+'</a>';
	text+='<ul>';
		text+='<li>';
		if(state[obj].left.indexOf('obj') == 0){
			text+=printtree(state[obj].left,state);
		}else{
			text+='<a href="#">';
				text+=state[obj].left;
			text+='</a>';
		}
		text+='</li>';
		text+='<li>';
		if(state[obj].right.indexOf('obj') == 0){
			text+=printtree(state[obj].right,state);
		}else{
			text+='<a href="#">';
				text+=state[obj].right;
			text+='</a>';
		}
		text+='</li>';
	text+='</ul>';
	return text;
}

//check statement
function checkStatement(){
	var s = $('#statement').val();
	var t,n,tempop =[],
		listR = ["(",")","^","%","*","/","+","-","="];
	var sLen = s.length;
	operand = [];
	operator = [];
	if(s)
	{	
		for(var i = 0; i < sLen; i++)
		{
			t = s[i];
			if(t === ' ') continue;
			var j = i + 1;
			if(listR.indexOf(s[i]) !== -1)
			{
				
				i += t.length - 1;
				if(listR.indexOf(t) !== -1)
				{
					operator.push(t);
				}
			}
			else if(s[i] !== ' ')
			{
				for(var j = i + 1; s[j] && s[j] !== ' ' && listR.indexOf(s[j]) === -1;j++)
				{
					t += s[j];
				}
				i += t.length -1;
				if (operand.indexOf(t) === -1 /*&& $.isNumeric(operand)*/)
					tempop.push(t);
				operand.push(t);
				
			}
		}			
	}
	
	var tr = $('#table-manager tbody tr');
	var checkoperand = 0;
	for(var i = 0 ; i < tempop.length ; i++){
		while($(tr).length !== 0)
		{
			if($('.lexeme',tr).val() == tempop[i]){
				checkoperand++;
				break;
			}
			tr = $(tr).next();
		}
	}
	
	if(checkoperand != tempop.length)
		checkoperandtable = false;
		
}


