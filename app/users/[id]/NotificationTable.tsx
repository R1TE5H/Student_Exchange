"use client";
import { Notification } from "@/prisma/interfaces";
import React, { useState, useEffect } from "react";

interface Props {
  userId: string;
}

const NotificationTable = ({ userId }: Props) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const getNotifications = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/notify`,
      {
        headers: { "user-id": userId },
      }
    );

    setNotifications(await res.json());
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const deleteNotification = async (notificationId: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/notify`,
      {
        method: "DELETE",
        body: JSON.stringify({ notificationId }),
      }
    );
    getNotifications();
  };

  return (
    <div>
      <table className="table-auto w-full text-left bg-gray-700 rounded-md shadow-lg">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Buyer Email</th>
            <th>Dismiss</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 text-gray-200">
          {notifications.map((notification) => (
            <tr key={notification.id}>
              <td>{notification.product.name}</td>
              <td>{notification.quantity}</td>
              <td>{notification.buyer.email}</td>
              <td>
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="text-sm p-5 font-bold bg-indigo-600 tracking-wide text-white uppercase rounded-lg hover:text-purple-400"
                >
                  Dismiss
                </button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationTable;
