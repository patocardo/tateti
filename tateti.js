tateti = function(){
  var gamer = "X";

  function message(txt, mode){
	mode = (mode)? mode : "success";
 	$("#says").html(txt);
	$('#messages').toggleClass('alert alert-'+mode).fadeIn();
  }
  function isAvailable(td){
    return (td.hasChildNodes())? false: true;
  }
  function fillCell(td){
    var filling;
     if(isAvailable(td)){
        filling = document.createTextNode(gamer);
        td.appendChild(filling);
		changeGamer();
      }else{
        message('Cell already selected', 'warning')
      };
  }
  function isRemaining(){
    var remaining = false;
	$('#board td').each(function(index){
 		if(isAvailable(this)){
			remaining = true;
			return false;
		}else{
			return true;
		}
	});
	return remaining;
  }
  function checkWinner(){
    var sltrs = ['tr:nth-child(1)'
			, 'tr:nth-child(2)'
			, 'tr:nth-child(3)'
			, 'tr td:nth-child(1)'
			, 'tr td:nth-child(2)'
			, 'tr td:nth-child(3)'
			, 'tr:nth-child(1) td:nth-child(1), #board tr:nth-child(2) td:nth-child(2), #board tr:nth-child(3) td:nth-child(3)'
			, 'tr:nth-child(3) td:nth-child(1), #board tr:nth-child(2) td:nth-child(2), #board tr:nth-child(1) td:nth-child(3)'

			];
	for(var index = 0; index < sltrs.length; index++){
		var elms = $('#board '+ sltrs[index]);
		var arr = elms.text().match(/[OX]+/mg)
		if(arr){
			var txt = arr.join('');
			if(txt == "OOO" || txt == "XXX"){
				var nodes = (/td/.test(sltrs[index]))? elms : $('td', elms);
				nodes.css('text-decoration', "line-through");
				message(txt.charAt(0)+ " has win!!\nRestart to game again");
				break;
			}
		}
	};
	return;
  }
  function changeGamer(){
	 gamer = (gamer == "O")? "X" : "O";
	 $('#gamer').html(gamer);
  }
  return {
	cellPressed: function(ev){
		var td = ev.target;
		if(isRemaining()){
			fillCell(td);
			checkWinner();
		}else{
			message('Board is full, restart the game', 'warning');
		}
    },
	setNew: function(){
		$('#board td').empty().css('text-decoration','none');
		gamer = "O";
	},
	changeGamer: function(){changeGamer();}
  }
}();
$('#board td').on('click', tateti.cellPressed);
$('document').ready(function(){
	tateti.changeGamer();
	$('#fb-but').attr('data-href', window.location.href);
});