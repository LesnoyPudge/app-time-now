import './styles.scss';
import { CSSProperties, FC, useState } from 'react';
import { useInterval } from '@lesnoypudge/utils-react';
import { format } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';


const styles = {
    container: {
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        fontSize: '1.2rem',
        paddingBlock: '20px',
        overflowX: 'hidden',
        overflowY: 'auto',
        justifyContent: 'center',
    },
    item: {
        padding: '6px',
        borderRadius: '4px',
        backgroundColor: 'black',
    },
} satisfies Record<string, CSSProperties>;

export const Root: FC = () => {
    const [date, setDate] = useState(new Date());

    useInterval(() => {
        setDate(new Date());
    }, 1_000);

    const timeNow = date.toLocaleTimeString(undefined, {
        hour12: false,
    });

    const dateData = format(date, 'd.MM.yyyy');

    const monthRu = format(date, 'MMMM', { locale: ru });

    const monthEn = format(date, 'MMMM', { locale: enUS });

    const dayOfWeekRu = format(date, 'iiii', { locale: ru });

    const dayOfWeekEn = format(date, 'iiii', { locale: enUS });



    return (
        <div className='container' style={styles.container}>
            <div style={styles.item}>
                <>Время сейчас: {timeNow}</>
            </div>

            <div style={styles.item}>
                <>Дата: {dateData}</>
            </div>

            <div style={styles.item}>
                <>Месяц: {monthRu} - {monthEn}</>
            </div>

            <div style={styles.item}>
                <>День недели: {dayOfWeekRu} - {dayOfWeekEn}</>
            </div>
        </div>
    );
};