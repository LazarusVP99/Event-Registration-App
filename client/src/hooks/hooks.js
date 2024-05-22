
import {
    useCallback, useEffect, useRef, useState
} from "react";

/**
 * Custom hook that manages the countdown timer for an event.
 * @param {object} event - An object containing the event information, including the start of event.
 * @returns {object} - An object containing the remaining time until the event, in days, hours, minutes, and seconds.
 */
export function useEventCountdown ({ event }) {
    const intervalRef = useRef(null);
    const [eventCountdown, setEventCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const startEventTimer = useCallback(() => {
        intervalRef.current = setInterval(() => {
            const currentTime = +new Date().getTime();
            const eventStartTime = +new Date(event.startTime).getTime();
            const remainingTime = eventStartTime - currentTime;

            if (remainingTime > 0) {
                const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
                const hours = Math.floor(remainingTime / (1000 * 60 * 60) - days * 24);
                const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
                const seconds = Math.floor((remainingTime / 1000) % 60);
                setEventCountdown({ days, hours, minutes, seconds });
            } else {
                setEventCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                clearInterval(intervalRef.current);
            }
        }, 1000);
    }, [event]);

    useEffect(() => {
        if (event) {
            const currentTime = +new Date().getTime();
            const eventStartTime = +new Date(event.startTime).getTime();
            const dateDifference = eventStartTime - currentTime;

            if (dateDifference > 0) {
                startEventTimer(dateDifference);
            } else {
                setEventCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }

            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
            };
        }
    }, [startEventTimer, event]);

    return eventCountdown;
}
