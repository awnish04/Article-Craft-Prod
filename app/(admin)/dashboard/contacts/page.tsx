import { ContactsTable } from "@/components/admin/contacts/ContactsTable";
import { db } from "@/lib/db";
import { contacts } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export default async function ContactsPage() {
  let allContacts: (typeof contacts.$inferSelect)[] = [];

  try {
    allContacts = await db
      .select()
      .from(contacts)
      .orderBy(desc(contacts.createdAt));
  } catch {
    allContacts = [];
  }

  return <ContactsTable contacts={allContacts} />;
}
