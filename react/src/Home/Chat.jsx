import React from "react";
import "../assets/css/talhacss/chat_Design.css";
import axios from "axios";
import $ from "jquery";
import urlapi from "../config/urlapi";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getengName: localStorage.getItem("engName"),
      time: null,
      getEngId: localStorage.getItem("engId"),
      message: "",
      getAllmessage: []
    };
  }
  componentDidMount() {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
    this.setState({ time: time });

    axios
      .post(urlapi + "/admin/engineerInformation", {
        engineerId: this.state.getEngId
      })
      .then(resi => {
        localStorage.setItem("engName", resi.data[0].name);
        // console.log("this is  ress",resi)
      })
      .catch(err => {
        console.log(err);
      });
    setInterval(() => {
      axios
        .get(urlapi + "/msg/getMessage")
        .then(resi => {
          console.log("set interval");
          this.setState({ getAllmessage: resi.data });
        })
        .catch(err => {
          console.log(err);
        });
    }, 3000);
  //   setInterval(() => {
  //     var elem = document.getElementById('scrollbottom');
  //     elem.scrollTop = elem.scrollHeight;
  //  },1000);
    const msgerForm = get(".msger-inputarea");
    const msgerInput = get(".msger-input");
    const msgerChat = get(".msger-chat");
    const BOT_MSGS = [
      "Hi, how are you?",
      "Ohh... I can't understand what you trying to say. Sorry!",
      "I like to play games... But I don't know how to play!",
      "Sorry if my answers are not relevant. :))",
      "I feel sleepy! :("
    ];

    // Icons made by Freepik from www.flaticon.com
    const BOT_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
    const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
    const BOT_NAME = "BOT";
    const PERSON_NAME = this.state.getengName;

    msgerForm.addEventListener("submit", event => {
      event.preventDefault();

      //  const msgText = msgerInput.value;
      //   if (!msgText) return;
      //   appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
      msgerInput.value = "";
       // botResponse();
    });

    function appendMessage(name, img, side, text) {
      //   Simple solution for small apps
      const msgHTML = `
        <div class="msg ${side}-msg">
          <div class="msg-img" style="background-image: url(${img})"></div>
          <div class="msg-bubble">
            <div class="msg-info">
              <div class="msg-info-name">${name}</div>
              <div class="msg-info-time">${formatDate(new Date())}</div>
            </div>
            <div class="msg-text">${text}</div>
          </div>
        </div>
      `;
      msgerChat.insertAdjacentHTML("beforeend", msgHTML);
      msgerChat.scrollTop += 500;
    }

    function botResponse() {
      const r = random(0, BOT_MSGS.length - 1);
      const msgText = BOT_MSGS[r];
      const delay = msgText.split(" ").length * 100;
      setTimeout(() => {
        appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
      }, delay);
    }
    // Utils
    function get(selector, root = document) {
      return root.querySelector(selector);
    }
    function formatDate(date) {
      const h = "0" + date.getHours();
      const m = "0" + date.getMinutes();
      return `${h.slice(-2)}:${m.slice(-2)}`;
    }
    function random(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
  }
  send = () => {
    axios
      .post(urlapi + "/msg/addmsg", {
        name: this.state.getengName,
        engid: this.state.getEngId,
        message: this.state.message
      })
      .then(res => {
        // console.log(res);
        //  this.setState({getAllmessage:res.data})
      })
      .catch(erro => {
        console.log("erro");
      });
  };
  handlechange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <div className="bodypage">
          <section className="msger">
            <header className="flex-cont">
              <div className="msger-header-title text-center">
                <i className="fas fa-comment-alt" />
                <br />
                Ask Questions
              </div>
            </header>

            <main className="msger-chat" id="scrollbottom">
              {/* <div className="msg left-msg">
            <div className="msg-img" style={{backgroundImage: 'url(https://image.flaticon.com/icons/svg/327/327779.svg)'}} />
            <div className="msg-bubble">
              <div className="msg-info">
                <div className="msg-info-name">BOT</div>
                <div className="msg-info-time">12:45</div>
              </div>
              <div className="msg-text">
                Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
              </div>
            </div>
          </div> */}
              {this.state.getAllmessage.length > 0 ? (
                this.state.getAllmessage.map((msg, key) => (
                  <div key={key}>
                    <div className="msg right-msg">
                      <div
                        className="msg-img"
                        style={{
                          backgroundImage:
                            "url(https://image.flaticon.com/icons/svg/145/145867.svg)"
                        }}
                      />
                      <div className="msg-bubble">
                        <div className="msg-info">
                          <div className="msg-info-name">{msg.name}</div>
                          <div className="msg-info-time">{msg.create_date}</div>
                        </div>
                        <div className="msg-text">{msg.message}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <div className="msg right-msg">
                    <div
                      className="msg-img"
                      style={{
                        backgroundImage:
                          "url(https://image.flaticon.com/icons/svg/145/145867.svg)"
                      }}
                    />
                    <div className="msg-bubble">
                      <div className="msg-info">
                        <div className="msg-info-name">
                          {this.state.getengName}
                        </div>
                        <div className="msg-info-time">{this.state.time}</div>
                      </div>
                      <div className="msg-text">
                        You Ask question here about the Webinar your Instrutor
                        is Dr Ali Sajid.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </main>
            <form className="msger-inputarea">
              <div class="image-upload">
                <label for="file-input" style={{ visibility: "hidden" }}>
                  <i className="fas fa-paperclip"></i>
                </label>
                <input id="file-input" type="file" />
              </div>
              <input
                type="text"
                onChange={this.handlechange}
                name="message"
                className="msger-input textbox"
                placeholder="Enter Question..."
              />
              <button
                type="submit"
                onClick={this.send}
                className="btn btn-success bold fz_16 text-center msger-send-btn mt_5v"
              >
                submit
              </button>
            </form>
          </section>
        </div>
      </React.Fragment>
    );
  }
}
export default Chat;
