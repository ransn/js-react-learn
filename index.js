import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
// Import stylesheets
import "./style.css";

// // Write Javascript code!
// const appDiv = document.getElementById('app');
// appDiv.innerHTML = `<h1>JS Starter</h1>`;

const testData = [];

// GitHub usernames: gaearon, sophiebits, sebmarkbage, bvaughn

class Form extends React.Component {
  //userNameInput = React.createRef();
  state = { userName: "" };

  handleSubmit = async event => {
    event.preventDefault();
    //console.log(this.userNameInput.current.value);
    const resp = await axios.get(
      `https://api.github.com/users/${this.state.userName}`
    );

    this.props.onSubmit(resp.data);

    this.setState({ userName: "" });
    //console.log(resp.data);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="User Name"
          required
          // ref={this.userNameInput}
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
        />
        <button>Add Card</button>
      </form>
    );
  }
}

const CardList = props => (
  <div>
    {props.profiles.map(profile => (
      <Card key={profile.id} {...profile} />
    ))}
  </div>
);

const Card = props => (
  <div className="github-profile" style={{ margin: "1rem" }}>
    <img src={props.avatar_url} style={{ width: 75 }} />
    <div className="info" style={{ display: "inline-block", marginLeft: 10 }}>
      <div className="name" style={{ fontSize: "125%", fontWeight: "bold" }}>
        {props.name}
      </div>
      <div className="company">{props.company}</div>
    </div>
  </div>
);

// const App = props => (
//   (state = {
//     profiles: testData
//   }),
//   (addNewProfile = profileData => {
//     //console.log("App", profileData);
//     this.setState(prevState => ({
//       profiles: [...prevState.profiles, profileData]
//     }));
//   }),
//   (
//     <div>
//       <div className="header">{this.props.title}</div>
//       <Form onSubmit={this.addNewProfile} />
//       <CardList profiles={this.state.profiles} />
//     </div>
//   )
// );

class App extends React.Component {
  state = {
    profiles: []
  };

  addNewProfile = profileData => {
    //console.log("App", profileData);
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData]
    }));
  };

  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
      </div>
    );
  }
}

//const App = ({ title }) => <div className="header">{title}</div>;

ReactDOM.render(<App title="Github Cards" />, document.getElementById("app"));
