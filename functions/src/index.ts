import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

export const createRegistration = functions.auth.user().onCreate(async (user, context) => {
    try {
        const id = user.uid;
        await db.doc(`registrations/${id}`).set({
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
        });
        const events = await db.collection('events').listDocuments();
        const eventObjs = events.map(evt => {
            return {
                eventId: evt.id,
                attending: false,
                numberOfPeople: 1
            };
        });
        const promises: Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>>[] = [];
        eventObjs.forEach(evtObj => {
            const p = db.collection(`/registrations/${id}/events`).add(evtObj);
            promises.push(p);
        });
        return await Promise.all(promises);
    } catch (err) {
        console.error(err);
        return;
    }
});

export const deleteRegistration = functions.auth.user().onDelete(async (user) => {
    const registrations = db.collection("registrations");
    const uid = user.uid;
    const registration = registrations.doc(uid);
    const rsvps = await registration.collection('events').listDocuments();
    const promises: Promise<FirebaseFirestore.WriteResult>[] = [];
    rsvps.forEach(rsvp => {
        const p = rsvp.delete();
        promises.push(p);
    });

    await Promise.all(promises);

    return registration.delete();
});