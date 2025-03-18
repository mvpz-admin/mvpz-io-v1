const monthzFullNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daySuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };


export function formatDateT1(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = monthzFullNames[date.getMonth()];
    const year = date.getFullYear();
   
  
    return `${day}${daySuffix(day)} ${month} ${year}`;
    // retun example : 31st October 2024
  }


  export function postedAtTime(date: string | Date): string {

    if(!date){
      return null
    }

    const now = new Date();
    const postedDate = new Date(date);
    const seconds = Math.floor((now.getTime() - postedDate.getTime()) / 1000);

    if (seconds < 0) return "just now"; // Future dates edge case

    let interval = seconds / 31536000; // seconds in a year
    if (interval >= 1) return `${Math.floor(interval)} year${Math.floor(interval) > 1 ? "s" : ""} ago`;

    interval = seconds / 2592000; // seconds in a month
    if (interval >= 1) return `${Math.floor(interval)} month${Math.floor(interval) > 1 ? "s" : ""} ago`;

    interval = seconds / 86400; // seconds in a day
    if (interval >= 2) {
        // Show date for posts older than 2 days
        return postedDate.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short", // Short month name (e.g., "Dec")
            year: "numeric",
        });
    }

    if (interval >= 1) {
        // Show "yesterday" if within a single day
        return "yesterday";
    }

    interval = seconds / 3600; // seconds in an hour
    if (interval >= 1) return `${Math.floor(interval)} hr${Math.floor(interval) > 1 ? "s" : ""} ago`;

    interval = seconds / 60; // seconds in a minute
    if (interval >= 1) return `${Math.floor(interval)} min${Math.floor(interval) > 1 ? "s" : ""} ago`;

    return `${seconds} second${seconds === 1 ? "" : "s"} ago`;
}


