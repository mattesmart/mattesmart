
export default function sendMessage(recipient: string, message: string) {
    //mockup
    return new Promise(async (resolve, reject) =>  {
        setTimeout(resolve,1000);
    })
    //normalize recipient
    let body = {}; //REVISIT
    if (recipient.substring(0, 1) === "+") {
        recipient = recipient.substring(1);
    }
    if (recipient.substring(0, 2) === "00") {
        recipient = recipient.substring(2);
    }
    if (recipient.substring(0, 2) === "07") {
        recipient = `46${recipient.substring(1)}`;
    }
    //iis as host, with ARR and server variable for API key
    //https://stackoverflow.com/a/11050565
    return fetch("/sms/api/message", {
        method: "POST",
        body: JSON.stringify(body)
    }).catch(error => {
        console.log("error", error);
        throw error;
    })

}