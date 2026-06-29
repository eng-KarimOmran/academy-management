import type { Academy } from "./academy";
import type { ClientSource } from "./enums";
import type { SubscriptionBase } from "./subscription";

export interface Client {
  id: string;
  name: string;
  phone: string;
  source: ClientSource
  createdAt: string;
  academyId: string;
}

interface CurrentClient extends Client {
  subscriptions: SubscriptionBase[];
}

interface OtherFile extends Client {
  id: string;
  academy: Academy
}

export interface ClientDetails {
  currentClient: CurrentClient;
  otherFiles: OtherFile[];
}