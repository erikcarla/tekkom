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
			if(checkoperandtable == false){
				alert('Operand tersebut belum terdaftar di dalam table');
			}
			else if(operator[0] == undefined || operand[0] == undefined || operand[1] == undefined )
				alert('Error');
			else if($('#iTokenText').val() == '')
				alert('Token belum terdaftar');
			else{
				$('#iStatement').css('display','none');
				$('#iLexical').css('display','');
				
				$('#back').removeClass('iStatement').addClass('iLexical');
				$('#next').removeClass('iStatement').addClass('iLexical');
				
				statement();
			}
		}
		else if($(sv).hasClass('iLexical')){
			$('#iLexical').css('display','none');
			$('#iTree').css('display','');
			
			$('#back').removeClass('iLexical').addClass('iTree');
			$('#next').removeClass('iLexical').addClass('iTree');
		}
		else if($(sv).hasClass('iTree')){
			$('#iTree').css('display','none');
			$('#iSemantic').css('display','');
			
			$('#back').removeClass('iTree').addClass('iSemantic');
			$('#next').removeClass('iTree').addClass('iSemantic');
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
		else if($(sv).hasClass('iLexical')){
			$('#iLexical').css('display','none');
			$('#iStatement').css('display','');
			
			$('#back').removeClass('iLexical').addClass('iStatement');
			$('#next').removeClass('iLexical').addClass('iStatement');
		}
		else if($(sv).hasClass('iTree')){
			$('#iTree').css('display','none');
			$('#iLexical').css('display','');
			
			$('#back').removeClass('iTree').addClass('iLexical');
			$('#next').removeClass('iTree').addClass('iLexical');
		}
		else if($(sv).hasClass('iSemantic')){
			$('#iSemantic').css('display','none');
			$('#iTree').css('display','');
			
			$('#back').removeClass('iSemantic').addClass('iTree');
			$('#next').removeClass('iSemantic').addClass('iTree');
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
	var ceknumber = true;
	//token
	for(var i = 0 ; i < operand.length ; i++){
		var tr = $('#table-manager tbody tr').first();
		while($(tr).length !== 0)
		{
			if($('.lexeme',tr).val() == operand[i]){
				token.push('&lt;'+ $('#iTokenText').val()+','+ $('.lexeme-id',tr).text()+'&gt;');
				if($.isNumeric(operand[i]))
					ceknumber = false;
				break;
			}
			tr = $(tr).next();
		}
		if($.isNumeric(operand[i]) && ceknumber == true)
			token.push(operand[i]);
	}
	//want to get token? print token.. want to get datatype? print datatype	
	
	for(var j = 0 ; j < token.length ; j++){
		if(j == token.length-1)
			$('#lex').append(token[j]);
		else
			$('#lex').append(token[j]+' '+operator[j]+' ');
	}
	
	//penampungan ke sebuah object untuk dibuat syntax`
	var state = {};
	var x = 0;
	var kurung = 0;
	var temporar = 0;
	
	tempseqoperator = operator;
	tempseqtoken = token;
	
	
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
	$('#syntax').append(text);
	
	$('#syntax').css('width',$('#syntax ul').length * 80);
	
	//semantic 
	
	checkStatement();
	token = [];
	//token
	for(var i = 0 ; i < operand.length ; i++){
		var tr = $('#table-manager tbody tr').first();
		while($(tr).length !== 0)
		{
			if($('.lexeme',tr).val() == operand[i]){
				token.push('&lt;'+ $('#iTokenText').val()+','+ $('.lexeme-id',tr).text()+'&gt;');
				datatype.push($('.dataType',tr).val());
				if($.isNumeric(operand[i]))
					ceknumber = false;
				break;
			}
			tr = $(tr).next();
		}
		if($.isNumeric(operand[i]) && ceknumber == true){
			token.push(operand[i]);
			datatype.push('float');
		}
	}
	
	state = {};
	x = 0;
	kurung = 0;
	temporar = 0;
	var tempsemoperator = operator;
	var tempsemtoken = token;
	for(var j = 0 ; j < datatype.length ; j++){
		if($('.dataType').val() != datatype[j] && datatype[j] != 'token'){
			var tree = {'left':tempsemtoken[j],'right':null,'parent':datatype[j]+' to '+$('.dataType').val()};
			state['obj'+x]=tree;
			tempsemtoken.splice(j,1,'obj'+x);
			x++;
		}
	}
	
	for(var j = 0 ; j < tempsemtoken.length ; j++){
		if(tempsemoperator[j] == '/' || tempsemoperator[j] == '*' || tempsemoperator[j] == '%'){
			var tree = {'left':tempsemtoken[j],'right':tempsemtoken[j+1],'parent':tempsemoperator[j]};
			state['obj'+x]=tree;
			tempsemtoken.splice(j,2,'obj'+x);
			tempsemoperator.splice(j,1);
			x++;
			j = -1;
		}	
	}
	for(var j = 0 ; j < tempsemtoken.length ; j++){
		if(tempsemoperator[j] == '+' || tempsemoperator[j] == '-'){
			var tree = {'left':tempsemtoken[j],'right':tempsemtoken[j+1],'parent':tempsemoperator[j]};
			state['obj'+x]=tree;
			tempsemtoken.splice(j,2,'obj'+x);
			tempsemoperator.splice(j,1);
			x++;
			j = -1;
		}	
	}
	
	for(var j = 0 ; j < tempsemtoken.length ; j++){
		if(tempsemoperator[j] == '='){
			var tree = {'left':tempsemtoken[j],'right':tempsemtoken[j+1],'parent':tempsemoperator[j]};
			state['obj'+x]=tree;
			tempsemtoken.splice(j,2,'obj'+x);
			tempsemoperator.splice(j,1);
			x++;
			j = -1;
		}	
	}
	
	text = '';
	text+='<ul>'
		text+='<li>';
			text+='<a href="#">'+state['obj'+(x-1)].parent+'</a>';
			text+='<ul>';
				if(state['obj'+(x-1)].left != null){
					text+='<li>';
					if(state['obj'+(x-1)].left.indexOf('obj') == 0){
						text+=printtree(state['obj'+(x-1)].left,state);
					}else{
						text+='<a href="#">';
							text+=state['obj'+(x-1)].left;
						text+='</a>';
					}
					text+='</li>';
				}
				if(state['obj'+(x-1)].right !== null){
					text+='<li>';
					if(state['obj'+(x-1)].right.indexOf('obj') == 0){
						text+=printtree(state['obj'+(x-1)].right,state);
					}else{
						text+='<a href="#">';
							text+=state['obj'+(x-1)].right;
						text+='</a>';
					}
					text+='</li>';
				}
			text+='</ul>';
		text+='</li>';
	text+='</ul>';
	$('#semantic').append(text);
	
	$('#semantic').css('width',$('#syntax ul').length * 80);
}


//tree
function printtree(obj,state){
	var text = '';
	text+='<a href="#">'+state[obj].parent+'</a>';
	text+='<ul>';
		if(state[obj].left != null){
			text+='<li>';
			if(state[obj].left.indexOf('obj') == 0){
				text+=printtree(state[obj].left,state);
			}else{
				text+='<a href="#">';
					text+=state[obj].left;
				text+='</a>';
			}
			text+='</li>';
		}
		if(state[obj].right != null){
			text+='<li>';
			if(state[obj].right.indexOf('obj') == 0){
				text+=printtree(state[obj].right,state);
			}else{
				text+='<a href="#">';
					text+=state[obj].right;
				text+='</a>';
			}
			text+='</li>';
		}
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
				if($.isNumeric(t) == false)
					if (operand.indexOf(t) === -1)
						tempop.push(t);
				operand.push(t);
				
			}
		}			
	}
	
	var checkoperand = 0;
	for(var i = 0 ; i < tempop.length ; i++){
		var tr = $('#table-manager tbody tr');
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


