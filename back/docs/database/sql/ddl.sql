-- DROP SCHEMA public;

CREATE SCHEMA public AUTHORIZATION ldcgighzolqapq;

-- Drop table

-- DROP TABLE public."Event";

CREATE TABLE public."Event" (
	image text NOT NULL,
	status int4 NOT NULL,
	"name" text NOT NULL,
	end_date timestamp(3) NOT NULL,
	localtion text NOT NULL,
	"owner" text NOT NULL,
	start_date timestamp(3) NOT NULL,
	id serial4 NOT NULL,
	ticket_issued int4 NULL,
	ticket_sold int4 NULL,
	total_proceed float8 NULL,
	CONSTRAINT "Event_pkey" PRIMARY KEY (id)
);

-- Table Triggers

create trigger "notify_hasura_close_ticket_UPDATE" after
update
    on
    public."Event" for each row execute function hdb_catalog."notify_hasura_close_ticket_UPDATE"();

-- Drop table

-- DROP TABLE public."EventCatogory";

CREATE TABLE public."EventCatogory" (
	"type" text NOT NULL,
	"name" text NOT NULL,
	id serial4 NOT NULL,
	CONSTRAINT "EventCatogory_pkey" PRIMARY KEY (id)
);

-- Drop table

-- DROP TABLE public."EventCatogoryItem";

CREATE TABLE public."EventCatogoryItem" (
	id serial4 NOT NULL,
	event_id int4 NOT NULL,
	catogory_id int4 NOT NULL,
	CONSTRAINT "EventCatogoryItem_pkey" PRIMARY KEY (id),
	CONSTRAINT eventcatogoryitem_fk FOREIGN KEY (event_id) REFERENCES public."Event"(id),
	CONSTRAINT eventcatogoryitem_fk_catogory FOREIGN KEY (catogory_id) REFERENCES public."EventCatogory"(id)
);

-- Drop table

-- DROP TABLE public."GateScanConfirmation";

CREATE TABLE public."GateScanConfirmation" (
	ticket_token_id int4 NOT NULL,
	address text NOT NULL,
	entry_at timestamp(3) NOT NULL,
	id serial4 NOT NULL,
	CONSTRAINT "GateScanConfirmation_pkey" PRIMARY KEY (id)
);

-- Drop table

-- DROP TABLE public."RateConvention";

CREATE TABLE public."RateConvention" (
	currency float8 NULL,
	date_update timestamp NULL,
	id int4 NOT NULL,
	CONSTRAINT rateconvention_pk PRIMARY KEY (id)
);

-- Drop table

-- DROP TABLE public."TicketAccessToken";

CREATE TABLE public."TicketAccessToken" (
	owner_address text NOT NULL,
	ticket_token_id int4 NOT NULL,
	id serial4 NOT NULL,
	"token" int4 NOT NULL,
	CONSTRAINT "TicketAccessToken_pkey" PRIMARY KEY (id),
	CONSTRAINT ticketaccesstoken_fk FOREIGN KEY ("token") REFERENCES public."TicketTokens"(id)
);
CREATE UNIQUE INDEX "TicketAccessToken_ticket_token_id_key" ON public."TicketAccessToken" USING btree (ticket_token_id);
CREATE UNIQUE INDEX "TicketAccessToken_token_key" ON public."TicketAccessToken" USING btree (token);

-- Drop table

-- DROP TABLE public."TicketCollection";

CREATE TABLE public."TicketCollection" (
	verified bool NOT NULL,
	id serial4 NOT NULL,
	"owner" int4 NOT NULL,
	tiket_token_id int4 NOT NULL,
	favorited int4 NOT NULL,
	CONSTRAINT "TicketCollection_pkey" PRIMARY KEY (id),
	CONSTRAINT ticketcollection_fk FOREIGN KEY ("owner") REFERENCES public."UserNonce"(id),
	CONSTRAINT ticketcollection_fk_ticket FOREIGN KEY (tiket_token_id) REFERENCES public."TicketTokens"(id)
);

-- Drop table

-- DROP TABLE public."TicketTokens";

