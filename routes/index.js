const { requireAuth } = require("../helpers/auth")
const { User, Room, Slot, Booking, Player } = require('../models');

const express = require('express');

const router = express.Router();


router.get('/', (req, res) => {
    Room.findAll({ raw: true })
        .then(rooms => { res.render('home', { rooms }) })
        .catch(msg => {
            res.render('home', {
                messageClass: 'alert-danger',
                message: msg
            })
        })
});
router.get('/', requireAuth, async (req, res) => {
    const { id } = req.user;

    Room.findOne({ where: { id }, raw: true })
        .then(async (roomData) => {
            const slots = await Slot.findAll({ where: { roomId: id, "$Users->Booking.userId$": null }, include: [{ model: User }], raw: true, nest: true })

            res.render('room', { roomData, slots })
        })
        .catch(err => { res.status(404).send(err) })
})
router.get('/room/:id', requireAuth, async (req, res) => {
    const { id } = req.params;

    Room.findOne({ where: { id }, raw: true })
        .then(async (roomData) => {
            const slots = await Slot.findAll(
                {
                    where:
                    {
                        roomId: id, "$Users->Booking.userId$": null
                    },
                    include: [{ model: User }], raw: true, nest: true
                })

            res.render('room', { roomData, slots })
        })
        .catch(err => { res.status(404).send(err) })
});
router.get('/roomToUpdate/:id', requireAuth, async (req, res) => {
    const { id } = req.params;

    const roomDat = await Room.findOne({ where: { id }, raw: true })
    // .then(async (roomDat) => {
    //     const slotsR = await Slot.findAll(
    //         {
    //             where:
    //             {
    //                 roomId: id, "$Users->Booking.userId$": null
    //             },
    //             include: [{ model: User }], raw: true, nest: true
    //         })

    res.render('room', { roomDat });
    // res.redirect('/updateRoom')
    //     })
    // .catch(err => { res.status(404).send(err) })
});
router.put('/room/update/:id', async (req, res) => {
    // const { idAdmin } = req.user.id;
    // const userAdmin = await User.findOne({ where: { id: idAdmin } })
    // if (userAdmin.isAdmin) {

    // res.redirect('/updateRoom')
    Room.findOne({ where: { id: req.params.id } });
    try {
        const mod = await Room.update({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            ageLimit: req.body.ageLimit,
            capacity: req.body.capacity,
            picture_path: req.body.picture_path
        },
            {
                where: { id: req.params.id }
            })
        res.render('roomToUpdate')

    }
    catch (err) { console.log(err) }
    //  catch (err) { console.log(err); }
    //  }
    // else { console.log("vous n'avez pas le droit de modifier les rooms"); }

})
router.get('/slot/:id/book', requireAuth, async (req, res) => {
    const { id } = req.params;
    //exemple pr affiche l'identifiant de l'utilisateur connécté en utlisant lemiddleware requireAuth

    const userLoggedAsPlayer = await User.findOne({
        where: { id: req.user },
        raw: true
    })
    console.log(userLoggedAsPlayer);

    Slot.findOne({
        where: { id },
        include: 'room',
        raw: true, nest: true
    })
        .then(slot => { res.render('book', { slot, userLoggedAsPlayer }) })
        .catch(err => { res.status(404).send(err) })
});

router.post('/slot/:id/book', requireAuth, async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ where: { id: req.user } })

    Slot.findOne({ where: { id } })
        .then(slot => {
            user.bookSlot(slot, req.body.players)
                .then(_ => { res.redirect('/bookings') })
                .catch(err => { console.error(err) })
        })
        .catch(err => { res.status(404).send(err) })
});

router.get('/bookings', requireAuth, async (req, res) => {
    const user = await User.findOne({ where: { id: req.user } })
    const slots = await user.getSlots({ raw: true, nest: true });
    for (let slot of slots) {
        slot.players = await Player.findAll({ where: { bookingId: slot.Booking.id }, raw: true, nest: true });
    }

    res.render('bookings', { slots })
});
//add player
router.post('/players/:id/book', async (req, res) => {
    const addplayer = await Player.bulkCreate([{
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        bookingId: req.params.id
    }])
    console.log(addplayer);
})

// router.post('/schedule', requireAuth, (req, res) => {
//     Schedule.create(req.user, req.body)
//         .then(_ => { res.redirect("/schedule") })
//         .catch(msg => { 
//             res.render('schedule', { 
//                 messageClass: 'alert-danger', 
//                 message: msg 
//             }) 
//         })
// });

module.exports = router;