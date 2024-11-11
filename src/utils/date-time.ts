// Helper function to get the current time in the Bangkok timezone
export function getBangkokTime(): Date {
    const timeZone = 'Asia/Bangkok';
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        hour12: false,
        minute: '2-digit',
        second: '2-digit',
        timeZone,
    };

    // Get current time in Bangkok timezone, format it to a string, and then convert it to a Date object
    const timeString = new Date().toLocaleString('en-GB', options);
    const [hours, minutes, seconds] = timeString.split(':').map(Number);

    // Create a new Date object using the current date with the obtained time components
    const currentDate = new Date();
    currentDate.setHours(hours as number, minutes, seconds, 0); // Set the extracted time to the current date

    return currentDate;
}

export const formatDateVerbose = (date: Date | string) => {
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric', // This gives us the day of the month without leading zeroes
        month: 'long', // This gives us the full month name (e.g., 'November')
        year: 'numeric',
    };

    // Use `Intl.DateTimeFormat` to format the date
    const formatter = new Intl.DateTimeFormat('en-US', options);

    const formattedDate = formatter.format(date instanceof Date ? date : new Date(date));

    // Split formatted date and manipulate it if needed
    const [month, day, year] = formattedDate.split(' ');
    const monthFormatted = month;
    const dayFormatted = day;
    const yearFormatted = year;

    // Return formatted date in the format: "November 11, 2024"
    return `${monthFormatted} ${dayFormatted} ${yearFormatted}`;
};
