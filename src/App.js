import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Navbar from "./components/Navbar";
import friends from "./friends.json";
import "./App.css";

function randomPic(friends) {
    for (let i = friends.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const friendsArr = friends[i];
      friends[i] = friends[j];
      friends[j] = friendsArr;
    }
    return friends;
};

class App extends Component {

  state = {
    friends : friends,
    msg: <h2> <strong>Click an Image to start!</strong></h2>,
    topscore: 0,
    score: 0,
    unselected:friends
  };

 scoreUpdate = image => {
    const findImage = this.state.unselected.find(item => item.image === image);
    if(findImage === undefined) {
        this.setState({
            msg: <h1><strong> Sorry try again!</strong></h1>,
            topscore: (this.state.score > this.state.topscore) ? this.state.score : this.state.topscore,
            score: 0,
            friends: friends,
            unselected: friends
        });
        this.movePic();
    }
    else {
        const newImages = this.state.unselected.filter(item => item.image !== image);
        this.setState({
            msg: <h2><strong>Nice! Keep going!</strong></h2>,
            score: this.state.score + 1,
            friends: friends,
            unselected: newImages
        });
        this.movePic();
    }

  };

  movePic = () => {

    const friendsNew = randomPic(this.state.friends);

    this.setState({
      friends : friendsNew,
    });
  };



  render() {
    return (
      <div>
      <Navbar
            title=" Lord of the Rings Game!"
            msg={this.state.msg}
            score={this.state.score}
            topscore={this.state.topscore}
          />
      <Wrapper>
        {this.state.friends.map(friend => (
          <FriendCard
            scoreUpdate={this.scoreUpdate}
            moveImage={this.moveImage}
            id={friend.id}
            key={friend.id}
            name={friend.name}
            occupation={friend.occupation}
            location={friend.location}
            image={friend.image}
          />
        ))}
      </Wrapper>
      </div>
    );
  }
}

export default App;
