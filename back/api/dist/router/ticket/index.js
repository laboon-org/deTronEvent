"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Router = require("router");
var router = Router();
const get_tickets = require("./get_ticket");
const update_ticket = require("./close_ticket");
const create_ticket = require("./create_ticket");
const create_buy_ticket = require("./create_buy_ticket");
const get_account = require("../account/get_account");
const create_user_access = require("./create_approver");
const get_user_access = require("../account/get_user_access");
const create_exchange = require("./create_exchange");
const update_account = require("../account/update_account");
const update_event_ticket = require("../event/update_event");
const get_event_ticket = require("../statistic/get_event");
const get_ticket_ids = require("../statistic/get_ticket_id");
var moment = require("moment-timezone");
router.post("/close", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body.event.data.new;
    try {
        if (data.status == 2) {
            const event = data.id;
            const ticket = yield get_tickets({ event });
            const list_ticket = ticket.data.TicketTokens;
            for (var i in list_ticket) {
                const data = update_ticket({ id: list_ticket[i].id });
                console.log(data);
            }
            console.log("test12345", ticket.data);
            return res.send("Đã update thành công");
        }
    }
    catch (_a) {
        return res.send("Update không thành công");
    }
}));
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { create_at, user_id, type, event, owner_address, ticket_type, supply, approver, price, class_ticket, image_link, } = req.body.input;
    var dem = 0;
    try {
        for (var i = 0; i < supply; i++) {
            const data = yield create_ticket({
                create_at,
                user_id,
                type,
                event,
                owner_address,
                approver,
                ticket_type,
                price,
                class_ticket,
                image_link,
            });
            console.log("test123", data);
            dem = dem + 1;
            console.log("dem", dem);
        }
        const account = yield get_account(owner_address);
        const event_data = yield get_event_ticket({ id: event });
        console.log(account);
        const ticket_issued = account.data.UserNonce[0].ticket_issued + dem;
        const update = yield update_account({
            id: account.data.UserNonce[0].id,
            input: { ticket_issued },
        });
        const data_update_event = yield update_event_ticket({
            id: event,
            input: {
                ticket_issued: event_data.data.Event[0].ticket_issued + dem,
            },
        });
        console.log(data_update_event);
        console.log(update, account);
        return res.status(200).json({
            data: {
                mes: "Tạo vé thành công",
            },
        });
    }
    catch (_b) {
        return res.send("Tạo không thành công");
    }
}));
router.post("/createbuy", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { create_at, ticket_id, user_id, owner_address, id_transaction } = req.body.input;
    try {
        const data = yield create_buy_ticket({
            create_at,
            ticket_id,
            user_id,
            owner_address,
            id_transaction,
        });
        console.log(data);
        return res.status(200).json({
            data: {
                mes: "Tạo vé thành công",
            },
        });
    }
    catch (_c) {
        return res.send("Tạo không thành công");
    }
}));
router.post("/approved/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body.event.data.new;
    var dateGet = moment(new Date())
        .tz("Asia/Bangkok")
        .format("YYYY-MM-DD HH:mm");
    try {
        const ticket_id = data.id;
        const wallet_address = data.approver != null && data.approver;
        const account = yield get_account(wallet_address);
        for (var i in account.data.UserNonce) {
            const create_acces = yield create_user_access({
                token: ticket_id,
                user_id: account.data.UserNonce[i].id,
                expires_at: dateGet,
            });
            console.log(create_acces);
        }
        console.log(account);
        return res.status(200).json({
            data: {
                mes: "Great! Your event ticket has been issued successfully",
            },
        });
    }
    catch (_d) {
        return res.send("Tạo không thành công");
    }
}));
router.post("/approve", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, token } = req.body.input;
    try {
        const data = yield get_user_access({ user_id, token });
        const data_ticket_id = yield get_ticket_ids({ id: token });
        if (data.data.UserAccessToken.length > 0) {
            if (data_ticket_id.data.TicketTokens[0].Event.status == 1) {
                if (data_ticket_id.data.TicketTokens[0].status == 1) {
                    if (data_ticket_id.data.TicketTokens[0].ticket_type == 1) {
                        const data = yield update_ticket({ id: token });
                        console.log(data);
                    }
                    return res.status(200).json({
                        data: {
                            mes: 1,
                        },
                    });
                }
                else {
                    res.status(201).json({
                        data: {
                            mes: 2,
                        },
                    });
                }
            }
            else {
                res.status(201).json({
                    data: {
                        mes: 3,
                    },
                });
            }
        }
        else {
            res.status(201).json({
                data: {
                    mes: 0,
                },
            });
        }
    }
    catch (_e) {
        return res.send("Lỗi");
    }
}));
router.post("/create_exchange", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { create_at, ticket_id, owner_address } = req.body.input;
    try {
        const account = yield get_account(owner_address);
        console.log(account);
        const data = yield create_exchange({
            create_at,
            ticket_id,
            user_id: account.data.UserNonce[0].id,
            owner_address,
        });
        console.log(data);
        return res.status(200).json({
            data: {
                mes: "Tạo vé thành công",
            },
        });
    }
    catch (_f) {
        return res.send("Tạo không thành công");
    }
}));
module.exports = router;
//# sourceMappingURL=index.js.map