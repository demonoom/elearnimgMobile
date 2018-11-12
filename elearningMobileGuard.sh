#! /bin/bash
while true; do
    {
        node  elearningMobileServer.js
        echo "elearningMobileServer stopped unexpected, restarting"
    }
    sleep 1
done