import React, { Component } from "react";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "../../node_modules/react-notifications/lib/notifications.css";
class WebNotif extends Component {
  state = {};
  createNotification = (type, msg) => {
    switch (type) {
      case "info":
        NotificationManager.info("Info message");
        break;
      case "success":
        NotificationManager.success(msg);
        break;
      case "warning":
        NotificationManager.warning(msg);
        break;
      case "error":
        NotificationManager.error(msg);
        break;
    }
  };
  render() {
    return null;
  }
}
export default WebNotif;
