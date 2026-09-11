import {sqliteTable,text,integer,index,uniqueIndex} from 'drizzle-orm/sqlite-core';
export const professionals=sqliteTable('professionals',{id:text('id').primaryKey(),userId:text('user_id').notNull().unique(),email:text('email').notNull(),name:text('name').notNull(),service:text('service').notNull(),district:text('district').notNull(),credentials:text('credentials').notNull(),bio:text('bio').notNull(),status:text('status').notNull().default('pending'),createdAt:integer('created_at').notNull()});
export const bookings=sqliteTable('bookings',{id:text('id').primaryKey(),userId:text('user_id').notNull(),email:text('email').notNull(),idempotencyKey:text('idempotency_key').notNull(),service:text('service').notNull(),data:text('data').notNull(),status:text('status').notNull().default('requested'),providerId:text('provider_id'),amount:integer('amount'),terms:text('terms'),offerExpires:integer('offer_expires'),paymentRef:text('payment_ref').unique(),paymentId:text('payment_id'),paidAt:integer('paid_at'),createdAt:integer('created_at').notNull(),updatedAt:integer('updated_at').notNull()},t=>[uniqueIndex('bookings_user_key').on(t.userId,t.idempotencyKey),index('bookings_user').on(t.userId,t.createdAt),index('bookings_service_status').on(t.service,t.status),index('bookings_provider').on(t.providerId)]);
export const holds=sqliteTable('holds',{id:text('id').primaryKey(),bookingId:text('booking_id').notNull(),providerId:text('provider_id').notNull(),starts:integer('starts').notNull(),ends:integer('ends').notNull(),expires:integer('expires').notNull()},t=>[index('holds_provider_interval').on(t.providerId,t.starts,t.ends),index('holds_booking').on(t.bookingId)]);

export const leads = sqliteTable(
  "leads",
  {
    id: text("id").primaryKey(),
    idempotencyKey: text("idempotency_key").notNull().unique(),
    audience: text("audience").notNull(),
    name: text("name").notNull(),
    email: text("email"),
    phone: text("phone"),
    city: text("city").notNull(),
    market: text("market").notNull(),
    role: text("role"),
    organization: text("organization"),
    payload: text("payload").notNull(),
    source: text("source").notNull(),
    route: text("route").notNull(),
    experimentId: text("experiment_id"),
    thesisId: text("thesis_id"),
    variantId: text("variant_id"),
    consentResearch: integer("consent_research", { mode: "boolean" }).notNull(),
    consentUpdates: integer("consent_updates", { mode: "boolean" }).notNull().default(false),
    status: text("status").notNull().default("new"),
    crmStatus: text("crm_status").notNull().default("local_only"),
    createdAt: integer("created_at").notNull(),
  },
  (table) => [
    index("leads_audience_created").on(table.audience, table.createdAt),
    index("leads_email_created").on(table.email, table.createdAt),
  ],
);
