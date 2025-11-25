import { useEffect, useRef } from 'react';

export const useMailAutomation = (tasks) => {
    const ref = useRef(tasks);
    useEffect(() => { ref.current = tasks; }, [tasks]);

    useEffect(() => {
        const id = setInterval(() => {
            const pending = ref.current.filter(t => t.status === 'pending');
            if (pending.length) console.log(`[Mail Cron] Sending reminders for ${pending.length} tasks:`, pending.map(t => t.title));
        }, 20 * 60 * 1000);
        return () => clearInterval(id);
    }, []);
};