CREATE TABLE public."TicketTokens" (
	owner_address text NOT NULL,
	ticket_type int4 NOT NULL,
	id serial4 NOT NULL,
	"event" int4 NOT NULL,
	status int4 NULL,
	approver jsonb NULL,
	qrcode text NULL,
	price float8 NULL,
	image_link text NULL,
	class_ticket text NULL,
	CONSTRAINT "TicketTokens_pkey" PRIMARY KEY (id),
	CONSTRAINT tickettokens_fk FOREIGN KEY ("event") REFERENCES public."Event"(id)
);

-- Table Triggers

create trigger "notify_hasura_create_approved_INSERT" after
insert
    on
    public."TicketTokens" for each row execute function hdb_catalog."notify_hasura_create_approved_INSERT"();

-- Drop table

-- DROP TABLE public."Transaction";

CREATE TABLE public."Transaction" (
	id serial4 NOT NULL,
	ticket_id int4 NOT NULL,
	user_id int4 NOT NULL,
	create_at information_schema."time_stamp" NULL,
	"type" int4 NULL,
	status int4 NULL,
	CONSTRAINT "Transaction_pkey" PRIMARY KEY (id),
	CONSTRAINT transaction_fk FOREIGN KEY (user_id) REFERENCES public."UserNonce"(id),
	CONSTRAINT transaction_fk_ticket FOREIGN KEY (ticket_id) REFERENCES public."TicketTokens"(id)
);

-- Table Triggers

create trigger "notify_hasura_statistic_UPDATE" after
update
    on
    public."Transaction" for each row execute function hdb_catalog."notify_hasura_statistic_UPDATE"();
create trigger "notify_hasura_statistic_bought_INSERT" after
insert
    on
    public."Transaction" for each row execute function hdb_catalog."notify_hasura_statistic_bought_INSERT"();

-- Drop table

-- DROP TABLE public."UserAccessToken";

CREATE TABLE public."UserAccessToken" (
	expires_at timestamp(3) NOT NULL,
	id serial4 NOT NULL,
	"token" int4 NOT NULL,
	user_id int4 NOT NULL,
	CONSTRAINT "UserAccessToken_pkey" PRIMARY KEY (id),
	CONSTRAINT useraccesstoken_fk FOREIGN KEY (user_id) REFERENCES public."UserNonce"(id),
	CONSTRAINT useraccesstoken_fk_ticket FOREIGN KEY ("token") REFERENCES public."TicketTokens"(id)
);
CREATE UNIQUE INDEX "UserAccessToken_token_key" ON public."UserAccessToken" USING btree (token);

-- Drop table

-- DROP TABLE public."UserNonce";

CREATE TABLE public."UserNonce" (
	id serial4 NOT NULL,
	address_id int4 NOT NULL,
	ticket_sold int4 NULL,
	ticket_bought int4 NULL,
	ticket_issued int4 NULL,
	ticket_one_time_use int4 NULL,
	ticket_multi_use int4 NULL,
	money_total_ticket_ot float8 NULL,
	money_total_ticket_mul float8 NULL,
	total_proceeds float8 NULL,
	CONSTRAINT "UserNonce_pkey" PRIMARY KEY (id),
	CONSTRAINT usernonce_fk FOREIGN KEY (address_id) REFERENCES public."UserWallet"(id)
);
CREATE UNIQUE INDEX "UserNonce_address_key" ON public."UserNonce" USING btree (address_id);

-- Drop table

-- DROP TABLE public."UserWallet";

CREATE TABLE public."UserWallet" (
	wallet_address text NOT NULL,
	id serial4 NOT NULL,
	CONSTRAINT "UserWallet_pkey" PRIMARY KEY (id)
);
CREATE UNIQUE INDEX "UserWallet_wallet_address_key" ON public."UserWallet" USING btree (wallet_address);

CREATE OR REPLACE VIEW public.event_now
AS SELECT "Event".id,
    "Event".status,
    "Event".name,
    "Event".end_date,
    "Event".localtion,
    "Event".owner,
    "Event".start_date
   FROM "Event"
  WHERE to_char("Event".end_date::timestamp with time zone, 'YYYY-MM-DD'::text) = to_char(now(), 'YYYY-MM-DD'::text);
