// function getTime(dateString) {
//     const now = new Date();
//     const postDate = new Date(dateString);
//     const diffInSeconds = Math.floor((now - postDate) / 1000);
//     const diffInMinutes = Math.floor(diffInSeconds / 60);
//     const diffInHours = Math.floor(diffInMinutes / 60);
//     const diffInDays = Math.floor(diffInHours / 24);
//     const diffInMonths = Math.floor(diffInDays / 30);
//     const diffInYears = Math.floor(diffInDays / 365);

//     if (diffInYears > 0) {
//         return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
//     } else if (diffInMonths > 0) {
//         return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
//     } else if (diffInDays > 0) {
//         return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
//     } else if (diffInHours > 0) {
//         return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
//     } else if (diffInMinutes > 0) {
//         return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
//     } else {
//         return 'Just now';
//     }
// }

// export  default { getTime };
// utils.js
export function getTime(dateString) {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInSeconds = Math.floor((now - postDate) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInYears > 0) {
        return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
    } else if (diffInMonths > 0) {
        return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    } else if (diffInDays > 0) {
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInHours > 0) {
        return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInMinutes > 0) {
        return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else {
        return 'Just now';
    }
}
