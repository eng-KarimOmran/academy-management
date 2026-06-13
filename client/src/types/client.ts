import type { SubscriptionStatus } from "./enums";

export interface Client {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
  academyId: string;
}

interface CurrentClient extends Client {
  subscriptions: {
    id: string;
    status: SubscriptionStatus;
    createdAt: string;
    course: {
      name: string;
    };
  }[];
}

interface OtherFile {
  id: string;
  academy: {
    id: string;
    name: string;
  };
}

export interface ClientDetails {
  currentClient: CurrentClient;
  otherFiles: OtherFile[];
}
