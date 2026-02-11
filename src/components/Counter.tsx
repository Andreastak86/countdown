import { useState, useEffect } from "react";

type TimeLeft = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

type CountdownProps = {
    targetDate: Date;
    label: string;
};

export default function Counter({ targetDate, label }: CountdownProps) {
    const calculateTimeLeft = (): TimeLeft | null => {
        const now: Date = new Date();
        const diff: number = targetDate.getTime() - now.getTime();

        if (diff <= 0) {
            return null;
        }

        const seconds = Math.floor(diff / 1000) % 60;
        const minutes = Math.floor(diff / 1000 / 60) % 60;
        const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
        const days = Math.floor(diff / 1000 / 60 / 60 / 24);

        return { days, hours, minutes, seconds };
    };

    const [timeLeft, SetTimeLeft] = useState<TimeLeft | null>(
        calculateTimeLeft(),
    );

    useEffect(() => {
        const interval: number = window.setInterval(() => {
            SetTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => window.clearInterval(interval);
    });

    if (!timeLeft) {
        return <h2>{label}Gratulerer med dagen!</h2>;
    }

    return (
        <div className='counter' aria-label={`${label} countdown`}>
            <div className='clock_unit'>
                <span className='clock_value'>{timeLeft.days}</span>
                <span className='clock_label'>dager</span>
            </div>

            <span className='clock_sep'>:</span>

            <div className='clock_unit'>
                <span className='clock_value'>
                    {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className='clock_label'>timer</span>
            </div>

            <span className='clock_sep'>:</span>

            <div className='clock_unit'>
                <span className='clock_value'>
                    {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className='clock_label'>min</span>
            </div>

            <span className='clock_sep'>:</span>

            <div className='clock_unit'>
                <span className='clock_value'>
                    {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <span className='clock_label'>sek</span>
            </div>
        </div>
    );
}
