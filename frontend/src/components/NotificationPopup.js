import React, { useEffect, useState } from "react";
import "./../styles/AuthStyles.css";
import axios from 'axios';

const NotificationPopup = ({ notifications, onClose }) => {
  const handleClick = (e) => {
    e.preventDefault(); // Prevent default behavior (navigation)
    onClose(); // Close the popup
  };

  useEffect(() => {
  }, [allNotifications])

  const handleChatButtonClick = (notificationId) => {
    // Implement logic to handle chat button click for the given notification
    console.log(
      `Chat button clicked for notification with ID ${notificationId}`
    );
  };

  const [allNotifications, setAllNotifications] = useState([]);

  useEffect(() => {
    getAllNotifications()
  }, [])

  const getAllNotifications = async () => {
    try {
      const response = await axios.get('http://192.168.18.29:8080/getallformdata');
      // setAllNotifications(response.data);

      const formattedData = response.data.reduce((accumulator, currentItem) => {
        currentItem.pharmacyResponses.forEach(response => {
          accumulator.push({
            medicineId: currentItem._id,
            medicineName: currentItem.medicineName,
            pharmacy_id: response.pharmacy._id,
            pharmacy_name: response.pharmacy.name,
            response: response.response
          });
        });
        return accumulator;
      }, []);

      console.log(formattedData, 'formattedData');
      setAllNotifications(formattedData)

    } catch (error) {
      console.error('Error fetching form data:', error);
    }
    
  };

  console.log(allNotifications,'sfasfdasfdasfdasfasdfas')

  return (
    <div className="notification-popup-container">
      {" "}
      {/* Added container class */}
      <div className="notification-popup">
        <div className="popup-content">
          <h3>Pharmacy Response</h3>
          {allNotifications.length > 0 ? (
            <ul className="notification-list">
              {allNotifications?.map((notification) => (
                <li key={notification.id} className="notification-item">
                  <strong>{notification.pharmacy_name}</strong>: {notification.response}
                  <button
                    className="chat-button"
                    onClick={() => handleChatButtonClick(notification.id)}
                  >
                    Chat
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No notifications to display.</p>
          )}
          <button onClick={handleClick}>Close</button>{" "}
          {/* Use handleClick function */}
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup;
