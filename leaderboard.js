PlayersList=new Meteor.Collection('players');

if (Meteor.isClient) {

Template.leaderboard.player=function(){
	return PlayersList.find({},{sort:{score:-1,name:1}});
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
		PlayersList.remove(selectedPlayer);
	}
});

Template.addPlayerForm.events({
	'submit form#playerForm':function(theEvent,theTemplate){
		theEvent.preventDefault();
		var playerNameVar=theTemplate.find("#playerName").value;
		PlayersList.insert({
			name:playerNameVar,
			score:0
		});
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
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
