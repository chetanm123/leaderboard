
  Meteor.startup(function () {
    // code to run on server at startup
	
		Meteor.publish('thePlayers',function(){
			return PlayersList.find({createdBy:this.userId});
		});

		Meteor.methods({
			'insertPlayerData':function(playerName){
				PlayersList.insert({
					name:playerName,
					score:0,
					createdBy:this.userId
				});
			},
			'removePlayer':function(selectedPlayer){
				PlayersList.remove(selectedPlayer);
			}
		});
  });

