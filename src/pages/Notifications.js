import React from 'react';
import '../index.css';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { environment } from '../environment';


const Notifications = () => {
    let token = localStorage.getItem("usertoken") ? localStorage.getItem("usertoken") : null;
    let data = token ?  JSON.parse(atob(token.split('.')[1])) : {}
    const { receiverID, senderID } = useParams();

    var notifications = [];
    data.data?.notifications.forEach((notification) => {
        notifications.push(notification);
    })

    async function openNotification (id) {
        const res = await axios.post(
            `${environment.apiurl}/notifications/open-notification/${data.data._id}/${id}`,
            { id: id },
            { headers: { "Content-Type": "application/json" } }
            );
            console.log(res)
    }

    return (
        <div className="notifications-container">
          {notifications.length ? (
            notifications.map((n) => (
              <div key={n.id} className="notification-item" role="button" onClick={() => openNotification(n._id)}>
                <div
                  className="notification-icon"
                  style={{ backgroundImage: `url(${n.icon})` }}
                />
                <div className="notification-content">
                  <div className={n.read ? "notifications-container-read" : "notification-header"}>{n.name} sent you a message</div>
                  <div className="notification-timestamp">{moment(n.createdAt).format("DD-MM-YYYY : HH:mm")}</div>
                </div>
                    {n.read && <p6 style={{fontSize:'x-small'}}>Read</p6>}
              </div>
            ))
          ) : (
            <div>No notifications</div>
          )}
        </div>
      );
}

export default Notifications;
