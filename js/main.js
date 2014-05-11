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
	});
	
	//table manager
	var tempdatatype={
		value: ["int","float","token","token"],
		desc: ["Integer","Float","String","Char"]
	};
	var content="";
	for(var i = 1 ; i < 3 ; i++){
		content='<tr><td><span id="lexeme-id">'+i
			+'</span></td><td><input type="text" id="lexeme" class="form-control"/></td><td><select class="form-control">';
			for(var j = 0 ; j < 4 ; j++)
				content+='<option value="'+tempdatatype.value[j]+'">'+tempdatatype.desc[j]+'</option>';
		content+='</select></td></tr>';
		$('#table-manager').append(content);
	}
	$('#button-add').click(function(){
		content='<tr><td><span id="lexeme-id">'+($('#table-manager tbody tr').length+1)
		+'</span></td><td><input type="text" id="lexeme" class="form-control"/></td><td><select class="form-control">';
			for(var j = 0 ; j < 4 ; j++)
				content+='<option value="'+tempdatatype.value[j]+'">'+tempdatatype.desc[j]+'</option>';
		content+='</select></td></tr>';
		$('#table-manager').append(content);
	});
	
	//statement
	
});