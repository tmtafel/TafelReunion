import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

export const createRegistration = functions.auth.user().onCreate(async (user, context) => {
    try {
        const id = user.uid;
        await admin.auth().setCustomUserClaims(id, { admin: false });
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

export const eventDeleted = functions.firestore.document('events/{eventId}')
    .onDelete(async (snapshot, context) => {
        try {
            const eventId = context.params.eventId;
            const getRsvpPromises: Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>>[] = [];
            const users = await db.collection(`registrations`).listDocuments();
            users.forEach(u => {
                const getPromise = db.collection(`registrations/${u.id}/events`).where("eventId", "==", eventId).get();
                getRsvpPromises.push(getPromise);
            });
            const rsvps = await Promise.all(getRsvpPromises);
            const deleteRsvpPromises: Promise<FirebaseFirestore.WriteResult>[] = [];
            rsvps.forEach(rsvp => {
                rsvp.docs.forEach(doc => {
                    const deletePromise = doc.ref.delete();
                    deleteRsvpPromises.push(deletePromise);
                });
            });
            const deletedRsvps = await Promise.all(deleteRsvpPromises);
            console.log(deletedRsvps);
            return;
        } catch (err) {
            console.log(err);
            return;
        }
    });

export const eventAdded = functions.firestore.document('events/{eventId}')
    .onCreate(async (snapshot, context) => {
        try {
            const id = context.params.eventId;
            const eventObj = {
                eventId: id,
                attending: false,
                numberOfPeople: 1
            };
            const promises: Promise<FirebaseFirestore.DocumentData>[] = [];
            const users = await db.collection(`registrations`).listDocuments();
            users.forEach(u => {
                const p = db.collection(`registrations/${u.id}/events`).add(eventObj);
                promises.push(p);
            });

            await Promise.all(promises);
            return;
        } catch (err) {
            console.log(err);
            return;
        }
    });
