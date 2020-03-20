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

export const getUsers = functions.https.onRequest(async (req, res) => {
    try {
        const users = await admin.auth().listUsers();
        const usersJson = JSON.stringify(users);
        res.send(usersJson);
    } catch (err) {
        const errJson = JSON.stringify(err);
        res.redirect(303, errJson);
    }
});

export const getUser = functions.https.onRequest(async (req, res) => {
    try {
        const email = req.query.email;
        const user = await admin.auth().getUserByEmail(email);
        const userJson = JSON.stringify(user);
        res.send(userJson);
    } catch (err) {
        const errJson = JSON.stringify(err);
        res.redirect(303, errJson);
    }
});

export const isUserAdmin = functions.https.onRequest(async (req, res) => {
    try {
        const id = req.query.id;
        const user = await admin.auth().getUser(id);
        if (user.customClaims) {
            res.send(user.customClaims);
        }
        res.send(false);
    } catch (err) {
        console.log(err);
        res.send(false);
    }
});

// export const setUserAsAdmin = functions.https.onRequest(async (req, res) => {
//     try {
//         const id = req.query.id;
//         await admin.auth().setCustomUserClaims(id, { admin: true });
//         const user = await admin.auth().getUser(id);
//         const userJson = JSON.stringify(user);
//         res.send(userJson);
//     } catch (err) {
//         const errJson = JSON.stringify(err);
//         res.redirect(303, errJson);
//     }
// });

export const removeUserAsAdmin = functions.https.onRequest(async (req, res) => {
    try {
        const id = req.query.id;
        await admin.auth().setCustomUserClaims(id, { admin: false });
        const user = await admin.auth().getUser(id);
        const userJson = JSON.stringify(user);
        res.send(userJson);
    } catch (err) {
        const errJson = JSON.stringify(err);
        res.redirect(303, errJson);
    }
});