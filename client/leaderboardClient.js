Meteor.subscribe('thePlayers');
Template.leaderboard.player=function(){
	return PlayersList.find({createdBy:Meteor.userId()},{sort:{score:-1,name:1}});
};

Template.leaderboard.selectedClass=function(){
	var selectedPlayer = Session.get('selectedPlayer');
	var playerId = this._id;
	if(selectedPlayer === playerId)
		return "selected";
};

Template.leaderboard.showselectedPlayer=function(){
	var selectedPlayer = Session.get('selectedPlayer');
	return PlayersList.findOne(selectedPlayer);
};

Template.leaderboard.events({
	'click li.player':function(){
		var playerId = this._id;
		Session.set('selectedPlayer',playerId);
	},
	
	'click #decrement':function(){
		var selectedPlayer = Session.get('selectedPlayer');
		PlayersList.update({_id:selectedPlayer},{$inc:{score:-5}});
	},

	'click #increment':function(){
		var selectedPlayer = Session.get('selectedPlayer');
		PlayersList.update({_id:selectedPlayer},{$inc:{score:5}});
	},
	
	'click #decrement':function(){
		var selectedPlayer = Session.get('selectedPlayer');
		PlayersList.update({_id:selectedPlayer},{$inc:{score:-5}});
	},

	'click #remove':function(){
		var selectedPlayer = Session.get('selectedPlayer');
		//PlayersList.remove(selectedPlayer);
		Meteor.call('removePlayer',selectedPlayer);
	}
});

Template.addPlayerForm.events({
	'submit form#playerForm':function(theEvent,theTemplate){
		theEvent.preventDefault();
		var playerNameVar=theTemplate.find("#playerName").value;
		var currentUserId= Meteor.userId();
		Meteor.call('insertPlayerData',playerNameVar);
		theTemplate.find("#playerName").value=null;
		
	}
});
 /* Template.hello.greeting = function () {
    return "Welcome to leaderboard.";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });*/
