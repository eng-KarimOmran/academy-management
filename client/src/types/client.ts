import type { Academy } from "./academy";
import type { ClientSource } from "./enums";
import type { SubscriptionBase } from "./subscription";

export interface Client {
  id: string;
  name: string;
  phone: string;
  academyId: string;
}

interface CurrentClient extends Client {
  clientSource: ClientSource;
  academy: Academy;
  subscriptions: SubscriptionBase[];
  createdAt: string;
}

interface OtherFile {
  id: string;
  academy: Academy;
}

export interface ClientDetails {
  currentClient: CurrentClient;
  otherFiles: OtherFile[];
}
