import {
    useCallback, useEffect, useRef, useState
} from "react";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../store/features/currentPage";


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



/**
 * A custom React hook that implements infinite scrolling functionality.
 *
 * This hook manages the state and behavior related to infinite scrolling, including:
 * - Tracking the current page and limit for pagination
 * - Detecting when the user has scrolled to the bottom of the page
 * - Dispatching an action to load the next page of data
 * - Restoring the scroll position after new data has been loaded
 *
 * @param {object} object - An object containing the current page and limit values.
 * @param {object} pageData - An object containing flags for whether there are more pages available.
 * @returns {object} An object containing the current scroll loading state and a function to set it.
 */
export const useInfiniteScroll = ({ object, pageData }) => {
    const dispatch = useDispatch();
    const [scrollLoading, setScrollLoading] = useState(false);
    const { page, limit } = object;
    const [hasNextPage, hasPrevPage] = pageData;
    const lastScrollPosition = useRef(0);
    const scrollPositionBeforeLoad = useRef(0);

    const debounce = useCallback((func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    }, []);

    useEffect(() => {
        const handleScroll = debounce(() => {
            const { offsetHeight } = document.documentElement;
            const windowHeight = window.innerHeight;
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrolledToBottom = windowHeight + scrollTop >= offsetHeight - 100;
            const scrollDirection = scrollTop > lastScrollPosition.current ? 'down' : 'up';
            lastScrollPosition.current = scrollTop;

            if (scrolledToBottom
                && hasNextPage
                && scrollDirection === 'down') {
                scrollPositionBeforeLoad.current = scrollTop;

                dispatch(setCurrentPage({ page, limit: limit + 12 }));

                setScrollLoading(true);
            }
        }, 500);

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [dispatch, hasNextPage, hasPrevPage, limit, page, debounce]);

    useEffect(() => {
        if (!scrollLoading) {
            window.scrollTo({
                top: scrollPositionBeforeLoad.current + 300,
                behavior: 'smooth',
            });
        }
    }, [scrollLoading]);

    return { scrollLoading, setScrollLoading };
};