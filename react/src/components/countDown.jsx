class Clock extends React.Component {
  format(time) {
    let seconds = time % 60;
    let minutes = Math.floor(time / 60);
    minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
    seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
    return minutes + ":" + seconds;
  }
  render() {
    const { time } = this.props;
    return (
      <div className="displayedTime">
        <h1>{this.format(time)}</h1>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      running: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.running !== prevState.running) {
      switch (this.state.running) {
        case true:
          this.handleStart();
      }
    }
  }

  handleStart() {
    this.timer = setInterval(() => {
      const newCount = this.state.count - 1;
      this.setState({ count: newCount >= 0 ? newCount : 0 });
    }, 1000);
  }

  handleStop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.setState({ running: false });
    }
  }

  handleReset() {
    this.setState({ count: 0 });
  }

  handleCountdown(seconds) {
    this.setState({
      count: seconds,
      running: true
    });
  }

  render() {
    const { count } = this.state;
    return (
      <div className="container">
        <Clock time={count} />
        <Input onSetCountdown={this.handleCountdown.bind(this)} />
        <Button label="stop" onClickHandler={this.handleStop.bind(this)} />
        <Button label="reset" onClickHandler={this.handleReset.bind(this)} />
      </div>
    );
  }
}
