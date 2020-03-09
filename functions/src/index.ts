import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

export interface IEvent {
    eventId: string;
    title: string;
}



export const createRegistration = functions.auth.user().onCreate(async (user, context) => {
    const registration = db.doc(`registrations/${user.uid}`);
    return registration.set({
        address: {
            city: '',
            country: '',
            state: '',
            street: '',
            zip: ''
        },
        branch: '',
        email: user.email,
        firstName: '',
        lastName: '',
        phone: ''
    }).then(() => {
        console.log(`Created Registration ${user.uid}`);
        const events = db.collection("events");
        return events.listDocuments().then(docs => {
            docs.forEach(async doc => {
                let evtObj;
                await doc.get().then(data => {
                    const evt = data.data() as IEvent;
                    return evtObj = {
                        eventId: evt.eventId,
                        title: evt.title,
                        attending: false,
                        numberOfPeople: 1
                    };
                }).catch(() => {
                    console.log("error reading data in doc");
                    return;
                });
                if (evtObj) {
                    await registration.collection('events').add(evtObj);
                }
                return;
            });
        }).catch(() => {
            console.log(`Error Listing docs`);
            return;
        });
    }).catch(() => {
        console.log(`Error Creating registrsagion`);
        return;
    });;
});




export const deleteRegistration = functions.auth.user().onDelete((user) => {
    const registrations = db.collection("registrations");
    const uid = user.uid;
    const registration = registrations.doc(uid);
    const rsvps = registration.collection('events');
    rsvps.listDocuments().then((docs) => {
        docs.forEach(async doc => {
            await doc.delete();
        });
        return;
    }).catch(() => {
        console.log("Error listing documents document");
        return;
    });

    return registrations.doc(uid).delete().then(() => {
        console.log(`Registration ${uid} successfully deleted!`);
        return;
    }).catch(() => {
        console.log("Error removing registration");
        return;
    });
});