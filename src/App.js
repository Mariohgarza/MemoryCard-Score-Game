import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Navbar from "./components/Navbar";
import friends from "./friends.json";
import "./App.css";

function shuffle(friends) {
    for (let i = friends.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const friendsTemp = friends[i];
      friends[i] = friends[j];
      friends[j] = friendsTemp;
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

 scoreChange = image => {
    const findImage = this.state.unselected.find(item => item.image === image);
    if(findImage === undefined) {
        this.setState({
            msg: <h3><strong> Sorry try again!</strong></h3>,
            topscore: (this.state.score > this.state.topscore) ? this.state.score : this.state.topscore,
            score: 0,
            friends: friends,
            unselected: friends
        });
        this.moveImage();
    }
    else {
        const newImages = this.state.unselected.filter(item => item.image !== image);
        this.setState({
            msg: <h3><strong>Nice! Keep going!</strong></h3>,
            score: this.state.score + 1,
            friends: friends,
            unselected: newImages
        });
        this.moveImage();
    }

  };

  moveImage = () => {
    // Filter this.state.friends for friends with an id not equal to the id being removed
    const friendsNew = shuffle(this.state.friends);
    // Set this.state.friends equal to the new friends array
    this.setState({
      friends : friendsNew,
    });
  };


  // Map over this.state.friends and render a FriendCard component for each friend object
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
            scoreChange={this.scoreChange}
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
