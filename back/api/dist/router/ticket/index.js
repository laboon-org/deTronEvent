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
const get_tickets = require("../../control/ticket/get_ticket");
const update_ticket = require("../../control/ticket/close_ticket");
const create_ticket = require("../../control/ticket/create_ticket");
const create_buy_ticket = require("../../control/ticket/create_buy_ticket");
const get_account = require("../../control/account/get_account");
const create_user_access = require("../../control/ticket/create_approver");
const get_user_access = require("../../control/account/get_user_access");
const create_exchange = require("../../control/ticket/create_exchange");
const update_account = require("../../control/account/update_account");
const update_event_ticket = require("../../control/event/update_event");
const get_event_ticket = require("../../control/statistic/get_event");
const get_ticket_ids = require("../../control/statistic/get_ticket_id");
const create_sell = require("../../control/ticket/create_sell_ticket");
const aprrove_ticket = require("../../control/ticket/approve_ticket");
const ipfs = require("../../ipfs/index");
const genSession = require("../../ultils/gencdId.js");
var moment = require("moment-timezone");
router.post("/close", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body.event.data.new;
    console.log(data);
    try {
        if (data.status == 2) {
            const event = data.id;
            const data_update = yield update_ticket({ id: event });
            console.log(data_update);
            return res.send("Đã update thành công");
        }
    }
    catch (_a) {
        return res.send("Update không thành công");
    }
}));
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const input = req.body.input;
    console.log(req.body.input);
    let dem = 0;
    const array_input = [];
    try {
        for (let i = 0; i < input.supply; i++) {
            const cd_id = yield genSession(10);
            const data = yield ipfs(JSON.stringify({
                ticket: {
                    create_at: input.input[0].create_at,
                    user_id: input.input[0].user_id,
                    type: input.input[0].type,
                    status: 1,
                    TicketToken: {
                        data: {
                            event: input.input[0].TicketToken.data.event,
                            image_link: input.input[0].TicketToken.data.image_link,
                            owner_address: input.input[0].TicketToken.data.owner_address,
                            ticket_type: input.input[0].TicketToken.data.ticket_type,
                            approver: input.input[0].TicketToken.data.approver,
                            status: 1,
                            usable: input.input[0].TicketToken.data.usable,
                            price: input.input[0].TicketToken.data.price,
                            class_ticket: input.input[0].TicketToken.data.class_ticket,
                            cd_id: cd_id,
                        },
                    },
                },
            }));
            input.input[0].TicketToken.data.hash = data.path;
            array_input.push(JSON.parse(JSON.stringify(input.input[0])));
            dem = dem + 1;
        }
        const data = yield create_ticket({ input: array_input });
        const account = yield get_account(input.input[0].TicketToken.data.owner_address);
        const event_data = yield get_event_ticket({
            id: input.input[0].TicketToken.data.event,
        });
        const ticket_issued = account.data.UserNonce[0].ticket_issued + dem;
        const update = yield update_account({
            id: account.data.UserNonce[0].id,
            input: { ticket_issued },
        });
        const data_update_event = yield update_event_ticket({
            id: input.input[0].TicketToken.data.event,
            input: {
                ticket_issued: event_data.data.Event[0].ticket_issued + dem,
            },
        });
        return res.status(200).json({
            data: {
                mes: "Tạo vé thành công",
                ticket: array_input,
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
    //trigger tạp approved
    const data = req.body.event.data.new;
    let dateGet = moment(new Date())
        .tz("Asia/Bangkok")
        .format("YYYY-MM-DD HH:mm");
    try {
        const ticket_id = data.id;
        const wallet_address = data.approver != null && data.approver;
        const account = yield get_account(wallet_address);
        for (let i in account.data.UserNonce) {
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
                        const data = yield aprrove_ticket({ id: token });
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
router.post("/createsell", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, price } = req.body.input;
    const { data, errors } = yield create_sell({ id, price });
    if (errors) {
        return res.status(400).json(errors[0]);
    }
    return res.json({
        data: {
            mes: "Đã giao bán",
        },
    });
}));
module.exports = router;
//# sourceMappingURL=index.js.map