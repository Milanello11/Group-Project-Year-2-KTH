import { toaster } from "./components/ui/toaster";

export async function handleBooking(festivalId: number, userId: number) {
    if (!userId || userId === 0) {
        toaster.create({
            title: "You must be logged in as a user.",
            description: "Please log in to book a ticket.",
            type: "error",
            duration: 4000,
        });
        return;
    }
    try {
        const response = await fetch(`${process.env["REACT_APP_API_URL"]}/api/booking/${festivalId}/${userId}`, {
            method: "POST",
        });

        if (response.ok) {
            toaster.create({
                title: "Booking successful",
                description: "Your ticket has been booked!",
                type: "success",
                duration: 4000,
            });
        } else {
            toaster.create({
                title: "Booking failed",
                description: "Something went wrong",
                type: "error",
                duration: 4000,
            });
        }
    } catch (err) {
        console.error("Booking error: ", err);
        toaster.create({
            title: "Booking error",
            description: `Could not make a booking. ${err}`,
            type: "error",
            duration: 4000,
        });
    }
}